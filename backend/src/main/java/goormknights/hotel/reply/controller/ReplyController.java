package goormknights.hotel.reply.controller;

import goormknights.hotel.reply.dto.request.RequestReplyDto;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.reply.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/list")
    public ResponseEntity<List<ResponseReplyDto>> getAllBoards(@PageableDefault(size = 10, sort = "replyId", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Reply> all = replyService.getAll(pageable);
        Page<ResponseReplyDto> map = all.map(Reply::toResponseReplyDto);
        int totalPages = all.getTotalPages();
        long totalElements = all.getTotalElements();

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalElements))
                .body(map.getContent());
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
    //댓글 완전 삭제
    @DeleteMapping("/{replyId}")
    public void deleteReply(@PathVariable Long replyId){
        replyService.deleteById(replyId);
    }

    //소프트딜리트 복원
    @PutMapping("/undelete/{replyId}")
    public ResponseEntity<ResponseReplyDto> undeleted(@PathVariable Long replyId) {
        Reply reply = replyService.undeleted(replyId);

        return ResponseEntity.ok(reply.toResponseReplyDto());
    }

    //소프트딜리트
    @PutMapping("/softdelete/{replyId}")
    public ResponseEntity<Object> softdeleteReply(@PathVariable Long replyId) {
        Reply reply = replyService.softdeleteReply(replyId);

        return ResponseEntity.ok(reply.toResponseReplyDto());
    }

    // 삭제된 댓글 조회
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("deleted")
    public ResponseEntity<List<ResponseReplyDto>> deletedReply(@PageableDefault(size = 10, sort = "replyId", direction = Sort.Direction.DESC) Pageable pageable){
        Page<ResponseReplyDto> allReplyDelete = replyService.findAllReplyDelete(pageable);

        int totalPages = allReplyDelete.getTotalPages();
        long totalElements = allReplyDelete.getTotalElements();

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalElements))
                .body(allReplyDelete.getContent());
    }
}
