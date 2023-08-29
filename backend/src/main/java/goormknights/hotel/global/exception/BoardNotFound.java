package goormknights.hotel.global.exception;

public class BoardNotFound extends GroomHotelException {

    private static final String MESSAGE = "존재하지 않는 게시글입니다.";
    public BoardNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
