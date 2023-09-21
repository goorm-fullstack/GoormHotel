package goormknights.hotel.report.model;

import goormknights.hotel.board.model.Board;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;      //신고 인덱스

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;        //게시글

    @Column(nullable = false)
    private String reportWriter;    //신고자

    @Column(nullable = false)
    private String reportReason;    //신고 이유

    @Column(nullable = false)
    private LocalDateTime reportDate;   //신고 날짜

    @Column(nullable = false)
    private boolean reportCheck = false;        //신고 확인 여부

    @Column(nullable = false)
    private boolean reportResult = false;       //신고 처리 결과

    public void setBoard(Board board) {
        this.board = board;
    }

    @Builder
    public Report(Long reportId, String reportWriter, String reportReason, LocalDateTime reportDate, boolean reportCheck, boolean reportResult) {
        this.reportId = reportId;
        this.reportWriter = reportWriter;
        this.reportReason = reportReason;
        this.reportDate = reportDate;
        this.reportCheck = reportCheck;
        this.reportResult = reportResult;
    }

    public ResponseReportDto toResponseReportDto() {
        return ResponseReportDto.builder()
                .reportId(reportId)
                .boardId(board.getBoardId())
                .title(board.getTitle())
                .reportWriter(reportWriter)
                .reportReason(reportReason)
                .reportDate(reportDate)
                .build();
    }
}