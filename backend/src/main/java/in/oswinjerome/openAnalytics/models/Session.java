package in.oswinjerome.openAnalytics.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "sessions", indexes = @Index(columnList = "project_id"))
@Getter @Setter
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @Column(unique = true, nullable = false)
    private String sessionId;

    private String userAgent;
    private String ipAddress;

    @Column(columnDefinition = "jsonb")
    @Type(JsonType.class)
    private Map<String, Object> metaData;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Long getDuration(){

        return Duration.between(createdAt, updatedAt).getSeconds();
    }

}
