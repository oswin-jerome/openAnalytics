package in.oswinjerome.openAnalytics.controllers;

import in.oswinjerome.openAnalytics.models.User;
import in.oswinjerome.openAnalytics.services.AuthService;
import in.oswinjerome.openAnalytics.services.SseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("sse")
public class SseController {

    private final SseService sseService;
    private final AuthService authService;

    public SseController(SseService sseService, AuthService authService) {
        this.sseService = sseService;
        this.authService = authService;
    }

    @GetMapping("{projId}/events")
    public SseEmitter getEvents(@PathVariable String projId){
        User user = authService.getCurrentUser();
        if (user == null) {
            return null;
        }
        return  sseService.register("latest_events",projId);
    }


}
