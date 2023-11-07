package goormknights.hotel.board.service;

import goormknights.hotel.board.dto.request.RequestBoardDto;
import goormknights.hotel.board.dto.request.RequestFileDto;
import goormknights.hotel.board.dto.request.RequestImageDto;
import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.board.exception.NoBoardException;
import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.repository.BoardRepository;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final ReplyRepository replyRepository;
    private final BoardImageService boardImageService;
    private final BoardFileService boardFileService;

    //게시물 작성
    public String create(RequestBoardDto requestBoardDto, MultipartFile multipartFile, MultipartFile file) throws IOException {
        Board board;
        RequestImageDto requestImageDto;
        RequestFileDto requestFileDto;
        if (multipartFile == null && file == null) {
            board = requestBoardDto.toEntity();
        } else if (multipartFile != null && file == null) {
            requestImageDto = boardImageService.requestImageDto(multipartFile);
            board = requestBoardDto.toEntity().toBuilder()
                    .boardImage(requestImageDto.toEntity())
                    .build();
        } else if (multipartFile == null && file != null) {
            requestFileDto = boardFileService.requestFileDto(file);
            board = requestBoardDto.toEntity().toBuilder()
                    .boardFile(requestFileDto.toEntity())
                    .build();
        } else {
            requestImageDto = boardImageService.requestImageDto(multipartFile);
            requestFileDto = boardFileService.requestFileDto(file);
            board = requestBoardDto.toEntity().toBuilder()
                    .boardImage(requestImageDto.toEntity())
                    .boardFile(requestFileDto.toEntity())
                    .build();
        }

        return boardRepository.save(board).getTitle();
    }

    //게시물 인덱스 번호로 찾기
    public Board findById(Long boardId) {

        return boardRepository.findById(boardId).orElseThrow(() -> new NoBoardException("작성되지 않은 게시판입니다."));
    }

    //게시물 작성자 이름으로 찾기
    public List<ResponseBoardDto> findByBoardWriter(String boardWriter, Pageable pageable) {
        List<Board> byBoardWriter = boardRepository.findAllByBoardWriter(boardWriter, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();
        for (Board board : byBoardWriter) {
            if (board.getBoardDeleteTime() == null) {
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //제목 또는 내용으로 게시물 조회
    public List<ResponseBoardDto> findByTitleOrContent(String keyword, Pageable pageable) {
        List<Board> boards = boardRepository.findByTitleOrContent(keyword, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards) {
            if (board.getBoardDeleteTime() == null) {
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //제목으로 게시물 조회
    public List<ResponseBoardDto> findByTitle(String keyword, Pageable pageable) {
        List<Board> boards = boardRepository.findAllByTitleContaining(keyword, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards) {
            if (board.getBoardDeleteTime() == null) {
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //내용으로 게시물 조회
    public List<ResponseBoardDto> findByContent(String keyword, Pageable pageable) {
        List<Board> boards = boardRepository.findAllByBoardContentContaining(keyword, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : boards) {
            if (board.getBoardDeleteTime() == null) {
                response.add(board.toResponseBoardDto());
            }
        }

        return response;
    }

    //삭제된 게시물만 조회
    public Page<ResponseBoardDto> findAllBoardDelete(Pageable pageable) {
        Page<Board> all = boardRepository.findAll(pageable);
        List<ResponseBoardDto> list = new ArrayList<>();
        for (Board board : all) {
            if (board.getBoardDeleteTime() != null) {
                list.add(board.toResponseBoardDto());
            }
        }
        return new PageImpl<>(list, pageable, list.size());
//        List<ResponseBoardDto> response = new ArrayList<>();
//
//        for (Board board : boardDelete){
//            if(board.getBoardDeleteTime()!=null){
//                response.add(board.toResponseBoardDto());
//            }
//        }
    }

    //게시물 영구 삭제
    public void deleteById(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    //모든 게시물 조회
    public Page<Board> findAllBoards(Pageable pageable) {
        Page<Board> all = boardRepository.findAll(pageable);
        List<Board> list = new ArrayList<>();

        for (Board board : all) {
            if (board.getBoardDeleteTime() == null && board.getParentBoardId() == null) {         //삭제되지 않은 글 그리고 답글이 아닌 글
                if (board.getIsComment().equals("true")) {        //답글을 가지고 있다면
                    Optional<Board> childBoardOptional = boardRepository.findByParentBoardId(board.getBoardId());       //답글 찾기
                    Board childBoard = childBoardOptional.get();
                    list.add(board);                        //부모 글 추가(위에 추가하기 위해)
                    list.add(childBoard);                   //답글 먼처 추가(아래에 추가하기 위해서)
                }
                if (board.getIsComment().equals("false")) {  //답글을 가지고 있지 않다면
                    list.add(board);                       //게시글 추가
                }
            }
        }
        return new PageImpl<>(list, pageable, list.size());
    }


    // 게시물 수정
    public Board updateBoard(Long boardId, RequestBoardDto requestBoardDto, MultipartFile multipartFile, MultipartFile file) throws IOException {
        Board beforeBoard = boardRepository.findByBoardId(boardId);
        RequestImageDto requestImageDto = null;
        RequestFileDto requestFileDto = null;
        if (multipartFile == null && file != null) {
            if (beforeBoard.getBoardImage() != null) {
                requestImageDto = RequestImageDto.builder()
                        .boardImageName(beforeBoard.getBoardImage().getBoardImageName())
                        .boardImagePath(beforeBoard.getBoardImage().getBoardImagePath())
                        .mimeType(beforeBoard.getBoardImage().getMimeType())
                        .data(beforeBoard.getBoardImage().getData())
                        .originalboardImageName(beforeBoard.getBoardImage().getOriginalboardImageName())
                        .build();
            } else {
                requestImageDto = null;
            }
            requestFileDto = boardFileService.requestFileDto(file);
        } else if (multipartFile != null && file == null) {
            requestImageDto = boardImageService.requestImageDto(multipartFile);
            if (beforeBoard.getBoardFile() != null) {
                requestFileDto = RequestFileDto.builder()
                        .boardFileName(beforeBoard.getBoardFile().getBoardFileName())
                        .boardFilePath(beforeBoard.getBoardFile().getBoardFilePath())
                        .originalboardFileName(beforeBoard.getBoardFile().getOriginalboardFileName())
                        .data(beforeBoard.getBoardFile().getData())
                        .mimeType(beforeBoard.getBoardFile().getMimeType())
                        .build();
            } else {
                requestFileDto = null;
            }
        } else if (multipartFile == null && file == null) {
            if (requestImageDto != null) {
                requestImageDto = RequestImageDto.builder()
                        .boardImageName(beforeBoard.getBoardImage().getBoardImageName())
                        .boardImagePath(beforeBoard.getBoardImage().getBoardImagePath())
                        .mimeType(beforeBoard.getBoardImage().getMimeType())
                        .data(beforeBoard.getBoardImage().getData())
                        .originalboardImageName(beforeBoard.getBoardImage().getOriginalboardImageName())
                        .build();
            } else {
                requestImageDto = null;
            }
            if (requestFileDto != null) {
                requestFileDto = RequestFileDto.builder()
                        .boardFileName(beforeBoard.getBoardFile().getBoardFileName())
                        .boardFilePath(beforeBoard.getBoardFile().getBoardFilePath())
                        .originalboardFileName(beforeBoard.getBoardFile().getOriginalboardFileName())
                        .data(beforeBoard.getBoardFile().getData())
                        .mimeType(beforeBoard.getBoardFile().getMimeType())
                        .build();
            } else {
                requestFileDto = null;

            }
        } else {
            requestImageDto = boardImageService.requestImageDto(multipartFile);
            requestFileDto = boardFileService.requestFileDto(file);
        }
        Board afterBoard = beforeBoard.updateBoard(beforeBoard, requestBoardDto, requestImageDto, requestFileDto);

        return boardRepository.save(afterBoard);
    }

    //게시판으로 게시물 찾기
    public Page<ResponseBoardDto> getAllByboardTitle(String boardTitle, Pageable pageable) {
        Page<Board> allByBoardTitle = boardRepository.findAllByBoardTitle(boardTitle, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        for (Board board : allByBoardTitle) {
            if (board.getBoardDeleteTime() == null) {
                ResponseBoardDto responseBoardDto = board.toResponseBoardDto();
                response.add(responseBoardDto);
            }
        }

        return new PageImpl<>(response, pageable, response.size());
    }

    //게시판-카테고리와 검색 단어로 게시물 찾기
    public Page<ResponseBoardDto> getAllByCategory(String boardTitle, String category, String keyword, Pageable pageable) {
        Page<Board> allByBoardTitle = boardRepository.findAllByBoardTitle(boardTitle, pageable);
        List<ResponseBoardDto> response = new ArrayList<>();

        if (category == null && keyword == null) {
            for (Board board : allByBoardTitle) {
                if (board.getBoardDeleteTime() == null) {
                    response.add(board.toResponseBoardDto());
                }
            }
        } else if (category != null && keyword == null) {
            for (Board board : allByBoardTitle) {
                if (board.getBoardDeleteTime() == null && board.getCategory().equals(category)) {
                    response.add(board.toResponseBoardDto());
                }
            }
        } else if (category == null && keyword != null) {
            for (Board board : allByBoardTitle) {
                if (board.getBoardDeleteTime() == null && (board.getTitle().contains(keyword) || board.getBoardContent().contains(keyword))) {
                    response.add(board.toResponseBoardDto());
                }
            }
        } else {
            for (Board board : allByBoardTitle) {
                if (board.getBoardDeleteTime() == null && board.getCategory().equals(category) && (board.getTitle().contains(keyword) || board.getBoardContent().contains(keyword))) {
                    response.add(board.toResponseBoardDto());
                }
            }
        }

        return new PageImpl<>(response, pageable, response.size());
    }

    //삭제 게시물 복원
    public Board undeleted(Long boardId) {
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

    public Board findByBoardTitle(String boardTitle) {
        return boardRepository.findByTitle(boardTitle).orElseThrow(() -> new NoBoardException("등록되지 않은 게시판입니다."));
    }

    // 삭제된 게시글, 댓글 모두 조회
    public Page<Object> findAllBoardReplyDeleted(Pageable pageable) {
        Page<Board> all = boardRepository.findAll(pageable);
        Page<Reply> all1 = replyRepository.findAll(pageable);
        List<Object> list = new ArrayList<>();

        for (Board board : all) {
            if (board.getBoardDeleteTime() != null) {
                list.add(board.toResponseBoardDto());
            }
        }
        for (Reply reply : all1) {
            if (reply.getReplyDeleteTime() != null) {
                list.add(reply.toResponseReplyDto());
            }
        }

        return new PageImpl<>(list, pageable, list.size());
    }

    //답글 추가, 삭제용
    public Board updateIsComment(Long boardId) {
        Board board = boardRepository.findByBoardId(boardId);
        if (board == null) {
            throw new NoBoardException("게시판을 찾을 수 없습니다.");
        }

        // isComment 값을 토글
        if ("false".equals(board.getIsComment())) {
            board.setIsComment("true");
        } else if ("true".equals(board.getIsComment())) {
            board.setIsComment("false");
        }

        return boardRepository.save(board);
    }


    // 작성자명으로 데이터 가져오기 (마이페이지용)
    public Page<Object> findAllBoardAndReply(String writer, Pageable pageable) {
        Page<Board> all = boardRepository.findAll(pageable);
        Page<Reply> all1 = replyRepository.findAll(pageable);
        List<Object> list = new ArrayList<>();

        for (Board board : all) {
            if (board.getBoardDeleteTime() == null && board.getBoardWriter().equals(writer) && board.getBoardPassword().equals("")) {
                list.add(board);
            }
        }
        for (Reply reply : all1) {
            if (reply.getReplyDeleteTime() == null && reply.getReplyWriter().equals(writer) && reply.getReplyPassword() == null) {
                list.add(reply);
            }
        }

        return new PageImpl<>(list, pageable, list.size());
    }

    public Board findByParentBoardId(Long parentBoardId) {

        return boardRepository.findByParentBoardId(parentBoardId).orElseThrow(() -> new NoBoardException("작성되지 않은 게시판입니다."));
    }

}