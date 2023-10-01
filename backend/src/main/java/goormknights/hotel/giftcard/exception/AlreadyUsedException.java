package goormknights.hotel.giftcard.exception;

/**
 * 이미 사용된 상품권인 경우 예외
 */
public class AlreadyUsedException extends RuntimeException {
    public AlreadyUsedException() {
        super();
    }

    public AlreadyUsedException(String message) {
        super(message);
    }
}
