package goormknights.hotel.coupon.exception;

public class NotAvailableUseCoupon extends RuntimeException{
    public NotAvailableUseCoupon() {
        super();
    }

    public NotAvailableUseCoupon(String message) {
        super(message);
    }
}
