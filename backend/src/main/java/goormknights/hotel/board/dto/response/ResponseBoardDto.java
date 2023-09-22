package goormknights.hotel.board.dto.response;

import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
public class ResponseBoardDto {

    private Long boardId;       //인덱스 번호

    private String boardTitle;  //제목

    private String boardContent;    //내용

    private LocalDateTime boardWriteDate;   //작성일

    private String boardWriter; //작성자

    private List<ResponseReplyDto> reply;  //댓글

    @Builder
    public ResponseBoardDto(Long boardId, String boardTitle, String boardContent, LocalDateTime boardWriteDate, String boardWriter, List<ResponseReplyDto> reply) {
        this.boardId = boardId;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.boardWriteDate = boardWriteDate;
        this.boardWriter = boardWriter;
        this.reply = reply;
    }

}
