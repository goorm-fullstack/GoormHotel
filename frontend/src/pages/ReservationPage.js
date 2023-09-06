import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { styled } from "styled-components";
import moment from "moment";
import { StyledCalendar } from '../components/Reservation';
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

export const Wrapper = styled.div`
  display: flex;
`;

export const Left = styled.div`
  width: 770px;
  margin-right: 29px;
`;

export const Right = styled.div`
  width: 380px;
  height: 820px;
`;

export const Section = styled.div`
  margin-bottom: 53px;
`;


const ReservationInfoDate = styled.div`
  display: flex;
  margin-bottom: 19px;
`;

const CheckIn = styled.div``;

const CheckTitle = styled.p`
  font-size: 14px;
  margin-bottom: 11px;
`;

const CheckBtn = styled.button`
  width: 380px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  font-size: 18px;
  border: 1px solid #ddd;
  background-color: #fff;
  
  svg {
    fill: #102C57;
  }
`;

const CheckOut = styled(CheckIn)`
  margin-left: 9px;
`;

const CalendarContainer = styled.div`
  position: relative;
`;

const CalendarWrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const SelectContainer = styled.div`
  display: flex;
`;

const SelectLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 250px;
  height: 60px;
  font-size: 20px;
  text-align: center;
  outline: none;
  border: 1px solid #dddddd;
  background-position: right 10px center; 
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 9px;
`;

const Input = styled.input`
  height: 60px;
  width: 770px;
  outline: none;
  margin-top: 10px;
`;

const NameInput = styled.input`
  height: 60px;
  width: 380px;
`;

const PhoneInput = styled(NameInput)`
  margin-left: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const CouponForm = styled.form`
  display: flex;
  height: 60px;
  font-size: 16px;
  margin-bottom: 23px;
`;

const CouponInput = styled.input`
  width: 580px;
  padding-left: 21px;
  margin-right: 10px;
`;

const CouponBtn = styled.button`
  width: 180px;
  background-color: #dddddd;
  color: #777777;
`;

const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CouponInfoWrapper = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  padding: 11px 0;
  border-bottom: ${({ $isFirst }) => ($isFirst ? "none" : "1px solid #DDDDDD")};
`;

const CouponName = styled.p`
  color: #666666;
`;

const CouponPrice = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CouponSelect = styled.select`
  width: 100%;
  height: 60px;
  padding: 16px 20px;
  outline: none;
  font-size: 16px;

  &:disabled {
    color: #888888;
    background-color: #EDEDED;
  }
`;

const PaymentBtn = styled.button`
  background-color: #95846e;
  color: #ffffff;
  height: 60px;
  width: 100%;
`;

const RemoveButton = styled.button`
  background-color: #bdbdbd;
  cursor: pointer;
  margin-left: 12px;
  color: #fff;
  border-radius: 100%;
  padding: 4px;
  text-align: center;
  font-size: 11px;

  &:hover {
    background-color: #21201e;
  }
`;

const ReservationPage = () => {
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [giftCardNumber, setGiftCardNumber] = useState("");
  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  const userLoggedIn = false;
  const [selectedOption, setSelectedOption] = useState("");

  const roomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const adultOptions =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const childrenOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
  const [coupons, setCoupons] = useState([
    {
      name: "추석 맞이 특가 이벤트: 객실 금액 100,000원 할인 상품권",
      price: "-100,000 원",
    },
    {
      name: "추석 맞이 특가 이벤트: 전 상품 금액 50,000원 할인 상품권",
      price: "-50,000 원",
    },
  ]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formattedToday = formatAndSetDate(today);
    const formattedTomorrow = formatAndSetDate(tomorrow);

    setCheckInDate(formattedToday);
    setCheckOutDate(formattedTomorrow);
  }, []);

  const formatAndSetDate = (date) => {
    const formattedDate = moment(date).format("YYYY.MM.DD");
    const dayOfWeek = moment(date).format("ddd");
    return `${formattedDate} (${dayOfWeek})`;
  };

  const handleCheckInToggle = () => {
    setCheckInOpen(!checkInOpen);
    setCheckOutOpen(false);
  };

  const handleCheckOutToggle = () => {
    setCheckOutOpen(!checkOutOpen);
    setCheckInOpen(false);
  };

  const handleCheckInDateChange = (selectedDate) => {
    setCheckInValue(selectedDate);
    setCheckInOpen(false);
    const formattedDate = moment(selectedDate).format("YYYY.MM.DD");
    const dayOfWeek = moment(selectedDate).format("ddd");
    setCheckInDate(`${formattedDate} (${dayOfWeek})`);
  };

  const handleCheckOutDateChange = (selectedDate) => {
    setCheckOutValue(selectedDate);
    setCheckOutOpen(false);
    const formattedDate = moment(selectedDate).format("YYYY.MM.DD");
    const dayOfWeek = moment(selectedDate).format("ddd");
    setCheckOutDate(`${formattedDate} (${dayOfWeek})`);
  };

  const isDateDisabled = (date) => {
    return moment(date).isBefore(moment(), "day");
  };

  const handleCouponNumber = (event) => {
    setGiftCardNumber(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("Selected option:", event.target.value);
  };

  const handleRemoveCoupon = (index) => {
    // 해당 인덱스의 쿠폰을 삭제합니다.
    const updatedCoupons = coupons.filter((_, i) => i !== index);
    setCoupons(updatedCoupons);
  };

  return (
    <div>
      <Header />
      <Container>
        <Title>예약하기</Title>
        <Wrapper>
          <Left>
            <Section>
              <SubTitle>예약 정보</SubTitle>
              <ReservationInfoDate>
                <CheckIn>
                  <CheckTitle>체크인</CheckTitle>
                  <CheckBtn onClick={handleCheckInToggle}>
                    <p>{checkInDate}</p>
                    <svg viewBox="0 0 32 32" width="18" height="18">
                      <g xmlns="http://www.w3.org/2000/svg" id="calendar_1_">
                        <path
                          d="M 29.334 3 H 25 V 1 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 2 h -6 V 1 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 2 H 9 V 1 c 0 -0.553 -0.448 -1 -1 -1 S 7 0.447 7 1 v 2 H 2.667 C 1.194 3 0 4.193 0 5.666 v 23.667 C 0 30.806 1.194 32 2.667 32 h 26.667 C 30.807 32 32 30.806 32 29.333 V 5.666 C 32 4.193 30.807 3 29.334 3 Z M 30 29.333 C 30 29.701 29.701 30 29.334 30 H 2.667 C 2.299 30 2 29.701 2 29.333 V 5.666 C 2 5.299 2.299 5 2.667 5 H 7 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 V 5 h 4.334 C 29.701 5 30 5.299 30 5.666 V 29.333 Z"
                        />
                        <rect
                          x="7"
                          y="12"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="7"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="7"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="12"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="12"
                          width="4"
                          height="3"
                        />
                      </g>
                    </svg>
                  </CheckBtn>
                  <CalendarContainer>
                    <CalendarWrapper open={checkInOpen}>
                      <StyledCalendar
                        tileDisabled={({ date }) => isDateDisabled(date)}
                        onChange={handleCheckInDateChange}
                        value={checkInValue}
                        formatDay={(locale, date) => moment(date).format("DD")}
                      ></StyledCalendar>
                    </CalendarWrapper>
                  </CalendarContainer>
                </CheckIn>
                <CheckOut>
                  <CheckTitle>체크아웃</CheckTitle>
                  <CheckBtn onClick={handleCheckOutToggle}>
                    <p>{checkOutDate}</p>
                    <svg viewBox="0 0 32 32" width="18" height="18">
                      <g xmlns="http://www.w3.org/2000/svg" id="calendar_1_">
                        <path
                          d="M 29.334 3 H 25 V 1 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 2 h -6 V 1 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 2 H 9 V 1 c 0 -0.553 -0.448 -1 -1 -1 S 7 0.447 7 1 v 2 H 2.667 C 1.194 3 0 4.193 0 5.666 v 23.667 C 0 30.806 1.194 32 2.667 32 h 26.667 C 30.807 32 32 30.806 32 29.333 V 5.666 C 32 4.193 30.807 3 29.334 3 Z M 30 29.333 C 30 29.701 29.701 30 29.334 30 H 2.667 C 2.299 30 2 29.701 2 29.333 V 5.666 C 2 5.299 2.299 5 2.667 5 H 7 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 V 5 h 4.334 C 29.701 5 30 5.299 30 5.666 V 29.333 Z"
                        />
                        <rect
                          x="7"
                          y="12"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="7"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="7"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="12"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="12"
                          width="4"
                          height="3"
                        />
                      </g>
                    </svg>
                  </CheckBtn>
                  <CalendarContainer>
                    <CalendarWrapper open={checkOutOpen}>
                      <StyledCalendar
                        tileDisabled={({ date }) => isDateDisabled(date)}
                        onChange={handleCheckOutDateChange}
                        value={checkOutValue}
                        formatDay={(locale, date) => moment(date).format("DD")}
                      ></StyledCalendar>
                    </CalendarWrapper>
                  </CalendarContainer>
                </CheckOut>
              </ReservationInfoDate>
              <SelectContainer>
                <SelectWrapper>
                  <SelectLabel>상품수량</SelectLabel>
                  <Select
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value))}
                  >
                    {roomOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </SelectWrapper>
                <SelectWrapper>
                  <SelectLabel>어른</SelectLabel>
                  <Select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                  >
                    {adultOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </SelectWrapper>
                <SelectWrapper>
                  <SelectLabel>어린이</SelectLabel>
                  <Select
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  >
                    {childrenOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </SelectWrapper>
              </SelectContainer>
            </Section>

            <Section>
              <SubTitle>예약자 정보</SubTitle>
              <InputWrapper>
                <NameInput placeholder="예약자명" />
                <PhoneInput placeholder="전화번호" />
              </InputWrapper>
              <Input placeholder="이메일" />
              <Input placeholder="요청사항" />
            </Section>

            <Section>
              <SubTitle>상품권 등록</SubTitle>
              <CouponForm>
                <CouponInput
                  type="text"
                  placeholder="상품권 번호 입력"
                  value={giftCardNumber}
                  onChange={handleCouponNumber}
                />
                <CouponBtn type="submit">상품권 등록하기</CouponBtn>
              </CouponForm>
              <CouponInfo>
                {coupons.map((coupon, index) => (
                  <CouponInfoWrapper
                    key={index}
                    $isFirst={index === coupons.length - 1}
                  >
                    <CouponName>{coupon.name}</CouponName>
                    <CouponPrice>
                      {coupon.price}
                      <RemoveButton onClick={() => handleRemoveCoupon(index)}>
                        ×
                      </RemoveButton>
                    </CouponPrice>
                  </CouponInfoWrapper>
                ))}
              </CouponInfo>
            </Section>

            <Section>
              <SubTitle>쿠폰 적용</SubTitle>
              <CouponSelect
                value={selectedOption}
                onChange={handleChange}
                disabled={!userLoggedIn}
              >
                {userLoggedIn ? (
                  <>
                    <option value="">쿠폰 선택</option>
                    <option value="coupon1">
                      {" "}
                      [Bronze 등급 혜택] 객실 5% 할인 쿠폰
                    </option>
                    <option value="coupon2">
                      {" "}
                      [Silver 등급 혜택] 객실 10% 할인 쿠폰
                    </option>
                  </>
                ) : (
                  <option disabled selected>로그인이 필요한 서비스입니다.</option>
                )}
              </CouponSelect>
            </Section>
          </Left>

          <Right>
            <SubTitle>상품 개요</SubTitle>
            <Product />
            <PaymentBtn>예약 및 결제하기</PaymentBtn>
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ReservationPage;
