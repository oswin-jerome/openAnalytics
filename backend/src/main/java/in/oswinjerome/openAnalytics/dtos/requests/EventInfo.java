package in.oswinjerome.openAnalytics.dtos.requests;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.util.Map;

@Data
public class EventInfo {
    @NotEmpty
    private String name;

    @NotEmpty
    private String page;

    private String referrer;

    private String url;

    private String eventType;

    @NotEmpty
    private String sessionId;

    @Type(JsonType.class)
    private Map<String, Object> metaData;
}
