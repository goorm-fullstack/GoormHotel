package goormknights.hotel.reply.dto.response;

import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ResponseReplyDto {
//todo: board데이터 같이 넘기기
    private Long replyId;       //댓글 번호
    private Long boardId;       //게시글 번호
    private String replyContent;        //댓글 내용
    private LocalDateTime replyWriteDate;   //댓글 작성 시간
    private String replyWriter;     //댓글 작성자
    private List<ResponseReportDto> report;
    private ResponseBoardDto responseBoardDto;

    public void setReport(List<ResponseReportDto> report) {
        this.report = report;
    }

    @Builder
    public ResponseReplyDto(Long replyId, Long boardId, String replyContent, LocalDateTime replyWriteDate, String replyWriter, List<ResponseReportDto> report, ResponseBoardDto responseBoardDto) {
        this.replyId = replyId;
        this.boardId = boardId;
        this.replyContent = replyContent;
        this.replyWriteDate = replyWriteDate;
        this.replyWriter = replyWriter;
        this.report = report;
        this.responseBoardDto = responseBoardDto;
    }


}
