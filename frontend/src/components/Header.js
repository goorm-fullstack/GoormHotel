import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import logo from "../images/common/logo.png";

const HeaderContainer = styled.div`
  position: relative;
  height: 120px;
  overflow-x: scroll;
`;

const Container = styled.header`
  width: 100%;
  height: 120px;
  background-color: ${props => props.$background || props.theme.colors.charcoal};
  position: fixed;
  padding: 0 40px;
  color: white;
  z-index: 999;
  top: 0;
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
  margin-left: 12px;
  color: rgba(255,255,255,0.7);

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
  min-width: 600px;
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
  padding: 12px 27px;
  background-color: #454545;
  border: 1px solid white;
  color: white;
  background-color: #95846E;
  white-space: nowrap;

  &:hover {
    background-color: #8A7057;
  }
`;

const LogoImg = styled.img`
  min-width: 190px;
`;

const Header = ({ backgroundColor }) => {
  return (
    <HeaderContainer>
      <Container $background={backgroundColor}>
      <TopInfo>
        <TopInfoList>
          <TopInfoItem>
            <HeaderLink to="/">예약확인</HeaderLink>
          </TopInfoItem>
          <TopInfoItem>
            <HeaderLink to="/">로그인</HeaderLink>
          </TopInfoItem>
          <TopInfoItem>
            <HeaderLink to="/">회원가입</HeaderLink>
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
        <HeaderLink to="/"><LogoImg src={logo} alt="logo" /></HeaderLink>
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
            <HeaderLink to="/specialOffer">스페셜오퍼</HeaderLink>
          </NavItem>
          <NavItem>
            <HeaderLink to="/customerSupport">고객지원</HeaderLink>
          </NavItem>
        </NavList>
        <NavReserveBtn to="/reservation">예약하기</NavReserveBtn>
      </Gnb>
    </Container>
    </HeaderContainer>
  );
};

export default Header;
