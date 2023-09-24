import React from 'react';
import styled from 'styled-components';
import adminLogo from '../../images/common/logo_admin.png';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.charcoal};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 40px;
  min-width: ${(props) => props.theme.wrapper.minwidth};
`;

const HeaderLink = styled.h1`
  margin-right: 45px;
`;

const MenuItem = styled.ul`
  display: flex;
  column-gap: 40px;
  color: #ffffff;
  flex: 1;

  li a:hover {
    color: ${(props) => props.theme.colors.gold};
  }
`;

const HeaderRight = styled.ul`
  display: flex;
  align-items: center;
  column-gap: 20px;
  font-size: ${(props) => props.theme.font.sizes};

  a {
    color: #bbb;
    font-size: ${(props) => props.theme.font.sizexs};
    text-decoration: underline;

    &:hover {
      color: white;
    }
  }
`;

const ManagerId = styled.li`
  color: #ffffff;
  margin-left: 10px;
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const LogoutBtn = styled.button`
  border: 1px solid white;
  border-radius: 30px;
  height: 32px;
  line-height: 30px;
  background-color: transparent;
  color: white;
  width: 90px;
  font-size: ${(props) => props.theme.font.sizexs};
  margin-left: 8px;

  &:hover {
    color: ${(props) => props.theme.colors.gold};
    border-color: ${(props) => props.theme.colors.gold};
  }
`;

const AdminHeader = () => {
  return (
    <Container>
      <HeaderLink>
        <Link to="/admin">
          <img src={adminLogo} alt="logo" />
        </Link>
      </HeaderLink>
      <MenuItem>
        <li>
          <Link to="/admin/member">회원 관리</Link>
        </li>
        <li>
          <Link to="/admin/item/list/1">상품 관리</Link>
        </li>
        <li>
          <Link to="/admin/reservation">예약 관리</Link>
        </li>
        <li>
          <Link to="/admin/board">게시판 관리</Link>
        </li>
        <li>
          <Link to="/admin/chat">채팅/메일 관리</Link>
        </li>
      </MenuItem>
      <HeaderRight>
        <li>
          <Link to="/">사이트 홈</Link>
        </li>
        <ManagerId>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 24 24"
            style={{ enableBackground: 'new 0 0 24 24', width: '24px', height: '24px', fill: '#DDDDDD' }}
            xmlSpace="preserve">
            <g id="info" />
            <g id="icons">
              <path
                d="M12,0C5.4,0,0,5.4,0,12c0,6.6,5.4,12,12,12s12-5.4,12-12C24,5.4,18.6,0,12,0z M12,4c2.2,0,4,2.2,4,5s-1.8,5-4,5   s-4-2.2-4-5S9.8,4,12,4z M18.6,19.5C16.9,21,14.5,22,12,22s-4.9-1-6.6-2.5c-0.4-0.4-0.5-1-0.1-1.4c1.1-1.3,2.6-2.2,4.2-2.7   c0.8,0.4,1.6,0.6,2.5,0.6s1.7-0.2,2.5-0.6c1.7,0.5,3.1,1.4,4.2,2.7C19.1,18.5,19.1,19.1,18.6,19.5z"
                id="user2"
              />
            </g>
          </svg>
          <span>관리자(admin)</span>
          <LogoutBtn>로그아웃</LogoutBtn>
        </ManagerId>
      </HeaderRight>
    </Container>
  );
};

export default AdminHeader;
