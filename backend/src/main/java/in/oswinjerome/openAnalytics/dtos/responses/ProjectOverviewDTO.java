package in.oswinjerome.openAnalytics.dtos.responses;

import in.oswinjerome.openAnalytics.models.Project;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
public class ProjectOverviewDTO {
    private String id;

    private String name;
    private String domain;
    private String apiKey;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private ProjectMetricsDTO metrics;

    public static ProjectOverviewDTO from(Project project) {
        ProjectOverviewDTO dto = new ProjectOverviewDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDomain(project.getDomain());
        dto.setApiKey(project.getApiKey());
        dto.setCreatedAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());
        return dto;
    }

}
