package goormknights.hotel.member.repository;


import goormknights.hotel.member.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    Optional<Manager> findByAdminId(String adminId);
}
