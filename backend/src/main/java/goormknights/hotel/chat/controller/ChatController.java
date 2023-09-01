package goormknights.hotel.chat.controller;

import goormknights.hotel.chat.model.ChatRoom;
import goormknights.hotel.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;


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
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }
}
