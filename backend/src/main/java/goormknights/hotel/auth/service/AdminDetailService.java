package goormknights.hotel.auth.service;

import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class AdminDetailService implements UserDetailsService {
    private final ManagerRepository managerRepository;

    @Override
    public Manager loadUserByUsername(String adminId) throws UsernameNotFoundException {
        log.info("어드민디테일서비스"+adminId);
        return managerRepository.findByAdminId(adminId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with adminId: " + adminId));
    }

}
