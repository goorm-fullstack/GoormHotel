import React from 'react';
import * as S from './Style';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../../Style/commonStyles';

const Sitemap = () => {
  return (
    <>
      <S.Container>
        <PageTitle>사이트맵</PageTitle>
        <S.SiteMap>
          <li>
            <h3>
              <Link to="/about">구름호텔 소개</Link>
            </h3>
            <ul>
              <li>
                <Link to="/about">호텔 소개</Link>
              </li>
              <li>
                <Link to="/location">오시는 길</Link>
              </li>
            </ul>
          </li>
          <li>
            <h3>
              <Link to="/rooms">시설 소개</Link>
            </h3>
            <ul>
              <li>
                <Link to="/rooms">객실</Link>
              </li>
              <li>
                <Link to="/dining">다이닝</Link>
              </li>
              <li>
                <Link to="/facilities">부대시설</Link>
              </li>
            </ul>
          </li>
          <li>
            <h3>
              <Link to="/offers/1">스페셜오퍼</Link>
            </h3>
            <ul>
              <li>
                <Link to="/offers/1">스페셜오퍼</Link>
              </li>
              <li>
                <Link to="/login?type=reservation">예약확인</Link>
              </li>
            </ul>
          </li>
          <li>
            <h3>
              <Link to="/board/notice/1">고객지원</Link>
            </h3>
            <ul>
              <li>
                <Link to="/board/notice/1">공지사항</Link>
              </li>
              <li>
                <Link to="/board/qna/1">문의하기</Link>
              </li>
              <li>
                <Link to="/board/review/1">이용후기</Link>
              </li>
            </ul>
          </li>
          <li>
            <h3>
              <Link to="/mypage">마이페이지</Link>
            </h3>
            <ul>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link to="/membership">멤버십 소개</Link>
              </li>
            </ul>
          </li>
          <li>
            <h3>
              <Link to="/agreement">약관 안내</Link>
            </h3>
            <ul>
              <li>
                <Link to="/agreement">이용약관</Link>
              </li>
              <li>
                <Link to="/privacy">개인정보처리방침</Link>
              </li>
            </ul>
          </li>
        </S.SiteMap>
      </S.Container>
    </>
  );
};

export default Sitemap;
