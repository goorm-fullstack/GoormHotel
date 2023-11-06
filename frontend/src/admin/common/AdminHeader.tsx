import React from 'react';
import * as S from './Style';
import adminLogo from '../../images/common/logo_admin.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/api/AuthContext';

const AdminHeader: React.FC = () => {
  const { authState, setAuthState } = useAuth();
  const isLoggedIn = authState.adminId !== '';
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/admin/login');
  };

  // const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await Instance.get('/login/logout');
  //     if (response.status === 200) {
  //       alert('로그아웃 되었습니다');
  //       localStorage.clear();
  //       deleteAllCookies();
  //       setAuthState({ role: '', adminId: '', auth: '' });
  //       navigate('/admin');
  //     }
  //   } catch (error) {
  //     console.error('로그아웃 실패:', error);
  //   }
  // };

  function deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  const handleLogoutUseLocalStorge = () => {
    localStorage.clear();
    deleteAllCookies();
    window.location.href = '/admin';
  };

  return (
    <S.AdminHeader>
      <h1>
        <Link to="/admin">
          <img src={adminLogo} alt="logo" />
        </Link>
      </h1>
      <ul className="nav">
        <li>
          <Link to="/admin/member/1">회원 관리</Link>
        </li>
        <li>
          <Link to="/admin/item/1">상품 관리</Link>
        </li>
        <li>
          <Link to="/admin/reservation/1">예약 관리</Link>
        </li>
        <li>
          <Link to="/admin/board/1">게시판 관리</Link>
        </li>
        <li>
          <Link to="/admin/chat/1">채팅/메일 관리</Link>
        </li>
      </ul>
      <ul className="right">
        <li>
          <Link to="/">사이트 홈</Link>
        </li>
        <li className="manager">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="24px" height="24px" fill="#ddd" xmlSpace="preserve">
            <g id="info" />
            <g id="icons">
              <path
                d="M12,0C5.4,0,0,5.4,0,12c0,6.6,5.4,12,12,12s12-5.4,12-12C24,5.4,18.6,0,12,0z M12,4c2.2,0,4,2.2,4,5s-1.8,5-4,5   s-4-2.2-4-5S9.8,4,12,4z M18.6,19.5C16.9,21,14.5,22,12,22s-4.9-1-6.6-2.5c-0.4-0.4-0.5-1-0.1-1.4c1.1-1.3,2.6-2.2,4.2-2.7   c0.8,0.4,1.6,0.6,2.5,0.6s1.7-0.2,2.5-0.6c1.7,0.5,3.1,1.4,4.2,2.7C19.1,18.5,19.1,19.1,18.6,19.5z"
                id="user2"
              />
            </g>
          </svg>
          <span>{`${authState.adminId} 님`}</span>
          <button type="button" className="logoutbtn" onClick={isLoggedIn ? handleLogoutUseLocalStorge : handleLogin}>
            {isLoggedIn ? '로그아웃' : '로그인'}
          </button>
        </li>
      </ul>
    </S.AdminHeader>
  );
};

export default AdminHeader;
