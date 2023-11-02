package goormknights.hotel.giftcard.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class RequestGiftCardIdListDto {
    private List<Long> giftCardIdList;
}
