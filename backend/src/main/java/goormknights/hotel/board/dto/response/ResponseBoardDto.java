package goormknights.hotel.board.dto.response;

import goormknights.hotel.board.model.BoardImage;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
public class ResponseBoardDto {

    private Long boardId;       //인덱스 번호

    private String title;  //제목

    private String boardContent;    //내용

    private LocalDateTime boardWriteDate;   //작성일

    private String boardWriter; //작성자

    private List<ResponseReplyDto> reply;  //댓글

    private String boardTitle;      //게시판 이름

    private String category;        //게시판-카테고리

    private List<ResponseReportDto> report;     //신고 정보

    private BoardImage boardImage;      //이미지 넣기

    private boolean isComment;      //답글 여부


    @Builder
    public ResponseBoardDto(boolean isComment, Long boardId, String title, String boardContent, LocalDateTime boardWriteDate, String boardWriter, String boardTitle, String category, List<ResponseReplyDto> reply, List<ResponseReportDto> report, BoardImage boardImage) {
        this.boardId = boardId;
        this.title = title;
        this.boardContent = boardContent;
        this.boardWriteDate = boardWriteDate;
        this.boardWriter = boardWriter;
        this.reply = reply;
        this.report = report;
        this.boardTitle = boardTitle;
        this.category = category;
        this.boardImage = boardImage;
        this.isComment = isComment;
    }

}
