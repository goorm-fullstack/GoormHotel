import React from 'react';
import { styled } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/common/logo.png';

const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  height: 120px;
  z-index: 999;
  top: 0;
  min-width: 1260px;
`;

const Container = styled.header`
  width: 100%;
  height: 120px;
  background-color: ${(props) => (props.$nowLocation == '/' ? 'rgba(51,51,51,0.8)' : props.theme.colors.charcoal)};
  padding: 0 40px;
  color: white;
`;

const TopInfo = styled.div`
  padding: 20px 0;
  overflow: hidden;
`;

const TopInfoList = styled.ul`
  display: flex;
  float: right;
`;

const TopInfoItem = styled.li`
  font-size: 12px;
  margin-left: 15px;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    color: white;
  }
`;

const HeaderLink = styled(Link)`
  color: inherit;
`;

const Gnb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  flex: 1;
  margin-left: 45px;
`;

const NavItem = styled.li`
  font-size: 16px;
  white-space: nowrap;

  &:not(:last-child) {
    margin-right: 40px;
  }

  &:hover {
    color: #baa085;
  }
`;

const NavReserveBtn = styled(Link)`
  height: 42px;
  line-height: 38px;
  width: 140px;
  color: white;
  background-color: transparent;
  white-space: nowrap;
  text-align: center;
  border: 1px solid #fff;
  font-size: 15px;

  &:hover {
    background-color: #9c836a;
    border-color: #9c836a;
    color: #fff;
  }
`;

const LogoImg = styled.img`
  min-width: 190px;
`;

const Header = () => {
  const location = useLocation().pathname;
  return (
    <HeaderContainer>
      <Container $nowLocation={location}>
        <TopInfo>
          <TopInfoList>
            <TopInfoItem>
              <HeaderLink to="/login">로그인</HeaderLink>
            </TopInfoItem>
            <TopInfoItem>
              <HeaderLink to="/signup">회원가입</HeaderLink>
            </TopInfoItem>
            <TopInfoItem>
              <HeaderLink to="/login">예약 확인</HeaderLink>
            </TopInfoItem>
            <TopInfoItem>
              <HeaderLink to="/membership">멤버십</HeaderLink>
            </TopInfoItem>
            <TopInfoItem>
              <HeaderLink to="/location">오시는길</HeaderLink>
            </TopInfoItem>
            <TopInfoItem>
              <HeaderLink to="/sitemap">사이트맵</HeaderLink>
            </TopInfoItem>
          </TopInfoList>
        </TopInfo>
        <Gnb>
          <h1>
            <HeaderLink to="/">
              <LogoImg src={logo} alt="logo" />
            </HeaderLink>
          </h1>
          <NavList>
            <NavItem>
              <HeaderLink to="/about">구름호텔 소개</HeaderLink>
            </NavItem>
            <NavItem>
              <HeaderLink to="/rooms">객실</HeaderLink>
            </NavItem>
            <NavItem>
              <HeaderLink to="/dining">다이닝</HeaderLink>
            </NavItem>
            <NavItem>
              <HeaderLink to="/facilities">부대시설</HeaderLink>
            </NavItem>
            <NavItem>
              <HeaderLink to="/offers">스페셜오퍼</HeaderLink>
            </NavItem>
            <NavItem>
              <HeaderLink to="/board/notice">고객지원</HeaderLink>
            </NavItem>
          </NavList>
          <NavReserveBtn to="/offers">예약하기</NavReserveBtn>
        </Gnb>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
