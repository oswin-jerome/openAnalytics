package in.oswinjerome.openAnalytics.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest{
    @Email
    private String email;
    @NotBlank
    @NotNull
    private String password;
}
