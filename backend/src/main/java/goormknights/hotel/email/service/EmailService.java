package goormknights.hotel.email.service;

import goormknights.hotel.auth.service.RedisUtil;
import goormknights.hotel.email.model.EmailMessage;
import goormknights.hotel.email.model.MultipleEmail;
import goormknights.hotel.email.repository.EmailSender;
import goormknights.hotel.member.service.VerificationService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService implements EmailSender {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final VerificationService verificationService;
    private final RedisUtil redisUtil;

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
            helper.setSubject(emailMessage.getSubject()); // (민종) getTitle -> getSubject
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

    // JSON을 통해 메일 내용을 오브젝트로 받아와서 사용하는 경우에 사용합니다.
    // 다수의 이메일이 메일을 보내는 로직입니다.
    // 첨부파일이 작성될 수도 있습니다.
    public void sendMail(MultipleEmail emailMessage, MultipartFile multipartFile){
        Context context = new Context();
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            for(String sender : emailMessage.getTo()) {// 수신자 배열에서 수신자 정보를 출력하는 코드
                helper = new MimeMessageHelper(message, true, "UTF-8");
                helper.setSubject(emailMessage.getSubject()); // (민종) getTitle -> getSubject
                helper.setTo(sender);
                if(!emailMessage.getCarbonCopy().isEmpty()) {
                    helper.setCc(emailMessage.getCarbonCopy());
                }
                context.setVariable("message", emailMessage.getMessage());
                String html = templateEngine.process("AdminMail", context);
                helper.setText(html, true);
                if(multipartFile != null) {// 첨부 파일이 있는지 보고, 있으면 전송
                    helper.addAttachment(multipartFile.getOriginalFilename(), multipartFile);
                }
                helper.addInline("logo", new ClassPathResource("/static/images/common/logo.png"));
                javaMailSender.send(message);
            }
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

    // ------------------------- 아래 민종 -------------------------------

    // 회원가입 등에 필요한 메일 발송
    public String sendMemberMail(EmailMessage emailMessage, String type) {
        String authNum = verificationService.createCode();

        redisUtil.setDataExpire(emailMessage.getTo(), authNum, 60 * 5L);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

//      if (type.equals("password")) memberUtilService.setTempPassword(emailMessage.getTo(), authNum);
        if (type.equals("findIdAndPassword") && emailMessage.getToken() != null) {
            redisUtil.setDataExpire(emailMessage.getTo() + "_reset_token", emailMessage.getToken(), 60 * 5L);
        }

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailMessage.getTo()); // 메일 수신자
            mimeMessageHelper.setSubject(emailMessage.getSubject()); // 메일 제목
            try{
                mimeMessageHelper.setText(setContextForSignup(authNum, type), true); // 메일 본문 내용, HTML 여부
            } catch (Exception e){
                log.error("Error setting email content", e);
                throw new RuntimeException("Error setting email content", e);
            }

            javaMailSender.send(mimeMessage);
            log.info("Success");
            return authNum;

        } catch (MessagingException e) {
            log.info("fail");
            throw new RuntimeException(e);
        }
    }

    // thymeleaf를 통한 html 적용 + 오버로딩
    public String setContextForSignup(String code, String type) {
        Context context = new Context();
        context.setVariable("code", code);
        return templateEngine.process(type, context);
    }

    public String setContextForSignup(String code, String type, String resetLink) {
        Context context = new Context();
        context.setVariable("code", code);
        context.setVariable("resetLink", resetLink);
        return templateEngine.process(type, context);
    }

}