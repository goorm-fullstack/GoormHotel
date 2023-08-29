package goormknights.hotel.global.exception;

import java.util.HashMap;
import java.util.Map;

public abstract class GroomHotelException extends RuntimeException {

    public final Map<String, String> validation = new HashMap<>();

    public GroomHotelException(String message) {
        super(message);
    }

    public GroomHotelException(String message, Throwable cause) {
        super(message, cause);
    }
    public abstract int getStatusCode();

    public void addValidation(String fieldName, String message) {
        validation.put(fieldName, message);
    }
}
