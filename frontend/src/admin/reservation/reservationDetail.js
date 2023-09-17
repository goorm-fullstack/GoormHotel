import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';
import AdminLayout from '../common/AdminLayout';

const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
`;

const CalendarContainer = styled.div`
  position: relative;
`;

const CalendarWrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

export const StyledCalendar = styled(Calendar)`
  border-radius: 10px;
  border: 1px solid #c8c8c8;

  .react-calendar__navigation__label > span {
    font-size: 13px;
    font-weight: 600;
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #102c57;
    color: white;
  }

  .react-calendar__tile--now {
    // 오늘 날짜 하이라이트 커스텀
    background: white;
    color: #102c57;
  }
  .react-calendar__tile--active {
    background: #102c57;
    color: white;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dddddd;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
`;

export const Label = styled.div`
  width: 245px;
  font-weight: bold;
  background-color: #f7f7f7;
  padding: 23px 0 23px 40px;
`;

export const Data = styled.div`
  flex-grow: 1;
  padding: 20px 0 23px 20px;
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
`;

export const Input = styled.input`
  width: 200px;
  height: 40px;
  font-size: 15px;
  border: 1px solid #dddddd;
  margin-left: 20px;
  outline: none;
`;

const CalendarInput = styled.div`
  margin-left: 20px;
`;

const CalendarButton = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  font-size: 15px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

const UpdateButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: #95846e;
  color: white;
  margin-right: 16px;
`;

const CompleteButton = styled(UpdateButton)``;

const CancelButton = styled.button`
  width: 200px;
  height: 40px;
  color: red;
  background-color: white;
  border: solid 1px red;
`;

const BtnWrapper = styled.div`
  text-align: center;
  margin-top: 2em;
  margin-bottom: 1em;
`;

const ReservationDetail = () => {
  const [reservationDate, setReservationDate] = useState(''); //예약번호
  const [checkInDate, setCheckInDate] = useState(''); //예약일
  const [checkOutDate, setCheckOutDate] = useState(''); //체크인
  const [reservationCode, setReservationCode] = useState(''); //체크 아웃
  const [reservationItem, setReservationItem] = useState(''); //에약 상품
  const [customerName, setCustomerName] = useState(''); //예약자명
  const [phoneNumber, setPhoneNumber] = useState(''); //연락처
  const [emailAddress, setEmailAddress] = useState(''); //이메일
  const [customerRequest, setCustomerRequest] = useState(''); //요청 사항
  const [applyCoupon, setApplyCoupon] = useState(''); //적용 쿠폰
  const [applyGiftCard, setApplyGiftCard] = useState(''); //적용 상품권
  const [totalPrice, setTotalPrice] = useState(''); //결제 금액
  const [updateClick, setUpdateClick] = useState(true);

  // 캘린더 관련
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());

  const reservationData = {
    reservationNumber: '테스트',
    orderDae: '2023.09.01',
    checkIn: '2023.09.25',
    checkOut: '2023.09.27',
    count: 3,
    adult: 2,
    children: 2,
    notice: 'test',
    member: {
      name: 'name',
      email: 'test@naver.com',
      phoneNumber: '010-0000-0000',
    },
    item: {
      name: 'itemName',
    },
    stay: 3,
    coupon: {
      name: 'coupon name',
    },
    giftcard: [
      {
        name: 'giftcard Name',
      },
    ],
    sumPrice: 10000,
    discountPrice: 0,
    totalPrice: 10000,
    state: '에약',
  };
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formattedToday = formatDate(today);
    const formattedTomorrow = formatDate(tomorrow);
    const formattedReservationDate = formatDate(tomorrow);

    setCheckInDate(formattedToday);
    setCheckOutDate(formattedTomorrow);
    setReservationDate(formattedReservationDate);
    setCustomerName(reservationData.member.name);
    setPhoneNumber(reservationData.member.phoneNumber);
    setEmailAddress(reservationData.member.email);
    setCustomerRequest(reservationData.notice);
  }, []);

  const formatDate = (date) => {
    const formattedDate = moment(date).format('YYYY.MM.DD');
    return `${formattedDate}`;
  };

  const isDateDisabled = (date) => {
    return moment(date).isBefore(moment(), 'day');
  };

  const handleNoticeInputChange = (e) => {
    if (!updateClick) {
      setCustomerRequest(e.target.value);
    }
  };

  const handleNameInputChange = (e) => {
    if (!updateClick) {
      setCustomerName(e.target.value);
    }
  };

  const handlePhoneNumberInputChange = (e) => {
    if (!updateClick) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleEmailInputChange = (e) => {
    if (!updateClick) {
      setEmailAddress(e.target.value);
    }
  };

  const handleCheckInToggle = () => {
    if (!updateClick) {
      setCheckInOpen(!checkInOpen);
      setCheckOutOpen(false);
    }
  };

  const handleCheckOutToggle = () => {
    if (!updateClick) {
      setCheckOutOpen(!checkOutOpen);
      setCheckInOpen(false);
    }
  };

  const handleCheckInDateChange = (selectedDate) => {
    setCheckInValue(selectedDate);
    setCheckInOpen(false);
    const formattedDate = moment(selectedDate).format('YYYY.MM.DD');
    setCheckInDate(`${formattedDate}`);
  };

  const handleCheckOutDateChange = (selectedDate) => {
    setCheckOutValue(selectedDate);
    setCheckOutOpen(false);
    const formattedDate = moment(selectedDate).format('YYYY.MM.DD');
    setCheckOutDate(`${formattedDate}`);
  };

  const subMenus = [{ name: '에약 관리', link: '/admin/reservation/detail' }];

  return (
    <AdminLayout title="예약 상세" subMenus={subMenus}>
      <Container>
        <Title>예약 상세</Title>
        <InfoContainer>
          <InfoWrapper>
            <Label>예약 번호</Label>
            <Data>020221611653456465</Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>에약일</Label>
            <Data>{reservationDate}</Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>체크인</Label>
            <CalendarInput>
              <CalendarButton onClick={handleCheckInToggle}>
                <p>{checkInDate}</p>
                <svg viewBox="0 0 32 32" width="15" height="15" style={{ fill: '#102C57' }}>
                  <g xmlns="http://www.w3.org/2000/svg" id="calendar_1_">
                    <path d="M 29.334 3 H 25 V 1 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 2 h -6 V 1 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 2 H 9 V 1 c 0 -0.553 -0.448 -1 -1 -1 S 7 0.447 7 1 v 2 H 2.667 C 1.194 3 0 4.193 0 5.666 v 23.667 C 0 30.806 1.194 32 2.667 32 h 26.667 C 30.807 32 32 30.806 32 29.333 V 5.666 C 32 4.193 30.807 3 29.334 3 Z M 30 29.333 C 30 29.701 29.701 30 29.334 30 H 2.667 C 2.299 30 2 29.701 2 29.333 V 5.666 C 2 5.299 2.299 5 2.667 5 H 7 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 V 5 h 4.334 C 29.701 5 30 5.299 30 5.666 V 29.333 Z" />
                    <rect x="7" y="12" width="4" height="3" />
                    <rect x="7" y="17" width="4" height="3" />
                    <rect x="7" y="22" width="4" height="3" />
                    <rect x="14" y="22" width="4" height="3" />
                    <rect x="14" y="17" width="4" height="3" />
                    <rect x="14" y="12" width="4" height="3" />
                    <rect x="21" y="22" width="4" height="3" />
                    <rect x="21" y="17" width="4" height="3" />
                    <rect x="21" y="12" width="4" height="3" />
                  </g>
                </svg>
              </CalendarButton>
              <CalendarContainer>
                <CalendarWrapper open={checkInOpen}>
                  <StyledCalendar
                    tileDisabled={({ date }) => isDateDisabled(date)}
                    onChange={handleCheckInDateChange}
                    value={checkInValue}
                    formatDay={(locale, date) => moment(date).format('DD')}></StyledCalendar>
                </CalendarWrapper>
              </CalendarContainer>
            </CalendarInput>
          </InfoWrapper>
          <InfoWrapper>
            <Label>체크아웃</Label>
            <CalendarInput>
              <CalendarButton onClick={handleCheckOutToggle}>
                <p>{checkOutDate}</p>
                <svg viewBox="0 0 32 32" width="15" height="15" style={{ fill: '#102C57' }}>
                  <g xmlns="http://www.w3.org/2000/svg" id="calendar_1_">
                    <path d="M 29.334 3 H 25 V 1 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 2 h -6 V 1 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 2 H 9 V 1 c 0 -0.553 -0.448 -1 -1 -1 S 7 0.447 7 1 v 2 H 2.667 C 1.194 3 0 4.193 0 5.666 v 23.667 C 0 30.806 1.194 32 2.667 32 h 26.667 C 30.807 32 32 30.806 32 29.333 V 5.666 C 32 4.193 30.807 3 29.334 3 Z M 30 29.333 C 30 29.701 29.701 30 29.334 30 H 2.667 C 2.299 30 2 29.701 2 29.333 V 5.666 C 2 5.299 2.299 5 2.667 5 H 7 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 V 5 h 4.334 C 29.701 5 30 5.299 30 5.666 V 29.333 Z" />
                    <rect x="7" y="12" width="4" height="3" />
                    <rect x="7" y="17" width="4" height="3" />
                    <rect x="7" y="22" width="4" height="3" />
                    <rect x="14" y="22" width="4" height="3" />
                    <rect x="14" y="17" width="4" height="3" />
                    <rect x="14" y="12" width="4" height="3" />
                    <rect x="21" y="22" width="4" height="3" />
                    <rect x="21" y="17" width="4" height="3" />
                    <rect x="21" y="12" width="4" height="3" />
                  </g>
                </svg>
              </CalendarButton>
              <CalendarContainer>
                <CalendarWrapper open={checkOutOpen}>
                  <StyledCalendar
                    tileDisabled={({ date }) => isDateDisabled(date)}
                    onChange={handleCheckOutDateChange}
                    value={checkOutValue}
                    formatDay={(locale, date) => moment(date).format('DD')}></StyledCalendar>
                </CalendarWrapper>
              </CalendarContainer>
            </CalendarInput>
          </InfoWrapper>
          <InfoWrapper>
            <Label>예약 상품</Label>
            <Data>
              <span style={{ textDecoration: 'underline' }}>{'[스페셜 오퍼] 상품명'}</span>
              <span>{'(스페셜 오퍼] 상품명)'}</span>
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>예약자명</Label>
            <Input value={customerName} readOnly={updateClick} onChange={handleNameInputChange}></Input>
          </InfoWrapper>
          <InfoWrapper>
            <Label>연락처</Label>
            <Input value={phoneNumber} readOnly={updateClick} onChange={handlePhoneNumberInputChange}></Input>
          </InfoWrapper>
          <InfoWrapper>
            <Label>이메일</Label>
            <Input value={emailAddress} readOnly={updateClick} onChange={handleEmailInputChange}></Input>
          </InfoWrapper>
          <InfoWrapper>
            <Label>요청사항</Label>
            <Input value={customerRequest} readOnly={updateClick} onChange={handleNoticeInputChange} style={{ width: '600px' }}></Input>
          </InfoWrapper>
          <InfoWrapper>
            <Label>적용 쿠폰</Label>
            <Data>{reservationData.coupon.name}</Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>적용 상품권</Label>
            <Data>
              {reservationData.giftcard.map((gift, index) => {
                <>{gift.name}</>;
              })}
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>결제 금액</Label>
            <Data>{reservationData.totalPrice}</Data>
          </InfoWrapper>
          <BtnWrapper>
            {updateClick === true ? (
              <UpdateButton updateClick={true} onClick={() => setUpdateClick(!updateClick)}>
                수정
              </UpdateButton>
            ) : (
              <CompleteButton updateClick={false} onClick={() => setUpdateClick(!updateClick)}>
                완료
              </CompleteButton>
            )}
            <CancelButton>예약취소</CancelButton>
          </BtnWrapper>
        </InfoContainer>
      </Container>
    </AdminLayout>
  );
};

export default ReservationDetail;
