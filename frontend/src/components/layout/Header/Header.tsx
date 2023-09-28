import React from 'react';
import * as S from './Style';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../images/common/logo.png';
import { BtnWrapper } from '../../../Style/commonStyles';

const Header = () => {
  const location = useLocation().pathname;
  return (
    <S.Header data-location={location}>
      <ul className="topinfo">
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
            <Link to="/offers/1" state={{ state: null }}>
              스페셜오퍼
            </Link>
          </li>
          <li>
            <Link to="/board/notice/1">고객지원</Link>
          </li>
        </ul>
        <BtnWrapper>
          <S.NavReserveBtn to="/offers/1" state={{ state: null }}>
            예약하기
          </S.NavReserveBtn>
        </BtnWrapper>
      </div>
    </S.Header>
  );
};

export default Header;
