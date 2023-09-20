package goormknights.hotel.board.model;

import goormknights.hotel.board.dto.request.RequestBoardDto;
import goormknights.hotel.board.dto.response.ResponseBoardDto;
import goormknights.hotel.reply.model.Reply;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "board_delete = false")
@SQLDelete(sql = "UPDATE Board SET board_Delete = true WHERE board_Id = ?")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;       //인덱스 번호

    @Column(nullable = false)
    private String boardTitle;  //제목

    @Column(nullable = false)
    private String boardContent;    //내용

    @Column(nullable = false)
    private LocalDateTime boardWriteDate;   //게시글 작성 시간

    @Column(nullable = false)
    private String boardWriter;              //작성자

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private BoardImage boardImage;       //이미지 저장

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies = new ArrayList<>();

    @Column(nullable = false)
    //@Builder.Default
    private Boolean boardDelete = false;

//    @ManyToOne
//    private Member member;

    @Builder(toBuilder = true)
    public Board(Long boardId, String boardTitle, String boardContent, String boardWriter, LocalDateTime boardWriteDate, BoardImage boardImage) {
        this.boardId = boardId;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.boardWriter = boardWriter;
        this.boardWriteDate = boardWriteDate;
        this.boardImage = boardImage;
    }

    public ResponseBoardDto toResponseBoardDto(){
        return ResponseBoardDto.builder()
                .boardId(boardId)
                .boardTitle(boardTitle)
                .boardContent(boardContent)
                .boardWriteDate(boardWriteDate)
                .boardWriter(boardWriter)
                .build();
    }

    public Board updateBoard(Long boardId, RequestBoardDto requestBoardDto){
        return this.toBuilder()
                .boardId(boardId)
                .boardTitle(requestBoardDto.getBoardTitle())
                .boardContent(requestBoardDto.getBoardContent())
                .boardWriter(requestBoardDto.getBoardWriter())
                .build();
    }

}