package in.oswinjerome.openAnalytics.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class SessionListDTO {

    private String id;
    private String sessionId;
    private String userAgent;
    private String ipAddress;

    @Type(JsonType.class)
    private Map<String, Object> metaData;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long noOfEvents;
    public Long getDuration(){

        return Duration.between(createdAt, updatedAt).getSeconds();
    }


    public SessionListDTO(Session session,Long noOfEvents) {
        this.id = session.getId();
        this.sessionId = session.getSessionId();
        this.userAgent = session.getUserAgent();
        this.ipAddress = session.getIpAddress();
        this.metaData = session.getMetaData();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.noOfEvents = noOfEvents;
    }

}
