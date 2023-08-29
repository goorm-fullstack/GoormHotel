package goormknights.hotel.auth.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class MemberRepositoryImpl{
    private final JPAQueryFactory jpaQueryFactory;

}
