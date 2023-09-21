package goormknights.hotel.board.dto.request;

import goormknights.hotel.board.model.Board;
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
public class RequestBoardDto {

    private Long boardId;

    private String title;  //제목

    private String boardContent;    //내용

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Builder.Default
    private LocalDateTime boardWriteDate  = LocalDateTime.now();    //작성일

    private String boardWriter; //작성자

    private String boardTitle;      //게시판 이름

    private String category;        //게시판-카테고리

//    @Builder
//    public RequestBoardDto(String title, String boardContent, String boardWriter) {
//        this.title = title;
//        this.boardContent = boardContent;
//        this.boardWriter = boardWriter;
//    }

    public Board toEntity() {
        return Board.builder()
                .boardId(boardId)
                .title(title)
                .boardContent(boardContent)
                .boardWriter(boardWriter)
                .boardWriteDate(boardWriteDate)
                .boardTitle(boardTitle)
                .category(category)
                .build();
    }
}
