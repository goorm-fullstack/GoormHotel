package goormknights.hotel.reply.dto.request;

import goormknights.hotel.reply.model.Reply;
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
public class RequestReplyDto {

    private Long replyId;   //댓글 번호

    private Long boardId;   //게시글 번호

    private String replyContent;    //댓글 내용

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Builder.Default
    private LocalDateTime replyWriteDate = LocalDateTime.now();     //댓글 작성 시간

    @Builder.Default
    private LocalDateTime replyDeleteTime = null;

    private String replyWriter;     //댓글 작성자

    private String replyPassword;

    public Reply toEntity() {
        return Reply.builder()
                .replyId(replyId)
                .replyContent(replyContent)
                .replyWriteDate(replyWriteDate)
                .replyWriter(replyWriter)
                .replyDeleteTime(replyDeleteTime)
                .replyPassword(replyPassword)
                .build();
    }
}
