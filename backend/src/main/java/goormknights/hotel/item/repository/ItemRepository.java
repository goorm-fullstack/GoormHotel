package goormknights.hotel.item.repository;
import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository<T extends Item> extends JpaRepository<T, Long> {

    // 다이닝 카테고리화
    @Query("select i from Item i" + " where i.type = :type")
    List<Dining> findAllDining(@Param("type") String type);

    // 객실 카테고리화
    @Query("select i from Item i" + " where i.type = :type")
    List<Room> findAllRoom(@Param("type") String type);

    @Query("select i from Item i" + " where i.type = :type")
    List<Item> findAllByType(@Param("type") String type);

    // 세부타입을 통한 카테고리화
    @Query("select i from Item i" + " where i.typeDetail = :typeDetail")
    List<Item> findAllByTypeDetail(@Param("typeDetail") String typeDetail);

    // 검색 기능
    @Query("select i from Item i" + " where i.name like %:keyword%")
    List<Item> findByKeyword(@Param("keyword") String keyword);
}
