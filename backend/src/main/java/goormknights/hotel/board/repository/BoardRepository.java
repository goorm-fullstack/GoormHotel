package goormknights.hotel.board.repository;

import goormknights.hotel.board.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    //인덱스 번호로 게시물 조회
    Board findByBoardIdAndBoardDelete(Long boardId, boolean bool);

    //작성자 이름으로 게시물 조회
    List<Board> findByBoardWriterAndBoardDelete(String keyword, boolean bool);

    //제목으로 게시물 조회
    List<Board> findByBoardTitleContainingAndBoardDelete(String keyword, boolean bool);

    //내용으로 게시물 조회
    List<Board> findByBoardContentContainingAndBoardDelete(String keyword, boolean bool);

    //제목 또는 내용 키워드로 게시물 조회
    @Query("SELECT b FROM Board b WHERE b.boardTitle LIKE %:keyword% OR b.boardContent LIKE %:keyword% And b.boardDelete = :bool")
    List<Board> findByTitleOrContent(@Param("keyword") String keyword, @Param("bool") boolean bool);

    //게시물 삭제
    void deleteByBoardId(Long boardId);

    //삭제 유무 게시물 조회
    List<Board> findAllByBoardDelete(boolean bool);

}