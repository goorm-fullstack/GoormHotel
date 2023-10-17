package goormknights.hotel.member.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAnonymous is a Querydsl query type for Anonymous
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAnonymous extends EntityPathBase<Anonymous> {

    private static final long serialVersionUID = 1032419160L;

    public static final QAnonymous anonymous = new QAnonymous("anonymous");

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath reservationNumber = createString("reservationNumber");

    public QAnonymous(String variable) {
        super(Anonymous.class, forVariable(variable));
    }

    public QAnonymous(Path<? extends Anonymous> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAnonymous(PathMetadata metadata) {
        super(Anonymous.class, metadata);
    }

}

