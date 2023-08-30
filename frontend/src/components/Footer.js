import React, { useState } from 'react';
import { styled } from 'styled-components';
import { DetailBtn, DetailSvg } from '../pages/Home';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 220px;
  height: 100%;
`;

const NewsLetterContainer = styled.div`
  height: 200px;
  background-color: #F5F5F5;
  padding: 60px 0;
`;

const FooterContainer = styled.div`
  min-width: 100%;
  height: 100%;
  background-color: #21201E;
`;

const NewsLetterWrapper = styled.div`
  width: 1220px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #BAA085;
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
  background-color: #102C57;
  color: white;
  font-size: 12px;
`;

const FirstFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 0 60px 370px;
  border-bottom: 1px solid #2C2B29;
`;

const FooterTitle = styled.h1`
  font-size: 14px;
  margin-bottom: 25px;
  font-weight: bold;
  color: #95846E;
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

  p{
    margin-bottom: 15px;
    white-space: nowrap;
  }
`;

const StyledText = styled.span`
  margin: 0 80px;
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
            <EmailInput placeholder="이메일을 입력해주세요. (example@email.com)" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <SubscribeBtn type="submit"><DetailBtnTitle>구독 신청</DetailBtnTitle><DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"/></g></DetailSvg></SubscribeBtn>
          </EmailForm>
          <Terms>
            <TermsDescription>뉴스레터 발송을 위한 개인 정보 수집 및 이용에 동의합니다.</TermsDescription>
            <TermsLink to="/terms">약관 상세보기</TermsLink>
          </Terms>
        </div>
        </NewsLetterWrapper>
      </NewsLetterContainer>
      <FooterContainer>
        <FirstFooter>
          <FooterTitle>CUSTOMER CENTER</FooterTitle>
          <PhoneNumber>
            <RoomNumber>객실예약<Tell>031-0000-0000</Tell></RoomNumber>
            <InquiryNumber>문의하기<Tell>031-0000-0000</Tell></InquiryNumber>
          </PhoneNumber>
          <FaxEmail>
            <Fax>FAX&nbsp; 000-0000-0000</Fax>
            <Email>이메일&nbsp; help@goorm@goorm.com</Email>
          </FaxEmail>
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
            <p>(주)구름기사단&nbsp;&nbsp;&nbsp;&nbsp;  인천광역시 중구 영종해안남로 321번길 186&nbsp;&nbsp; 사업자 등록번호 121-86-18441&nbsp;&nbsp; 통신판매번호 제 2017-인천중구-0027호</p>
            <p>대표이사:구름기사단&nbsp; Tel.1833-8855&nbsp;  E-mail:p-city@paradian.com</p>
            <p>Copyright © 어벤저스(김경규, 문소희, 박지국, 배진환, 이동규, 전민종). All rights reserved.</p>
          </div>
        </SecondFooter>
      </FooterContainer>
    </Container>
  );
};

export default Footer;