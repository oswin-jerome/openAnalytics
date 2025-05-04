package in.oswinjerome.openAnalytics.dtos.requests;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StoreProjectRequest {
    @NotEmpty
    @Size(min = 3)
    private String name;
    @NotEmpty
    private String domain;
}
