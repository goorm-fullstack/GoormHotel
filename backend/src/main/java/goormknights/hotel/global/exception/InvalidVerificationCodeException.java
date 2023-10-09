package goormknights.hotel.global.exception;

public class InvalidVerificationCodeException extends GroomHotelException{

    private static final String MESSAGE = "코드가 일치하지 않거나 시간이 만료되었습니다.";
    private static final int ERROR_CODE = 1001;

    public InvalidVerificationCodeException() {
        super(MESSAGE);
    }

    public int getErrorCode() {
        return ERROR_CODE;
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}

