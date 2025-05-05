package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.requests.StoreEventRequest;
import in.oswinjerome.openAnalytics.dtos.requests.StoreSessionRequest;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import in.oswinjerome.openAnalytics.repositories.EventRepository;
import in.oswinjerome.openAnalytics.repositories.SessionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final KafkaTemplate<String, StoreEventRequest> kafkaTemplate;


    public EventService(KafkaTemplate<String, StoreEventRequest> kafkaTemplate) {

        this.kafkaTemplate = kafkaTemplate;
    }

    public ResponseDTO<Void> create(@Valid StoreEventRequest request, Project project) {

        request.setProjectId(project.getId());

        kafkaTemplate.send("events",request.getSessionId(), request);

        return ResponseDTO.success();
    }
}
