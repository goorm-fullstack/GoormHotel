package goormknights.hotel.board.repository;

import goormknights.hotel.board.model.Board;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    //인덱스 번호로 게시물 조회
    Board findByBoardIdAndBoardDelete(Long boardId, boolean bool);

    //작성자 이름으로 게시물 조회
    List<Board> findAllByBoardWriterAndBoardDelete(String keyword, boolean bool, Pageable pageable);

    //제목으로 게시물 조회
    List<Board> findAllByTitleContainingAndBoardDelete(String keyword, boolean bool, Pageable pageable);

    //내용으로 게시물 조회
    List<Board> findAllByBoardContentContainingAndBoardDelete(String keyword, boolean bool, Pageable pageable);

    //제목 또는 내용 키워드로 게시물 조회
    @Query("SELECT b FROM Board b WHERE b.title LIKE %:keyword% OR b.boardContent LIKE %:keyword% And b.boardDelete = :bool")
    List<Board> findByTitleOrContent(@Param("keyword") String keyword, @Param("bool") boolean bool, Pageable pageable);

    //삭제 유무 게시물 조회
    List<Board> findAllByBoardDelete(boolean bool, Pageable pageable);

    //게시판 제목으로 게시물 찾기
    List<Board> findAllByBoardTitleAndBoardDelete(String boardTitle, boolean bool, Pageable pageable);

    //게시판-카테고리로 게시물 찾기
    List<Board> findAllByCategoryAndBoardDelete(String category, boolean bool, Pageable pageable);
}
