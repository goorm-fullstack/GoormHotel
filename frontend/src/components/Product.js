import React from 'react';
import item from '../images/item/item1.jpg';
import { styled } from 'styled-components';
import {commonSubTitleStyle } from '../components/common/commonStyles';

const SubTitle = styled.h2`
  ${commonSubTitleStyle}
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 467px;
  margin-bottom: 52px;
`;

const Info = styled.div`
  background-color: ${props => props.theme.colors.lightGray};
  height: 50%;
  padding: 35px 46px 0 40px;
`;

const InfoTitle = styled.h1`
  font-size: 18px;
  color: ${props => props.theme.colors.charcoal};
  margin-bottom: 20px;
  font-weight: bold;
`;

const InfoWrapper = styled.div`
  display: flex;
  height: 127px;
  font-size: 14px;
`;

const InfoLeft = styled.div`
  color: #888888;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoRight = styled.div`
  width: 136px;
  color: #666666;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PaymentInfo = styled.div`
  padding-bottom: 28px;
  height: 71px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #DDDDDD;
  margin-bottom: 28px;
`;

const PaymentPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888888;
`;

const DiscountPrice = styled.p`
  color: #BB2525;
`;

const TotalPrice = styled.div`
  display: flex;
  height: 28px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${props => props.theme.colors.charcoal};
  margin-bottom: 15px;
`;

const Price = styled.p`
  font-size: 22px;
  color: #95846E;
`;

const Product = () => {
  return (
    <>
    <ProductInfo>
      <img src={item} alt="itemImg" />
      <Info>
        <InfoTitle>상품명</InfoTitle>
        <InfoWrapper>
          <InfoLeft>
            <p>상품 유형</p>
            <p>상품 분류</p>
            <p>기본 가격(1박/2인 기준)</p>
            <p>어른 추가(1인)</p>
            <p>어린이 추가(1인)</p>
          </InfoLeft>
          <InfoRight>
            <p>객실</p>
            <p>디럭스</p>
            <p>160,000원</p>
            <p>80,000 원/최대 1인</p>
            <p>40,000 원/최대 2인</p>
          </InfoRight>
        </InfoWrapper>
      </Info>
    </ProductInfo>
    <SubTitle>결제 정보</SubTitle>
    <PaymentInfo>
      <PaymentPrice>
        <p>총액</p>
        <p>500,000 원</p>
      </PaymentPrice>
      <PaymentPrice>
        <p>할인액</p>
        <DiscountPrice>-200,000 원</DiscountPrice>
      </PaymentPrice>
    </PaymentInfo>
    <TotalPrice>
      <p>최종금액(VAT)포함</p>
      <Price>300,000 원</Price>
    </TotalPrice>
    </>
  );
};

export default Product;