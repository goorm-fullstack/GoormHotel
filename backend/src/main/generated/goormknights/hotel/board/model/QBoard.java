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

    public final DateTimePath<java.time.LocalDateTime> boardDeleteTime = createDateTime("boardDeleteTime", java.time.LocalDateTime.class);

    public final QBoardFile boardFile;

    public final NumberPath<Long> boardId = createNumber("boardId", Long.class);

    public final QBoardImage boardImage;

    public final StringPath boardPassword = createString("boardPassword");

    public final StringPath boardTitle = createString("boardTitle");

    public final DateTimePath<java.time.LocalDateTime> boardWriteDate = createDateTime("boardWriteDate", java.time.LocalDateTime.class);

    public final StringPath boardWriter = createString("boardWriter");

    public final StringPath category = createString("category");

    public final StringPath isComment = createString("isComment");

    public final ListPath<goormknights.hotel.reply.model.Reply, goormknights.hotel.reply.model.QReply> replies = this.<goormknights.hotel.reply.model.Reply, goormknights.hotel.reply.model.QReply>createList("replies", goormknights.hotel.reply.model.Reply.class, goormknights.hotel.reply.model.QReply.class, PathInits.DIRECT2);

    public final ListPath<goormknights.hotel.report.model.Report, goormknights.hotel.report.model.QReport> report = this.<goormknights.hotel.report.model.Report, goormknights.hotel.report.model.QReport>createList("report", goormknights.hotel.report.model.Report.class, goormknights.hotel.report.model.QReport.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

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
        this.boardFile = inits.isInitialized("boardFile") ? new QBoardFile(forProperty("boardFile")) : null;
        this.boardImage = inits.isInitialized("boardImage") ? new QBoardImage(forProperty("boardImage")) : null;
    }

}

