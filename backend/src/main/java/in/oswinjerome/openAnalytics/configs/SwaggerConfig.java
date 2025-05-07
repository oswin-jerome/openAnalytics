package in.oswinjerome.openAnalytics.configs;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Value("${swagger.server-url}")
    private String swaggerUrl;

    @Bean
    public OpenAPI getOpenAPI() {
        return new OpenAPI()
                .addServersItem(new Server().url(swaggerUrl))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
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
