package goormknights.hotel.item.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDining is a Querydsl query type for Dining
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDining extends EntityPathBase<Dining> {

    private static final long serialVersionUID = -2011280683L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDining dining = new QDining("dining");

    public final QItem _super;

    //inherited
    public final NumberPath<Integer> capacity;

    //inherited
    public final BooleanPath deleted;

    //inherited
    public final NumberPath<Long> id;

    //inherited
    public final StringPath location;

    //inherited
    public final StringPath name;

    //inherited
    public final NumberPath<Integer> price;

    //inherited
    public final NumberPath<Integer> priceAdult;

    //inherited
    public final NumberPath<Integer> priceChildren;

    //inherited
    public final NumberPath<Integer> spare;

    //inherited
    public final NumberPath<Integer> spareAdult;

    //inherited
    public final NumberPath<Integer> spareChildren;

    // inherited
    public final QImage thumbnail;

    //inherited
    public final StringPath type;

    //inherited
    public final StringPath typeDetail;

    public final StringPath useTime = createString("useTime");

    public QDining(String variable) {
        this(Dining.class, forVariable(variable), INITS);
    }

    public QDining(Path<? extends Dining> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDining(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDining(PathMetadata metadata, PathInits inits) {
        this(Dining.class, metadata, inits);
    }

    public QDining(Class<? extends Dining> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this._super = new QItem(type, metadata, inits);
        this.capacity = _super.capacity;
        this.deleted = _super.deleted;
        this.id = _super.id;
        this.location = _super.location;
        this.name = _super.name;
        this.price = _super.price;
        this.priceAdult = _super.priceAdult;
        this.priceChildren = _super.priceChildren;
        this.spare = _super.spare;
        this.spareAdult = _super.spareAdult;
        this.spareChildren = _super.spareChildren;
        this.thumbnail = _super.thumbnail;
        this.type = _super.type;
        this.typeDetail = _super.typeDetail;
    }

}

