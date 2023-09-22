package goormknights.hotel.auth.controller;

import goormknights.hotel.auth.config.authorize.AdminAuthorize;
import goormknights.hotel.auth.config.authorize.ManagerAuthorize;
import goormknights.hotel.member.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class RoleController {

    private final AdminService adminService;

    @AdminAuthorize
    @GetMapping("/admin")
    public String admin(){
        return "관리자 페이지 입니다.";
    }

    @ManagerAuthorize
    @GetMapping("/manager")
    public String manager(){
        return "매니저 페이지 입니다.";
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER') AND hasAuthority('MEMBER_MANAGE')")
    @GetMapping("/manager/member")
    public String memberManage(){
        return "멤버 관리 페이지 입니다.";
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER') AND hasAuthority('PRODRES_MANAGE')")
    @GetMapping("/manager/prodres")
    public String prodResManage(){
        return "상품 관리 페이지 입니다.";
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER') AND hasAuthority('SITE_MANAGE')")
    @GetMapping("/manager/site")
    public String siteManage(){
        return "사이트 관리 페이지 입니다.";
    }

    // 매니저 권한 업데이트
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{adminId}/auth")
    public ResponseEntity<Void> updateManagerAuthorities(@PathVariable String adminId, @RequestBody List<String> newAuthorities) {
        adminService.updateManagerAuth(adminId, newAuthorities);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}