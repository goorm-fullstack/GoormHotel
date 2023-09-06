import React from 'react';
import Header from '../components/Header';
import { Section, Left, Right, Wrapper } from './ReservationPage';
import { styled } from 'styled-components';
import Product from '../components/Product';
import { commonContainerStyle, commonTitleStyle, commonSubTitleStyle } from '../components/common/commonStyles';

const Container = styled.div`
  ${commonContainerStyle}
`;

const Title = styled.h1`
  ${commonTitleStyle}
`;

const SubTitle = styled.h2`
  ${commonSubTitleStyle}
`;

const ReserveInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 242px;
  border-top: 1px solid #DDDDDD;
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #DDDDDD;
  height: 100%;
`;

const InfoTitle = styled.p`
  font-size: 14px;
  color: #111111;
  padding: 28px 0 19px 19px;
  background-color: ${props => props.theme.colors.lightGray};;
  width: 120px;
  height: 100%;
`;

const Info = styled.p`
  font-size: 16px;
  padding-left: 19px;
`;

const Half = styled(InfoWrapper)`
  width: 50%;
  border: none;
`;

const PersonInfo = styled(ReserveInfo)`
  height: 182px;
`;

const CouponInfo = styled(ReserveInfo)`
  height: auto;
`;

const Coupon = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666666;
  padding: 13px 0;
  border-bottom: 1px solid #DDDDDD;
`;

const Payment = styled.div`
  display: flex;
  justify-content: space-between;
  color: #21201E;
  font-size: 14px;
`;

const ReservationComplete = ({ title }) => {
  return (
    <>
      <Header />
      <Container>
        <Title>{title}</Title>
        <Wrapper>
          <Left>
            <Section>
              <SubTitle>예약 정보</SubTitle>
              <ReserveInfo>
                <InfoWrapper>
                  <InfoTitle>예약번호</InfoTitle>
                  <Info>2023082555672148</Info>
                </InfoWrapper>
                <InfoWrapper>
                  <Half>
                    <InfoTitle>체크인</InfoTitle>
                    <Info>2023.08.16 (수)</Info>
                  </Half>
                  <Half>
                    <InfoTitle>체크아웃</InfoTitle>
                    <Info>2023.08.17 (목)</Info>
                  </Half>
                </InfoWrapper>
                <InfoWrapper>
                  <InfoTitle>상품수량</InfoTitle>
                  <Info>1개</Info>
                </InfoWrapper>
                <InfoWrapper>
                  <Half>
                    <InfoTitle>어른</InfoTitle>
                    <Info>1명</Info>
                  </Half>
                  <Half>
                    <InfoTitle>어린이</InfoTitle>
                    <Info>1명</Info>
                  </Half>
                </InfoWrapper>
              </ReserveInfo>
            </Section>

            <Section>
              <SubTitle>예약자 정보</SubTitle>
              <PersonInfo>
                <InfoWrapper>
                  <Half>
                    <InfoTitle>예약자명</InfoTitle>
                    <Info>홍길동</Info>
                  </Half>
                  <Half>
                    <InfoTitle>연락처</InfoTitle>
                    <Info>010-1234-1234</Info>
                  </Half>
                </InfoWrapper>
                <InfoWrapper>
                  <InfoTitle>이메일</InfoTitle>
                  <Info>goorm@goorm.com</Info>
                </InfoWrapper>
                <InfoWrapper>
                  <InfoTitle>요청사항</InfoTitle>
                  <Info>내용</Info>
                </InfoWrapper>
              </PersonInfo>
            </Section>

            <Section>
              <SubTitle>상품권 등록</SubTitle>
              <CouponInfo>
                <Coupon>
                  <p>[추석 맞이 특가 이벤트] 객실 금액 100,000원 할인 상품권</p>
                  <p>-100,000 원</p>
                </Coupon>
                <Coupon>
                  <p>[추석 맞이 특가 이벤트] 전 상품 금액 50,000원 할인 상품권</p>
                  <p>-50,000 원</p>
                </Coupon>
              </CouponInfo>
            </Section>

            <Section>
              <SubTitle>쿠폰 적용</SubTitle>
              <CouponInfo>
                <Coupon>
                  <p>[Bronze 등급 혜택] 객실 5% 할인 쿠폰</p>
                  <p>-25,000 원</p>
                </Coupon>
              </CouponInfo>
            </Section>
          </Left>

          <Right>
              <SubTitle>상품 개요</SubTitle>
              <Product />
              <Payment>
                <p>결제수단</p>
                <p>신용카드</p>
              </Payment>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default ReservationComplete;