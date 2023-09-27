package goormknights.hotel.subscribe.repository;

import goormknights.hotel.subscribe.model.SubScribe;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubScribeRepository extends JpaRepository<SubScribe, Long> {
    Page<SubScribe> findAllByIsSubscribe(Pageable pageable, String IsSubScribe);
}
