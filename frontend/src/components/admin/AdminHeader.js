import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../images/common/logo.png";

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

const HeaderLink = styled(Link)`
  color: inherit;
`;

const Gnb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
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

const LoginInfo = styled.div`
  color : white;
  backgroun-color : black;
`;

const LogOutBtn = styled(Link)`
  padding: 12px 27px;
  color: white;
  background-color: black;
  white-space: nowrap;
  margin-left : 1em;
  border-radius : 10%;
`;

const LogoImg = styled.img`
  min-width: 190px;
`;

const AdminHeader = ({ backgroundColor }) => {
  return (
    <HeaderContainer>
      <Container $background={backgroundColor}>
      <Gnb>
        <HeaderLink to="/"><LogoImg src={logo} alt="logo" /></HeaderLink>
        <NavList>
          <NavItem>
            <HeaderLink to="/about">회원 관리</HeaderLink>
          </NavItem>
          <NavItem>
            <HeaderLink to="/rooms">상품 관리</HeaderLink>
          </NavItem>
          <NavItem>
            <HeaderLink to="/dining">예약 관리</HeaderLink>
          </NavItem>
          <NavItem>
            <HeaderLink to="/facilities">게시판 관리</HeaderLink>
          </NavItem>
          <NavItem>
            <HeaderLink to="/specialOffer">채팅 메일</HeaderLink>
          </NavItem>
        </NavList>
        <LoginInfo>
            <p>관리자(memberId)</p>
        </LoginInfo>
        <LogOutBtn to="/logout">로그아웃</LogOutBtn>
      </Gnb>
    </Container>
    </HeaderContainer>
  );
};

export default AdminHeader;
