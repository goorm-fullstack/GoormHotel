package goormknights.hotel.board.service;

import goormknights.hotel.board.dto.request.RequestBoardDto;
import goormknights.hotel.board.dto.request.RequestImageDto;
import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.board.exception.NoBoardException;
import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.repository.BoardRepository;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import goormknights.hotel.report.model.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardImageService boardImageService;

    //게시물 작성
    public String create(RequestBoardDto requestBoardDto, MultipartFile multipartFile) throws IOException {
        Board board;
        RequestImageDto requestImageDto;
        if(multipartFile == null){
            board = requestBoardDto.toEntity();
        }else{
            requestImageDto = boardImageService.requestImageDto(multipartFile);
            board = requestBoardDto.toEntity().toBuilder()
                    .boardImage(requestImageDto.toEntity())
                    .build();
        }

        return boardRepository.save(board).getTitle();
    }

    //게시물 인덱스 번호로 찾기
    public ResponseBoardDto findById(Long boardId){

        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        if (optionalBoard.isPresent()) {
            // 게시물이 존재할 경우에만 처리
            Board board = optionalBoard.get();
            ResponseBoardDto responseBoardDto = board.toResponseBoardDto();

            List<ResponseReplyDto> replies = board.getReplies().stream()
                    .map(Reply::toResponseReplyDto)
                    .toList();

            responseBoardDto.setReply(replies);
            return responseBoardDto;
        } else {
            // 게시물이 없을 경우 NoBoardException을 던질 수 있습니다.
            throw new NoBoardException("찾는 게시판이 없습니다.");
        }
    }

    //게시물 작성자 이름으로 찾기
    public List<ResponseBoardDto> findByBoardWriter(String boardWriter, Pageable pageable){
        List<Board> byBoardWriter = boardRepository.findAllByBoardWriter(boardWriter, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();
        for (Board board : byBoardWriter) {
            if(board.getBoardDeleteTime()==null){
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //제목 또는 내용으로 게시물 조회
    public List<ResponseBoardDto> findByTitleOrContent(String keyword, Pageable pageable){
        List<Board> boards = boardRepository.findByTitleOrContent(keyword, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards){
            if(board.getBoardDeleteTime()==null){
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //제목으로 게시물 조회
    public List<ResponseBoardDto> findByTitle(String keyword,  Pageable pageable){
        List<Board> boards = boardRepository.findAllByTitleContaining(keyword, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards){
            if(board.getBoardDeleteTime()==null){
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //내용으로 게시물 조회
    public List<ResponseBoardDto> findByContent(String keyword, Pageable pageable){
        List<Board> boards = boardRepository.findAllByBoardContentContaining(keyword, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards){
            if(board.getBoardDeleteTime()==null){
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //삭제된 게시물만 조회
    public List<ResponseBoardDto> findAllBoardDelete(Pageable pageable){
        Page<Board> boardDelete = boardRepository.findAll(pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boardDelete){
            if(board.getBoardDeleteTime()!=null){
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //게시물 영구 삭제
    public void deleteById(Long boardId){
        boardRepository.deleteById(boardId);
    }

    //모든 게시물 조회
    public List<ResponseBoardDto> findAllBoards(Pageable pageable) {
        Page<Board> all = boardRepository.findAll(pageable);
        List<ResponseBoardDto> response = new ArrayList<>();
        for (Board board : all) {
            if(board.getBoardDeleteTime()==null){
                ResponseBoardDto responseBoardDto = board.toResponseBoardDto();
                List<ResponseReportDto> reportList = board.getReport().stream().map(Report::toResponseReportDto).toList();
                List<ResponseReplyDto> replyList = board.getReplies().stream().map(Reply::toResponseReplyDto).toList();
                responseBoardDto.setReply(replyList);
                responseBoardDto.setReport(reportList);
                response.add(responseBoardDto);
            }
        }
        return response;
    }

    // 게시물 수정
    public Board updateBoard(Long boardId, RequestBoardDto requestBoardDto, MultipartFile multipartFile, boolean bool) throws IOException {
        Board beforeBoard = boardRepository.findByBoardId(boardId);
        RequestImageDto requestImageDto;
        if(multipartFile == null) {
            requestImageDto = RequestImageDto.builder()
                    .boardImageName(beforeBoard.getBoardImage().getBoardImageName())
                    .boardImagePath(beforeBoard.getBoardImage().getBoardImagePath())
                    .mimeType(beforeBoard.getBoardImage().getMimeType())
                    .data(beforeBoard.getBoardImage().getData())
                    .originalboardImageName(beforeBoard.getBoardImage().getOriginalboardImageName())
                    .build();
        }else{
            requestImageDto = boardImageService.requestImageDto(multipartFile);
        }
        Board afterBoard = beforeBoard.updateBoard(beforeBoard, requestBoardDto, requestImageDto);

        return boardRepository.save(afterBoard);
    }

    //게시판으로 게시물 찾기
    public List<ResponseBoardDto> getAllByboardTitle(String boardTitle, Pageable pageable) {
        List<Board> allByBoardTitle = boardRepository.findAllByBoardTitle(boardTitle, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : allByBoardTitle) {
            if(board.getBoardDeleteTime()==null){
                ResponseBoardDto responseBoardDto = board.toResponseBoardDto();
                response.add(responseBoardDto);
            }
        }

        return response;
    }

    //게시판-카테고리로 게시물 찾기
    public List<ResponseBoardDto> getAllByCategory(String category, Pageable pageable){
        List<Board> allByCataegory = boardRepository.findAllByCategory(category, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for(Board board : allByCataegory){
            if(board.getBoardDeleteTime()==null){
                ResponseBoardDto responseBoardDto = board.toResponseBoardDto();
                response.add(responseBoardDto);
            }
        }

        return response;
    }

    //삭제 게시물 복원
    public Board undeleted(Long boardId){
        Board board = boardRepository.findByBoardId(boardId);
        if (board != null) {
            board.setBoardDeleteTime(null);
        }

        return boardRepository.save(board);
    }

    //게시물 소프트딜리트
    public Board softdeleteBoard(Long boardId) {
        Board board = boardRepository.findByBoardId(boardId);

        String datePattern = "yyyy-MM-dd'T'HH:mm:ss";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(datePattern);
        String now = LocalDateTime.now().format(formatter);
        LocalDateTime boardDeleteTime = LocalDateTime.parse(now, formatter);
        board.setBoardDeleteTime(boardDeleteTime);

        return boardRepository.save(board);

    }

}