package goormknights.hotel.member.controller;

import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignup;
import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/managers")
public class AdminController {

    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<?> addManager(@RequestBody AdminSignup adminSignup) {
        try {
            adminService.adminSignup(adminSignup);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (AlreadyExistsEmailException e) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
