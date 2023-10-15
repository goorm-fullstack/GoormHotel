package goormknights.hotel.board.controller;

import goormknights.hotel.board.dto.request.RequestBoardDto;
import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.board.exception.NoBoardException;
import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.service.BoardImageService;
import goormknights.hotel.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
@Slf4j
public class BoardController {

    private final BoardService boardService;
    private final BoardImageService boardImageService;

    // 모든 게시물 조회
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/list")
    public ResponseEntity<List<ResponseBoardDto>> getAllBoards(@PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Board> allBoards = boardService.findAllBoards(pageable);
        Page<ResponseBoardDto> map = allBoards.map(Board::toResponseBoardDto);

        int totalPages = allBoards.getTotalPages();
        long totalElements = allBoards.getTotalElements();
        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalElements))
                .body(map.getContent());
    }

    // 게시물 상세 조회
    @GetMapping("/{boardId}")
    @CrossOrigin(exposedHeaders = "FileName")
    public ResponseEntity<ResponseBoardDto> getBoardById(@PathVariable Long boardId) {
        Board byId = boardService.findById(boardId);

        String fileName = null;
        if(byId.getBoardFile() != null){
            fileName = URLEncoder.encode(byId.getBoardFile().getOriginalboardFileName(), StandardCharsets.UTF_8);
        }
        log.info("fileName={}", fileName);

        return ResponseEntity.ok()
                .header("FileName", fileName)
                .body(byId.toResponseBoardDto());
    }

    // 게시물 작성
    @PostMapping("/writeform")
    public ResponseEntity<Object> createBoard(@ModelAttribute RequestBoardDto requestBoardDto, @RequestParam(required = false) MultipartFile multipartFile, @RequestParam(required = false) MultipartFile file) throws IOException {
        boardService.create(requestBoardDto, multipartFile, file);
        return ResponseEntity.ok().build();
    }

    // 게시물 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<ResponseBoardDto> updateBoard(@PathVariable Long boardId, @ModelAttribute RequestBoardDto requestBoardDto, @RequestParam(required = false) MultipartFile multipartFile, @RequestParam(required = false) MultipartFile file) throws IOException {
        boardService.updateBoard(boardId, requestBoardDto, multipartFile, file);

        return ResponseEntity.ok().build();
    }

    // 삭제된 게시물 전체 조회
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/deleted")
    public ResponseEntity<List<ResponseBoardDto>> getDeletedBoards(@PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ResponseBoardDto> allBoardDelete = boardService.findAllBoardDelete(pageable);

        int totalPages = allBoardDelete.getTotalPages();
        long totalElements = allBoardDelete.getTotalElements();
        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalElements))
                .body(allBoardDelete.getContent());
    }

    // 게시물 영구 삭제
    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable Long boardId) {
        boardService.deleteById(boardId);
    }

    //작성자로 게시물 조회
    @GetMapping("/find/writer/{boardWriter}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardWriter(@PathVariable String boardWriter, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseBoardDto> byBoardWriter = boardService.findByBoardWriter(boardWriter, pageable);

        return ResponseEntity.ok(byBoardWriter);
    }

    //내용으로 게시물 조회
    @GetMapping("/find/content/{boardContent}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardContent(@PathVariable String boardContent, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseBoardDto> content = boardService.findByContent(boardContent, pageable);

        return ResponseEntity.ok(content);
    }

    //내용, 제목으로 게시물 조회
    @GetMapping("/find/{keyword}")
    public ResponseEntity<List<ResponseBoardDto>> findBytitleOrContent(@PathVariable String keyword, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable){
        List<ResponseBoardDto> byTitleOrContent = boardService.findByTitleOrContent(keyword, pageable);

        return ResponseEntity.ok(byTitleOrContent);
    }

    //제목으로 게시물 조회
    @GetMapping("/find/title/{title}")
    public ResponseEntity<List<ResponseBoardDto>> findBytitle(@PathVariable String title, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseBoardDto> Titles = boardService.findByTitle(title, pageable);

        return ResponseEntity.ok(Titles);
    }

    //게시판으로 찾기
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/find/boardTitle/{boardTitle}")
    public ResponseEntity<List<ResponseBoardDto>> findByboardTitle(@PathVariable String boardTitle, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable){
        Page<ResponseBoardDto> allByboardTitle = boardService.getAllByboardTitle(boardTitle, pageable);

        int totalPages = allByboardTitle.getTotalPages();
        long totalElements = allByboardTitle.getTotalElements();

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalElements))
                .body(allByboardTitle.getContent());
    }

    //게시판-카테고리로 찾기
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/find/category")
    public ResponseEntity<List<ResponseBoardDto>> findByCategory(@RequestParam String boardTitle, @RequestParam(required = false) String category, @RequestParam(required = false) String keyword, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable){
        Page<ResponseBoardDto> allByCategory = boardService.getAllByCategory(boardTitle, category, keyword, pageable);

        int totalPages = allByCategory.getTotalPages();
        long totalElements = allByCategory.getTotalElements();

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalElements))
                .body(allByCategory.getContent());
    }

    //게시물 소프트딜리트
    @PutMapping("/softdelete/{boardId}")
    public ResponseEntity<Object> softdeleteBoard(@PathVariable Long boardId) {
        Board board = boardService.softdeleteBoard(boardId);

        return ResponseEntity.ok(board.toResponseBoardDto());
    }

    //삭제된 게시물 복원
    @PutMapping("/undelete/{boardId}")
    public ResponseEntity<ResponseBoardDto> undeleted(@PathVariable Long boardId) {
        Board board = boardService.undeleted(boardId);

        return ResponseEntity.ok(board.toResponseBoardDto());
    }

    @GetMapping("/board/{boardTitle}")
    public ResponseEntity<ResponseBoardDto> board(@PathVariable String boardTitle) throws UnsupportedEncodingException {
        log.info("boardTitle={}", boardTitle);
        Board byTitle = boardService.findByBoardTitle(boardTitle);
        return ResponseEntity.ok(byTitle.toResponseBoardDto());
    }

    // 파일 다운로드
    @GetMapping("/download/{boardId}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable Long boardId) throws MalformedURLException {
        Board byTitle = boardService.findById(boardId);

        byte[] data = byTitle.getBoardFile().getData();

        ByteArrayResource byteArrayResource = new ByteArrayResource(data);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(data.length)
                .body(byteArrayResource);

    }

    // 삭제된 게시글, 댓글 모두 조회
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/deletedall")
    public ResponseEntity<List<Object>> findAllDeletedBoardReply(Pageable pageable){
        Page<Object> allBoardReplyDeleted = boardService.findAllBoardReplyDeleted(pageable);

        int totalPages = allBoardReplyDeleted.getTotalPages();
        long totalElements = allBoardReplyDeleted.getTotalElements();

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalElements))
                .body(allBoardReplyDeleted.getContent());
    }

    //답글 유무 확인용
    @PutMapping("/updateIsComment/{boardId}")
    public ResponseEntity<Object> updateIsCommentValue(@PathVariable Long boardId) {
        try {
            Board updatedBoard = boardService.updateIsComment(boardId);
            return ResponseEntity.ok(updatedBoard.toResponseBoardDto());
        } catch (NoBoardException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 마이페이지용
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/mypage/{writer}")
    public ResponseEntity<List<Object>> myPage(@PathVariable String writer, Pageable pageable){
        Page<Object> allBoardAndReply = boardService.findAllBoardAndReply(writer, pageable);

        int totalPages = allBoardAndReply.getTotalPages();
        long totalElements = allBoardAndReply.getTotalElements();

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalElements))
                .body(allBoardAndReply.getContent());
    }
}