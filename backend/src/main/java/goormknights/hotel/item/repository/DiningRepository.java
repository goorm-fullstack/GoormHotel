package goormknights.hotel.item.repository;

import goormknights.hotel.item.model.Dining;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiningRepository extends JpaRepository<Dining, Long> {

    Dining findByName(String diningName);
    void deleteByName(String diningName);
}
