package goormknights.hotel.email.service;

import goormknights.hotel.email.model.EmailMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

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

    /**
     *
     * @param subscribeEmail - 메일 수신자
     * 인증 코드 구현시에는 이메일 주소 뿐만 아니라, 코드를 입력받아서, 그에 따라 로직을 수행하려고 합니다.
     * Type - code, newsletter
     */
    public void sendSubscribe(String subscribeEmail, String type) throws MessagingException {
        if(type.equals("newsletter"))//뉴스레터 구독
            setContext("newsletter", "뉴스레터 구독 확인", subscribeEmail);
        else// 인증 코드 발송
            setContext("code", "인증 코드 발송", subscribeEmail);
    }

    private void setContext(String type, String title, String receiver) throws MessagingException {
        Context context = new Context();
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setSubject(title);
        helper.setTo(receiver);
        String html = templateEngine.process(type, context);
        helper.setText(html, true);
        helper.addInline("logo", new ClassPathResource("/static/images/common/logo.png"));
        helper.addInline("check", new ClassPathResource("/static/images/mail/ico_check.png"));

        javaMailSender.send(message);
    }
}
