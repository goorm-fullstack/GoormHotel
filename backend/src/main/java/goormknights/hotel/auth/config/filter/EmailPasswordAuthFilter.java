package goormknights.hotel.auth.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Slf4j
public class EmailPasswordAuthFilter extends AbstractAuthenticationProcessingFilter {

    private final ObjectMapper objectMapper;

    public EmailPasswordAuthFilter(String loginUrl, ObjectMapper objectMapper){
        super(loginUrl);
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        // InputStream을 String으로 변환
        BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String requestBody = sb.toString();

        log.info("Received request body: {}", requestBody);

        // 다시 JSON으로 변환 - 오브젝트매퍼
        UnifiedLogin login = objectMapper.readValue(requestBody, UnifiedLogin.class);

        String id = login.memberId != null ? login.memberId : login.adminId;
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(id, login.password);

        token.setDetails(this.authenticationDetailsSource.buildDetails(request));
        return this.getAuthenticationManager().authenticate(token);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // 인증이 성공한 경우, SecurityContextHolder에 인증 정보를 설정합니다.
        SecurityContextHolder.getContext().setAuthentication(authResult);
        log.info("Authentication success : {}", authResult.toString());
        // 다음 필터로 전달
        chain.doFilter(request, response);
    }

    @Getter
    private static class UnifiedLogin {
        private String memberId;
        private String adminId;
        private String password;
    }
}