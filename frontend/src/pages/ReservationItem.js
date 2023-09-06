import React from 'react';
import Header from '../components/Header';
import { Left, Right, Wrapper } from './ReservationPage';
import { styled } from 'styled-components';
import item from '../images/item/item1.jpg';
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

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
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
  border: 1px solid #DDDDDD;
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
  border: 1px solid #DDDDDD;
  display: flex;
  flex-direction: column; 
`;

const RoomItemInfo = styled.div`
  padding: 35px 40px 40px 40px;
`;

const RoomItemTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.charcoal};
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
  border: 1px solid #DDDDDD;
  background-color: #fff;
  color: #666666;
  height: 50px;
  width: 100%;

  &:hover {
    color: ${props => props.theme.colors.brown};
    border-color: ${props => props.theme.colors.brown};
  }
`;

const ReservationDeleteBtn = styled(ReservationBtn)`
  &:hover {
    color: red;
    border-color: red;
  }
`;

const InfoBtn = styled.button`
  background-color: #95846E;
  color: #FFFFFF;
  height: 60px;
  width: 100%;
  margin-top: 60px;

  &:hover {
    background-color: #8A7057;
  }
`;

const NoItem = styled.div`
  background-color: ${props => props.theme.colors.lightGray};;
  width: 100%;
  height: 465px;
  border: 1px solid #DDDDDD;
`;


const ReservationItem = () => {
  // const [selectedItem, setSelectedItem] = useState(true);
  const selectedItem = true;

  const productTypes = ['객실', '다이닝'];
  const productCategories = ['디럭스', '패밀리', '스위트', '풀 빌라'];

  return (
    <div>
      <Header />
      <Container>
        <Title>예약하기</Title>
        <Wrapper>
          <Left>
            <SubTitle>예약 상품 선택</SubTitle>
            <SelectWrapper>
              <div>
                <Label htmlFor="productType">상품 유형</Label>
                <StyledSelect id="productType">
                  {productTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </StyledSelect>
              </div>
              <div>
                <Label htmlFor="productType">상품 유형</Label>
                <StyledSelect id="productType">
                  {productCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </StyledSelect>
              </div>
            </SelectWrapper>

            <RoomItemWrapper>
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
            {selectedItem && (
              <>
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
                  <ReservationDeleteBtn>삭제</ReservationDeleteBtn>
                </RoomItemInfo>
              </RoomItem>
              <InfoBtn>예약 정보 입력하기</InfoBtn>
              </>
            )}
            {!selectedItem && (
              <>
                <SubTitle>상품개요</SubTitle>
                <NoItem></NoItem>
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