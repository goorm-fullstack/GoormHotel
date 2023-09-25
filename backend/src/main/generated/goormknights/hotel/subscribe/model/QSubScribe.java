package goormknights.hotel.subscribe.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSubScribe is a Querydsl query type for SubScribe
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSubScribe extends EntityPathBase<SubScribe> {

    private static final long serialVersionUID = -961075523L;

    public static final QSubScribe subScribe = new QSubScribe("subScribe");

    public final StringPath emailAddress = createString("emailAddress");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isSubscribe = createBoolean("isSubscribe");

    public QSubScribe(String variable) {
        super(SubScribe.class, forVariable(variable));
    }

    public QSubScribe(Path<? extends SubScribe> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSubScribe(PathMetadata metadata) {
        super(SubScribe.class, metadata);
    }

}

