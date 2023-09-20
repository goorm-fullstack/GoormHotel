import React, { useState } from 'react';
import { styled } from 'styled-components';
import { DetailBtn, DetailSvg } from '../../pages/Home';
import { Link } from 'react-router-dom';
import instagramImg from '../images/common/social_instagram.png';
import youtubeImg from '../images/common/social_youtube.png';
import owlImg from '../images/common/social_owl.png';
import instagramImgHover from '../images/common/social_instagram_hover.png';
import youtubeImgHover from '../images/common/social_youtube_hover.png';
import owlImgHover from '../images/common/social_owl_hover.png';

const Container = styled.div`
  margin-top: 220px;
  width: 100%;
  height: 100%;
  min-width: 1180px;
`;

const NewsLetterContainer = styled.div`
  height: 200px;
  background-color: ${(props) => props.theme.colors.lightGray};
  padding: 60px 0;
  width: 100%;
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.charcoal};
`;

const NewsLetterWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1220px;
`;

const Title = styled.h1`
  min-width: 200px;
  font-size: 24px;
  color: #baa085;
  margin-right: 38px;
  margin-top: 10px;
  font-family: 'Marcellus', serif;
`;

const EmailForm = styled.form`
  display: flex;
`;

const EmailInput = styled.input`
  width: 800px;
  height: 50px;
  color: #888888;
  margin-right: 21px;
  margin-bottom: 10px;
  padding-left: 24px;
  outline: none;
`;

const SubscribeBtn = styled(DetailBtn)`
  height: 50px;
  min-width: 160px;

  &:hover {
    background-color: #8a7057;
  }
`;

const DetailBtnTitle = styled.p`
  margin-right: 20px;
`;

const Terms = styled.div`
  font-size: 14px;
  color: #888888;
  display: flex;
  align-items: center;
`;

const TermsDescription = styled.p`
  margin-right: 5px;
`;

const TermsLink = styled(Link)`
  padding: 5px;
  background-color: #102c57;
  color: white;
  font-size: 12px;
`;

const FirstFooter = styled.div`
  display: flex;
  padding: 60px 0 60px 0;
  border-bottom: 1px solid #2c2b29;
  width: 1220px;
  margin: 0 auto;
`;

const FooterTitle = styled.h1`
  font-size: 14px;
  margin-bottom: 25px;
  font-weight: bold;
  color: #95846e;
`;

const PhoneNumber = styled.div`
  display: flex;
  font-size: 13px;
  color: white;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.7);
`;

const Tell = styled.div`
  font-size: 18px;
  margin-left: 10px;

  &:hover {
    color: #ffffff;
  }
`;

const RoomNumber = styled.div`
  display: flex;
  align-items: center;
`;

const InquiryNumber = styled(RoomNumber)`
  margin-left: 54px;
`;
const FaxEmail = styled.div`
  display: flex;
  color: #888888;
  font-size: 13px;
`;

const Fax = styled.div`
  margin-right: 20px;
`;

const Email = styled.div``;

const SecondFooter = styled.div`
  display: flex;
  width: 1220px;
  margin: 0 auto;
  font-size: 13px;
  color: #888888;
  padding: 60px 0;
`;

const SiteLinkWrapeer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 65px;
`;

const SiteLink = styled.div`
  &:hover {
    color: #fff;
  }
`;

const StyledText = styled.span`
  margin: 0 80px;
`;

const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SocialTitle = styled.h1`
  font-size: 14px;
  font-weight: bold;
  color: #baa085;
  margin-bottom: 24px;
`;

const FirstFooterLeft = styled.div`
  flex: 1;
`;

const FirstFooterWrapper = styled.div`
  width: 959px;
  display: flex;
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
`;

const SocialLink = styled.a`
  display: inline-block;
  cursor: pointer;
  width: 34px;
  height: 34px;
  background-size: cover;
  background-image: url(${(props) => props.$imageUrl});

  &:hover {
    background-image: url(${(props) => props.$hoverUrl});
  }

  &:not(:last-child) {
    margin-right: 24px;
  }
`;

const YoutubeLink = styled(SocialLink)`
  width: 22px;
`;

const OwlLink = styled(SocialLink)`
  width: 54px;
`;

const Name = styled.a`
  color: inherit;
  font: inherit;
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

const TextStyle = styled.span`
  margin-right: 20px;
  display: inline;
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
          <Title>E-NEWS LETTER</Title>
          <div>
            <EmailForm onSubmit={handleSubmit}>
              <EmailInput
                placeholder="이메일을 입력해주세요. (example@email.com)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SubscribeBtn type="submit">
                <DetailBtnTitle>구독 신청</DetailBtnTitle>
                <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                  </g>
                </DetailSvg>
              </SubscribeBtn>
            </EmailForm>
            <Terms>
              <TermsDescription>뉴스레터 발송을 위한 개인 정보 수집 및 이용에 동의합니다.</TermsDescription>
              <TermsLink to="/agreement">약관 상세보기</TermsLink>
            </Terms>
          </div>
        </NewsLetterWrapper>
      </NewsLetterContainer>
      <FooterContainer>
        <FirstFooter>
          <FirstFooterWrapper>
            <FirstFooterLeft>
              <FooterTitle>CUSTOMER CENTER</FooterTitle>
              <PhoneNumber>
                <RoomNumber>
                  <p>객실예약</p>
                  <Tell>
                    <a href="tel:031-600-8586">031-600-8586</a>
                  </Tell>
                </RoomNumber>
                <InquiryNumber>
                  <p>문의하기</p>
                  <Tell>
                    <a href="tel:031-600-8586">031-600-8586</a>
                  </Tell>
                </InquiryNumber>
              </PhoneNumber>
              <FaxEmail>
                <Fax>FAX&nbsp; 000-0000-0000</Fax>
                <Email>
                  이메일&nbsp; <a href="mailto:contact@goorm.io">contact@goorm.io</a>
                </Email>
              </FaxEmail>
            </FirstFooterLeft>
            <SocialWrapper>
              <SocialTitle>SOCIAL</SocialTitle>
              <SocialIcon>
                <SocialLink
                  href="https://www.instagram.com/goorm.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  $imageUrl={instagramImg}
                  $hoverUrl={instagramImgHover}></SocialLink>
                <YoutubeLink
                  href="https://www.youtube.com/@goorm"
                  target="_blank"
                  rel="noopener noreferrer"
                  $imageUrl={youtubeImg}
                  $hoverUrl={youtubeImgHover}></YoutubeLink>
                <OwlLink
                  href="https://www.tripadvisor.co.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  $imageUrl={owlImg}
                  $hoverUrl={owlImgHover}></OwlLink>
              </SocialIcon>
            </SocialWrapper>
          </FirstFooterWrapper>
        </FirstFooter>
        <SecondFooter>
          <SiteLinkWrapeer>
            <SiteLink>
              <Link to="/about">호텔소개</Link>
            </SiteLink>
            <SiteLink>
              <Link to="/location">오시는길</Link>
            </SiteLink>
            <SiteLink>
              <Link to="/board/qna">문의하기</Link>
            </SiteLink>
          </SiteLinkWrapeer>
          <StyledText>
            <SiteLinkWrapeer>
              <SiteLink>
                <Link to="/agreement">이용약관</Link>
              </SiteLink>
              <SiteLink>
                <Link to="/privacy">개인정보처리방침</Link>
              </SiteLink>
              <SiteLink>
                <Link to="/sitemap">사이트맵</Link>
              </SiteLink>
            </SiteLinkWrapeer>
          </StyledText>
          <SiteLinkWrapeer>
            <div>
              <TextStyle>(주)어벤저스</TextStyle>
              <TextStyle>경기도 성남시 분당구 판교로 242 PDC A동 902호</TextStyle>
              <TextStyle>사업자 등록번호 124-87-39200</TextStyle>
              통신판매업 신고 번호 제2019-성남분당B-0224호
            </div>
            <p>
              대표이사 :{' '}
              <Name href="https://github.com/WhiteKIM" target="_blank" rel="noopener noreferrer">
                김경규
              </Name>
              ,{' '}
              <Name href="https://github.com/soheetech" target="_blank" rel="noopener noreferrer">
                문소희
              </Name>
              ,{' '}
              <Name href="https://github.com/parkjikuk" target="_blank" rel="noopener noreferrer">
                박지국
              </Name>
              ,{' '}
              <Name href="https://github.com/JinhwanB" target="_blank" rel="noopener noreferrer">
                배진환
              </Name>
              ,{' '}
              <Name href="https://github.com/LEE-Donggyu" target="_blank" rel="noopener noreferrer">
                이동규
              </Name>
              ,{' '}
              <Name href="https://github.com/yss1902" target="_blank" rel="noopener noreferrer">
                <TextStyle>전민종</TextStyle>
              </Name>
              <TextStyle>
                <a href="tel:031-600-8586">Tel : 031-600-8586</a>
              </TextStyle>
              <a href="mailto:contact@goorm.io">Email : contact@goorm.io</a>
            </p>
            <p>
              Copyright &copy; 어벤저스(
              <Name href="https://github.com/WhiteKIM" target="_blank" rel="noopener noreferrer">
                김경규
              </Name>
              ,{' '}
              <Name href="https://github.com/soheetech" target="_blank" rel="noopener noreferrer">
                문소희
              </Name>
              ,{' '}
              <Name href="https://github.com/parkjikuk" target="_blank" rel="noopener noreferrer">
                박지국
              </Name>
              ,{' '}
              <Name href="https://github.com/JinhwanB" target="_blank" rel="noopener noreferrer">
                배진환
              </Name>
              ,{' '}
              <Name href="https://github.com/LEE-Donggyu" target="_blank" rel="noopener noreferrer">
                이동규
              </Name>
              ,{' '}
              <Name href="https://github.com/yss1902" target="_blank" rel="noopener noreferrer">
                전민종
              </Name>
              ). All rights reserved.
            </p>
          </SiteLinkWrapeer>
        </SecondFooter>
      </FooterContainer>
    </Container>
  );
};

export default Footer;
