import React from 'react';
import { styled } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/common/logo.png';
import { SubmitLinkBtn, BtnWrapper } from '../common/commonStyles';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: ${(props) => props.theme.wrapper.minwidth};
  height: 120px;
  padding: 0 40px;
  z-index: 999;
  background-color: ${(props) => (props.$nowLocation == '/' ? 'rgba(51,51,51,0.8)' : props.theme.colors.charcoal)};
  color: white;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
`;

const TopInfo = styled.ul`
  padding: 20px 0;
  display: flex;
  justify-content: right;

  li {
    font-size: ${(props) => props.theme.font.sizexxxs};
    margin-left: 15px;
    color: rgba(255, 255, 255, 0.7);

    &:hover {
      color: white;
    }
  }
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
  white-space: nowrap;

  &:not(:last-child) {
    margin-right: 40px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.gold};
  }
`;

const NavReserveBtn = styled(SubmitLinkBtn)`
  height: 47px;
  line-height: 47px;
  width: 180px;
`;

const LogoImg = styled.img`
  width: 191px;
`;

const Header = () => {
  const location = useLocation().pathname;
  return (
    <HeaderContainer $nowLocation={location}>
      <TopInfo>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
        <li>
          <Link to="/login?type=reservation">예약 확인</Link>
        </li>
        <li>
          <Link to="/membership">멤버십</Link>
        </li>
        <li>
          <Link to="/location">오시는길</Link>
        </li>
        <li>
          <Link to="/sitemap">사이트맵</Link>
        </li>
        <li>
          <Link to="/admin">관리자 홈</Link>
        </li>
      </TopInfo>
      <Gnb>
        <h1>
          <Link to="/">
            <LogoImg src={logo} alt="logo" />
          </Link>
        </h1>
        <NavList>
          <NavItem>
            <Link to="/about">구름호텔 소개</Link>
          </NavItem>
          <NavItem>
            <Link to="/rooms">객실</Link>
          </NavItem>
          <NavItem>
            <Link to="/dining">다이닝</Link>
          </NavItem>
          <NavItem>
            <Link to="/facilities">부대시설</Link>
          </NavItem>
          <NavItem>
            <Link to="/offers">스페셜오퍼</Link>
          </NavItem>
          <NavItem>
            <Link to="/board/notice">고객지원</Link>
          </NavItem>
        </NavList>
        <BtnWrapper>
          <NavReserveBtn to="/offers">예약하기</NavReserveBtn>
        </BtnWrapper>
      </Gnb>
    </HeaderContainer>
  );
};

export default Header;
