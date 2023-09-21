package goormknights.hotel.reply.controller;

import goormknights.hotel.reply.dto.request.RequestReplyDto;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.reply.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reply")
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;

    //Create
    @PostMapping("/writeform")
    public ResponseEntity<Object> createReply(@RequestBody RequestReplyDto requestReplyDto){
        replyService.create(requestReplyDto);

        return ResponseEntity.ok().build();
    }

    //Read
    //모든 댓글 출력
    @GetMapping("/list")
    public ResponseEntity<List<ResponseReplyDto>> getAllBoards() {
        List<ResponseReplyDto> replies = replyService.getAll();

        return ResponseEntity.ok(replies);
    }

    //댓글 상세보기
    @GetMapping("/replyId/{replyId}")
    public ResponseEntity<ResponseReplyDto> getReplyById(@PathVariable Long replyId){
        ResponseReplyDto reply = replyService.findByReplyId(replyId);

        return ResponseEntity.ok(reply);
    }

    //게시글 인덱스 번호로 댓글 찾기
    @GetMapping("/boardId/{boardId}")
    public ResponseEntity<List<ResponseReplyDto>> getReplyByBoardId(@PathVariable Long boardId) {
        List<ResponseReplyDto> boards = replyService.findByBoardId(boardId);

        return ResponseEntity.ok(boards);
    }

    //Update
    //댓글 업데이트
    @PutMapping("/{replyId}")
    public ResponseEntity<ResponseReplyDto> updateReply(@PathVariable Long replyId, @RequestBody RequestReplyDto requestReplyDto){
        Reply reply = replyService.updateReply(replyId, requestReplyDto);

        return ResponseEntity.ok(reply.toResponseReplyDto());
    }

    //Delete
    //댓글 삭제
    @DeleteMapping("/{replyId}")
    public void deleteReply(@PathVariable Long replyId){
        replyService.deleteById(replyId);
    }

}