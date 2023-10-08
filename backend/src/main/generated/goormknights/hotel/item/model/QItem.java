package goormknights.hotel.item.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QItem is a Querydsl query type for Item
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QItem extends EntityPathBase<Item> {

    private static final long serialVersionUID = -578469329L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QItem item = new QItem("item");

    public final NumberPath<Integer> capacity = createNumber("capacity", Integer.class);

    public final BooleanPath deleted = createBoolean("deleted");

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Integer> priceAdult = createNumber("priceAdult", Integer.class);

    public final NumberPath<Integer> priceChildren = createNumber("priceChildren", Integer.class);

    public final NumberPath<Integer> spare = createNumber("spare", Integer.class);

    public final NumberPath<Integer> spareAdult = createNumber("spareAdult", Integer.class);

    public final NumberPath<Integer> spareChildren = createNumber("spareChildren", Integer.class);

    public final QImage thumbnail;

    public final StringPath type = createString("type");

    public final StringPath typeDetail = createString("typeDetail");

    public QItem(String variable) {
        this(Item.class, forVariable(variable), INITS);
    }

    public QItem(Path<? extends Item> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QItem(PathMetadata metadata, PathInits inits) {
        this(Item.class, metadata, inits);
    }

    public QItem(Class<? extends Item> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.thumbnail = inits.isInitialized("thumbnail") ? new QImage(forProperty("thumbnail")) : null;
    }

}

