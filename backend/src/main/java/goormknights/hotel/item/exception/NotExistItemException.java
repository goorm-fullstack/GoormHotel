package goormknights.hotel.item.exception;

public class NotExistItemException extends RuntimeException{
    public NotExistItemException() {
        super();
    }

    public NotExistItemException(String message) {
        super(message);
    }
}
