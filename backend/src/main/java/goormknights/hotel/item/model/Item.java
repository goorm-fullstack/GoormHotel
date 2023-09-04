package goormknights.hotel.item.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // 상속 관계 매핑 (join)
@DiscriminatorColumn // Dtype
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder(toBuilder = true)
@Where(clause = "DELETED = false")
@SQLDelete(sql = "UPDATE item SET deleted = true WHERE id = ?")
public abstract class Item {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private Image thumbnail; // 썸네일이미지

    @Column(nullable = false)
    private String name; // 상품명

    @Column(nullable = false)
    private int price; // 기본 비용

    @Column(nullable = false)
    private int priceAdult; // 어른 추가 비용

    @Column(nullable = false)
    private int priceChildren; // 어린이 추가 비용

    @Column(nullable = false)
    private int spare; // 잔여 객실 수

    @Column(nullable = false)
    private int spareAdult; // 최대 숙박 가능 인원 수(어른)

    @Column(nullable = false)
    private int spareChildren; // 최대 숙박 가능 인원 수(어린이)

    @Column(nullable = false)
    private String type; // 상품 타입(ex. 객실, 다이닝)

    /**
     * 세부 타입
     * 객실: 디럭스, 스위트, 패밀리, 풀 빌라
     * 다이닝: 레스토랑, 룸서비스, 바&라운지(바, 라운지), 베이커리
     */
    @Column(nullable = false)
    private String typeDetail;

    @Column(nullable = false)
    @Builder.Default
    private boolean deleted = false; // soft delete 여부 구분
}