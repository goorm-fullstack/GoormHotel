package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 테스트용도 입니다.
 */
@Entity
@Getter
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int price;
    private String name;

    @Builder
    public Item(int price, String name) {
        this.price = price;
        this.name = name;
    }
}
