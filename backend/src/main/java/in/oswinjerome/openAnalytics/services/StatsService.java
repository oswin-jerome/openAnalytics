package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.repositories.EventRepository;
import in.oswinjerome.openAnalytics.repositories.ProjectRepository;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;
    private final EventRepository eventRepository;

    public StatsService(ProjectService projectService, ProjectRepository projectRepository, EventRepository eventRepository) {
        this.projectService = projectService;
        this.projectRepository = projectRepository;
        this.eventRepository = eventRepository;
    }

    public ResponseDTO<List<Event>> getLatestEvents(String projectId) {

        Project project = projectRepository.findById(projectId).orElseThrow();
        Pageable pageable = PageRequest.of(0, 10);
        List<Event> events = eventRepository.findByProjectOrderByCreatedAtDesc(project,pageable);

        return ResponseDTO.success(events);
    }
}
