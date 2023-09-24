package goormknights.hotel.board.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBoardImage is a Querydsl query type for BoardImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoardImage extends EntityPathBase<BoardImage> {

    private static final long serialVersionUID = 1456104198L;

    public static final QBoardImage boardImage = new QBoardImage("boardImage");

    public final BooleanPath boardImageDelete = createBoolean("boardImageDelete");

    public final NumberPath<Long> boardImageId = createNumber("boardImageId", Long.class);

    public final StringPath boardImageName = createString("boardImageName");

    public final StringPath boardImagePath = createString("boardImagePath");

    public final StringPath originalboardImageName = createString("originalboardImageName");

    public QBoardImage(String variable) {
        super(BoardImage.class, forVariable(variable));
    }

    public QBoardImage(Path<? extends BoardImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoardImage(PathMetadata metadata) {
        super(BoardImage.class, metadata);
    }

}

