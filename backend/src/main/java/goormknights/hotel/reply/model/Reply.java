package goormknights.hotel.reply.model;

import goormknights.hotel.board.model.Board;
import goormknights.hotel.reply.dto.request.RequestReplyDto;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.report.model.Report;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@SQLDelete(sql = "UPDATE Reply SET reply_Delete = true WHERE reply_Id = ?")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;   //댓글 인덱스 번호

    @Column(nullable = false)
    private String replyContent;    //댓글 내용

    @Column(nullable = false)
    private String replyWriter;     //댓글 작성자

    @Column(nullable = false)
    private LocalDateTime replyWriteDate;   //댓글 작성 시간

    @Column
    private LocalDateTime replyDeleteTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;        //게시글

    @OneToMany(mappedBy = "reply", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> report = new ArrayList<>();            //신고

    @Column
    private String replyPassword;               //비회원 댓글 비밀번호

    @Column
    private Long memberPk; // 회원인 경우 멤버 pk저장

    public void setBoard(Board board) {
        this.board = board;
    }

    public void setReplyDeleteTime(LocalDateTime replyDeleteTime) {
        this.replyDeleteTime = replyDeleteTime;
    }

    @Builder(toBuilder = true)
    public Reply(String replyPassword, Long replyId, String replyContent, String replyWriter, LocalDateTime replyWriteDate, Board board, List<Report> report, LocalDateTime replyDeleteTime, Long memberPk) {
        this.replyId = replyId;
        this.replyContent = replyContent;
        this.replyWriter = replyWriter;
        this.replyWriteDate = replyWriteDate;
        this.board = board;
        this.report = report;
        this.replyDeleteTime = replyDeleteTime;
        this.replyPassword = replyPassword;
        this.memberPk = memberPk;
    }

    public ResponseReplyDto toResponseReplyDto() {
        return ResponseReplyDto.builder()
                .replyId(replyId)
                .boardId(board.getBoardId())
                .replyContent(replyContent)
                .replyWriteDate(replyWriteDate)
                .replyWriter(replyWriter)
                .report(report.stream().map(Report::toResponseReportDto).toList())
                .responseBoardDto(board.toResponseBoardDto())
                .replyDeleteTime(replyDeleteTime)
                .boardTitle(board.getBoardTitle())
                .replyPassword(replyPassword)
                .memberPk(memberPk)
                .build();
    }

    public Reply updateReply(Reply reply, RequestReplyDto requestReplyDto){
        return Reply.builder()
                .replyId(reply.getReplyId())
                .replyContent(requestReplyDto.getReplyContent())
                .replyWriter(requestReplyDto.getReplyWriter())
                .replyWriteDate(reply.getReplyWriteDate())
                .board(reply.getBoard())
                .report(reply.getReport())
                .memberPk(reply.getMemberPk())
                .replyPassword(reply.getReplyPassword())
                .build();
    }
}
