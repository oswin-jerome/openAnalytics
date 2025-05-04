package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.requests.StoreProjectRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.exceptions.UnauthorizedException;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.User;
import in.oswinjerome.openAnalytics.repositories.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    private final AuthService authService;
    private final ProjectRepository projectRepository;

    public ProjectService(AuthService authService, ProjectRepository projectRepository) {
        this.authService = authService;
        this.projectRepository = projectRepository;
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
}
