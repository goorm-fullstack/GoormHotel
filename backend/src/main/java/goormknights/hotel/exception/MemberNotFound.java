package goormknights.hotel.exception;

public class MemberNotFound extends GroomHotelException {

    private static final String MESSAGE = "존재하지 않는 사용자입니다.";
    public MemberNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}