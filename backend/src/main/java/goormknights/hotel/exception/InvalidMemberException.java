package goormknights.hotel.exception;

public class InvalidMemberException extends RuntimeException {

    public InvalidMemberException(final String message) {
        super(message);
    }

    public InvalidMemberException() {
        this("잘못된 회원정보 입니다.");
    }
}
