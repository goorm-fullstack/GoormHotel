package goormknights.hotel.service.email;

import goormknights.hotel.model.EmailMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void sendMail(EmailMessage emailMessage, String message) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        LocalDateTime dateTime = LocalDateTime.now();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            helper.setTo(emailMessage.getTo());
            helper.setSubject(dateTime.getMonth().getValue()+"월의 소식~");
            helper.setText(message);
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendSubscribe(String subscribeEmail) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        LocalDate dateTime = LocalDate.now();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            helper.setTo(subscribeEmail);
            helper.setSubject("뉴스레터 구독 확인");
            helper.setText(dateTime.toString()+"부로 뉴스레터 구독되었습니다.");
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
