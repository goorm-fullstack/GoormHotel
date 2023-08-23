package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class Item {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Image image;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private Integer priceAdult;

    @Column(nullable = false)
    private Integer priceChild;

    @Column(nullable = false)
    private String type;

    public Item(Image image, String name, Integer price, Integer priceAdult, Integer priceChild, String type) {
        this.image = image;
        this.name = name;
        this.price = price;
        this.priceAdult = priceAdult;
        this.priceChild = priceChild;
        this.type = type;
    }
}
