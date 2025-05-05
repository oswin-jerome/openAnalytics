package in.oswinjerome.openAnalytics.filters;

import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.repositories.ProjectRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class ApiKeyFilter extends OncePerRequestFilter {

    private final ProjectRepository projectRepository;

    public ApiKeyFilter(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

//        This filter should only work for api routes which are used to update analytics data to the system (end user api)
        if(!request.getRequestURI().startsWith("/api/v1")) {
            filterChain.doFilter(request, response);
            return;
        }

        String apiKey = request.getHeader("x-api-key");
        System.out.println(apiKey);
        if(apiKey==null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Missing api key");
            return;
        }

        Optional<Project> project = projectRepository.findByApiKey(apiKey);
        if(project.isEmpty()){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Invalid api key");
            return;
        }

        request.setAttribute("project", project.get());
        filterChain.doFilter(request, response);
    }
}
