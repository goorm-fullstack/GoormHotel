import React from 'react';
import styled from 'styled-components';
import adminLogo from '../../images/common/logo_admin.png';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 97px;
  background-color: #21201e;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 40px;
  min-width: 1260px;
`;

const HeaderLink = styled(Link)`
  margin-right: 45px;
`;

const MenuItem = styled.ul`
  display: flex;
  gap: 40px;
  color: #ffffff;
  flex: 1;

  li:hover {
    color: #baa085;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ManagerId = styled.span`
  color: #ffffff;
  margin-right: 15px;
  margin-left: 10px;
`;

const LogoutBtn = styled.button`
  border: 1px solid #ffffff;
  border-radius: 50px;
  padding: 8px 0;
  background-color: transparent;
  color: #ffffff;
  width: 90px;
`;

const AdminHeader = () => {
  return (
    <Container>
      <Wrapper>
        <HeaderLink to="/admin/member">
          <img src={adminLogo} alt="logo" />
        </HeaderLink>
        <MenuItem>
          <li>
            <Link to="/admin/member">회원 관리</Link>
          </li>
          <li>
<<<<<<<< HEAD:frontend/src/pages/admin/common/AdminHeader.js
            <Link to="/admin/item/list/1">상품 관리</Link>
========
            <Link to="/admin/item/list">상품 관리</Link>
>>>>>>>> 543385a35ddbdd40325cfd07439fc2f62d6f6311:frontend/src/admin/common/AdminHeader.js
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 24 24"
            style={{ enableBackground: 'new 0 0 24 24', width: '28px', height: '28px', fill: '#DDDDDD' }}
            xmlSpace="preserve">
            <g id="info" />
            <g id="icons">
              <path
                d="M12,0C5.4,0,0,5.4,0,12c0,6.6,5.4,12,12,12s12-5.4,12-12C24,5.4,18.6,0,12,0z M12,4c2.2,0,4,2.2,4,5s-1.8,5-4,5   s-4-2.2-4-5S9.8,4,12,4z M18.6,19.5C16.9,21,14.5,22,12,22s-4.9-1-6.6-2.5c-0.4-0.4-0.5-1-0.1-1.4c1.1-1.3,2.6-2.2,4.2-2.7   c0.8,0.4,1.6,0.6,2.5,0.6s1.7-0.2,2.5-0.6c1.7,0.5,3.1,1.4,4.2,2.7C19.1,18.5,19.1,19.1,18.6,19.5z"
                id="user2"
              />
            </g>
          </svg>
          <ManagerId>관리자(memberId)</ManagerId>
          <LogoutBtn>로그아웃</LogoutBtn>
        </HeaderRight>
      </Wrapper>
    </Container>
  );
};

export default AdminHeader;
