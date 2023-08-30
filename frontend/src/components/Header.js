import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../images/common/logo.png';

const Container = styled.header`
  width: 100%;
  height: 120px;
  min-width: 1200px;
  background-color: rgba(3, 3, 3, 0.8);
  position: fixed;
  padding: 0 40px;
  color: white;
  z-index: 999;
`;

const TopInfo = styled.div`
  padding:20px 0;
  overflow: hidden;
`;

const TopInfoList = styled.ul`
  display: flex;
  float: right;
`;

const TopInfoItem = styled.li`
  font-size: 12px;
  margin-left: 12px;
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
  
  &:not(:last-child) {
    margin-right: 40px; 
  }

  &:hover {
    color: #BAA085;
  }
`;

const NavReserveBtn = styled.button`
  padding: 12px 27px;
  background-color: #454545;
  border: 1px solid white;
  color: white;
  background-color: rgba(69, 69, 69, 0.01);
  &:hover {
    color: #BAA085;
    border-color: #BAA085;
  }
`;

const Header = () => {
  return (
    <Container>
      <TopInfo>
        <TopInfoList>
          <TopInfoItem><HeaderLink to="/">예약확인</HeaderLink></TopInfoItem>
          <TopInfoItem><HeaderLink to="/">로그인</HeaderLink></TopInfoItem>
          <TopInfoItem><HeaderLink to="/">회원가입</HeaderLink></TopInfoItem>
          <TopInfoItem><HeaderLink to="/">멤버십</HeaderLink></TopInfoItem>
          <TopInfoItem><HeaderLink to="/">오시는길</HeaderLink></TopInfoItem>
          <TopInfoItem><HeaderLink to="/">사이트맵</HeaderLink></TopInfoItem>
        </TopInfoList>
      </TopInfo>
      <Gnb>
        <HeaderLink><img src={logo} alt="logo" /></HeaderLink>
        <NavList>
          <NavItem><HeaderLink to="/">구름호텔 소개</HeaderLink></NavItem>
          <NavItem><HeaderLink to="/">객실</HeaderLink></NavItem>
          <NavItem><HeaderLink to="/">다이닝</HeaderLink></NavItem>
          <NavItem><HeaderLink to="/">부대시설</HeaderLink></NavItem>
          <NavItem><HeaderLink to="/">스페셜오퍼</HeaderLink></NavItem>
          <NavItem><HeaderLink to="/">고객지원</HeaderLink></NavItem>
        </NavList>
        <NavReserveBtn>예약하기</NavReserveBtn>
      </Gnb>
    </Container>
  );
};


export default Header;