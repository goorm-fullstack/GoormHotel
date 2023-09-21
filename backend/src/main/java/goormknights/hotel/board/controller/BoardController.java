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
        List<ResponseBoardDto> boards = boardService.getAllBoards(false);

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
        Board board = boardService.updateBoard(boardId, requestBoardDto, false);

        return ResponseEntity.ok(board.toResponseBoardDto());
    }

    // 삭제된 게시물 전체 조회
    @GetMapping("/deleted")
    public ResponseEntity<List<ResponseBoardDto>> getDeletedBoards() {
        List<ResponseBoardDto> deletedBoards = boardService.findAllBoardDelete(true);

        return ResponseEntity.ok(deletedBoards);
    }

    // 게시물 삭제
    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable Long boardId) {
        boardService.deleteById(boardId);
    }

    //작성자로 게시물 조회
    @GetMapping("/find/writer/{boardWriter}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardWriter(@PathVariable String boardWriter) {
        List<ResponseBoardDto> byBoardWriter = boardService.findByBoardWriter(boardWriter, false);

        return ResponseEntity.ok(byBoardWriter);
    }

    //내용으로 게시물 조회
    @GetMapping("/find/content/{boardContent}")
    public ResponseEntity<List<ResponseBoardDto>> findByBoardContent(@PathVariable String boardContent) {
        List<ResponseBoardDto> content = boardService.findByContent(boardContent, false);

        return ResponseEntity.ok(content);
    }

    //내용, 제목으로 게시물 조회
    @GetMapping("/find/{keyword}")
    public ResponseEntity<List<ResponseBoardDto>> findBytitleOrContent(@PathVariable String keyword){
        List<ResponseBoardDto> byTitleOrContent = boardService.findByTitleOrContent(keyword, false);

        return ResponseEntity.ok(byTitleOrContent);
    }

    //제목으로 게시물 조회
    @GetMapping("/find/title/{title}")
    public ResponseEntity<List<ResponseBoardDto>> findBytitle(@PathVariable String title) {
        List<ResponseBoardDto> Titles = boardService.findByTitle(title, false);

        return ResponseEntity.ok(Titles);
    }

    //게시판으로 찾기
    @GetMapping("/find/boardTitle/{boardTitle}")
    public ResponseEntity<List<ResponseBoardDto>> findByboardTitle(@PathVariable String boardTitle){
        List<ResponseBoardDto> boardTitles = boardService.getAllByboardTitle(boardTitle, false);

        return ResponseEntity.ok(boardTitles);
    }

    //게시판-카테고리로 찾기
    @GetMapping("/find/category/{category}")
    public ResponseEntity<List<ResponseBoardDto>> findByCategory(@PathVariable String category){
        List<ResponseBoardDto> allByCategory = boardService.getAllByCategory(category, false);

        return ResponseEntity.ok(allByCategory);
    }


}