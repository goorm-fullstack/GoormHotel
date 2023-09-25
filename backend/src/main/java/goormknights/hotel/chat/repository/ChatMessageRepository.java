package goormknights.hotel.chat.repository;

import goormknights.hotel.chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    // 채팅방 아이디를 기준으로 메시지를 검색
    // 생성된 날짜 순으로 정렬
    // 최근 생성된 메시지가 리스트의 앞쪽에 위치합니다.
    List<ChatMessage> findByRoomIdOrderByIdDesc(String roomId);
    List<ChatMessage> findByRoomId(String roomId);
}

