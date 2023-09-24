package goormknights.hotel.subscribe.repository;

import goormknights.hotel.subscribe.model.SubScribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubScribeRepository extends JpaRepository<SubScribe, Long> {
}
