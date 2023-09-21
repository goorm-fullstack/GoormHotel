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

    @Builder
    public ResponseReportDto(Long reportId, Long boardId, String title, String reportReason, LocalDateTime reportDate, String reportWriter) {
        this.reportId = reportId;
        this.boardId = boardId;
        this.title = title;
        this.reportReason = reportReason;
        this.reportDate = reportDate;
        this.reportWriter = reportWriter;
    }
}
