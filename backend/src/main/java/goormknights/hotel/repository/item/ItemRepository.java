package goormknights.hotel.repository.item;

import goormknights.hotel.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository<T extends Item> extends JpaRepository<T, Long> {
}
