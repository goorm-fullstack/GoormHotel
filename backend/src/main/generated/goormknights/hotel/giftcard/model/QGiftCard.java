package goormknights.hotel.giftcard.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGiftCard is a Querydsl query type for GiftCard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGiftCard extends EntityPathBase<GiftCard> {

    private static final long serialVersionUID = 1542879919L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGiftCard giftCard = new QGiftCard("giftCard");

    public final NumberPath<Integer> expire = createNumber("expire", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final DatePath<java.time.LocalDate> issueDate = createDate("issueDate", java.time.LocalDate.class);

    public final ComparablePath<Character> isZeroMoney = createComparable("isZeroMoney", Character.class);

    public final goormknights.hotel.member.model.QMember member;

    public final NumberPath<Integer> money = createNumber("money", Integer.class);

    public final goormknights.hotel.reservation.model.QReservation reservation;

    public final StringPath title = createString("title");

    public final StringPath uuid = createString("uuid");

    public QGiftCard(String variable) {
        this(GiftCard.class, forVariable(variable), INITS);
    }

    public QGiftCard(Path<? extends GiftCard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGiftCard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGiftCard(PathMetadata metadata, PathInits inits) {
        this(GiftCard.class, metadata, inits);
    }

    public QGiftCard(Class<? extends GiftCard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new goormknights.hotel.member.model.QMember(forProperty("member")) : null;
        this.reservation = inits.isInitialized("reservation") ? new goormknights.hotel.reservation.model.QReservation(forProperty("reservation"), inits.get("reservation")) : null;
    }

}

