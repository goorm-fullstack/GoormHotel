import React from 'react';
import * as S from './Style';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../images/common/logo.png';
import { BtnWrapper } from '../../../Style/commonStyles';
import { useAuth } from '../../../utils/api/AuthContext';

const Header = () => {
  const location = useLocation().pathname;
  const { memberAuthState, setMemberAuthState } = useAuth();
  const isLoggedIn = memberAuthState.memberId !== '';
  const navigate = useNavigate();

  // const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await Instance.get('/login/logout');
  //     if (response.status === 200) {
  //       setMemberAuthState({ memberId: '' });
  //       alert('로그아웃 되었습니다');
  //       navigate('/');
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
    alert('로그아웃 되었습니다');
    window.location.href = '/';
  };

  return (
    <S.Header data-location={location}>
      <ul className="topinfo">
        <li>
          {isLoggedIn ? (
            <button type="button" className="btnlogout" onClick={handleLogoutUseLocalStorge}>
              로그아웃
            </button>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </li>
        <li>{isLoggedIn ? <Link to="/mypage">마이페이지</Link> : <Link to="/signup">회원가입</Link>}</li>
        <li>{isLoggedIn ? <Link to="/myhistory/1">예약 확인</Link> : <Link to="/login?type=reservation">로그인</Link>}</li>
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
      </ul>
      <div className="gnb">
        <h1>
          <Link to="/">
            <img src={logo} alt="구름 호텔(Goorm Hotel)" />
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/about">구름호텔 소개</Link>
          </li>
          <li>
            <Link to="/rooms">객실</Link>
          </li>
          <li>
            <Link to="/dining">다이닝</Link>
          </li>
          <li>
            <Link to="/facilities">부대시설</Link>
          </li>
          <li>
            <Link to="/offers/1?type=" state={{ state: null }}>
              스페셜오퍼
            </Link>
          </li>
          <li>
            <Link to="/board/notice/1">고객지원</Link>
          </li>
        </ul>
        <BtnWrapper>
          <S.NavReserveBtn to="/offers/1?type=" state={{ state: null }}>
            예약하기
          </S.NavReserveBtn>
        </BtnWrapper>
      </div>
    </S.Header>
  );
};

export default Header;
