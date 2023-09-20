import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { commonContainerStyle } from '../../components/common/commonStyles';

const Container = styled.div`
  ${commonContainerStyle}
`;

const SiteMap = styled.div``;

const Title = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: rgb(17, 17, 17);
  margin-bottom: 100px;
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 100px 80px;
`;

const SubTitle = styled.p`
  font-size: 22px;
  font-weight: 500;
  width: 340px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(221, 221, 221);
`;

const List = styled.li`
  font-size: 18px;
  font-weight: 400;
  color: rgb(102, 102, 102);
  line-height: 1.8;
  &:hover {
    color: rgb(186, 160, 133);
    cursor: pointer;
  }
`;

const SiteMapLink = styled(Link)`
  color: inherit;
`;

const Sitemap = () => {
  return (
    <>
      <Container>
        <SiteMap>
          <Title>사이트맵</Title>
          <Items>
            <ul>
              <SubTitle>
                <SiteMapLink to="/">구름호텔 소개</SiteMapLink>
              </SubTitle>
              <List>
                <SiteMapLink to="/">호텔 소개</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">오시는 길</SiteMapLink>
              </List>
            </ul>
            <ul>
              <SubTitle>
                <SiteMapLink to="/">시설 소개</SiteMapLink>
              </SubTitle>
              <List>
                <SiteMapLink to="/">객식</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">다이닝</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">부대시설</SiteMapLink>
              </List>
            </ul>
            <ul>
              <SubTitle>
                <SiteMapLink to="/">스페셜 오퍼</SiteMapLink>
              </SubTitle>
              <List>
                <SiteMapLink to="/">패키지/프로모션</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">객실/다이닝 예약</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">예약확인</SiteMapLink>
              </List>
            </ul>
            <ul>
              <SubTitle>
                <SiteMapLink to="/">고객 지원</SiteMapLink>
              </SubTitle>
              <List>
                <SiteMapLink to="/">공지사항</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">문의하기</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">이용후기</SiteMapLink>
              </List>
            </ul>
            <ul>
              <SubTitle>
                <SiteMapLink to="/">마이 페이지</SiteMapLink>
              </SubTitle>
              <List>
                <SiteMapLink to="/">로그인</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">회원가입</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">회원정보수정</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">멤버십 소개</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">쿠폰</SiteMapLink>
              </List>
            </ul>
            <ul>
              <SubTitle>
                <SiteMapLink to="/">약관안내</SiteMapLink>
              </SubTitle>
              <List>
                <SiteMapLink to="/">이용약관</SiteMapLink>
              </List>
              <List>
                <SiteMapLink to="/">개인정보처리방침</SiteMapLink>
              </List>
            </ul>
          </Items>
        </SiteMap>
      </Container>
    </>
  );
};

export default Sitemap;
