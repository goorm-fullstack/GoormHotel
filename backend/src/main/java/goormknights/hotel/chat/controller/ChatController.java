package goormknights.hotel.chat.controller;

import goormknights.hotel.chat.model.ChatMessage;
import goormknights.hotel.chat.model.ChatRoom;
import goormknights.hotel.chat.model.ChatRoomDto;
import goormknights.hotel.chat.repository.ChatRoomRepository;
import goormknights.hotel.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;

    // 채팅방을 개설하고, 그에 관한 정보를 JSON 형태로 보내준다.
    /*
    { 예시입니다.
        "id": 0,
        "roomId": "eba4f0ac-aadf-40fc-a892-5440100b8322",
        "name": "{\r\n    \"name\" : \"test\"\r\n}",
        "sessions": []
    }
     */
    // 나중에 로그인 구현이 끝나면 Principal을 받아서 사용자의 정보를 받아오자
    @PostMapping
    public ChatRoom createRoom(@RequestBody String name) {
        return chatService.createRoom(name);
    }

//    @PreAuthorize("hasRole('Admin')")
    @GetMapping
    public List<ChatRoomDto> findAllRoom() {
        return chatRoomRepository.findAll();
    }

    @GetMapping("/getLastMessage")
    public List<ChatMessage> getLastMessage() {
        return chatService.findByLastMessage();
    }

    // 웹소켓은 세션 연결이 유지되지 않고 양쪽에서 연결을 종료하면 세션이 정리된다.
    // 따라서 다음 연결이 들어오면 이전 방 넘버가 있는지 확인하고 있다면 그 방번호로
    // 메시지를 검색해서 현재 채팅창에 이전 메시지를 넣어둔다.
    // TODO : 현재 사용 불가 -> 멤버 관련 로직이 완성되어야 가능할듯
    @GetMapping("/getPrevId/{roomId}")
    public List<ChatMessage> getPrevMessage(@PathVariable String roomId) {
        return chatService.findPrevMessage(roomId);
    }
}
