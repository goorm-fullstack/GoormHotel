import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { commonContainerStyle, PageTitle } from '../../components/common/commonStyles';

const Container = styled(commonContainerStyle)``;

const SiteMap = styled.div``;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 100px 80px;
`;

const SubTitle = styled.p`
  font-size: ${(props) => props.theme.font.sizesl};
  font-weight: 500;
  width: 340px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
`;

const List = styled.li`
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.8;
  & > a:hover {
    color: ${(props) => props.theme.colors.goldhover};
  }
`;

const SiteMapLink = styled(Link)`
  color: inherit;
`;

const Sitemap = () => {
  return (
    <>
      <Container>
        <PageTitle>사이트맵</PageTitle>
        <Items>
          <ul>
            <SubTitle>
              <SiteMapLink to="/about">구름호텔 소개</SiteMapLink>
            </SubTitle>
            <List>
              <SiteMapLink to="/about">호텔 소개</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/location">오시는 길</SiteMapLink>
            </List>
          </ul>
          <ul>
            <SubTitle>
              <SiteMapLink to="/rooms">시설 소개</SiteMapLink>
            </SubTitle>
            <List>
              <SiteMapLink to="/rooms">객실</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/dining">다이닝</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/facilities">부대시설</SiteMapLink>
            </List>
          </ul>
          <ul>
            <SubTitle>
              <SiteMapLink to="/offers">스페셜오퍼</SiteMapLink>
            </SubTitle>
            <List>
              <SiteMapLink to="/offers">스페셜오퍼</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/login?type=reservation">예약확인</SiteMapLink>
            </List>
          </ul>
          <ul>
            <SubTitle>
              <SiteMapLink to="/board/notice">고객지원</SiteMapLink>
            </SubTitle>
            <List>
              <SiteMapLink to="/board/notice">공지사항</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/board/qna">문의하기</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/board/review">이용후기</SiteMapLink>
            </List>
          </ul>
          <ul>
            <SubTitle>
              <SiteMapLink to="/mypage">마이페이지</SiteMapLink>
            </SubTitle>
            <List>
              <SiteMapLink to="/login">로그인</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/signup">회원가입</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/mypage">마이페이지</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/membership">멤버십 소개</SiteMapLink>
            </List>
          </ul>
          <ul>
            <SubTitle>
              <SiteMapLink to="/agreement">약관 안내</SiteMapLink>
            </SubTitle>
            <List>
              <SiteMapLink to="/agreement">이용약관</SiteMapLink>
            </List>
            <List>
              <SiteMapLink to="/privacy">개인정보처리방침</SiteMapLink>
            </List>
          </ul>
        </Items>
      </Container>
    </>
  );
};

export default Sitemap;
