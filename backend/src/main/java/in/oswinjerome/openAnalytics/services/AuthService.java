package in.oswinjerome.openAnalytics.services;

import in.oswinjerome.openAnalytics.dtos.requests.LoginRequest;
import in.oswinjerome.openAnalytics.dtos.requests.RegisterRequest;
import in.oswinjerome.openAnalytics.dtos.responses.LoginResponse;
import in.oswinjerome.openAnalytics.dtos.responses.RegisterResponse;
import in.oswinjerome.openAnalytics.dtos.responses.ResponseDTO;
import in.oswinjerome.openAnalytics.exceptions.InvalidRequestException;
import in.oswinjerome.openAnalytics.exceptions.UnauthorizedException;
import in.oswinjerome.openAnalytics.models.User;
import in.oswinjerome.openAnalytics.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User getCurrentUser() {
        try{
            return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            return null;
        }
    }

    public boolean isAuthenticated() {
        return getCurrentUser() != null;
    }

    public ResponseDTO<LoginResponse> login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new EntityNotFoundException("User not found"));

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidRequestException("Incorrect password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return ResponseDTO.success(new LoginResponse(token));

    }

    public ResponseDTO<RegisterResponse> register(@Valid RegisterRequest registerRequest) {
        User oldUser = userRepository.findByEmail(registerRequest.getEmail()).orElse(null);
        if(oldUser != null) {
            throw new InvalidRequestException("Email already in use");
        }
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setName(registerRequest.getName());

        userRepository.save(user);

        return ResponseDTO.success(new RegisterResponse(user));
    }
}
