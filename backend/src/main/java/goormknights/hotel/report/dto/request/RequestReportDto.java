package goormknights.hotel.report.dto.request;

import goormknights.hotel.report.model.Report;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestReportDto {

    private Long reportId;      //신고 번호

    private Long boardId;       //게시글 번호

    private Long replyId;       //댓글 번호

    private String reportReason;    //신고 이유

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Builder.Default
    private LocalDateTime reportDate = LocalDateTime.now();     //신고일

    private String reportWriter;    //신고자

    @Builder.Default
    private boolean reportCheck = false;    //신고 확인 여부

    @Builder.Default
    private String reportResult = "처리 중";   //신고 처리 결과

    public Report toEntity(){
        return Report.builder()
                .reportId(reportId)
                .reportReason(reportReason)
                .reportDate(reportDate)
                .reportWriter(reportWriter)
                .reportCheck(reportCheck)
                .reportResult(reportResult)
                .build();
    }

}
