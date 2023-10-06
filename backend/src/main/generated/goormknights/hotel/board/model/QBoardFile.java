package goormknights.hotel.board.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBoardFile is a Querydsl query type for BoardFile
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoardFile extends EntityPathBase<BoardFile> {

    private static final long serialVersionUID = -922953103L;

    public static final QBoardFile boardFile = new QBoardFile("boardFile");

    public final BooleanPath boardFileDelete = createBoolean("boardFileDelete");

    public final NumberPath<Long> boardFileId = createNumber("boardFileId", Long.class);

    public final StringPath boardFileName = createString("boardFileName");

    public final StringPath boardFilePath = createString("boardFilePath");

    public final ArrayPath<byte[], Byte> data = createArray("data", byte[].class);

    public final StringPath mimeType = createString("mimeType");

    public final StringPath originalboardFileName = createString("originalboardFileName");

    public QBoardFile(String variable) {
        super(BoardFile.class, forVariable(variable));
    }

    public QBoardFile(Path<? extends BoardFile> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoardFile(PathMetadata metadata) {
        super(BoardFile.class, metadata);
    }

}

