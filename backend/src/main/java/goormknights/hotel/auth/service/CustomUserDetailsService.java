package goormknights.hotel.auth.service;

import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.ManagerRepository;
import goormknights.hotel.member.repository.MemberRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final ManagerRepository managerRepository;
    public CustomUserDetailsService(MemberRepository memberRepository, ManagerRepository managerRepository) {
        this.memberRepository = memberRepository;
        this.managerRepository = managerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByMemberId(username);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            return User.builder()
                    .username(member.getMemberId())
                    .password(member.getPassword())
                    .roles(member.getRole().toString())
                    .build();
        }

        Optional<Manager> optionalManager = managerRepository.findByAdminId(username);
        if (optionalManager.isPresent()) {
            Manager manager = optionalManager.get();
            return User.builder()
                    .username(manager.getAdminId())
                    .password(manager.getPassword())
                    .roles(manager.getRole().toString())
                    .authorities(manager.getAuthorities())
                    .build();
        }

        throw new UsernameNotFoundException("User or Manager not found");
    }
}