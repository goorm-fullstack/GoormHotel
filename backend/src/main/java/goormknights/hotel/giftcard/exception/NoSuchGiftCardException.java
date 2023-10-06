package goormknights.hotel.giftcard.exception;

public class NoSuchGiftCardException extends RuntimeException{
    public NoSuchGiftCardException() {
        super();
    }

    public NoSuchGiftCardException(String message) {
        super(message);
    }
}
