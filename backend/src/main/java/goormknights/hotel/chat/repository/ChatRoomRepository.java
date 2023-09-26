package goormknights.hotel.chat.repository;

import goormknights.hotel.chat.model.ChatRoom;
import goormknights.hotel.chat.model.ChatRoomDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoomDto, Long> {
    public boolean existsByRoomId(String roomId);
    public Optional<ChatRoomDto> findByRoomId(String roomId);

    public Page<ChatRoomDto> findAll(Pageable pageable);
}
