package goormknights.hotel.chat.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QChatRoomDto is a Querydsl query type for ChatRoomDto
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatRoomDto extends EntityPathBase<ChatRoomDto> {

    private static final long serialVersionUID = -2141724939L;

    public static final QChatRoomDto chatRoomDto = new QChatRoomDto("chatRoomDto");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final StringPath roomId = createString("roomId");

    public QChatRoomDto(String variable) {
        super(ChatRoomDto.class, forVariable(variable));
    }

    public QChatRoomDto(Path<? extends ChatRoomDto> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChatRoomDto(PathMetadata metadata) {
        super(ChatRoomDto.class, metadata);
    }

}

