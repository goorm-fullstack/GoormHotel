import React from 'react';
import { styled } from 'styled-components';
import Header from '../components/Header';

const MypageContainer = styled.div`
  display: flex;
  width: 1181px;
  margin: 0 auto;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #111111;
  margin: 160px 0 94px 0;
`;

const Contents = styled.div`
  display: flex;
`;

const EditWrapper = styled.div`
  width: 512px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #DDDDDD;
    top: 0;
    margin: 0 80px;
  }

  &:last-child {
      margin-bottom: 20px; 
  }
`;

const EditTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 33px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 510px;
  padding-left: 21px;
  height: 60px;
  font-size: 16px;
  color: #888888;
  margin-bottom: 10px;
  outline: none;
`;

const CouponWrapper = styled.div`
  width: 512px;
  margin-left: 160px;
`;

const RightTitle = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 34px;
`;

const Email = styled.div`
  display: flex;
`;

const EmailInput = styled(Input)`
  width: 380px;
  margin-right: 10px;
`;

const RequestBtn = styled.button`
  width: 120px;
  height: 60px;
  background-color: #DDDDDD;
  color: #888888;
`;

const EditButton = styled.button`
  background-color: #95846E;
  width: 100%;
  height: 60px;
  color: #FFFFFF;
`;

const Coupon = styled.div`
  width: 510px;
  background-color: #F5F5F5;
  height: 200px;
  position: relative;
  display: flex;
  margin-bottom: 10px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 80px;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
  }

  &::before {
    left: -20px;
  }

  &::after {
    right: -20px;
  }
`;

const GradeIcon = styled.svg`
  width: 108px;
  height: 104px;
  margin: 48px 41px 38px 62px;

  path {
    fill: url(#gradient);
  }
`;

const CounponInfo = styled.div`
  display: flex;
  width: 202px;
  flex-direction: column;
  margin: 50px 67px 50px 0;
`;

const CouponTitle = styled.p`
  font-size: 14px;
  color: #91684A;
  margin-bottom: 5px;
`;

const CouponName = styled.p`
  font-size: 24px;
  color: #21201E;
  margin-bottom: 12px;
`;

const PublishDate = styled.p`
  font-size: 14px;
  color: #888888;
  margin-bottom: 5px;
`;

const DateOfUse = styled(PublishDate)`
  width: 232px;
`;

const GuideText = styled.div`
  font-size: 14px;
  color: #888888;
  width: 415px;
  line-height: 1.5;
  margin-top: 25px;
`;

const Mypage = () => {
  return (
    <div>
      <Header backgroundColor="#21201E" />
      <MypageContainer>
        <Title>마이페이지</Title>
        <Contents>
          <EditWrapper>
            <EditTitle>회원정보 수정</EditTitle>
            <Input placeholder="아이디" />
            <Input placeholder="비밀번호" />
            <Input placeholder="비밀번호 확인" />
            <Input placeholder="이름" />
            <Email>
              <EmailInput placeholder="이메일" />
              <RequestBtn>인증번호 요청</RequestBtn>
            </Email>
            <Input placeholder="인증번호를 입력하세요" />
            <Input placeholder="연락처" />
            <Input placeholder="생년월일(선택입력)" />
            <Input placeholder="성별(선택입력)" />
            <EditButton>회원정보 수정</EditButton>
          </EditWrapper>
          <CouponWrapper>
            <RightTitle>멤버십 쿠폰</RightTitle>
            <Coupon>
              <GradeIcon data-name="Layer 1" id="Layer_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#493323" />
                <stop offset="50%" stopColor="#EAAC7F" />
                <stop offset="100%" stopColor="#91684A" />
              </linearGradient>
              </defs><title/><path d="M10.88,52.67A.92.92,0,0,0,11,53h0a1.56,1.56,0,0,0,.16.2l.11.08a.39.39,0,0,0,.1.08l20.84,12s0,0,.07,0l.08,0a.89.89,0,0,0,.69,0,.2.2,0,0,0,.08,0l.08,0L54,53.37l.1-.08.1-.08a1,1,0,0,0,.16-.2h0a.92.92,0,0,0,.11-.33s0-.06,0-.09,0,0,0-.08V28.44s0-.05,0-.08,0-.06,0-.09a1,1,0,0,0-.11-.33h0a1,1,0,0,0-.23-.26l-.07-.06L54,27.57l-20.84-12-.08,0-.08,0a1,1,0,0,0-.34-.07h0a1,1,0,0,0-.34.07l-.08,0-.07,0-20.84,12s0,0-.07.05l-.07.06a1,1,0,0,0-.23.26h0a1,1,0,0,0-.11.33s0,.06,0,.09,0,.05,0,.08V52.5s0,.06,0,.08S10.88,52.64,10.88,52.67Zm41.66-1.9-7-4V34.21l7-4Zm-31.7-2.3L31.7,54.74v8.07L13.86,52.5ZM32.7,27.94,43.55,34.2V46.74L32.7,53,21.84,46.74V34.2Zm1,26.8,10.85-6.27,7,4L33.7,62.81ZM44.55,32.47,33.7,26.2V18.14l17.84,10.3ZM31.7,26.2,20.84,32.47l-7-4L31.7,18.14Zm-11.86,8V46.74l-7,4V30.17Z"/><path d="M35.21,79.68a.86.86,0,0,0-.2.18l-.09.14a.47.47,0,0,0-.06.09.9.9,0,0,0,0,.16s0,.06,0,.1l-3,23a.85.85,0,0,0,0,.16.57.57,0,0,0,0,.13,1,1,0,0,0,.11.34h0a1.55,1.55,0,0,0,.19.24l.07,0a.76.76,0,0,0,.19.12l0,0,21.39,8.9a.61.61,0,0,0,.13,0s.08,0,.13,0h.13a.81.81,0,0,0,.31-.06l.09,0,.1,0L85.32,95.54a0,0,0,0,1,0,0,1.06,1.06,0,0,0,.29-.27l0-.08a1.27,1.27,0,0,0,.07-.12.8.8,0,0,0,0-.15,1,1,0,0,1,0-.1l3-23s0-.1,0-.15v-.14a.93.93,0,0,0-.12-.33h0a.88.88,0,0,0-.24-.27.41.41,0,0,0-.11-.07.57.57,0,0,0-.13-.08L66.79,61.87l-.11,0-.14-.05h-.28a1.2,1.2,0,0,0-.27.08s-.06,0-.08,0L35.28,79.61A.46.46,0,0,0,35.21,79.68ZM84,93.25l-7.3-3,1.53-11.82,8.32-4.81ZM65.2,73.81l11,4.59L74.67,90.22,55.4,101.34l-11-4.58,1.54-11.82ZM43.38,98.5l11,4.59-1,7.84-18.32-7.62Zm13,4.58L75.67,92l6.89,2.87L55.44,110.48ZM77.22,76.65l-11-4.58,1-7.85,18.31,7.63Zm-13-4.57L44.93,83.2,38,80.33,65.15,64.67ZM43.91,85,42.38,96.77l-8.33,4.81L36.6,81.9Z"/><path d="M79.24,13l-12.68.3a1,1,0,0,0-1,1l0,38.78a1,1,0,0,0,1,1l38.78,0h0a1,1,0,0,0,1-1l.3-12.68a1,1,0,0,0-.29-.73L80,13.29A1,1,0,0,0,79.24,13Zm8.13,10.52-9.91.24-8.52-8.52L78.86,15Zm6.84,6.84L94,40.28,79.41,25.71l9.92-.23ZM67.59,16.71,75.82,25,67.6,48.08Zm9.8,9.8L93.18,42.3,68.69,51ZM94.74,43.87,103,52.1H71.61Zm9.71,6.88-8.52-8.52.24-9.91,8.51,8.51Z"/><path d="M104,69.75a1,1,0,0,0-2,0V72a1,1,0,0,0,2,0Z"/><path d="M103,76.7a1,1,0,0,0-1,1v2.21a1,1,0,0,0,2,0V77.7A1,1,0,0,0,103,76.7Z"/><path d="M108.07,73.83h-2.21a1,1,0,0,0,0,2h2.21a1,1,0,0,0,0-2Z"/><path d="M101.11,74.83a1,1,0,0,0-1-1h-2.2a1,1,0,0,0,0,2h2.2A1,1,0,0,0,101.11,74.83Z"/><path d="M111.07,24.67a1,1,0,0,0,1-1v-2.2a1,1,0,0,0-2,0v2.2A1,1,0,0,0,111.07,24.67Z"/><path d="M110.07,31.62a1,1,0,1,0,2,0v-2.2a1,1,0,0,0-2,0Z"/><path d="M116.14,27.54a1,1,0,0,0,0-2h-2.2a1,1,0,0,0,0,2Z"/><path d="M108.19,25.54H106a1,1,0,0,0,0,2h2.2a1,1,0,0,0,0-2Z"/><path d="M22.7,103.85a1,1,0,0,0-2,0v2.2a1,1,0,0,0,2,0Z"/><path d="M21.7,110.8a1,1,0,0,0-1,1V114a1,1,0,0,0,2,0v-2.2A1,1,0,0,0,21.7,110.8Z"/><path d="M24.58,109.93h2.2a1,1,0,0,0,0-2h-2.2a1,1,0,1,0,0,2Z"/><path d="M15.63,108.93a1,1,0,0,0,1,1h2.2a1,1,0,0,0,0-2h-2.2A1,1,0,0,0,15.63,108.93Z"/><path d="M17.73,71.08a1,1,0,0,0,1-1v-2.2a1,1,0,0,0-2,0v2.2A1,1,0,0,0,17.73,71.08Z"/><path d="M16.73,78a1,1,0,0,0,2,0V75.83a1,1,0,0,0-2,0Z"/><path d="M23.81,73a1,1,0,0,0-1-1H20.6a1,1,0,0,0,0,2h2.21A1,1,0,0,0,23.81,73Z"/><path d="M12.65,74h2.2a1,1,0,0,0,0-2h-2.2a1,1,0,0,0,0,2Z"/><path d="M95.91,95.16a1.28,1.28,0,1,0,1.28-1.28A1.28,1.28,0,0,0,95.91,95.16Z"/><path d="M100.45,108.69a1.28,1.28,0,1,0-1.28-1.28A1.28,1.28,0,0,0,100.45,108.69Z"/><path d="M59.75,59a1.28,1.28,0,1,0-1.28,1.28A1.28,1.28,0,0,0,59.75,59Z"/><path d="M80,110.84a1.28,1.28,0,1,0,1.28-1.28A1.28,1.28,0,0,0,80,110.84Z"/><path d="M52.82,14.83a1.28,1.28,0,1,0-1.28,1.28A1.28,1.28,0,0,0,52.82,14.83Z"/><path d="M27.77,90.12a1.29,1.29,0,1,0-1.28,1.28A1.28,1.28,0,0,0,27.77,90.12Z"/><path d="M98.91,14.83a1.28,1.28,0,1,0-1.28,1.28A1.28,1.28,0,0,0,98.91,14.83Z"/></GradeIcon>
              <CounponInfo>
                <CouponTitle>Bronze 등급 혜택</CouponTitle>
                <CouponName>객실 5% 할인 쿠폰</CouponName>
                <PublishDate>발행일: 2023-08-01</PublishDate>
                <DateOfUse>사용기한: 2023-08-01~2023-08-31</DateOfUse>
              </CounponInfo>
            </Coupon>
            <GuideText>
              <p>* 상기 멤버십 서비스 혜택은 변경 및 종료될 수 있습니다.</p>
              <p>* 특전의 세부 이용 조건은 약관을 통해 확인하실 수 있습니다.</p>
              <p>* 등급 심사는 매월 1일 진행되며 최근 2년 간의 실적을 기준으로 합니다.</p>
            </GuideText>
          </CouponWrapper>
        </Contents>
      </MypageContainer>
    </div>
  );
};

export default Mypage;