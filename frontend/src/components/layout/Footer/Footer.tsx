import React, { useState } from 'react';
import * as S from './Style';
import { Link } from 'react-router-dom';
import { BtnWrapper, MoreBtn } from '../../../Style/commonStyles';
import Instance from '../../../utils/api/axiosInstance';

const handleSubmit = (event: any) => {
  event.preventDefault();
};

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubScribeBtnClick = () => {
    if (email !== '') {
      Instance.post('/subscribe', { emailAddress: email }).then(() => {
        alert('구독신청 완료');
        setEmail('');
      });
    }
  };
  return (
    <S.Footer>
      <div className="subscription">
        <S.Inner>
          <form onSubmit={handleSubmit}>
            <h3>E-NEWS LETTER</h3>
            <div>
              <input placeholder="이메일을 입력해주세요. (example@email.com)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <p>
                뉴스레터 발송을 위한 개인 정보 수집 및 이용에 동의합니다.<a href="/agreement">약관 상세보기</a>
              </p>
            </div>
            <BtnWrapper className="right">
              <MoreBtn type="submit" onClick={handleSubScribeBtnClick}>
                구독 신청하기
              </MoreBtn>
            </BtnWrapper>
          </form>
        </S.Inner>
      </div>
      <div className="company">
        <div className="footerinfo cs">
          <S.Inner className="infoinner">
            <div>
              <h3>CUSTOMER CENTER</h3>
              <ul className="tel">
                <li>
                  객실예약 <a href="tel:031-600-8585">031-600-8585</a>
                </li>
                <li>
                  문의하기 <a href="tel:031-600-8586">031-600-8586</a>
                </li>
              </ul>
              <ul>
                <li>
                  FAX <a href="fax:031-600-8587">031-600-8587</a>
                </li>
                <li>
                  이메일 <a href="mailto:contact@goorm.io">contact@goorm.io</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>SOCIAL</h3>
              <div>
                <a className="social instagram" href="https://www.instagram.com/goorm.co/" target="_blank" rel="noopener noreferrer"></a>
                <a className="social youtube" href="https://www.youtube.com/@goorm" target="_blank" rel="noopener noreferrer"></a>
                <a className="social trip" href="https://www.tripadvisor.co.kr/" target="_blank" rel="noopener noreferrer"></a>
              </div>
            </div>
          </S.Inner>
        </div>
        <div className="footerinfo coinfo">
          <S.Inner className="infoinner">
            <ul>
              <li>
                <Link to="/about">호텔소개</Link>
              </li>
              <li>
                <Link to="/agreement">이용약관</Link>
              </li>
              <li>
                <Link to="/location">오시는길</Link>
              </li>
              <li>
                <Link to="/privacy">개인정보처리방침</Link>
              </li>
              <li>
                <Link to="/board/qna/1">문의하기</Link>
              </li>
              <li>
                <Link to="/sitemap">사이트맵</Link>
              </li>
            </ul>
            <div className="infowrap">
              <p>
                <span>(주)리벤져스</span>
                <span>경기도 성남시 분당구 판교로 242 PDC A동 902호</span>
                <span>사업자등록번호 : 124-87-39200</span>
              </p>
              <p>
                <span>통신판매업신고번호 : 제2019-성남분당B-0224호</span>
                <span>
                  대표이사(팀장) :{' '}
                  <a href="https://github.com/LEE-Donggyu" target="_blank">
                    이동규
                  </a>
                </span>
                <span>
                  대표번호 : <a href="tel:031-600-8586">031-600-8586</a>
                </span>
                <span>
                  이메일 : <a href="mailto:contact@goorm.io">contact@goorm.io</a>
                </span>
              </p>
              <p>
                Copyright &copy; 리벤져스팀(
                <a href="https://github.com/WhiteKIM" target="_blank">
                  김경규
                </a>
                ,{' '}
                <a href="https://github.com/soheetech" target="_blank">
                  문소희
                </a>
                ,{' '}
                <a href="https://github.com/parkjikuk" target="_blank">
                  박지국
                </a>
                ,{' '}
                <a href="https://github.com/JinhwanB" target="_blank">
                  배진환
                </a>
                ,{' '}
                <a href="https://github.com/LEE-Donggyu" target="_blank">
                  이동규
                </a>
                ,{' '}
                <a href="https://github.com/yss1902" target="_blank">
                  전민종
                </a>
                ). All rights reserved.
              </p>
            </div>
          </S.Inner>
        </div>
      </div>
    </S.Footer>
  );
};

export default Footer;
