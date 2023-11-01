package goormknights.hotel.chat.controller;

import goormknights.hotel.chat.dto.request.RequestChatMessageDto;
import goormknights.hotel.chat.dto.response.ResponseChatMessageDto;
import goormknights.hotel.chat.dto.response.ResponseChatRoomDto;
import goormknights.hotel.chat.model.ChatMessage;
import goormknights.hotel.chat.model.ChatRoom;
import goormknights.hotel.chat.model.ChatRoomDto;
import goormknights.hotel.chat.repository.ChatRoomRepository;
import goormknights.hotel.chat.service.ChatRoomService;
import goormknights.hotel.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final ChatRoomRepository chatRoomRepository;

    // 나중에 로그인 구현이 끝나면 Principal을 받아서 사용자의 정보를 받아오자
    @PostMapping
    public ChatRoom createRoom(@RequestBody String name) {
        return chatService.createRoom(name);
    }

//    @PreAuthorize("hasRole('Admin')")
    @GetMapping
    public ResponseEntity<List<ResponseChatRoomDto>> findAllRoom(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC)Pageable pageable) {
        List<ResponseChatRoomDto> all = chatRoomService.findAll(pageable);
        return ResponseEntity.ok(all);
    }


    @GetMapping("/getLastMessage")
    public ResponseEntity<List<ResponseChatRoomDto>> getLastMessage(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC)Pageable pageable) {
        List<ResponseChatRoomDto> lastMessage = chatRoomService.getLastMessage(pageable);

        return ResponseEntity.ok(lastMessage);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        Long count = chatService.calcRoomPageCount();
        return ResponseEntity.ok(count);
    }

    // 웹소켓은 세션 연결이 유지되지 않고 양쪽에서 연결을 종료하면 세션이 정리된다.
    // 따라서 다음 연결이 들어오면 이전 방 넘버가 있는지 확인하고 있다면 그 방번호로
    // 메시지를 검색해서 현재 채팅창에 이전 메시지를 넣어둔다.
    // TODO : 현재 사용 불가 -> 멤버 관련 로직이 완성되어야 가능할듯, 하드코딩중 추후 수정
    @GetMapping("/getPrevId/{roomId}")
    public ResponseEntity<ResponseChatRoomDto> getPrevMessage(@PathVariable String roomId) {
        List<ResponseChatMessageDto> prevMessage = chatService.findPrevMessage(roomId).stream().map(ResponseChatMessageDto::new).toList();
        ChatRoomDto chatRoom = chatRoomRepository.findByRoomId(roomId).orElseThrow();
        ResponseChatRoomDto responseChatRoomDto = new ResponseChatRoomDto(chatRoom, prevMessage);
        return ResponseEntity.ok(responseChatRoomDto);
    }

    @PostMapping("/prevMessage/update/{roomId}")
    public ResponseEntity<String> updatePreviousMessage(@RequestBody List<RequestChatMessageDto> messageDtoList, @PathVariable String roomId) {
        chatService.updateMessageRoomId(messageDtoList, roomId);
        return ResponseEntity.ok("업데이트 완료");
    }

    @GetMapping("/closed/{roomId}")
    public ResponseEntity<String> closedChat(@PathVariable String roomId) {
        chatService.closed(roomId);
        return ResponseEntity.ok("Success");
    }

    // 현재 채팅방에서 가장 최근에 진행한 메시지를 기록하는 로직입니다.
    private static void makeResponseChatRoom(List<ChatMessage> lastMessage, List<ChatRoomDto> all, List<ResponseChatRoomDto> result) {
        for(ChatRoomDto chatRoomDto : all) {
            for(ChatMessage chatMessage : lastMessage) {
                if(Objects.equals(chatRoomDto.getRoomId(), chatMessage.getRoomId())) {
                    List<ChatMessage> chatMessages = new ArrayList<>();
                    chatMessages.add(chatMessage);
                    List<ResponseChatMessageDto> chatMessageDtos = chatMessages.stream().map(ResponseChatMessageDto::new).toList();
                    result.add(new ResponseChatRoomDto(chatRoomDto, chatMessageDtos));
                    break;
                }
            }
        }
    }
}
