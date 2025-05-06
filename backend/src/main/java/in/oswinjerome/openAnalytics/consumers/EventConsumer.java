package in.oswinjerome.openAnalytics.consumers;

import in.oswinjerome.openAnalytics.dtos.requests.StoreEventRequest;
import in.oswinjerome.openAnalytics.dtos.requests.StoreSessionRequest;
import in.oswinjerome.openAnalytics.exceptions.InvalidRequestException;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.repositories.EventRepository;
import in.oswinjerome.openAnalytics.repositories.ProjectRepository;
import in.oswinjerome.openAnalytics.repositories.SessionRepository;
import in.oswinjerome.openAnalytics.services.ProjectService;
import in.oswinjerome.openAnalytics.services.SessionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
public class EventConsumer {

    private final SessionService sessionService;
    private final ProjectRepository projectRepository;
    private final EventRepository eventRepository;
    private final SessionRepository sessionRepository;

    public EventConsumer(SessionService sessionService, ProjectRepository projectRepository, EventRepository eventRepository, SessionRepository sessionRepository, SessionRepository sessionRepository1) {
        this.sessionService = sessionService;
        this.projectRepository = projectRepository;
        this.eventRepository = eventRepository;
        this.sessionRepository = sessionRepository1;
    }

    @KafkaListener(topics = "events", groupId = "open_analytics_group")
    public void consume(StoreEventRequest request) {
        log.info("Consuming event: {}", request);
        StoreSessionRequest req = new StoreSessionRequest();
        req.setSessionId(request.getSessionId());
        req.setUserAgent(request.getUserAgent());
        req.setIpAddress(request.getIpAddress());
        req.setMetaData(request.getMetaData());

        Project project = projectRepository.findById(request.getProjectId()).orElse(null);

        if (project == null) {
            log.error("Cannot find project {}", request.getProjectId());
            throw new InvalidRequestException("Project not found, API key in invalid");
        }
        Session session = sessionService.createSession(req, project).getData();

        Event event = new Event();
        event.setProject(project);
        event.setName(request.getEvent().getName());
        event.setEventType(request.getEvent().getEventType());
        event.setMetaData(request.getEvent().getMetaData());
        event.setPage(request.getEvent().getPage());
        event.setReferrer(request.getEvent().getReferrer());
        event.setSession(session);
        event.setUrl(request.getEvent().getUrl());

        eventRepository.save(event);
        session.setUpdatedAt(LocalDateTime.now());
        sessionRepository.save(session);

        log.info("Saved event: {}", event);

    }

}
