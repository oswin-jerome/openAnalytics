package in.oswinjerome.openAnalytics.controllers;

import in.oswinjerome.openAnalytics.dtos.SessionListDTO;
import in.oswinjerome.openAnalytics.dtos.requests.StoreProjectRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ProjectOverviewDTO;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.services.ProjectService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
    public ResponseDTO<ProjectOverviewDTO> getProject(@PathVariable String id, @RequestParam(defaultValue = "24hrs") String duration) {

        return projectService.getCurrentUserProjectById(id,duration);
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
    public ResponseDTO<Page<Event>> getEventsByProject(
            @PathVariable String id,
            @RequestParam(defaultValue = "all") String name,
            @PageableDefault(
                    size = 30,
                    direction = Sort.Direction.DESC
            ) Pageable pageable
    ) {

        return projectService.getEventsByProjectId(id,name, pageable);
    }


    @GetMapping("{id}/sessions")
    @Tag(name = "Session")
    public ResponseDTO<Page<SessionListDTO>> getSessionsByProjectId(@PathVariable String id, @PageableDefault(
            size = 30,
            direction = Sort.Direction.DESC
    ) Pageable pageable) {

        return projectService.getSessionsByProjectId(id, pageable);
    }
}
