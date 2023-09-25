package goormknights.hotel.report.model;

import goormknights.hotel.board.model.Board;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
//@SQLDelete(sql = "UPDATE Report SET report_Delete = true WHERE report_Id = ?")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;      //신고 인덱스

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;           //게시글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_id")
    private Reply reply;

    @Column(nullable = false)
    private String reportWriter;    //신고자

    @Column(nullable = false)
    private String reportReason;    //신고 이유

    @Column(nullable = false)
    private LocalDateTime reportDate;   //신고 날짜

    @Column(nullable = false)
    private boolean reportCheck;       //신고 확인 여부

    @Column(nullable = false)
    private String reportResult;       //신고 처리 결과

    @Setter
    private LocalDateTime reportDeleteTime;

    public void setBoard(Board board) {
        this.board = board;
    }

    public void setReply(Reply reply){
        this.reply = reply;
    }


    @Builder
    public Report(Long reportId, String reportWriter, String reportReason, LocalDateTime reportDate, boolean reportCheck, String reportResult, Board board, Reply reply) {
        this.reportId = reportId;
        this.reportWriter = reportWriter;
        this.reportReason = reportReason;
        this.reportDate = reportDate;
        this.reportCheck = reportCheck;
        this.reportResult = reportResult;
        this.board = board;
        this.reply = reply;
    }

    public ResponseReportDto toResponseReportDto() {
        if(reply == null){
            return ResponseReportDto.builder()
                    .reportId(reportId)
                    .boardId(board.getBoardId())
                    .title(board.getTitle())
                    .replyId(null)
                    .replyContent(null)
                    .reportWriter(reportWriter)
                    .reportReason(reportReason)
                    .reportDate(reportDate)
                    .reportCheck(reportCheck)
                    .reportResult(reportResult)
                    .build();
        }
        else{
            return ResponseReportDto.builder()
                    .reportId(reportId)
                    .boardId(null)
                    .title(null)
                    .replyId(reply.getReplyId())
                    .replyContent(reply.getReplyContent())
                    .reportWriter(reportWriter)
                    .reportReason(reportReason)
                    .reportDate(reportDate)
                    .reportCheck(reportCheck)
                    .reportResult(reportResult)
                    .build();
        }
    }
}