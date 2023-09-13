package goormknights.hotel.member.service;

import goormknights.hotel.auth.service.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class VerificationService {

    private final RedisUtil redisUtil;

    public String generateAndSaveCode(String email) {
        String code = createCode();
        redisUtil.setDataExpire(email, code, 300);
        return code;
    }

    public String generateAndSaveToken(String email) {
        String token = createCode();
        redisUtil.setDataExpire(email + "_reset_token", token, 60 * 5L);
        return token;
    }

    public boolean isTokenValid(String token, String email) {
        String storedToken = redisUtil.getData(email + "_reset_token");
        return token.equals(storedToken);
    }


    // 인증번호 및 임시 비밀번호 생성 메서드
    public String createCode() {
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0 -> key.append((char) ((int) random.nextInt(26) + 97));
                case 1 -> key.append((char) ((int) random.nextInt(26) + 65));
                default -> key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }

}