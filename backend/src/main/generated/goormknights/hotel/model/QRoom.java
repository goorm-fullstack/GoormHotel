package goormknights.hotel.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = 284735876L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoom room = new QRoom("room");

    public final QItem _super;

    public final StringPath bed = createString("bed");

    public final NumberPath<Integer> capacity = createNumber("capacity", Integer.class);

    //inherited
    public final BooleanPath deleted;

    //inherited
    public final NumberPath<Long> id;

    //inherited
    public final StringPath name;

    //inherited
    public final NumberPath<Integer> price;

    //inherited
    public final NumberPath<Integer> priceAdult;

    //inherited
    public final NumberPath<Integer> priceChild;

    public final NumberPath<Integer> roomAdult = createNumber("roomAdult", Integer.class);

    public final NumberPath<Integer> roomChild = createNumber("roomChild", Integer.class);

    public final NumberPath<Integer> spare = createNumber("spare", Integer.class);

    // inherited
    public final QImage thumbnail;

    //inherited
    public final StringPath type;

    //inherited
    public final StringPath typeDetail;

    public QRoom(String variable) {
        this(Room.class, forVariable(variable), INITS);
    }

    public QRoom(Path<? extends Room> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoom(PathMetadata metadata, PathInits inits) {
        this(Room.class, metadata, inits);
    }

    public QRoom(Class<? extends Room> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this._super = new QItem(type, metadata, inits);
        this.deleted = _super.deleted;
        this.id = _super.id;
        this.name = _super.name;
        this.price = _super.price;
        this.priceAdult = _super.priceAdult;
        this.priceChild = _super.priceChild;
        this.thumbnail = _super.thumbnail;
        this.type = _super.type;
        this.typeDetail = _super.typeDetail;
    }

}

