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
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@Slf4j
public class SseService {

    private final Map<String, List<SseEmitter>> sseEmitters = new ConcurrentHashMap<>();

    public SseEmitter register(String clientId) {
        SseEmitter sseEmitter = new SseEmitter(0L);
        sseEmitters.computeIfAbsent(clientId, k -> new CopyOnWriteArrayList<>()).add(sseEmitter);

        sseEmitter.onCompletion(() -> sseEmitters.remove(clientId));
        sseEmitter.onTimeout(() -> sseEmitters.remove(clientId));
        sseEmitter.onError(error -> sseEmitters.remove(clientId));

        return sseEmitter;
    }

    public void remove(String clientId, SseEmitter emitter) {
        List<SseEmitter> clientEmitters = sseEmitters.get(clientId);

        if (clientEmitters != null) {
            clientEmitters.remove(emitter);
        }
    }

    public void sendMessage(String clientId, Event message) {
        log.info("SseService sendMessage");
        List<SseEmitter> clientEmitters = sseEmitters.get(clientId);
        if (clientEmitters == null) return;
        List<SseEmitter> deadEmitters = new ArrayList<>();

        for (SseEmitter emitter : clientEmitters) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                mapper.registerModule(new JavaTimeModule());
                mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

                emitter.send(SseEmitter.event().id("new_event").data(mapper.writeValueAsString(message)));
            } catch (IOException e) {
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
        for (var entry : sseEmitters.entrySet()) {
            List<SseEmitter> deadEmitters = new ArrayList<>();
            for (SseEmitter emitter : entry.getValue()) {
                try {
                    emitter.send(SseEmitter.event().comment("heartbeat"));
                } catch (IOException e) {
                    deadEmitters.add(emitter);
                }
            }
            entry.getValue().removeAll(deadEmitters);
        }
    }
}
