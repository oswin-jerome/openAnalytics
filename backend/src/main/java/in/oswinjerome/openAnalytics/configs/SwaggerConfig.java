package in.oswinjerome.openAnalytics.configs;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI getOpenAPI() {
        return new OpenAPI().addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .addSecurityItem(new SecurityRequirement().addList("apiKey"))
                .components(
                        new Components().addSecuritySchemes(
                                "bearerAuth",
                                new SecurityScheme().name("Authorization")
                                        .type(SecurityScheme.Type.HTTP
                                        )
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        ).addSecuritySchemes(
                                "apiKey",
                                new SecurityScheme().name("x-api-key")
                                        .type(SecurityScheme.Type.APIKEY
                                        )
                                        .in(SecurityScheme.In.HEADER).name("x-api-key")
                        )

                );
    }

}
