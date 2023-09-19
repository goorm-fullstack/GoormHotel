package goormknights.hotel.item.repository;

import goormknights.hotel.item.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository<T extends Item> extends JpaRepository<T, Long> {

    // 상품 이름으로 찾기
    Optional<Item> findByName(String itemName);

    // 타입을 통한 카테고리화
    @Query("select i from Item i" + " where i.type = :type")
    Page<Item> findAllByType(@Param("type") String type, Pageable pageable);

    // 세부타입을 통한 카테고리화
    @Query("select i from Item i" + " where i.typeDetail = :typeDetail")
    Page<Item> findAllByTypeDetail(@Param("typeDetail") String typeDetail, Pageable pageable);

    // 검색 기능
    @Query("select i from Item i" + " where i.name like %:keyword%")
    Page<Item> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
