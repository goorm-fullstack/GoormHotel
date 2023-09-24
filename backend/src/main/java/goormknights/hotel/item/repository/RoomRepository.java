package goormknights.hotel.item.repository;

import goormknights.hotel.item.model.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByName(String roomName);
    void deleteByName(String roomName);

    // 페이징
    Page<Room> findAllByType(String type, Pageable pageable);

    // 해당 name이 존재하는지 여부 확인
    boolean existsByName(String name);
}
