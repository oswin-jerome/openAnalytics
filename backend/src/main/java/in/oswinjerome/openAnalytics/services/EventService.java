package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.requests.StoreEventRequest;
import in.oswinjerome.openAnalytics.dtos.requests.StoreSessionRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.repositories.EventRepository;
import in.oswinjerome.openAnalytics.repositories.SessionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    private final SessionService sessionService;
    private final SessionRepository sessionRepository;
    private final EventRepository eventRepository;

    private final KafkaTemplate<String, StoreEventRequest> kafkaTemplate;


    public EventService(SessionService sessionService, SessionRepository sessionRepository, EventRepository eventRepository, KafkaTemplate<String, StoreEventRequest> kafkaTemplate) {
        this.sessionService = sessionService;
        this.sessionRepository = sessionRepository;
        this.eventRepository = eventRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public ResponseDTO<Void> create(@Valid StoreEventRequest request, Project project) {

        request.setProjectId(project.getId());

        kafkaTemplate.send("events",request.getSessionId(), request);

//        StoreSessionRequest req = new StoreSessionRequest();
//        req.setSessionId(request.getSessionId());
//        req.setUserAgent("Default");
//        req.setIpAddress("127.0.0.1");
//
//        Session session = sessionService.createSession(req,project).getData();
//
//
//        Event event = new Event();
//        event.setProject(project);
//        event.setName(request.getName());
//        event.setEventType(request.getEventType());
//        event.setMetaData(request.getMetaData());
//        event.setPage(request.getPage());
//        event.setReferrer(request.getReferrer());
//        event.setSession(session);
//        event.setUrl(request.getUrl());
//
//        eventRepository.save(event);

        return ResponseDTO.success();
    }
}
