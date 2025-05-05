package in.oswinjerome.openAnalytics.controllers.api.v1;

import in.oswinjerome.openAnalytics.dtos.requests.StoreSessionRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.services.SessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/sessions")
@SecurityRequirement(name = "apiKey")
public class SessionApiController {


    private final SessionService sessionService;

    public SessionApiController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @Operation(summary = "Creates a session or returns the previous session is sessionId is already available")
    @PostMapping
    public ResponseDTO<Session> createSession(@RequestBody @Valid StoreSessionRequest request, @RequestAttribute("project") Project project) {
        System.out.println(request.getMetaData());
        return sessionService.createSession(request,project);
    }

}
