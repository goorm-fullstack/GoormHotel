package goormknights.hotel.giftcard.exception;

/**
 * 사용할 수 없는 상품권인 경우 예외
 */
public class NotAvailableException extends RuntimeException{
    public NotAvailableException() {
        super();
    }

    public NotAvailableException(String message) {
        super(message);
    }
}
