package goormknights.hotel.member.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -935368817L;

    public static final QMember member = new QMember("member1");

    public final goormknights.hotel.global.entity.QBaseEntity _super = new goormknights.hotel.global.entity.QBaseEntity(this);

    public final StringPath auth = createString("auth");

    public final DatePath<java.time.LocalDate> birth = createDate("birth", java.time.LocalDate.class);

    public final ListPath<goormknights.hotel.coupon.model.Coupon, goormknights.hotel.coupon.model.QCoupon> couponList = this.<goormknights.hotel.coupon.model.Coupon, goormknights.hotel.coupon.model.QCoupon>createList("couponList", goormknights.hotel.coupon.model.Coupon.class, goormknights.hotel.coupon.model.QCoupon.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath email = createString("email");

    public final StringPath gender = createString("gender");

    public final StringPath grade = createString("grade");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath mailAuth = createBoolean("mailAuth");

    public final DateTimePath<java.time.LocalDateTime> memberDeleteTime = createDateTime("memberDeleteTime", java.time.LocalDateTime.class);

    public final StringPath memberId = createString("memberId");

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final BooleanPath privacyCheck = createBoolean("privacyCheck");

    public final ListPath<goormknights.hotel.reservation.model.Reservation, goormknights.hotel.reservation.model.QReservation> reservationList = this.<goormknights.hotel.reservation.model.Reservation, goormknights.hotel.reservation.model.QReservation>createList("reservationList", goormknights.hotel.reservation.model.Reservation.class, goormknights.hotel.reservation.model.QReservation.class, PathInits.DIRECT2);

    public final EnumPath<goormknights.hotel.global.entity.Role> role = createEnum("role", goormknights.hotel.global.entity.Role.class);

    public final StringPath roomId = createString("roomId");

    public final DatePath<java.time.LocalDate> signupDate = createDate("signupDate", java.time.LocalDate.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

