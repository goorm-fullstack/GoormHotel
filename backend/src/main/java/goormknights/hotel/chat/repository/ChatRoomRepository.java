package goormknights.hotel.chat.repository;

import goormknights.hotel.chat.model.ChatRoomDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoomDto, Long> {
    public boolean existsByRoomId(String roomId);
}
