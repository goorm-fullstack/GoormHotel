package goormknights.hotel.auth.config;

import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;

@Configuration
@EnableJdbcHttpSession
public class SessionConfig {

    @Bean
    public ServletContextInitializer initializer() {
        return servletContext -> {
            servletContext.setSessionTimeout(360);
        };
    }

}
