package in.oswinjerome.openAnalytics.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import in.oswinjerome.openAnalytics.models.Event;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@Slf4j
public class SseService {

    private final Map<String, Map<String, ConcurrentLinkedQueue<SseEmitter>>> subscriptions = new ConcurrentHashMap<>();
    private final ObjectMapper mapper;

    public SseService(ObjectMapper mapper) {
        this.mapper = mapper;
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    public SseEmitter register(String eventType,String clientId) {
        SseEmitter sseEmitter = new SseEmitter(0L);
        subscriptions.computeIfAbsent(clientId, k -> new ConcurrentHashMap<>());
        subscriptions.get(clientId)
                .computeIfAbsent(eventType, k -> new ConcurrentLinkedQueue<>())
                .add(sseEmitter);

        sseEmitter.onCompletion(() -> remove(eventType,clientId,sseEmitter));
        sseEmitter.onTimeout(() -> remove(eventType,clientId,sseEmitter));
        sseEmitter.onError(error -> remove(eventType,clientId,sseEmitter));
        log.info(subscriptions.toString());
        return sseEmitter;
    }

    public void remove(String eventType,String clientId, SseEmitter emitter) {
        ConcurrentLinkedQueue<SseEmitter> clientEmitters = subscriptions.get(clientId).get(eventType);

        if (clientEmitters != null) {
            clientEmitters.remove(emitter);
        }
    }

    public void sendMessage(String eventType,String clientId, Object message) {
        log.info("SseService sendMessage");
        ConcurrentLinkedQueue<SseEmitter> clientEmitters = subscriptions.get(clientId).get(eventType);
        if (clientEmitters == null) return;
        List<SseEmitter> deadEmitters = new ArrayList<>();
        log.info(String.valueOf(clientEmitters.size()));
        for (SseEmitter emitter : clientEmitters) {
            try {
                emitter.send(SseEmitter.event().name(eventType).id(eventType).data(mapper.writeValueAsString(message)));
                log.info("SseEmitter sent");
            } catch (Exception e) {
                deadEmitters.add(emitter);
                log.error(e.getMessage());
                log.info("SSE Dead");
            }
        }
        clientEmitters.removeAll(deadEmitters);
    }

    @Scheduled(fixedRate = 15000)
    public void sendHeartbeat() {
        log.info("SseService: Sending heartbeat...");

        subscriptions.forEach((clientId, clientSubscriptions) -> {
            clientSubscriptions.forEach((eventType, eventEmitter) -> {
                eventEmitter.removeIf(e->{
                    try{
                        e.send(SseEmitter.event().name("heartbeat").comment("heartbeat"));
                        log.info("SSE Heartbeat DONE");
                        return false;
                    }catch (Exception ex){
                        log.error(ex.getMessage());
                        log.info("SSE Heartbeat");
                        return true;
                    }
                });
            });
            if(clientSubscriptions.isEmpty()) {
                subscriptions.remove(clientId);
            }
        });
    }
}
