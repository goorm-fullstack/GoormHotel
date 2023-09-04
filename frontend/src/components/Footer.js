import React, { useState } from "react";
import { styled } from "styled-components";
import { DetailBtn, DetailSvg } from "../pages/Home";
import { Link } from "react-router-dom";
import instagramImg from "../images/common/social_instagram.png";
import youtubeImg from "../images/common/social_youtube.png";
import owlImg from "../images/common/social_owl.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 220px;
  height: 100%;
  min-width: 100%;
`;

const NewsLetterContainer = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.lightGray};
  padding: 60px 0;
`;

const FooterContainer = styled.div`
  min-width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.charcoal};
`;

const NewsLetterWrapper = styled.div`
  width: 1220px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #baa085;
  margin-right: 38px;
  margin-top: 10px;
  font-family: "Marcellus", serif;
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
  padding: 60px 0 60px 370px;
  border-bottom: 1px solid #2c2b29;
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
`;

const Tell = styled.div`
  font-size: 18px;
  margin-left: 10px;
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
  width: 100%;
  font-size: 13px;
  color: #888888;
  padding: 60px 370px;

  p {
    margin-bottom: 15px;
    white-space: nowrap;
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
  width: 958px;
  display: flex;
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
`;

const SocialLink = styled.a`
  display: inline-block;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 24px;
  }
`;

const IconImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const Name = styled.a`
  color: inherit;
  font: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const [email, setEmail] = useState("");

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
                <DetailSvg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                  </g>
                </DetailSvg>
              </SubscribeBtn>
            </EmailForm>
            <Terms>
              <TermsDescription>
                뉴스레터 발송을 위한 개인 정보 수집 및 이용에 동의합니다.
              </TermsDescription>
              <TermsLink to="/terms">약관 상세보기</TermsLink>
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
                  객실예약<Tell>031-600-8586</Tell>
                </RoomNumber>
                <InquiryNumber>
                  문의하기<Tell>031-600-8586</Tell>
                </InquiryNumber>
              </PhoneNumber>
              <FaxEmail>
                <Fax>FAX&nbsp; 000-0000-0000</Fax>
                <Email>이메일&nbsp; contact@goorm.io</Email>
              </FaxEmail>
            </FirstFooterLeft>
            <SocialWrapper>
              <SocialTitle>SOCIAL</SocialTitle>
              <SocialIcon>
                <SocialLink
                  href="https://www.instagram.com/goorm.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconImage src={instagramImg} alt="instagram" />
                </SocialLink>
                <SocialLink
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconImage src={youtubeImg} alt="youtube" />
                </SocialLink>
                <SocialLink
                  href="https://www.tripadvisor.co.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconImage src={owlImg} alt="owl" />
                </SocialLink>
              </SocialIcon>
            </SocialWrapper>
          </FirstFooterWrapper>
        </FirstFooter>
        <SecondFooter>
          <div>
            <p>호텔소개</p>
            <p>오시는길</p>
            <p>문의하기</p>
          </div>
          <StyledText>
            <p>이용약관</p>
            <p>개인정보처리방침</p>
            <p>사이트맵</p>
          </StyledText>
          <div>
            <p>
              (주)어벤저스 &nbsp;&nbsp;&nbsp;&nbsp; 경기도 성남시 분당구 판교로
              242 PDC A동 902호&nbsp;&nbsp; 사업자 등록번호
              124-87-39200&nbsp;&nbsp; 통신판매업 신고 번호
              제2019-성남분당B-0224호
            </p>
            <p>
              대표이사 &nbsp;&nbsp; Tel.031-600-8586&nbsp;&nbsp; E-mail:
              contact@goorm.io
            </p>
            <p>
              Copyright © 어벤저스(
              <Name
                href="https://github.com/WhiteKIM"
                target="_blank"
                rel="noopener noreferrer"
              >
                김경규
              </Name>
              ,{" "}
              <Name
                href="https://github.com/soheetech"
                target="_blank"
                rel="noopener noreferrer"
              >
                문소희
              </Name>
              ,{" "}
              <Name
                href="https://github.com/parkjikuk"
                target="_blank"
                rel="noopener noreferrer"
              >
                박지국
              </Name>
              ,{" "}
              <Name
                href="https://github.com/JinhwanB"
                target="_blank"
                rel="noopener noreferrer"
              >
                배진환
              </Name>
              ,{" "}
              <Name
                href="https://github.com/LEE-Donggyu"
                target="_blank"
                rel="noopener noreferrer"
              >
                이동규
              </Name>
              ,{" "}
              <Name
                href="https://github.com/yss1902"
                target="_blank"
                rel="noopener noreferrer"
              >
                전민종
              </Name>
              ). All rights reserved.
            </p>
          </div>
        </SecondFooter>
      </FooterContainer>
    </Container>
  );
};

export default Footer;
