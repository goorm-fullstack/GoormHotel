package goormknights.hotel.subscribe.dto.response;

import goormknights.hotel.subscribe.model.SubScribe;
import lombok.Data;

@Data
public class ResponseSubScribeDto {

    private Long id;
    private String emailAddress;
    private boolean isSubscribe;

    public ResponseSubScribeDto(SubScribe subScribe) {
        this.id = subScribe.getId();
        this.emailAddress = subScribe.getEmailAddress();
        this.isSubscribe = subScribe.isSubscribe();
    }
}
