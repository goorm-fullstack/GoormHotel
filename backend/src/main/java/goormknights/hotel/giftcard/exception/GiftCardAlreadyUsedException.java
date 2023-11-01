package goormknights.hotel.giftcard.exception;

/**
 * 이미 사용된 상품권인 경우 예외
 */
public class GiftCardAlreadyUsedException extends RuntimeException {
    // 쿠폰 Exception이랑 이름 겹쳐서 수정했습니다.
    public GiftCardAlreadyUsedException() {
        super();
    }

    public GiftCardAlreadyUsedException(String message) {
        super(message);
    }
}
