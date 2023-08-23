package goormknights.hotel.config;

import goormknights.hotel.model.Member;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public class MemberPrincipal extends User {

    private final Integer memberId;

    public MemberPrincipal(Member member){
        super(member.getEmail(), member.getPassword(), List.of(
                new SimpleGrantedAuthority("ROLE_ADMIN"), //역할
                new SimpleGrantedAuthority("READ"))); //권한
        this.memberId = member.getId();
    }
    public Long getmemberId(){
        return memberId;
    }
}