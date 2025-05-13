package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.requests.StoreSessionRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.repositories.EventRepository;
import in.oswinjerome.openAnalytics.repositories.SessionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SessionService {
    private final SessionRepository sessionRepository;
    private final EventRepository eventRepository;

    public SessionService(SessionRepository sessionRepository, EventRepository eventRepository, EventRepository eventRepository1) {
        this.sessionRepository = sessionRepository;
        this.eventRepository = eventRepository1;
    }

    public ResponseDTO<Session> createSession(@Valid StoreSessionRequest request, Project project) {
        System.out.println(request.getMetaData());
        Session session = sessionRepository.findByProjectAndSessionId(project,request.getSessionId()).orElseGet(()->{
            log.info("Creating new session");
            Session session1 = new Session();
            session1.setSessionId(request.getSessionId());
            session1.setProject(project);
            session1.setIpAddress(request.getIpAddress());
            session1.setUserAgent(request.getUserAgent());
            if(!request.getMetaData().isEmpty())
                session1.setMetaData(request.getMetaData());
            return sessionRepository.save(session1);
        });

        return ResponseDTO.success(session);
    }

    public ResponseDTO<SessionWithEvent> getSessionEvents(String sessionId) {

        Session session = sessionRepository.findBySessionId(sessionId).orElseThrow(()->new EntityNotFoundException("Session not found"));

        List<Event> events = eventRepository.findBySession(session);

        return ResponseDTO.success(new SessionWithEvent(session,events));
    }

    public record SessionWithEvent(Session session, List<Event> events){}
}
