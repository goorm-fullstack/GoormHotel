package goormknights.hotel.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class MemberRepositoryImpl{
    private final JPAQueryFactory jpaQueryFactory;

}
