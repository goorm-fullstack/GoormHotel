package goormknights.hotel.service;

import goormknights.hotel.model.EmailMessage;
import goormknights.hotel.model.Member;
import goormknights.hotel.repository.member.MemberRepository;
import goormknights.hotel.service.email.EmailService;
import goormknights.hotel.service.member.MemberService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class EmailServiceTest {

    @Autowired
    public EmailService emailService;

    @Autowired
    private MemberService memberService;

    @Test
    void mailServiceTest(){
        emailService.sendSubscribe("9rudrb40@naver.com");
    }
}