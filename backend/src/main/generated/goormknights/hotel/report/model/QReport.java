package goormknights.hotel.report.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReport is a Querydsl query type for Report
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReport extends EntityPathBase<Report> {

    private static final long serialVersionUID = -1889340977L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReport report = new QReport("report");

    public final goormknights.hotel.board.model.QBoard board;

    public final goormknights.hotel.reply.model.QReply reply;

    public final BooleanPath reportCheck = createBoolean("reportCheck");

    public final DateTimePath<java.time.LocalDateTime> reportDate = createDateTime("reportDate", java.time.LocalDateTime.class);

    public final BooleanPath reportDelete = createBoolean("reportDelete");

    public final NumberPath<Long> reportId = createNumber("reportId", Long.class);

    public final StringPath reportReason = createString("reportReason");

    public final StringPath reportResult = createString("reportResult");

    public final StringPath reportWriter = createString("reportWriter");

    public QReport(String variable) {
        this(Report.class, forVariable(variable), INITS);
    }

    public QReport(Path<? extends Report> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReport(PathMetadata metadata, PathInits inits) {
        this(Report.class, metadata, inits);
    }

    public QReport(Class<? extends Report> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new goormknights.hotel.board.model.QBoard(forProperty("board"), inits.get("board")) : null;
        this.reply = inits.isInitialized("reply") ? new goormknights.hotel.reply.model.QReply(forProperty("reply"), inits.get("reply")) : null;
    }

}

