package goormknights.hotel.config;

import goormknights.hotel.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class MethodSecurityConfig {

    private final BoardRepository boardRepository;

    // 글 수정 삭제는 글 작성자만 가능하다
    @Bean
    public MethodSecurityExpressionHandler methodSecurityExpressionHandler(){
        var handler = new DefaultMethodSecurityExpressionHandler();
        handler.setPermissionEvaluator(new GoormHotelPermissionEvaluator(boardRepository));
        return handler;
    }
}
