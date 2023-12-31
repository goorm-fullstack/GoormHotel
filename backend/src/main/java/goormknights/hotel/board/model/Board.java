package goormknights.hotel.board.model;

import goormknights.hotel.board.dto.request.RequestBoardDto;
import goormknights.hotel.board.dto.request.RequestFileDto;
import goormknights.hotel.board.dto.request.RequestImageDto;
import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.report.model.Report;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Where(clause = "board_delete = false")
//@SQLDelete(sql = "UPDATE Board SET board_Delete = true WHERE board_Id = ?")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;       //인덱스 번호

    @Column(nullable = false)
    private String title;  //제목

    @Column(nullable = false, length = 3000)
    private String boardContent;    //내용

    @Column(nullable = false)
    private LocalDateTime boardWriteDate;   //게시글 작성 시간

    @Column(nullable = false)
    private String boardWriter;             //작성자

    @Column
    private String boardPassword;           //작성자 비밀번호

    @Column
    private Long memberPk; // 회원인 경우 회원의 pk저장

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "board_image_id")
    private BoardImage boardImage;       //이미지 저장

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "board_file_id")
    private BoardFile boardFile;       //파일 저장

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies = new ArrayList<>();            //게시물 댓글

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> report = new ArrayList<>();            //신고

    @Column(nullable = false)
    private String boardTitle;      //게시판 이름

    @Column(nullable = false)
    private String category;        //게시판-카테고리

    @Setter
    private LocalDateTime boardDeleteTime;      //게시글 삭제 날짜

    @Setter
    @Column(nullable = false)
    private String isComment;      //답글 여부

    private Long parentBoardId;     //부모 글 Id

    @Builder(toBuilder = true)
    public Board(Long memberPk, Long parentBoardId, String boardPassword, String isComment, Long boardId, String title, String boardContent, String boardWriter, LocalDateTime boardWriteDate, BoardImage boardImage, BoardFile boardFile, String boardTitle, String category, List<Reply> replies, List<Report> report) {
        this.boardId = boardId;
        this.title = title;
        this.boardContent = boardContent;
        this.boardWriter = boardWriter;
        this.boardWriteDate = boardWriteDate;
        this.boardImage = boardImage;
        this.boardFile = boardFile;
        this.boardTitle = boardTitle;
        this.category = category;
        this.replies = replies;
        this.report = report;
        this.boardPassword = boardPassword;
        this.isComment = isComment;
        this.parentBoardId = parentBoardId;
        this.memberPk = memberPk;
    }

    public ResponseBoardDto toResponseBoardDto() {
        return ResponseBoardDto.builder()
                .boardId(boardId)
                .title(title)
                .boardContent(boardContent)
                .boardWriteDate(boardWriteDate)
                .boardWriter(boardWriter)
                .boardTitle(boardTitle)
                .category(category)
                .boardDeleteTime(boardDeleteTime)
                .isComment(isComment)
                .boardPassword(boardPassword)
                .parentBoardId(parentBoardId)
                .boardImage(boardImage != null ? boardImage.getBoardImageId() : null)
                .memberPk(memberPk)
                .report(report.stream().map(Report::toResponseReportDto).toList())
                .build();
    }

    public Board updateBoard(Board board, RequestBoardDto requestBoardDto, RequestImageDto requestImageDto, RequestFileDto requestFileDto) {
        if (requestImageDto == null && requestFileDto != null) {
            return Board.builder()
                    .boardId(board.getBoardId())
                    .title(requestBoardDto.getTitle())
                    .boardContent(requestBoardDto.getBoardContent())
                    .boardWriter(requestBoardDto.getBoardWriter())
                    .boardImage(board.getBoardImage() != null ? board.getBoardImage() : null)
                    .boardFile(requestFileDto.toEntity())
                    .boardTitle(requestBoardDto.getBoardTitle())
                    .category(requestBoardDto.getCategory())
                    .boardWriteDate(board.getBoardWriteDate())
                    .replies(board.getReplies())
                    .report(board.getReport())
                    .isComment(requestBoardDto.getIsComment())
                    .memberPk(board.getMemberPk())
                    .boardPassword(board.getBoardPassword())
                    .build();
        } else if (requestFileDto == null && requestImageDto != null) {
            return Board.builder()
                    .boardId(board.getBoardId())
                    .title(requestBoardDto.getTitle())
                    .boardContent(requestBoardDto.getBoardContent())
                    .boardWriter(requestBoardDto.getBoardWriter())
                    .boardImage(requestImageDto.toEntity())
                    .boardFile(board.getBoardFile() != null ? board.getBoardFile() : null)
                    .boardTitle(requestBoardDto.getBoardTitle())
                    .category(requestBoardDto.getCategory())
                    .boardWriteDate(board.getBoardWriteDate())
                    .replies(board.getReplies())
                    .report(board.getReport())
                    .isComment(requestBoardDto.getIsComment())
                    .memberPk(board.getMemberPk())
                    .boardPassword(board.getBoardPassword())
                    .build();
        } else if (requestFileDto == null && requestImageDto == null) {
            return Board.builder()
                    .boardId(board.getBoardId())
                    .title(requestBoardDto.getTitle())
                    .boardContent(requestBoardDto.getBoardContent())
                    .boardWriter(requestBoardDto.getBoardWriter())
                    .boardImage(board.getBoardImage() != null ? board.getBoardImage() : null)
                    .boardFile(board.getBoardFile() != null ? board.getBoardFile() : null)
                    .boardTitle(requestBoardDto.getBoardTitle())
                    .category(requestBoardDto.getCategory())
                    .boardWriteDate(board.getBoardWriteDate())
                    .replies(board.getReplies())
                    .report(board.getReport())
                    .isComment(requestBoardDto.getIsComment())
                    .memberPk(board.getMemberPk())
                    .boardPassword(board.getBoardPassword())
                    .build();
        } else {
            return Board.builder()
                    .boardId(board.getBoardId())
                    .title(requestBoardDto.getTitle())
                    .boardContent(requestBoardDto.getBoardContent())
                    .boardWriter(requestBoardDto.getBoardWriter())
                    .boardImage(requestImageDto.toEntity())
                    .boardFile(requestFileDto.toEntity())
                    .boardTitle(requestBoardDto.getBoardTitle())
                    .category(requestBoardDto.getCategory())
                    .boardWriteDate(board.getBoardWriteDate())
                    .replies(board.getReplies())
                    .report(board.getReport())
                    .isComment(requestBoardDto.getIsComment())
                    .memberPk(board.getMemberPk())
                    .boardPassword(board.getBoardPassword())
                    .build();
        }

    }
}