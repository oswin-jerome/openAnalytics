package in.oswinjerome.openAnalytics.controllers;

import in.oswinjerome.openAnalytics.dtos.requests.LoginRequest;
import in.oswinjerome.openAnalytics.dtos.requests.RegisterRequest;
import in.oswinjerome.openAnalytics.dtos.responses.LoginResponse;
import in.oswinjerome.openAnalytics.dtos.responses.RegisterResponse;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "User login")
    @PostMapping("/login")
    public ResponseDTO<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public ResponseDTO<RegisterResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {

        return authService.register(registerRequest);
    }

}
