package goormknights.hotel.reply.service;

import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.repository.BoardRepository;
import goormknights.hotel.reply.dto.request.RequestReplyDto;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    public Page<Reply> getAll(Pageable pageable){
        Page<Reply> all = replyRepository.findAll(pageable);
        List<Reply> list = new ArrayList<>();
        for (Reply reply : all) {
            if(reply.getReplyDeleteTime() == null && reply.getReport().size() == 0){
                list.add(reply);
            }
        }
        return new PageImpl<>(list, pageable, list.size());
    }

    //댓글 내용으로 찾기
    public List<ResponseReplyDto> findByContent(String keyword){
        List<Reply> replies = replyRepository.findByReplyContentContaining(keyword);
        List<ResponseReplyDto> response = new ArrayList<>();

        for (Reply reply : replies){
            if(reply.getReplyDeleteTime()==null && reply.getReport().size() == 0){
                response.add(reply.toResponseReplyDto());
            }
        }

        return response;
    }

    //boardId로 댓글 찾기
    public List<ResponseReplyDto> findByBoardId(Long boardId){
        Board BoardId = boardRepository.findByBoardId(boardId);
        List<Reply> replies = replyRepository.findByBoard(BoardId);
        List<ResponseReplyDto> response = new ArrayList<>();

        for(Reply reply : replies){
            if(reply.getReplyDeleteTime()==null && reply.getReport().size() == 0){
                response.add(reply.toResponseReplyDto());
            }
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
        Reply afterReply = beforeReply.updateReply(beforeReply, requestReplyDto);

        return replyRepository.save(afterReply);
    }


    //Delete
    //댓글 완전 삭제
    public void deleteById(Long replyId){
        replyRepository.deleteById(replyId);
    }

    //삭제 댓글 복원
    public Reply undeleted(Long replyId){
        Reply reply = replyRepository.findByReplyId(replyId);
        if(reply!=null){
            reply.setReplyDeleteTime(null);
        }
        return replyRepository.save(reply);
    }

    //댓글 소프트딜리트
    public Reply softdeleteReply(Long replyId) {
        Reply reply = replyRepository.findByReplyId(replyId);

        String datePattern = "yyyy-MM-dd'T'HH:mm:ss";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(datePattern);
        String now = LocalDateTime.now().format(formatter);
        LocalDateTime replyDeleteTime = LocalDateTime.parse(now, formatter);
        reply.setReplyDeleteTime(replyDeleteTime);

        return replyRepository.save(reply);
    }

    //삭제된 댓글 조회
    public Page<ResponseReplyDto> findAllReplyDelete(Pageable pageable){
        Page<Reply> all = replyRepository.findAll(pageable);
        List<ResponseReplyDto> list = new ArrayList<>();

        for (Reply reply : all) {
            if(reply.getReplyDeleteTime() != null){
                list.add(reply.toResponseReplyDto());
            }
        }
        return new PageImpl<>(list, pageable, list.size());
    }

}
