package goormknights.hotel.reply.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReply is a Querydsl query type for Reply
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReply extends EntityPathBase<Reply> {

    private static final long serialVersionUID = -1347975843L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReply reply = new QReply("reply");

    public final goormknights.hotel.board.model.QBoard board;

    public final StringPath replyContent = createString("replyContent");

    public final DateTimePath<java.time.LocalDateTime> replyDeleteTime = createDateTime("replyDeleteTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> replyId = createNumber("replyId", Long.class);

    public final StringPath replyPassword = createString("replyPassword");

    public final DateTimePath<java.time.LocalDateTime> replyWriteDate = createDateTime("replyWriteDate", java.time.LocalDateTime.class);

    public final StringPath replyWriter = createString("replyWriter");

    public final ListPath<goormknights.hotel.report.model.Report, goormknights.hotel.report.model.QReport> report = this.<goormknights.hotel.report.model.Report, goormknights.hotel.report.model.QReport>createList("report", goormknights.hotel.report.model.Report.class, goormknights.hotel.report.model.QReport.class, PathInits.DIRECT2);

    public QReply(String variable) {
        this(Reply.class, forVariable(variable), INITS);
    }

    public QReply(Path<? extends Reply> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReply(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReply(PathMetadata metadata, PathInits inits) {
        this(Reply.class, metadata, inits);
    }

    public QReply(Class<? extends Reply> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new goormknights.hotel.board.model.QBoard(forProperty("board"), inits.get("board")) : null;
    }

}

