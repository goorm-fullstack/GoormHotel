import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';
import {useNavigate, useParams} from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import AdminLayout from '../common/AdminLayout';
import { PageTitle } from '../../Style/commonStyles';
import { Container } from '../member/AdminMember';
import { numberWithCommas } from '../../utils/function/comma';
import { ReservationData } from './AdminReservation';
import { ValuePiece } from '../../components/common/DateButton/DateButton';

const CalendarContainer = styled.div`
  position: relative;
`;

const CalendarWrapper = styled.div<{open: boolean}>`
  z-index: 10;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

const StyledCalendar = styled(Calendar)`
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dddddd;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
`;

const Label = styled.div`
  width: 245px;
  font-weight: bold;
  background-color: #f7f7f7;
  padding: 23px 0 23px 40px;
`;

const Data = styled.div`
  flex-grow: 1;
  padding: 20px 0 23px 20px;
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
`;

const Input = styled.input`
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

const UpdateButton = styled.button<{updateClick: boolean}>`
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

const AdminReservationDetail = () => {
  const { reservationNumber } = useParams(); //예약 번호로 조회
  const [reservationDate, setReservationDate] = useState(''); //예약 일자
  const [checkInDate, setCheckInDate] = useState(''); //체크인
  const [checkOutDate, setCheckOutDate] = useState(''); //체크아웃
  const [reservationItem, setReservationItem] = useState(''); //에약 상품
  const [customerName, setCustomerName] = useState(''); //예약자명
  const [phoneNumber, setPhoneNumber] = useState(''); //연락처
  const [emailAddress, setEmailAddress] = useState(''); //이메일
  const [customerRequest, setCustomerRequest] = useState(''); //요청 사항
  const [applyCoupon, setApplyCoupon] = useState(''); //적용 쿠폰
  const [applyGiftCard, setApplyGiftCard] = useState<any[]>([]); //적용 상품권
  const [totalPrice, setTotalPrice] = useState(''); //결제 금액
  const [updateClick, setUpdateClick] = useState(true);
  const [reservationData, setReservationData] = useState<ReservationData>();

  // 캘린더 관련
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkInValue, setCheckInValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());
  const [checkOutValue, setCheckOutValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_B"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  useEffect(() => {
    Instance.get(`/reservation/reservationNumber/${reservationNumber}`).then((response) => {
      setReservationData(response.data);
      console.log(response.data);

      const formattedCheckIn = formatDate(response.data.checkIn);
      const formattedCheckOut = formatDate(response.data.checkOut);
      const formattedReservationDate = formatDate(response.data.orderDate);

      setCheckInDate(formattedCheckIn);
      setCheckOutDate(formattedCheckOut);
      setReservationDate(formattedReservationDate);
      setCustomerName(response.data.member.name);
      setPhoneNumber(response.data.member.phoneNumber);
      setEmailAddress(response.data.member.email);
      setCustomerRequest(response.data.notice);
      setApplyCoupon(response.data.coupon.name);
      setApplyGiftCard(response.data.giftCard);
    });
  }, []);

  const formatDate = (date: Date) => {
    const formattedDate = moment(date).format('YYYY.MM.DD');
    return `${formattedDate}`;
  };

  const isDateDisabled = (date: Date) => {
    return moment(date).isBefore(moment(), 'day');
  };

  const handleNoticeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updateClick) {
      setCustomerRequest(e.target.value);
    }
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updateClick) {
      setCustomerName(e.target.value);
    }
  };

  const handlePhoneNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updateClick) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCheckInDateChange = (selectedDate: ValuePiece | [ValuePiece, ValuePiece]) => {
    setCheckInValue(selectedDate);
    setCheckInOpen(false);
    const processedSelectedDate: ValuePiece = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;
    const formattedDate = moment(processedSelectedDate).format('YYYY.MM.DD');
    setCheckInDate(`${formattedDate}`);
  };

  const handleCheckOutDateChange = (selectedDate: ValuePiece | [ValuePiece, ValuePiece]) => {
    setCheckOutValue(selectedDate);
    setCheckOutOpen(false);
    const processedSelectedDate: ValuePiece = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;
    const formattedDate = moment(processedSelectedDate).format('YYYY.MM.DD');
    setCheckOutDate(`${formattedDate}`);
  };

  if(authItem && authItem.includes("AUTH_B")) {
  return (
    <AdminLayout subMenus="reservation">
      <Container>
        <PageTitle>예약 상세</PageTitle>
        <InfoContainer>
          <InfoWrapper>
            <Label>예약 번호</Label>
            <Data>{reservationNumber}</Data>
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
            {reservationData && reservationData.coupon !== null ? (
              <Data>
                {reservationData.coupon.name}(적용 금액 : {numberWithCommas(reservationData.coupon.discountPrice)})
              </Data>
            ) : (
              <Data>적용된 쿠폰이 없습니다.</Data>
            )}
          </InfoWrapper>
          <InfoWrapper>
            <Label>적용 상품권</Label>
            <Data>
              {reservationData && reservationData.giftCard !== null && reservationData.giftCard.length > 0
                ? reservationData.giftCard.map((gift, index) => (
                    <span key={index}>
                      {gift.name}(적용 금액 : {numberWithCommas(gift.money)}){index < reservationData.giftCard.length - 1 ? ', ' : ''}
                    </span>
                  ))
                : '적용된 상품권이 없습니다.'}
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>결제 금액</Label>
            <Data>{reservationData && numberWithCommas(reservationData.totalPrice)}</Data>
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
  } else {
    return null;
  }
};

export default AdminReservationDetail;
