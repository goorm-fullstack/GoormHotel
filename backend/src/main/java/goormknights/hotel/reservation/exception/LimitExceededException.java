package goormknights.hotel.reservation.exception;

public class LimitExceededException extends RuntimeException {

    public LimitExceededException() {
        super();
    }

    public LimitExceededException(String message) {
        super(message);
    }
}
