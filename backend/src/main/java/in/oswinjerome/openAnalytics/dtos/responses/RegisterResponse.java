package in.oswinjerome.openAnalytics.dtos.responses;

import in.oswinjerome.openAnalytics.models.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponse {
    private User user;

    public RegisterResponse(User user) {
        this.user = user;
        this.user.setPassword(null);
    }
}
