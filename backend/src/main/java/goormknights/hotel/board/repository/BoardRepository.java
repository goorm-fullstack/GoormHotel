package goormknights.hotel.board.repository;

import goormknights.hotel.board.model.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    //인덱스 번호로 게시물 조회
    Board findByBoardId(Long boardId);

    //작성자 이름으로 게시물 조회
    List<Board> findAllByBoardWriter(String keyword, Pageable pageable);

    //제목으로 게시물 조회
    List<Board> findAllByTitleContaining(String keyword, Pageable pageable);

    //내용으로 게시물 조회
    List<Board> findAllByBoardContentContaining(String keyword, Pageable pageable);

    //제목 또는 내용 키워드로 게시물 조회
    @Query("SELECT b FROM Board b WHERE b.title LIKE %:keyword% OR b.boardContent LIKE %:keyword% And b.boardDeleteTime = null")
    List<Board> findByTitleOrContent(@Param("keyword") String keyword, Pageable pageable);

    //삭제 유무 게시물 조회
    Page<Board> findAll(Pageable pageable);

    //게시판 제목으로 게시물 찾기
    Page<Board> findAllByBoardTitle(String boardTitle, Pageable pageable);

    //게시판-카테고리로 게시물 찾기
    List<Board> findAllByCategory(String category, Pageable pageable);

    Optional<Board> findByTitle(String boardTitle);

    Optional<Board> findByParentBoardId(Long parentBoardId);


}
