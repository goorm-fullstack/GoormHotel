package goormknights.hotel.item.exception;

public class DuplicatedItemNameException extends RuntimeException{
    public DuplicatedItemNameException() {
        super();
    }

    public DuplicatedItemNameException(String message) {
        super(message);
    }
}
