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

    private String title;  //제목

    private String boardContent;    //내용

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Builder.Default
    private LocalDateTime boardWriteDate = LocalDateTime.now();    //작성일

    private String boardWriter; //작성자

    private String boardTitle;      //게시판 이름

    private String boardPassword;       //작성자 비밀번호

    private Long memberPk; // 회원의 pk

    private String category;        //게시판-카테고리

    private LocalDateTime boardDeleteTime;      //소프트딜리트 시간

    private String isComment;      //답글 여부

    private Long parentBoardId;     //부모 글 Id

    public Board toEntity() {
        return Board.builder()
                .title(title)
                .boardContent(boardContent)
                .boardWriter(boardWriter)
                .boardWriteDate(boardWriteDate)
                .boardTitle(boardTitle)
                .category(category)
                .isComment(isComment)
                .boardPassword(boardPassword)
                .parentBoardId(parentBoardId)
                .memberPk(memberPk)
                .build();
    }
}
