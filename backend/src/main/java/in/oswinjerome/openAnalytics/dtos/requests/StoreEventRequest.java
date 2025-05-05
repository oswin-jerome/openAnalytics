package in.oswinjerome.openAnalytics.dtos.requests;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.util.Map;

@Data
public class StoreEventRequest {
   private EventInfo event;

   @NotEmpty
   private String sessionId;

   @NotEmpty
   private String userAgent;

   @NotEmpty
   private String ipAddress;

   private String projectId;
}
