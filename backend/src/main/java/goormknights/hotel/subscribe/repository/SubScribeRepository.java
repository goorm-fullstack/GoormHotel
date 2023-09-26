package goormknights.hotel.subscribe.repository;

import goormknights.hotel.subscribe.model.SubScribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubScribeRepository extends JpaRepository<SubScribe, Long> {
    @Query("select s from SubScribe s where s.isSubscribe = true")
    List<SubScribe> findByIsSubScribe();
}
