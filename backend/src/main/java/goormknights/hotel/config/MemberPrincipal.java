package goormknights.hotel.config;

import goormknights.hotel.model.Member;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

// 확장한 User는 security userdetails 라이브러리
public class MemberPrincipal extends User {

    private final Integer memberId;

    public MemberPrincipal(Member member){
        super(member.getEmail(), member.getPassword(), List.of(
                new SimpleGrantedAuthority("ROLE_ADMIN"), //역할
                new SimpleGrantedAuthority("READ"))); //권한
        this.memberId = member.getId();
    }
    public Integer getMemberId(){
        return memberId; // 추후 요긴하게 사용
    }
}