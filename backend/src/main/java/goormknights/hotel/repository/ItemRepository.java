package goormknights.hotel.repository;

import goormknights.hotel.model.Dining;
import goormknights.hotel.model.Item;
import goormknights.hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository<T extends Item> extends JpaRepository<T, Long> {

    @Query("select i from Item i" + " where i.type = :type")
    List<Dining> findAllDining(@Param("type") String type);

    @Query("select i from Item i" + " where i.type = :type")
    List<Room> findAllRoom(@Param("type") String type);
}
