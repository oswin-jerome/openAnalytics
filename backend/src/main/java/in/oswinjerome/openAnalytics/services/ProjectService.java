package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.KeyVal;
import in.oswinjerome.openAnalytics.dtos.requests.StoreProjectRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ProjectMetricsDTO;
import in.oswinjerome.openAnalytics.dtos.responses.ProjectOverviewDTO;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.exceptions.UnauthorizedException;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.models.User;
import in.oswinjerome.openAnalytics.repositories.EventRepository;
import in.oswinjerome.openAnalytics.repositories.ProjectRepository;
import in.oswinjerome.openAnalytics.repositories.SessionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final AuthService authService;
    private final ProjectRepository projectRepository;
    private final EventRepository eventRepository;
    private final SessionRepository sessionRepository;

    public ProjectService(AuthService authService, ProjectRepository projectRepository, EventRepository eventRepository, SessionRepository sessionRepository) {
        this.authService = authService;
        this.projectRepository = projectRepository;
        this.eventRepository = eventRepository;
        this.sessionRepository = sessionRepository;
    }

    public ResponseDTO<List<Project>> getCurrentUserProjects() {
        User currentUser = authService.getCurrentUser();
        List<Project> currentUserProjects = projectRepository.findAllByOwner(currentUser);
        return ResponseDTO.success(currentUserProjects);
    }

    public ResponseDTO<Project> createProject(StoreProjectRequest storeProjectRequest) {
        Project project = new Project();
        project.setName(storeProjectRequest.getName());
        project.setDomain(storeProjectRequest.getDomain());
        project.setOwner(authService.getCurrentUser());
        project.setApiKey(UUID.randomUUID().toString());
        projectRepository.save(project);
        return ResponseDTO.success(project);
    }

    public ResponseDTO<Void> delete(String id) {
        Project project = projectRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Project not found"));

        User user = authService.getCurrentUser();
        if(!project.getOwner().getEmail().equals(user.getEmail())) {
            throw new UnauthorizedException("You do not have permission to delete this project");
        }

        projectRepository.delete(project);
        return ResponseDTO.success();
    }

    public ResponseDTO<ProjectOverviewDTO> getCurrentUserProjectById(String id) {

        User currentUser = authService.getCurrentUser();

        Project project = projectRepository.findByIdAndOwner(id,currentUser).orElseThrow(()-> new EntityNotFoundException("Project not found"));

        ProjectOverviewDTO overviewDTO = ProjectOverviewDTO.from(project);
        overviewDTO.setMetrics(getProjectMetrics(project));
        return ResponseDTO.success(overviewDTO);
    }

    private ProjectMetricsDTO getProjectMetrics(Project project) {

        ProjectMetricsDTO metricsDTO = new ProjectMetricsDTO();
        metricsDTO.setTotalEvents(eventRepository.countByProject(project));
        metricsDTO.setTotalSessions(sessionRepository.countByProject(project));
        metricsDTO.setTotalVisitors(sessionRepository.countByProject(project));
        metricsDTO.setEventCounts(eventRepository.findDistinctEventNames(project));
        metricsDTO.setTopPages(eventRepository.findTopPages(project).stream().map((o)-> (String) o[0]).collect(Collectors.toCollection(ArrayList::new)));
        metricsDTO.setTopReferrers(eventRepository.findTopReferrers(project).stream().map((o)-> new KeyVal<String,Long>((String)o[0],(Long)o[1])).collect(Collectors.toCollection(ArrayList::new)));
        metricsDTO.setUserAgentCounts(sessionRepository.findUserAgentCounts(project).stream().map((o)-> new KeyVal<String,Long>((String)o[0],(Long)o[1])).collect(Collectors.toCollection(ArrayList::new)));

//        FIXME: clean up this code.
        metricsDTO.setOsCounts(sessionRepository.findOsCounts(project).stream().map((o)-> new KeyVal<String,Long>((String)o[0],(Long)o[1])).collect(Collectors.toCollection(ArrayList::new)));
        metricsDTO.setDeviceCounts(sessionRepository.findDeviceCounts(project).stream().map((o)-> new KeyVal<String,Long>((String)o[0],(Long)o[1])).collect(Collectors.toCollection(ArrayList::new)));

        return metricsDTO;
    }

    public ResponseDTO<Page<Event>> getEventsByProjectId(String id, Pageable pageable) {
        User currentUser = authService.getCurrentUser();

        Project project = projectRepository.findByIdAndOwner(id,currentUser).orElseThrow(()-> new EntityNotFoundException("Project not found"));

        Page<Event> events = eventRepository.findByProject(project,pageable);

        return ResponseDTO.success(events);
    }

    public ResponseDTO<Page<Session>> getSessionsByProjectId(String id, Pageable pageable) {
        User currentUser = authService.getCurrentUser();

        Project project = projectRepository.findByIdAndOwner(id,currentUser).orElseThrow(()-> new EntityNotFoundException("Project not found"));
        Page<Session> sessions = sessionRepository.findByProjectOrderByUpdatedAtDesc(project,pageable);

        return ResponseDTO.success(sessions);
    }

    public ResponseDTO<Page<Event>> getTopReferrersByProject(String id) {

        User currentUser = authService.getCurrentUser();
        Project project = projectRepository.findByIdAndOwner(id,currentUser).orElseThrow(()-> new EntityNotFoundException("Project not found"));



        return null;
    }
}
