package in.oswinjerome.openAnalytics.dtos.requests;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.util.HashMap;
import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StoreSessionRequest {
    @NotEmpty
    private String sessionId;
    @NotEmpty
    private String userAgent;
    @NotEmpty
    private String ipAddress;

    @Type(JsonType.class)
    private Map<String, Object> metaData = new HashMap<>();
}
