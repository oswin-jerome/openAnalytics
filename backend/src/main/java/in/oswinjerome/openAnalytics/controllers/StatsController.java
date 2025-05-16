package in.oswinjerome.openAnalytics.controllers;

import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.services.StatsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("stats/{projectId}")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("latest-events")
    public ResponseDTO<List<Event>> getLastEvents(@PathVariable("projectId") String projectId) {

        return statsService.getLatestEvents(projectId);
    }

    @GetMapping("session-count-in-window")
    public ResponseDTO<List<StatsService.SessionWindowCount>> getSessionCountInWindow(@PathVariable("projectId") String projectId) {
        return statsService.getSessionCountInWindow(projectId);
    }

}
