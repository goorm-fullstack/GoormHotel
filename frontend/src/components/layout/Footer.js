import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { MoreBtn, commonWrapperStyle, BtnWrapper } from '../common/commonStyles';
import instagramImg from '../../images/common/social_instagram.png';
import youtubeImg from '../../images/common/social_youtube.png';
import owlImg from '../../images/common/social_owl.png';
import instagramImgHover from '../../images/common/social_instagram_hover.png';
import youtubeImgHover from '../../images/common/social_youtube_hover.png';
import owlImgHover from '../../images/common/social_owl_hover.png';

const Container = styled.div`
  margin-top: 150px;
  width: 100%;
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.graylight};
`;

const NewsLetterContainer = styled.div`
  background-color: ${(props) => props.theme.colors.graybg};
  padding: 60px 0;
  width: 100%;
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.charcoal};
`;

const NewsLetterWrapper = styled(commonWrapperStyle)`
  & > form {
    display: flex;
    justify-content: space-between;
  }
`;

const NewsTitle = styled.h3`
  width: 240px;
  font-size: ${(props) => props.theme.font.sizel};
  line-height: 50px;
  color: ${(props) => props.theme.colors.goldhover};
  font-family: ${(props) => props.theme.font.family};
`;

const EmailInput = styled.input`
  width: 750px;
  height: 50px;
  color: ${(props) => props.theme.colors.graylight};
  margin-bottom: 10px;
  padding-left: 16px;
`;

const SubscribeBtn = styled(MoreBtn)`
  height: 50px;
`;

const Terms = styled.p`
  font-size: ${(props) => props.theme.font.sizexs};
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
`;

const TermsLink = styled(Link)`
  padding: 4px 6px;
  background-color: ${(props) => props.theme.colors.navy};
  color: white;
  font-size: ${(props) => props.theme.font.sizexxxs};
  margin-left: 10px;
`;

const FooterInfo = styled.div`
  padding: 50px 0;

  &.cs {
    border-bottom: 1px solid #2c2b29;
  }
`;

const FooterWrapper = styled(commonWrapperStyle)`
  display: flex;
  justify-content: space-between;

  & > div {
    min-width: 380px;
  }
`;

const FooterCsTitle = styled.h3`
  margin-bottom: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.goldhover};
`;

const ContactInfo = styled.ul`
  display: flex;
  margin-bottom: 16px;

  &.tel {
    color: white;
  }
  &.tel li {
    display: flex;
    align-items: center;
  }
  &.tel a {
    font-size: ${(props) => props.theme.font.sizem};
    margin-left: 10px;
  }
  & > li {
    margin-right: 25px;
  }
  & > li a {
    margin-left: 5px;
  }
  & > li a:hover {
    color: white;
  }
`;

const SiteLinkWrapeer = styled.ul`
  display: grid;
  grid-template-columns: 140px 140px;
  padding-right: 60px;

  li {
    line-height: 1.7;
  }
  a:hover {
    color: white;
  }
`;

const CompanykWrapeer = styled.div`
  line-height: 1.7;
  width: calc(100% - 320px);

  a:hover {
    color: white;
  }
  span {
    margin-right: 10px;
  }
`;

const SocialLink = styled.a`
  display: inline-block;
  width: 34px;
  height: 34px;
  background-size: cover;
  background-image: url(${(props) => props.$imageUrl});

  &:hover {
    background-image: url(${(props) => props.$hoverUrl});
  }

  &:not(:last-child) {
    margin-right: 25px;
  }

  &.youtube {
    width: 22px;
  }

  &.trip {
    width: 54px;
  }
`;

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <NewsLetterContainer>
        <NewsLetterWrapper>
          <form onSubmit={handleSubmit}>
            <NewsTitle>E-NEWS LETTER</NewsTitle>
            <div>
              <EmailInput
                placeholder="이메일을 입력해주세요. (example@email.com)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Terms>
                뉴스레터 발송을 위한 개인 정보 수집 및 이용에 동의합니다.<TermsLink to="/agreement">약관 상세보기</TermsLink>
              </Terms>
            </div>
            <BtnWrapper className="right">
              <SubscribeBtn type="submit">구독 신청하기</SubscribeBtn>
            </BtnWrapper>
          </form>
        </NewsLetterWrapper>
      </NewsLetterContainer>
      <FooterContainer>
        <FooterInfo className="cs">
          <FooterWrapper>
            <div>
              <FooterCsTitle>CUSTOMER CENTER</FooterCsTitle>
              <ContactInfo className="tel">
                <li>
                  객실예약 <a href="tel:031-600-8585">031-600-8585</a>
                </li>
                <li>
                  문의하기 <a href="tel:031-600-8586">031-600-8586</a>
                </li>
              </ContactInfo>
              <ContactInfo>
                <li>
                  FAX <a href="fax:031-600-8587">031-600-8587</a>
                </li>
                <li>
                  이메일 <a href="mailto:contact@goorm.io">contact@goorm.io</a>
                </li>
              </ContactInfo>
            </div>
            <div>
              <FooterCsTitle>SOCIAL</FooterCsTitle>
              <div>
                <SocialLink
                  href="https://www.instagram.com/goorm.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  $imageUrl={instagramImg}
                  $hoverUrl={instagramImgHover}></SocialLink>
                <SocialLink
                  className="youtube"
                  href="https://www.youtube.com/@goorm"
                  target="_blank"
                  rel="noopener noreferrer"
                  $imageUrl={youtubeImg}
                  $hoverUrl={youtubeImgHover}></SocialLink>
                <SocialLink
                  className="trip"
                  href="https://www.tripadvisor.co.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  $imageUrl={owlImg}
                  $hoverUrl={owlImgHover}></SocialLink>
              </div>
            </div>
          </FooterWrapper>
        </FooterInfo>
        <FooterInfo>
          <FooterWrapper>
            <SiteLinkWrapeer>
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
                <Link to="/board/qna">문의하기</Link>
              </li>
              <li>
                <Link to="/sitemap">사이트맵</Link>
              </li>
            </SiteLinkWrapeer>
            <CompanykWrapeer>
              <p>
                <span>(주)어벤져스</span>
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
                Copyright &copy; 어벤져스팀(
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
            </CompanykWrapeer>
          </FooterWrapper>
        </FooterInfo>
      </FooterContainer>
    </Container>
  );
};

export default Footer;
