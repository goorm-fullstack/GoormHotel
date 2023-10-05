package goormknights.hotel.email.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAttachFile is a Querydsl query type for AttachFile
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAttachFile extends EntityPathBase<AttachFile> {

    private static final long serialVersionUID = -568144804L;

    public static final QAttachFile attachFile = new QAttachFile("attachFile");

    public final StringPath filePath = createString("filePath");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath newFileName = createString("newFileName");

    public final StringPath originalFileName = createString("originalFileName");

    public QAttachFile(String variable) {
        super(AttachFile.class, forVariable(variable));
    }

    public QAttachFile(Path<? extends AttachFile> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAttachFile(PathMetadata metadata) {
        super(AttachFile.class, metadata);
    }

}

