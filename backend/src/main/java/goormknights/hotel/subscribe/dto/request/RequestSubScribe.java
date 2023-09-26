package goormknights.hotel.subscribe.dto.request;

import goormknights.hotel.subscribe.model.SubScribe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestSubScribe {

    private String emailAddress;
    private String isSubscribe = "Y";

    public SubScribe toEntity() {
        return SubScribe.builder()
                .emailAddress(emailAddress)
                .isSubscribe(isSubscribe)
                .build();
    }
}
