package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@DiscriminatorValue("dining")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dining extends Item {

    @Column(nullable = false)
    private String diningName;

    @Column(nullable = false)
    private String diningType;

    @Column(nullable = false)
    private Integer adultCount;

    @Column(nullable = false)
    private Integer childCount;

    @Column(nullable = false)
    private String useTime;

    @Builder
    public Dining(Image image, String name, Integer price, Integer priceAdult, Integer priceChild, String type, String diningName, String diningType, Integer adultCount, Integer childCount, String useTime) {
        super(image, name, price, priceAdult, priceChild, type);
        this.diningName = diningName;
        this.diningType = diningType;
        this.adultCount = adultCount;
        this.childCount = childCount;
        this.useTime = useTime;
    }
}
