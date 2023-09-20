package goormknights.hotel.reply.repository;

import goormknights.hotel.board.model.Board;
import goormknights.hotel.reply.model.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReplyRepository extends JpaRepository<Reply, Long> {

    //댓글 내용으로 조회
    List<Reply> findByReplyContentContaining(String keyword);

    //댓글 번호로 찾기
    Reply findByReplyId(Long replyId);

    //게시글 번호로 댓글 찾기
    List<Reply> findByBoard(Board board);
}