import React, { useState } from 'react';
import { Left, Right, Wrapper } from './ReservationPage';
import { styled } from 'styled-components';
import item from '../../images/item/item1.jpg';
import { commonContainerStyle, PageTitle, ContentsTitleXSmall, CheckLabel, InputCheckbox } from '../../components/common/commonStyles';
import { ReactComponent as Cart } from '../../images/icon/ico_cart.svg';

const Container = styled(commonContainerStyle)``;

const SelectWrapper = styled.div`
  margin-bottom: 40px;

  .typewrapper {
    background-color: ${(props) => props.theme.colors.graybg};
    display: flex;
    padding: 21px 20px;
    gap: 0 20px;
  }

  .categorywrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    p {
      font-weight: 500;
      font-size: ${(props) => props.theme.font.sizexs};
    }
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #111111;
  margin-bottom: 12px;
`;

const StyledSelect = styled.select`
  width: 380px;
  height: 60px;
  font-size: 18px;
  padding-left: 20px;
  border: 1px solid #dddddd;
  outline: none;
`;

const RoomItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RoomItem = styled.div`
  width: 380px;
  height: 555px;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
`;

const RoomItemInfo = styled.div`
  padding: 35px 40px 40px 40px;
`;

const CartItemWrapper = styled(RoomItemInfo)`
  background-color: #f5f5f5;
`;

const RoomItemTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.charcoal};
  margin-bottom: 25px;
`;

const DetailWrapper = styled.div`
  display: flex;
  height: 127px;
  font-size: 14px;
  margin-bottom: 47px;
`;

const DetailTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #888888;
  width: 160px;
`;

const DetailInfo = styled(DetailTitle)`
  width: 136px;
  color: #666666;
`;

const ReservationBtn = styled.button`
  border: 1px solid #dddddd;
  background-color: ${(props) => props.theme.colors.brown};
  color: #ffffff;
  height: 50px;
  width: 100%;

  &:hover {
    background-color: #8a7057;
  }
`;

const ReservationDeleteBtn = styled(ReservationBtn)`
  background-color: transparent;
  border-color: #d30a0a;
  color: #d30a0a;

  &:hover {
    color: #ffffff;
    background-color: #d30a0a;
  }
`;

const InfoBtn = styled.button`
  background-color: #95846e;
  color: #ffffff;
  height: 60px;
  width: 100%;
  margin-top: 60px;

  &:hover {
    background-color: #8a7057;
  }
`;

const NoItem = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray};
  width: 100%;
  height: 465px;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CartIcon = styled(Cart)`
  fill: #888888;
  width: 80px;
`;

const NoItemText = styled.span`
  margin-top: 23px;
  color: #888888;
`;

const SelectCategory = styled.select``;

const ReservationItem = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log(selectedProduct);

  const productTypes = [
    {
      name: '전체',
      id: 'all',
    },
    {
      name: '객실',
      id: 'rooms',
    },
    {
      name: '다이닝',
      id: 'dining',
    },
  ];
  const productCategories = ['전체', '디럭스', '패밀리', '스위트', '풀 빌라'];

  const handleReservationClick = (productInfo) => {
    setSelectedProduct(productInfo);
  };

  const handleDeleteClick = () => {
    setSelectedProduct(null);
  };

  const products = [
    {
      name: '디럭스 객실',
      image: item,
      price: 160000,
      type: '객실',
      category: '디럭스',
      basicPrice: 160000,
      adultPrice: 80000,
      childPrice: 40000,
    },
    {
      name: '패밀리 객실',
      image: item,
      price: 180000,
      type: '객실',
      category: '패밀리',
      basicPrice: 180000,
      adultPrice: 90000,
      childPrice: 45000,
    },
    // 다른 상품들...
  ];

  return (
    <div>
      <Container>
        <PageTitle>스페셜오퍼</PageTitle>
        <Wrapper>
          <Left>
            <ContentsTitleXSmall>예약 상품 선택</ContentsTitleXSmall>
            <SelectWrapper>
              <div className="typewrapper">
                {productTypes.map((type) => (
                  <CheckLabel for={type.id}>
                    <InputCheckbox type="checkbox" id={type.id} />
                    {type.name}
                  </CheckLabel>
                ))}
              </div>
              <div className="categorywrap">
                <p>전체 0 개</p>
                <SelectCategory id="productType">
                  {productCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </SelectCategory>
              </div>
            </SelectWrapper>

            <RoomItemWrapper>
              {products.map((product, index) => (
                <RoomItem key={index}>
                  <img src={product.image} alt="ItemImg" />
                  <RoomItemInfo>
                    <RoomItemTitle>{product.name}</RoomItemTitle>
                    <DetailWrapper>
                      <DetailTitle>
                        <p>상품 유형</p>
                        <p>상품 분류</p>
                        <p>기본 가격(1박/2인 기준)</p>
                        <p>어른 추가(1인)</p>
                        <p>어린이 추가(1인)</p>
                      </DetailTitle>
                      <DetailInfo>
                        <p>{product.type}</p>
                        <p>{product.category}</p>
                        <p>{product.basicPrice} 원</p>
                        <p>{product.adultPrice} 원/최대 1인</p>
                        <p>{product.childPrice} 원/최대 2인</p>
                      </DetailInfo>
                    </DetailWrapper>
                    <ReservationBtn onClick={() => handleReservationClick(product)}>예약하기</ReservationBtn>
                  </RoomItemInfo>
                </RoomItem>
              ))}

              <RoomItem>
                <img src={item} alt="ItemImg" />
                <RoomItemInfo>
                  <RoomItemTitle>상품명</RoomItemTitle>
                  <DetailWrapper>
                    <DetailTitle>
                      <p>상품 유형</p>
                      <p>상품 분류</p>
                      <p>기본 가격(1박/2인 기준)</p>
                      <p>어른 추가(1인)</p>
                      <p>어린이 추가(1인)</p>
                    </DetailTitle>
                    <DetailInfo>
                      <p>객실</p>
                      <p>디럭스 </p>
                      <p>160,000 원</p>
                      <p>80,000 원/최대 1인</p>
                      <p>40,000 원/최대 2인</p>
                    </DetailInfo>
                  </DetailWrapper>
                  <ReservationBtn>예약하기</ReservationBtn>
                </RoomItemInfo>
              </RoomItem>
              <RoomItem>
                <img src={item} alt="ItemImg" />
                <RoomItemInfo>
                  <RoomItemTitle>상품명</RoomItemTitle>
                  <DetailWrapper>
                    <DetailTitle>
                      <p>상품 유형</p>
                      <p>상품 분류</p>
                      <p>기본 가격(1박/2인 기준)</p>
                      <p>어른 추가(1인)</p>
                      <p>어린이 추가(1인)</p>
                    </DetailTitle>
                    <DetailInfo>
                      <p>객실</p>
                      <p>디럭스 </p>
                      <p>160,000 원</p>
                      <p>80,000 원/최대 1인</p>
                      <p>40,000 원/최대 2인</p>
                    </DetailInfo>
                  </DetailWrapper>
                  <ReservationBtn>예약하기</ReservationBtn>
                </RoomItemInfo>
              </RoomItem>
            </RoomItemWrapper>
          </Left>

          <Right>
            <ContentsTitleXSmall>상품개요</ContentsTitleXSmall>
            {selectedProduct && (
              <>
                <RoomItem>
                  <img src={item} alt="ItemImg" />
                  <CartItemWrapper>
                    <RoomItemTitle>상품명</RoomItemTitle>
                    <DetailWrapper>
                      <DetailTitle>
                        <p>상품 유형</p>
                        <p>상품 분류</p>
                        <p>기본 가격(1박/2인 기준)</p>
                        <p>어른 추가(1인)</p>
                        <p>어린이 추가(1인)</p>
                      </DetailTitle>
                      <DetailInfo>
                        <p>{selectedProduct.type}</p>
                        <p>{selectedProduct.category} </p>
                        <p>{selectedProduct.basicPrice} 원</p>
                        <p>{selectedProduct.adultPrice} 원/최대 1인</p>
                        <p>{selectedProduct.childPrice} 원/최대 2인</p>
                      </DetailInfo>
                    </DetailWrapper>
                    <ReservationDeleteBtn onClick={handleDeleteClick}>삭제</ReservationDeleteBtn>
                  </CartItemWrapper>
                </RoomItem>
                <InfoBtn>예약 정보 입력하기</InfoBtn>
              </>
            )}
            {!selectedProduct && (
              <>
                <NoItem>
                  <CartIcon />
                  <NoItemText>담긴 상품이 없습니다.</NoItemText>
                </NoItem>
                <InfoBtn>예약 정보 입력하기</InfoBtn>
              </>
            )}
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ReservationItem;
