package goormknights.hotel.reply.model;

import goormknights.hotel.board.model.Board;
import goormknights.hotel.reply.dto.request.RequestReplyDto;
import goormknights.hotel.reply.dto.response.ResponseReplyDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;   //댓글 인덱스 번호

    @Column(nullable = false)
    private String replyContent;    //댓글 내용

    @Column(nullable = false)
    private String replyWriter;     //댓글 작성자

    @Column(nullable = false)
    private LocalDateTime replyWriteDate;   //댓글 작성 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;        //게시글

    public void setBoard(Board board) {
        this.board = board;
    }

    @Builder(toBuilder = true)
    public Reply(Long replyId, String replyContent, String replyWriter, LocalDateTime replyWriteDate) {
        this.replyId = replyId;
        this.replyContent = replyContent;
        this.replyWriter = replyWriter;
        this.replyWriteDate = replyWriteDate;
    }

    public ResponseReplyDto toResponseReplyDto() {
        return ResponseReplyDto.builder()
                .replyId(replyId)
                .boardId(board.getBoardId())
                .replyContent(replyContent)
                .replyWriteDate(replyWriteDate)
                .replyWriter(replyWriter)
                .build();
    }

    public Reply updateReply(Long replyId, RequestReplyDto requestReplyDto){
        return this.toBuilder()
                .replyId(replyId)
                .replyContent(requestReplyDto.getReplyContent())
                .replyWriter(requestReplyDto.getReplyWriter())
                .build();
    }


}
