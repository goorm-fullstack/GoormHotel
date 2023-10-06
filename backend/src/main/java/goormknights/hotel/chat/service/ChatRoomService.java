package goormknights.hotel.chat.service;

import goormknights.hotel.chat.dto.response.ResponseChatMessageDto;
import goormknights.hotel.chat.dto.response.ResponseChatRoomDto;
import goormknights.hotel.chat.model.ChatMessage;
import goormknights.hotel.chat.model.ChatRoomDto;
import goormknights.hotel.chat.repository.ChatMessageRepository;
import goormknights.hotel.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatService chatService;


    public List<ResponseChatRoomDto> findAll(Pageable pageable) {
        Page<ChatRoomDto> page = chatRoomRepository.findAll(pageable);
        List<ResponseChatRoomDto> chatRoomDtoList = new ArrayList<>();
        for(ChatRoomDto chatRoomDto : page) {
            List<ChatMessage> chatMessages = chatMessageRepository.findByRoomId(chatRoomDto.getRoomId());
            List<ResponseChatMessageDto> responseChatMessageDtos = chatMessages.stream().map(ResponseChatMessageDto::new).toList();
            ResponseChatRoomDto responseChatRoomDto = new ResponseChatRoomDto(chatRoomDto, responseChatMessageDtos);
            chatRoomDtoList.add(responseChatRoomDto);
        }

        return chatRoomDtoList;
    }

    public List<ResponseChatRoomDto> getLastMessage(Pageable pageable) {
        Page<ChatRoomDto> page = chatRoomRepository.findAll(pageable);
        List<ResponseChatRoomDto> chatRoomDtoList = new ArrayList<>();
        List<ResponseChatMessageDto> lastMessage = chatService.findByLastMessage().stream().map(ResponseChatMessageDto::new).toList();

        for(ChatRoomDto chatRoomDto : page) {
            for(ResponseChatMessageDto messageDto : lastMessage) {
                if(chatRoomDto.getRoomId().equals(messageDto.getRoomId())) {
                    List<ResponseChatMessageDto> chatMessageDtos = new ArrayList<>();
                    chatMessageDtos.add(messageDto);
                    chatRoomDtoList.add(new ResponseChatRoomDto(chatRoomDto, chatMessageDtos));
                }
            }
        }
        return chatRoomDtoList;
    }
}
