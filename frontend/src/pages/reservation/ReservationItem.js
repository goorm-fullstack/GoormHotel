import React, { useState } from 'react';
import { Left, Right, Wrapper } from './ReservationPage';
import { styled } from 'styled-components';
import item from '../../images/item/item1.jpg';
import {
  commonContainerStyle,
  PageTitle,
  ContentsTitleXSmall,
  CheckLabel,
  InputCheckbox,
  NormalBtn,
  BtnWrapper,
  SubmitBtn,
} from '../../components/common/commonStyles';
import Paging from '../../components/common/Paging';

const Container = styled(commonContainerStyle)``;

const SelectWrapper = styled.div`
  margin-bottom: 40px;

  .typewrapper {
    background-color: ${(props) => props.theme.colors.graybg};
    display: flex;
    padding: 21px 20px;
    gap: 0 20px;
  }

  .typewrapper label {
    color: ${(props) => props.theme.colors.blacklight};
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

    strong {
      color: ${(props) => props.theme.colors.goldhover};
    }
  }
`;

const RoomItemWrapper = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px 16px;
`;

const RoomItem = styled.li`
  width: calc((100% / 3) - (32px / 3));
  border: 1px solid ${(props) => props.theme.colors.graylightborder};

  .imgwrap {
    width: 100%;
    height: 190px;
    background-size: cover;
  }
`;

const RoomItemInfo = styled.div`
  width:100%;
  padding: 30px;
  letter-spacing; -0.02em;

  h4 {
    font-size: ${(props) => props.theme.font.sizem};
    font-weight: 500;
    color: ${(props) => props.theme.colors.charcoal};
    margin-bottom: 10px;
  }

  p {
    color: ${(props) => props.theme.colors.graydark};
    font-size: ${(props) => props.theme.font.sizexs};

    span::before {
      content: '';
      width: 1px;
      height: 9px;
      background: ${(props) => props.theme.colors.grayborder};
      display: inline-block;
      margin: 0 8px;
    }
  }

  p.price {
    color: ${(props) => props.theme.colors.blacklight};
    font-weight: 500;
    margin: 15px 0 30px;
    letter-spacing: -0.02em;

    strong {
      font-size: ${(props) => props.theme.font.sizem};
    }
  }

  h5 {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.blacklight};
    font-weight: 500;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
  }

  th, td {
    color: ${(props) => props.theme.colors.graydark};
    font-size: ${(props) => props.theme.font.sizexs};
    line-height: 1.5;
  }

  th {
    width: 50%;
  }

  td {
    text-align: right;
  }
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

const NoItem = styled.div`
  width: 293px;
  height: 500px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.graylight};

  svg {
    width: 100px;
  }
`;

const SelectedItem = styled.div`
  h4 {
    font-weight: 500;
  }
`;

const SelectItem = styled.div`
  width: 100%;
  height: 502px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.graybg};
`;

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
      type: '객실',
      category: '디럭스',
      basicPrice: '160,000',
      capacity: 2,
      adultPrice: '80,000',
      childPrice: '40,000',
    },
    {
      name: '패밀리 객실',
      image: item,
      type: '객실',
      category: '패밀리',
      basicPrice: '180,000',
      capacity: 2,
      adultPrice: '90,000',
      childPrice: '45,000',
    },
    {
      name: '패밀리 객실',
      image: item,
      type: '객실',
      category: '패밀리',
      basicPrice: '180,000',
      capacity: 2,
      adultPrice: '90,000',
      childPrice: '45,000',
    },
    {
      name: '패밀리 객실',
      image: item,
      type: '객실',
      category: '패밀리',
      basicPrice: '180,000',
      capacity: 2,
      adultPrice: '90,000',
      childPrice: '45,000',
    },
    {
      name: '패밀리 객실',
      image: item,
      type: '객실',
      category: '패밀리',
      basicPrice: '180,000',
      capacity: 2,
      adultPrice: '90,000',
      childPrice: '45,000',
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
                <p>
                  전체 <strong>0</strong> 개
                </p>
                <select id="productType">
                  {productCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </SelectWrapper>
            <RoomItemWrapper>
              {products.map((product, index) => (
                <RoomItem key={index}>
                  <div className="imgwrap" style={{ backgroundImage: `url(${product.image})` }} alt="ItemImg" />
                  <RoomItemInfo>
                    <h4>{product.name}</h4>
                    <p>
                      {product.type}
                      <span>{product.category}</span>
                      <span>{product.capacity}인 기준</span>
                    </p>
                    <p className="price">
                      <strong>{product.basicPrice}</strong> 원 ~
                    </p>
                    <h5>추가 인원 비용</h5>
                    <table>
                      <tr>
                        <th>어른(1인)</th>
                        <td>{product.adultPrice} 원</td>
                      </tr>
                      <tr>
                        <th>어린이(1인)</th>
                        <td>{product.childPrice} 원</td>
                      </tr>
                    </table>
                    <BtnWrapper className="full mt30">
                      <NormalBtn onClick={() => handleReservationClick(product)}>상품 담기(예약)</NormalBtn>
                    </BtnWrapper>
                  </RoomItemInfo>
                </RoomItem>
              ))}
            </RoomItemWrapper>
            <Paging />
          </Left>
          <Right>
            <ContentsTitleXSmall>상품 개요</ContentsTitleXSmall>
            <SelectItem>
              {(() => {
                if (selectedProduct) {
                  return (
                    <SelectedItem>
                      <h4>{selectedProduct.name}</h4>
                      <p>
                        {selectedProduct.type}
                        <span>{selectedProduct.category}</span>
                        <span>성인 {selectedProduct.capacity}</span>
                      </p>
                      <p className="price">
                        총액&nbsp;
                        <strong>{selectedProduct.basicPrice}</strong> 원
                      </p>
                      <ReservationDeleteBtn onClick={handleDeleteClick}>삭제</ReservationDeleteBtn>
                    </SelectedItem>
                  );
                } else {
                  return (
                    <NoItem>
                      <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="none" height="256" width="256" />
                        <path
                          d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
                          fill="none"
                          stroke="#ddd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="16"
                        />
                        <circle cx="80" cy="204" fill="none" r="20" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                        <circle cx="184" cy="204" fill="none" r="20" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                        <path
                          d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
                          fill="none"
                          stroke="#ddd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="16"
                        />
                      </svg>
                      <br />
                      담긴 상품이 없습니다.
                    </NoItem>
                  );
                }
              })()}
            </SelectItem>
            <BtnWrapper className="full mt40">
              <SubmitBtn type="submit" className="height60">
                예약 정보 입력하기
              </SubmitBtn>
            </BtnWrapper>
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ReservationItem;
