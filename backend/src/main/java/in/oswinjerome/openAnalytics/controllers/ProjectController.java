package in.oswinjerome.openAnalytics.controllers;

import in.oswinjerome.openAnalytics.dtos.requests.StoreProjectRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ProjectOverviewDTO;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.services.ProjectService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("projects")
@SecurityRequirement(name = "bearerAuth")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseDTO<List<Project>> getProjects() {
        return projectService.getCurrentUserProjects();
    }

    @GetMapping("{id}")
    public ResponseDTO<ProjectOverviewDTO> getProject(@PathVariable String id) {

        return projectService.getCurrentUserProjectById(id);
    }

    @PostMapping
    public ResponseDTO<Project> createProject(@RequestBody @Valid StoreProjectRequest storeProjectRequest) {
        return projectService.createProject(storeProjectRequest);
    }

    @DeleteMapping("{id}")
    public ResponseDTO<Void> deleteProject(@PathVariable String id) {
        return projectService.delete(id);
    }

    @GetMapping("{id}/events")
    public ResponseDTO<List<Event>> getEventsByProject(@PathVariable String id) {

        return projectService.getEventsByProjectId(id);
    }
   @GetMapping("{id}/sessions")
    public ResponseDTO<List<Session>> getSessionsByProjectId(@PathVariable String id) {

        return projectService.getSessionsByProjectId(id);
    }

}
