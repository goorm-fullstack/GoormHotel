package goormknights.hotel.model;

import goormknights.hotel.exception.AlreadyUsedException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String uuid;
    private int discountRate;

    @ManyToOne
    private Member member;

    private char isUsed = 'N';// Y이면 사용한 쿠폰, N이면 사용하지 않은 쿠폰

    private LocalDateTime issueDate;//발행일
    private int expire;//만료일

    // 아마 사용하지는 않을 것 같은 생성자
    public Coupon(String uuid) {
        this.uuid = uuid;
        this.discountRate = 10;
    }

    // 만약 사용자가 쿠폰을 등록하는 경우나
    // 사용자에게 쿠폰이 주어지는 경우 사용될 예정입니다
    public Coupon(String uuid, Member member) {
        this.uuid = uuid;
        String grade = member.getGrade();
        switch (grade) {
            case "Bronze":
                this.discountRate = 5;
                break;
            case "Silver":
                this.discountRate = 10;
                break;
            case "Gold":
                this.discountRate = 15;
                break;
            default:
                this.discountRate = 0;
        }
        this.member = member;
        member.getCouponList().add(this);
    }

    public void setIsUsed() {
        if(this.isUsed=='N') {
            this.isUsed = 'Y';
        } else {
            throw new AlreadyUsedException("이미 사용한 쿠폰입니다.");
        }
    }
}
