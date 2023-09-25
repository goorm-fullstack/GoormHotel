import React, { useEffect, useState } from 'react';
import { Left, Right, Wrapper } from './ReservationPage';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import {
  commonContainerStyle,
  PageTitle,
  ContentsTitleXSmall,
  CheckLabel,
  InputCheckbox,
  NormalBtn,
  BtnWrapper,
  SubmitLinkBtn,
  CircleCloseBtn,
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
    height: 165px;
    background-size: cover;
  }
`;

const RoomItemInfo = styled.div`
  width: 100%;
  padding: 30px;
  letter-spacing: -0.02em;

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

  th,
  td {
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

  button {
    border-color: ${(props) => props.theme.colors.graylightborder};
  }
`;

const NoItem = styled.div`
  width: 293px;
  height: 550px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.graylight};
  font-size: ${(props) => props.theme.font.sizes};
  letter-spacing: -0.02em;

  svg {
    width: 100px;
  }
`;

const SelectedItem = styled.div`
  .imgwrap {
    width: 100%;
    height: 165px;
    background-size: cover;
  }

  h4 {
    font-weight: 500;
    color: ${(props) => props.theme.colors.goldhover};
    padding: 21px 20px;
    border-top: 1px solid ${(props) => props.theme.colors.grayborder};
    border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
    margin-bottom: 20px;
    background: white;
    position: relative;
  }

  h5 {
    font-size: ${(props) => props.theme.font.sizes};
    color: ${(props) => props.theme.colors.blacklight};
    font-weight: 500;
    margin-top: 30px;
    padding: 0 20px;
  }

  button {
    position: absolute;
    top: 17px;
    right: 20px;
  }

  p {
    padding: 0 20px;
    line-height: 1.5;
    font-size: ${(props) => props.theme.font.sizes};
    color: ${(props) => props.theme.colors.graydark};
  }

  table {
    margin-top: 20px;
    width: 100%;

    th,
    td {
      line-height: 1.5;
      font-size: ${(props) => props.theme.font.sizes};
      color: ${(props) => props.theme.colors.graydark};
    }

    th {
      padding-left: 20px;
      text-align: left;
    }

    td {
      padding-right: 20px;
      text-align: right;
    }
  }
`;

const SelectItem = styled.div`
  width: 100%;
  height: 552px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.graybg};
  overflow: hidden;
`;

const ReservationItem = () => {
  const productTypes = [
    {
      name: '전체',
      id: 'all',
    },
    {
      name: '객실',
      id: 'room',
    },
    {
      name: '다이닝',
      id: 'dining',
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();
  // const { reservationData } = location.state;
  const [selectedType, setSelectedType] = useState('room');
  const [selectedCategory, setSelectedCategory] = useState('deluxe');
  const [products, setProducts] = useState([]);

  console.log(selectedProduct);

  const productCategories = ['전체', '디럭스', '패밀리', '스위트', '풀 빌라'];

  useEffect(() => {
    axios
      .get('http://localhost:8080/specialOffer', {
        params: {
          type: selectedType,
          typeDetail: selectedCategory,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedType, selectedCategory]);

  const handleReservationClick = (productInfo) => {
    setSelectedProduct(productInfo);
  };

  const handleDeleteClick = () => {
    setSelectedProduct(null);
  };

  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    const selectedTypeObject = productTypes.find((item) => item.english === selectedValue);

    if (selectedTypeObject) {
      setSelectedType(selectedTypeObject.english);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <Container>
        <PageTitle>스페셜오퍼</PageTitle>
        <Wrapper>
          <Left>
            <ContentsTitleXSmall>예약 상품 선택</ContentsTitleXSmall>
            <SelectWrapper>
              <div className="typewrapper">
                {productTypes.map((type, index) => (
                  <CheckLabel for={type.id}>
                    <InputCheckbox type="checkbox" id={type.id} key={index} onChange={handleTypeChange} value={selectedType} />
                    {type.name}
                  </CheckLabel>
                ))}
              </div>
              <div className="categorywrap">
                <p>
                  전체 <strong>0</strong> 개
                </p>
                <select id="productType" value={selectedCategory} onChange={handleCategoryChange}>
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
                  <div className="imgwrap" style={{ backgroundImage: `url(${product.thumbnailPath})` }} alt="상품 이미지" />
                  <RoomItemInfo>
                    <h4>{product.name}</h4>
                    <p>
                      {product.type === 'room' ? '객실' : '다이닝'}
                      <span>{product.typeDetail}</span>
                      <span>{product.capacity}인 기준</span>
                    </p>
                    <p className="price">
                      <strong>{product.price}</strong> 원 ~
                    </p>
                    <h5>추가 인원 비용</h5>
                    <table>
                      <tr>
                        <th>성인(1인)</th>
                        <td>{product.priceAdult} 원</td>
                      </tr>
                      <tr>
                        <th>어린이(1인)</th>
                        <td>{product.priceChildren} 원</td>
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
                      <div className="imgwrap" style={{ backgroundImage: `url(${selectedProduct.thumbnailPath})` }} alt="상품 이미지" />
                      <h4>
                        {selectedProduct.name}
                        <CircleCloseBtn onClick={handleDeleteClick}></CircleCloseBtn>
                      </h4>
                      <p>{selectedProduct.type === 'room' ? '객실' : '다이닝'}</p>
                      <p>{selectedProduct.typeDetail}</p>
                      <p>성인 {selectedProduct.capacity}</p>
                      <table>
                        <tr>
                          <th>기본가</th>
                          <td>{selectedProduct.price} 원</td>
                        </tr>
                      </table>
                      <h5>추가 인원 비용</h5>
                      <table>
                        <tr>
                          <th>성인</th>
                          <td>{selectedProduct.priceAdult} 원</td>
                          {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 

                          예약 정보 입력 페이지에서 기준 인원 초과하여 인원 추가하는 경우 
                          추가된 인원 수에 맞춰 위 계산법 적용됩니다. 이하 동일 */}
                        </tr>
                        <tr>
                          <th>어린이</th>
                          <td>{selectedProduct.priceChildren} 원</td>
                          {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 */}
                        </tr>
                      </table>
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
            <BtnWrapper className="full mt20">
              <SubmitLinkBtn className="shadow" to="/offers/step2">
                {/*  state={{ reservationData: reservationData, selectedProduct: selectedProduct }} */}
                예약 정보 입력하기
              </SubmitLinkBtn>
            </BtnWrapper>
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ReservationItem;
