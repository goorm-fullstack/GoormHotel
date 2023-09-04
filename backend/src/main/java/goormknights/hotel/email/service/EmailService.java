package goormknights.hotel.email.service;

import goormknights.hotel.email.model.EmailMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    // 메일 내용을 직접 입력해서 사용하는 경우에 사용해주세요
    public void sendMail(String to, String message, String title) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            helper.setTo(to);
            helper.setSubject(title);
            helper.setText(message);
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    // JSON을 통해 메일 내용을 오브젝트로 받아와서 사용하는 경우에 사용합니다.
    public void sendMail(EmailMessage emailMessage){
        Context context = new Context();
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setSubject(emailMessage.getTitle());
            helper.setTo(emailMessage.getTo());
            context.setVariable("message", emailMessage.getMessage());
            String html = templateEngine.process("mail", context);
            helper.setText(html, true);
            helper.addInline("logo", new ClassPathResource("/static/images/common/logo.png"));
            helper.addInline("check", new ClassPathResource("/static/images/mail/ico_check.png"));
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        javaMailSender.send(message);
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