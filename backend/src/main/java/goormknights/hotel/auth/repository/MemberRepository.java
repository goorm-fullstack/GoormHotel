package goormknights.hotel.auth.repository;

import goormknights.hotel.auth.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}
