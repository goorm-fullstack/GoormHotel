package goormknights.hotel.reply.service;

import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.repository.BoardRepository;
import goormknights.hotel.reply.dto.request.RequestReplyDto;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.reply.repository.ReplyRepository;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import goormknights.hotel.report.model.Report;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        Board byBoardId = boardRepository.findByBoardIdAndBoardDelete(boardId, false);

        Reply reply = requestReplyDto.toEntity();
        reply.setBoard(byBoardId);

        Reply save = replyRepository.save(reply);
        byBoardId.getReplies().add(save);

        return save;
    }

    //Read
    //댓글 전부 찾기
    public List<ResponseReplyDto> getAll(Pageable pageable){
        Page<Reply> all = replyRepository.findAllByReplyDelete(pageable, false);
        List<ResponseReplyDto> response = new ArrayList<>();
//        for (Board board : all) {
//            ResponseBoardDto responseBoardDto = board.toResponseBoardDto();
//            List<ResponseReportDto> reportList = board.getReport().stream().map(Report::toResponseReportDto).toList();
//            List<ResponseReplyDto> replyList = board.getReplies().stream().map(Reply::toResponseReplyDto).toList();
//            responseBoardDto.setReply(replyList);
//            responseBoardDto.setReport(reportList);
//            response.add(responseBoardDto);
//        }

        for(Reply reply : all){
//            ResponseReplyDto responseReplyDto = reply.toResponseReplyDto();
//            List<ResponseReportDto> list = reply.getReport().stream().map(Report::toResponseReportDto).toList();
//            responseReplyDto.setReport(list);
            response.add(reply.toResponseReplyDto());
        }

        return response;
    }

    //댓글 내용으로 찾기
    public List<ResponseReplyDto> findByContent(String keyword){
        List<Reply> replies = replyRepository.findByReplyContentContainingAndReplyDelete(keyword, false);
        List<ResponseReplyDto> response = new ArrayList<>();

        for (Reply reply : replies){
            response.add(reply.toResponseReplyDto());
        }

        return response;
    }

    //boardId로 댓글 찾기
    public List<ResponseReplyDto> findByBoardId(Long boardId){
        Board BoardId = boardRepository.findByBoardIdAndBoardDelete(boardId, false);
        List<Reply> replies = replyRepository.findByBoard(BoardId);
        List<ResponseReplyDto> response = new ArrayList<>();

        for(Reply reply : replies){
            response.add(reply.toResponseReplyDto());
        }
        return response;
    }

    //댓글 인덱스 번호로 찾기
    public ResponseReplyDto findByReplyId(Long replyId){
        Reply reply = replyRepository.findByReplyIdAndReplyDelete(replyId, false);

        return reply.toResponseReplyDto();
    }

    //Update
    //댓글 내용 수정하기
    public Reply updateReply(Long replyId, RequestReplyDto requestReplyDto){
        Reply beforeReply = replyRepository.findByReplyIdAndReplyDelete(replyId, false);
        Reply afterReply = beforeReply.updateReply(replyId, requestReplyDto);

        return replyRepository.save(afterReply);
    }


    //Delete
    //댓글 완전 삭제
    public void deleteById(Long replyId){
        replyRepository.deleteById(replyId);
    }

    //삭제 댓글 복원
    public Reply undeleted(Long boardId){
        Reply reply = replyRepository.findByReplyIdAndReplyDelete(boardId, true);
        if(reply!=null){
            reply.setReplyDelete(false);
        }
        return replyRepository.save(reply);
    }
}
