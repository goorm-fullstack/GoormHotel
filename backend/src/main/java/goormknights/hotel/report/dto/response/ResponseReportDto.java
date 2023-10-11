package goormknights.hotel.report.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseReportDto {

    private Long reportId;
    private Long boardId;
    private String title;
    private Long replyId;
    private String replyContent;
    private String reportReason;
    private LocalDateTime reportDate;
    private String reportWriter;
    private boolean reportCheck;
    private String reportResult;
    private String boardTitle;

    @Builder
    public ResponseReportDto(Long reportId, Long boardId, String title, String reportReason, LocalDateTime reportDate, String reportWriter, boolean reportCheck, String reportResult, Long replyId, String replyContent, String boardTitle) {
        this.reportId = reportId;
        this.boardId = boardId;
        this.title = title;
        this.replyId = replyId;
        this.replyContent = replyContent;
        this.reportReason = reportReason;
        this.reportDate = reportDate;
        this.reportWriter = reportWriter;
        this.reportCheck = reportCheck;
        this.reportResult = reportResult;
        this.boardTitle = boardTitle;
    }
}
