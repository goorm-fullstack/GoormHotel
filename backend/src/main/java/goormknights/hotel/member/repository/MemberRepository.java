package goormknights.hotel.member.repository;
import goormknights.hotel.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailAndMemberIdAndName(String email, String MemberId, String name);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByMemberId(String memberId);
}
