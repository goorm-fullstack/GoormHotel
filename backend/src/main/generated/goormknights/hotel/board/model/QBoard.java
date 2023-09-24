package goormknights.hotel.board.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = -361290923L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard board = new QBoard("board");

    public final StringPath boardContent = createString("boardContent");

    public final BooleanPath boardDelete = createBoolean("boardDelete");

    public final NumberPath<Long> boardId = createNumber("boardId", Long.class);

    public final QBoardImage boardImage;

    public final StringPath boardTitle = createString("boardTitle");

    public final DateTimePath<java.time.LocalDateTime> boardWriteDate = createDateTime("boardWriteDate", java.time.LocalDateTime.class);

    public final StringPath boardWriter = createString("boardWriter");

    public final ListPath<goormknights.hotel.reply.model.Reply, goormknights.hotel.reply.model.QReply> replies = this.<goormknights.hotel.reply.model.Reply, goormknights.hotel.reply.model.QReply>createList("replies", goormknights.hotel.reply.model.Reply.class, goormknights.hotel.reply.model.QReply.class, PathInits.DIRECT2);

    public QBoard(String variable) {
        this(Board.class, forVariable(variable), INITS);
    }

    public QBoard(Path<? extends Board> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard(PathMetadata metadata, PathInits inits) {
        this(Board.class, metadata, inits);
    }

    public QBoard(Class<? extends Board> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.boardImage = inits.isInitialized("boardImage") ? new QBoardImage(forProperty("boardImage")) : null;
    }

}

