package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.requests.StoreSessionRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.repositories.SessionRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public ResponseDTO<Session> createSession(@Valid StoreSessionRequest request, Project project) {
        System.out.println(request.getMetaData());
        Session session = sessionRepository.findByProjectAndSessionId(project,request.getSessionId()).orElseGet(()->{
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
}
