package goormknights.hotel.coupon.exception;

public class AlreadyUsedException extends RuntimeException {
    public AlreadyUsedException() {
        super();
    }

    public AlreadyUsedException(String message) {
        super(message);
    }
}
