package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.repositories.EventRepository;
import in.oswinjerome.openAnalytics.repositories.ProjectRepository;
import in.oswinjerome.openAnalytics.repositories.SessionRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class StatsService {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;
    private final EventRepository eventRepository;
    private final SessionRepository sessionRepository;

    public StatsService(ProjectService projectService, ProjectRepository projectRepository, EventRepository eventRepository, SessionRepository sessionRepository) {
        this.projectService = projectService;
        this.projectRepository = projectRepository;
        this.eventRepository = eventRepository;
        this.sessionRepository = sessionRepository;
    }

    public ResponseDTO<List<Event>> getLatestEvents(String projectId) {

        Project project = projectRepository.findById(projectId).orElseThrow();
        Pageable pageable = PageRequest.of(0, 10);
        List<Event> events = eventRepository.findByProjectOrderByCreatedAtDesc(project, pageable);

        return ResponseDTO.success(events);
    }

    public ResponseDTO<List<SessionWindowCount>> getSessionCountInWindow(String projectId) {

        List<Object[]> temp = sessionRepository.findSessionCountByPeriodAndWindow(projectId,1, 2);
        List<SessionWindowCount> sessionWindowCounts = temp.stream()
                .map(row -> new SessionWindowCount(toLocalDateTime(row[0]),
                        ((Number) row[1]).longValue())
                ).toList();
        return ResponseDTO.success(sessionWindowCounts);
    }

    public record SessionWindowCount(
            LocalDateTime windowStart,
            Long sessionCount
    ) {
    }

    private static LocalDateTime toLocalDateTime(Object val) {
        if (val instanceof LocalDateTime ldt) return ldt;
        if (val instanceof Timestamp ts) return ts.toLocalDateTime();
        if (val instanceof Instant instant) return instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        throw new IllegalArgumentException("Unexpected datetime type: " + val.getClass());
    }
}
