package in.oswinjerome.openAnalytics.controllers.api.v1;

import in.oswinjerome.openAnalytics.dtos.requests.StoreEventRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.services.EventService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/events")
@SecurityRequirement(name = "apiKey")
public class EventApiController {

    private final EventService eventService;

    public EventApiController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseDTO<Void> create(@RequestBody @Valid StoreEventRequest request, @RequestAttribute("project") Project project) {


        return eventService.create(request,project);
    }

}
