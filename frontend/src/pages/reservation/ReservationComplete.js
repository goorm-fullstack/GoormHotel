import React from 'react';
import { Section, Left, Right, Wrapper } from './ReservationPage';
import { styled } from 'styled-components';
import Product from '../../components/Item';
import { commonContainerStyle, commonTitleStyle, PageTitle } from '../../components/common/commonStyles';

const Container = styled.div`
  ${commonContainerStyle}
`;

const ReserveInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 242px;
  border-top: 1px solid #dddddd;
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  height: 100%;
`;

const InfoTitle = styled.p`
  font-size: 14px;
  color: #111111;
  padding: 28px 0 19px 19px;
  background-color: ${(props) => props.theme.colors.lightGray};
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
  border-bottom: 1px solid #dddddd;
`;

const Payment = styled.div`
  display: flex;
  justify-content: space-between;
  color: #21201e;
  font-size: 14px;
`;

const ReservationComplete = ({ title }) => {
  return (
    <>
      <Container>
        <PageTitle>{title}</PageTitle>
        <Wrapper>
          <Left>
            <Section>
              <PageTitle>예약 정보</PageTitle>
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
              <PageTitle>예약자 정보</PageTitle>
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
              <PageTitle>상품권 등록</PageTitle>
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
              <PageTitle>쿠폰 적용</PageTitle>
              <CouponInfo>
                <Coupon>
                  <p>[Bronze 등급 혜택] 객실 5% 할인 쿠폰</p>
                  <p>-25,000 원</p>
                </Coupon>
              </CouponInfo>
            </Section>
          </Left>

          <Right>
            <PageTitle>상품 개요</PageTitle>
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
