package in.oswinjerome.openAnalytics.dtos.responses;

import in.oswinjerome.openAnalytics.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private User user;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = user;
        this.user.setPassword(null);

    }

}
