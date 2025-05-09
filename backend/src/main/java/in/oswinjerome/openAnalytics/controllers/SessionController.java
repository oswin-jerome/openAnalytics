package in.oswinjerome.openAnalytics.controllers;

import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.services.SessionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("sessions/{sessionId}")
@SecurityRequirement(name = "bearerAuth")
public class SessionController {


    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/events")
    @Tag(name = "Session")
    public ResponseDTO<List<Event>> getSessionEvents(@PathVariable("sessionId") String sessionId) {
//        FIXME: make is a sub route of project. Think about it
        return sessionService.getSessionEvents(sessionId);
    }

}
