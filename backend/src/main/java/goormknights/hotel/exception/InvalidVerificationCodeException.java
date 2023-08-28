package goormknights.hotel.exception;

public class InvalidVerificationCodeException extends GroomHotelException{

    private static final String MESSAGE = "코드가 일치하지 않거나 시간이 만료되었습니다.";
    public InvalidVerificationCodeException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}


