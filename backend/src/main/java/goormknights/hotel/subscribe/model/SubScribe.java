package goormknights.hotel.subscribe.model;

import goormknights.hotel.subscribe.dto.response.ResponseSubScribeDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;


/**
 * 뉴스레터 구독 이메일
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SubScribe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emailAddress;//뉴스레터 구독 이메일
    private String isSubscribe = "Y";//구독여부 -> soft delete

    @Builder
    public SubScribe(String emailAddress, String isSubscribe) {
        this.emailAddress = emailAddress;
        this.isSubscribe = isSubscribe;
    }

    public ResponseSubScribeDto toDto() {
        return new ResponseSubScribeDto(this);
    }

    public void cancelSubscribe() {
        isSubscribe = "N";
    }

    public String isSubscribe() {
        return isSubscribe;
    }
}
