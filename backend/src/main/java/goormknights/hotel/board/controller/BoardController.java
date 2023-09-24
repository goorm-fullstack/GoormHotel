package goormknights.hotel.board.controller;

import goormknights.hotel.board.dto.request.RequestBoardDto;
import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.service.BoardImageService;
import goormknights.hotel.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final BoardImageService boardImageService;

    // 모든 게시물 조회
    @GetMapping("/list")
    public ResponseEntity<List<ResponseBoardDto>> getAllBoards(@PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseBoardDto> boards = boardService.findAllBoards(false, pageable);

        return ResponseEntity.ok(boards);
    }

    // 게시물 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseBoardDto> getBoardById(@PathVariable Long boardId) {
        ResponseBoardDto board = boardService.findById(boardId);

        return ResponseEntity.ok(board);
    }

    // 게시물 작성
    @PostMapping("/writeform")
    public ResponseEntity<Object> createBoard(@ModelAttribute RequestBoardDto requestBoardDto, @RequestParam(required = false) MultipartFile multipartFile) throws IOException {
        boardService.create(requestBoardDto, multipartFile);
        return ResponseEntity.ok().build();
    }

    // 게시물 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<ResponseBoardDto> updateBoard(@PathVariable Long boardId, @ModelAttribute RequestBoardDto requestBoardDto, @RequestParam(required = false) MultipartFile multipartFile) throws IOException {
        boardService.updateBoard(boardId, requestBoardDto, multipartFile, false);

        return ResponseEntity.ok().build();
    }

    // 삭제된 게시물 전체 조회
    @GetMapping("/deleted")
    public ResponseEntity<List<ResponseBoardDto>> getDeletedBoards(@PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseBoardDto> deletedBoards = boardService.findAllBoardDelete(true, pageable);

        return ResponseEntity.ok(deletedBoards);
    }

    // 게시물 삭제
    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable Long boardId) {
        boardService.deleteById(boardId);
    }

    //삭제된 게시물 복원
    @PostMapping("/undeleted/{boardId}")
    public ResponseEntity<ResponseBoardDto> undeleted(@PathVariable Long boardId) {
        Board board = boardService.undeleted(boardId);

        return ResponseEntity.ok(board.toResponseBoardDto());
    }

    //작성자로 게시물 조회
    @GetMapping("/find/writer/{boardWriter}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardWriter(@PathVariable String boardWriter, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseBoardDto> byBoardWriter = boardService.findByBoardWriter(boardWriter, false, pageable);

        return ResponseEntity.ok(byBoardWriter);
    }

    //내용으로 게시물 조회
    @GetMapping("/find/content/{boardContent}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardContent(@PathVariable String boardContent, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseBoardDto> content = boardService.findByContent(boardContent, false, pageable);

        return ResponseEntity.ok(content);
    }

    //내용, 제목으로 게시물 조회
    @GetMapping("/find/{keyword}")
    public ResponseEntity<List<ResponseBoardDto>> findBytitleOrContent(@PathVariable String keyword, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable){
        List<ResponseBoardDto> byTitleOrContent = boardService.findByTitleOrContent(keyword, false, pageable);

        return ResponseEntity.ok(byTitleOrContent);
    }

    //제목으로 게시물 조회
    @GetMapping("/find/title/{title}")
    public ResponseEntity<List<ResponseBoardDto>> findBytitle(@PathVariable String title, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseBoardDto> Titles = boardService.findByTitle(title, false, pageable);

        return ResponseEntity.ok(Titles);
    }

    //게시판으로 찾기
    @GetMapping("/find/boardTitle/{boardTitle}")
    public ResponseEntity<List<ResponseBoardDto>> findByboardTitle(@PathVariable String boardTitle, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable){
        List<ResponseBoardDto> boardTitles = boardService.getAllByboardTitle(boardTitle, false, pageable);

        return ResponseEntity.ok(boardTitles);
    }

    //게시판-카테고리로 찾기
    @GetMapping("/find/category/{category}")
    public ResponseEntity<List<ResponseBoardDto>> findByCategory(@PathVariable String category, @PageableDefault(size = 10, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable){
        List<ResponseBoardDto> allByCategory = boardService.getAllByCategory(category, false, pageable);

        return ResponseEntity.ok(allByCategory);
    }

}