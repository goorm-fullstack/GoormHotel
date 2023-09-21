package goormknights.hotel.board.service;

import goormknights.hotel.board.dto.request.RequestBoardDto;
import goormknights.hotel.board.dto.request.RequestImageDto;
import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.board.exception.NoBoardException;
import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.repository.BoardRepository;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.reply.model.Reply;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardImageService boardImageService;

    //게시물 작성
    public String create(RequestBoardDto requestBoardDto, RequestImageDto requestImageDto) {
        Board board = requestBoardDto.toEntity().toBuilder()
                .boardImage(requestImageDto.toEntity())
                .build();

        return boardRepository.save(board).getBoardTitle();
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
    public List<ResponseBoardDto> findByBoardWriter(String boardWriter, boolean bool){
        List<Board> byBoardWriter = boardRepository.findByBoardWriterAndBoardDelete(boardWriter, bool);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : byBoardWriter) {
            response.add(board.toResponseBoardDto());
        }

        return response;
    }

    //제목 또는 내용으로 게시물 조회
    public List<ResponseBoardDto> findByTitleOrContent(String keyword, boolean bool){
        List<Board> boards = boardRepository.findByTitleOrContent(keyword, bool);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards){
            response.add(board.toResponseBoardDto());
        }

        return response;
    }

    //제목으로 게시물 조회
    public List<ResponseBoardDto> findByTitle(String keyword, boolean bool){
        List<Board> boards = boardRepository.findByBoardTitleContainingAndBoardDelete(keyword, bool);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards){
            response.add(board.toResponseBoardDto());
        }

        return response;
    }

    //내용으로 게시물 조회
    public List<ResponseBoardDto> findByContent(String keyword, boolean bool){
        List<Board> boards = boardRepository.findByBoardContentContainingAndBoardDelete(keyword, bool);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards){
            response.add(board.toResponseBoardDto());
        }

        return response;
    }

    //삭제된 게시물만 조회
    public List<ResponseBoardDto> findAllBoardDelete(Boolean bool){
        List<Board> boardDelete = boardRepository.findAllByBoardDelete(bool);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boardDelete){
            response.add(board.toResponseBoardDto());
        }

        return response;
    }

    //게시물 삭제
    public void deleteById(Long boardId){
        boardRepository.deleteById(boardId);
    }

    //모든 게시물 조회
    public List<ResponseBoardDto> getAllBoards(boolean bool) {
        List<Board> all = boardRepository.findAllByBoardDelete(bool);
        List<ResponseBoardDto> response = new ArrayList<>();
        for (Board board : all) {
            ResponseBoardDto responseBoardDto = board.toResponseBoardDto();
            List<ResponseReplyDto> list = board.getReplies().stream().map(Reply::toResponseReplyDto).toList();
            responseBoardDto.setReply(list);
            response.add(responseBoardDto);
        }
        return response;
    }

    // 게시물 수정
    public Board updateBoard(Long boardId, RequestBoardDto requestBoardDto, boolean bool) {
        Board beforeBoard = boardRepository.findByBoardIdAndBoardDelete(boardId, bool);
        Board afterBoard = beforeBoard.updateBoard(boardId, requestBoardDto);

        return boardRepository.save(afterBoard);
    }
}