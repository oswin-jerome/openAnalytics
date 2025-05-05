package in.oswinjerome.openAnalytics.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.Map;

@Table(name = "events", indexes = {
        @Index(columnList = "project_id"),
        @Index(columnList = "session_id"),
        @Index(columnList = "name")
})
@Entity
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @ManyToOne
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private Session session;

    private String name;

    private String page;       // E.g., "/dashboard"
    private String referrer;   // E.g., "https://google.com"
    private String url;        // Full URL of event
    private String eventType;  // Optional: categorize like "system", "page", "custom"

    @Column(columnDefinition = "jsonb")
    @Type(JsonType.class)
    private Map<String, Object> metaData;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
