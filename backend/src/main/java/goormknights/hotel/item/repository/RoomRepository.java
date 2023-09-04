package goormknights.hotel.item.repository;

import goormknights.hotel.item.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByName(String roomName);
    void deleteByName(String roomName);
}
