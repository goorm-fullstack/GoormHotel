package goormknights.hotel.global.exception;

/**
 * 이미 사용된 이메일인 경우 예외
 */
public class AlreadyExistsEmailException extends GroomHotelException{
    private static final String MESSAGE = "이미 가입된 이메일입니다";
    public AlreadyExistsEmailException(){
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}