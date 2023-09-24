package goormknights.hotel.report.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ResponseReportDto {

    private Long reportId;
    private Long boardId;
    private String title;
    private String reportReason;
    private LocalDateTime reportDate;
    private String reportWriter;
    private boolean reportCheck;
    private boolean reportResult;

    @Builder
    public ResponseReportDto(Long reportId, Long boardId, String title, String reportReason, LocalDateTime reportDate, String reportWriter, boolean reportCheck, boolean reportResult) {
        this.reportId = reportId;
        this.boardId = boardId;
        this.title = title;
        this.reportReason = reportReason;
        this.reportDate = reportDate;
        this.reportWriter = reportWriter;
        this.reportCheck = reportCheck;
        this.reportResult = reportResult;
    }
}
