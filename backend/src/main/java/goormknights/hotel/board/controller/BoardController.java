package goormknights.hotel.board.controller;

import goormknights.hotel.board.dto.request.RequestBoardDto;
import goormknights.hotel.board.dto.request.RequestImageDto;
import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.service.BoardImageService;
import goormknights.hotel.board.service.BoardService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<ResponseBoardDto>> getAllBoards() {
        List<ResponseBoardDto> boards = boardService.getAllBoards();

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
    public ResponseEntity<Object> createBoard(@ModelAttribute RequestBoardDto requestBoardDto, @RequestParam MultipartFile multipartFile) throws IOException {
        RequestImageDto requestImageDto = boardImageService.requestImageDto(multipartFile);

        boardService.create(requestBoardDto, requestImageDto);
        return ResponseEntity.ok().build();
    }

    // 게시물 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<ResponseBoardDto> updateBoard(@PathVariable Long boardId, @RequestBody RequestBoardDto requestBoardDto) {
        Board board = boardService.updateBoard(boardId, requestBoardDto);

        return ResponseEntity.ok(board.toResponseBoardDto());
    }

    // 게시물 삭제
    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable Long boardId) {
        boardService.deleteById(boardId);
    }

    @GetMapping("/find/writer/{boardWriter}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardWriter(@PathVariable String boardWriter) {
        List<ResponseBoardDto> byBoardWriter = boardService.findByBoardWriter(boardWriter);

        return ResponseEntity.ok(byBoardWriter);
    }

    @GetMapping("/find/content/{boardContent}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardContent(@PathVariable String boardContent) {
        List<ResponseBoardDto> content = boardService.findByContent(boardContent);

        return ResponseEntity.ok(content);
    }

    @GetMapping("/find/{keyword}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardTitleOrContent(@PathVariable String keyword){
        List<ResponseBoardDto> byTitleOrContent = boardService.findByTitleOrContent(keyword);

        return ResponseEntity.ok(byTitleOrContent);
    }

    @GetMapping("/find/title/{boardTitle}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardTitle(@PathVariable String boardTitle) {
        List<ResponseBoardDto> Titles = boardService.findByTitle(boardTitle);

        return ResponseEntity.ok(Titles);
    }
}