package goormknights.hotel.reservation.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReservation is a Querydsl query type for Reservation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReservation extends EntityPathBase<Reservation> {

    private static final long serialVersionUID = 1307945825L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReservation reservation = new QReservation("reservation");

    public final NumberPath<Integer> adult = createNumber("adult", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> checkIn = createDateTime("checkIn", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> checkOut = createDateTime("checkOut", java.time.LocalDateTime.class);

    public final NumberPath<Integer> children = createNumber("children", Integer.class);

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final goormknights.hotel.coupon.model.QCoupon coupon;

    public final NumberPath<Integer> discountPrice = createNumber("discountPrice", Integer.class);

    public final ListPath<goormknights.hotel.giftcard.model.GiftCard, goormknights.hotel.giftcard.model.QGiftCard> giftCard = this.<goormknights.hotel.giftcard.model.GiftCard, goormknights.hotel.giftcard.model.QGiftCard>createList("giftCard", goormknights.hotel.giftcard.model.GiftCard.class, goormknights.hotel.giftcard.model.QGiftCard.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final goormknights.hotel.item.model.QItem item;

    public final goormknights.hotel.member.model.QMember member;

    public final goormknights.hotel.member.model.QAnonymous nonMember;

    public final StringPath notice = createString("notice");

    public final DateTimePath<java.time.LocalDateTime> orderDate = createDateTime("orderDate", java.time.LocalDateTime.class);

    public final StringPath reservationNumber = createString("reservationNumber");

    public final StringPath state = createString("state");

    public final NumberPath<Integer> stay = createNumber("stay", Integer.class);

    public final NumberPath<Integer> sumPrice = createNumber("sumPrice", Integer.class);

    public final NumberPath<Integer> totalPrice = createNumber("totalPrice", Integer.class);

    public QReservation(String variable) {
        this(Reservation.class, forVariable(variable), INITS);
    }

    public QReservation(Path<? extends Reservation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReservation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReservation(PathMetadata metadata, PathInits inits) {
        this(Reservation.class, metadata, inits);
    }

    public QReservation(Class<? extends Reservation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.coupon = inits.isInitialized("coupon") ? new goormknights.hotel.coupon.model.QCoupon(forProperty("coupon"), inits.get("coupon")) : null;
        this.item = inits.isInitialized("item") ? new goormknights.hotel.item.model.QItem(forProperty("item"), inits.get("item")) : null;
        this.member = inits.isInitialized("member") ? new goormknights.hotel.member.model.QMember(forProperty("member")) : null;
        this.nonMember = inits.isInitialized("nonMember") ? new goormknights.hotel.member.model.QAnonymous(forProperty("nonMember")) : null;
    }

}

