package goormknights.hotel.reply.service;

import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.repository.BoardRepository;
import goormknights.hotel.reply.dto.request.RequestReplyDto;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final BoardRepository boardRepository;

    //Create
    //댓글 작성
    public Reply create(RequestReplyDto requestReplyDto){

        Long boardId = requestReplyDto.getBoardId();
        Board byBoardId = boardRepository.findByBoardId(boardId);

        Reply reply = requestReplyDto.toEntity();
        reply.setBoard(byBoardId);

        Reply save = replyRepository.save(reply);
        byBoardId.getReplies().add(save);

        return save;
    }

    //Read
    //댓글 전부 찾기
    public List<ResponseReplyDto> getAll(){
        List<Reply> replies = replyRepository.findAll();
        List<ResponseReplyDto> response = new ArrayList<>();

        for(Reply reply : replies){
            response.add(reply.toResponseReplyDto());
        }

        return response;
    }

    //댓글 내용으로 찾기
    public List<ResponseReplyDto> findByContent(String keyword){
        List<Reply> replies = replyRepository.findByReplyContentContaining(keyword);
        List<ResponseReplyDto> response = new ArrayList<>();

        for (Reply reply : replies){
            response.add(reply.toResponseReplyDto());
        }

        return response;
    }

    //boardId로 댓글 찾기
    public List<ResponseReplyDto> findByBoardId(Long boardId){
        Board BoardId = boardRepository.findByBoardId(boardId);
        List<Reply> replies = replyRepository.findByBoard(BoardId);
        List<ResponseReplyDto> response = new ArrayList<>();

        for(Reply reply : replies){
            response.add(reply.toResponseReplyDto());
        }
        return response;
    }

    //댓글 인덱스 번호로 찾기
    public ResponseReplyDto findByReplyId(Long replyId){
        Reply reply = replyRepository.findByReplyId(replyId);

        return reply.toResponseReplyDto();
    }

    //Update
    //댓글 내용 수정하기
    public Reply updateReply(Long replyId, RequestReplyDto requestReplyDto){
        Reply beforeReply = replyRepository.findByReplyId(replyId);
        Reply afterReply = beforeReply.updateReply(replyId, requestReplyDto);

        return replyRepository.save(afterReply);
    }


    //Delete
    //댓글 삭제
    public void deleteById(Long replyId){
        replyRepository.deleteById(replyId);
    }
}
