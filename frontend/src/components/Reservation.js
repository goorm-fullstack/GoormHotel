import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import 'moment/locale/ko';
import { Link } from 'react-router-dom';

const ReserveContainer = styled.div`
  position: absolute;
  bottom: -82px;
  background-color: #fff;
  width: 1179px;
  height: 164px;
  box-shadow: 0px 18px 19px rgba(0, 0, 0, 0.13);
  padding: 43px 40px;
  display: flex;
`;

const ReserveDate = styled.div`
  display: flex;
  align-items: center;

  &::after {
    content: '';
    width: 1px;
    height: 77px;
    background-color: #DDDDDD;
    display: inline-block;
    margin: 0 40px;
  }
`;

const Now = styled.div`
`;

const CheckInBtn = styled.button`
  border: 1px solid #DDDDDD;
  background-color: #fff;
  padding: 15px 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 48px;
`;

const CheckIn = styled.div`
  font-size: 18px;
  margin-right: 10px;
  p {
    font-size: 14px;
    margin-bottom: 11px;
  }
`;

const ArrowSvg = styled.svg`
  margin: 20px 20px 0 20px;
  fill: #444444;
`;

const CalendarSvg = styled.svg`
  fill: #102C57;
`;

const CheckOut = styled(CheckIn)``;

const CheckOutBtn = styled(CheckInBtn)``;

const ReserveDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 41px;
  width: 91px;
`;

const SelectLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  border: none;
  border-bottom: 1px solid #DDDDDD;
  height: 50px;
  font-size: 20px;
`;

const ReservationButton = styled(Link)`
  width: 150px;
  padding: 30px;
  background-color: #102C57;
  color: white;
  text-align: center;

  &:hover {
    background-color: #092145;
  }
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

const CheckOutCalendarWrapper = styled(CalendarWrapper)``;

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
    background: #102C57;
    color: white;
  }
  
  .react-calendar__tile--now {
    // 오늘 날짜 하이라이트 커스텀
    background: white;
    color: #102C57;
  }
  .react-calendar__tile--active {
    background: #102C57;
    color: white;
  }
`;

const Reservation = () => {
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const roomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const adultOptions =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const childrenOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

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
    // 현재 날짜보다 이전인 경우에만 true를 반환
    return moment(date).isBefore(moment(), 'day');
  };

  const handleReservation = () => {};

  return (
    <ReserveContainer>
          <ReserveDate>
            <CheckIn>
              <p>체크인</p>
              <CheckInBtn onClick={handleCheckInToggle}>
                <Now>{checkInDate}</Now>
                <CalendarSvg viewBox="0 0 32 32" width="18" height="18" ><g xmlns="http://www.w3.org/2000/svg" id="calendar_1_"><path  d="M 29.334 3 H 25 V 1 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 2 h -6 V 1 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 2 H 9 V 1 c 0 -0.553 -0.448 -1 -1 -1 S 7 0.447 7 1 v 2 H 2.667 C 1.194 3 0 4.193 0 5.666 v 23.667 C 0 30.806 1.194 32 2.667 32 h 26.667 C 30.807 32 32 30.806 32 29.333 V 5.666 C 32 4.193 30.807 3 29.334 3 Z M 30 29.333 C 30 29.701 29.701 30 29.334 30 H 2.667 C 2.299 30 2 29.701 2 29.333 V 5.666 C 2 5.299 2.299 5 2.667 5 H 7 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 V 5 h 4.334 C 29.701 5 30 5.299 30 5.666 V 29.333 Z" /><rect x="7" y="12" width="4" height="3" /><rect x="7" y="17" width="4" height="3" /><rect x="7" y="22" width="4" height="3" /><rect x="14" y="22" width="4" height="3" /><rect x="14" y="17" width="4" height="3" /><rect x="14" y="12" width="4" height="3" /><rect x="21" y="22" width="4" height="3" /><rect x="21" y="17" width="4" height="3" /><rect x="21" y="12" width="4" height="3" /></g></CalendarSvg>
              </CheckInBtn>
              <CalendarContainer>              
                <CalendarWrapper open={checkInOpen}>
                  <StyledCalendar tileDisabled={({ date }) => isDateDisabled(date)}  onChange={handleCheckInDateChange} value={checkInValue} formatDay={(locale, date) => moment(date).format("DD")}></StyledCalendar>
                </CalendarWrapper>
              </CalendarContainer>
            </CheckIn>
            <ArrowSvg  viewBox="0 0 32 32" width="29" height="19"><title /><g id="Layer_2" data-name="Layer 2"><path d="M 22 9 a 1 1 0 0 0 0 1.42 l 4.6 4.6 H 3.06 a 1 1 0 1 0 0 2 H 26.58 L 22 21.59 A 1 1 0 0 0 22 23 a 1 1 0 0 0 1.41 0 l 6.36 -6.36 a 0.88 0.88 0 0 0 0 -1.27 L 23.42 9 A 1 1 0 0 0 22 9 Z" /></g></ArrowSvg>
            <CheckOut>
              <p>체크아웃</p>
              <CheckOutBtn onClick={handleCheckOutToggle}>
                <Now>{checkOutDate}</Now>
                <CalendarSvg viewBox="0 0 32 32" width="18" height="18" ><g xmlns="http://www.w3.org/2000/svg" id="calendar_1_"><path d="M 29.334 3 H 25 V 1 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 2 h -6 V 1 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 2 H 9 V 1 c 0 -0.553 -0.448 -1 -1 -1 S 7 0.447 7 1 v 2 H 2.667 C 1.194 3 0 4.193 0 5.666 v 23.667 C 0 30.806 1.194 32 2.667 32 h 26.667 C 30.807 32 32 30.806 32 29.333 V 5.666 C 32 4.193 30.807 3 29.334 3 Z M 30 29.333 C 30 29.701 29.701 30 29.334 30 H 2.667 C 2.299 30 2 29.701 2 29.333 V 5.666 C 2 5.299 2.299 5 2.667 5 H 7 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 V 5 h 4.334 C 29.701 5 30 5.299 30 5.666 V 29.333 Z" /><rect  x="7" y="12" width="4" height="3" /><rect  x="7" y="17" width="4" height="3" /><rect  x="7" y="22" width="4" height="3" /><rect  x="14" y="22" width="4" height="3" /><rect  x="14" y="17" width="4" height="3" /><rect  x="14" y="12" width="4" height="3" /><rect  x="21" y="22" width="4" height="3" /><rect  x="21" y="17" width="4" height="3" /><rect  x="21" y="12" width="4" height="3" /></g></CalendarSvg>
              </CheckOutBtn>
              <CalendarContainer>              
                <CheckOutCalendarWrapper open={checkOutOpen}>
                  <StyledCalendar tileDisabled={({ date }) => isDateDisabled(date)}  onChange={handleCheckOutDateChange} value={checkOutValue} formatDay={(locale, date) => moment(date).format("DD")}></StyledCalendar>
                </CheckOutCalendarWrapper>
              </CalendarContainer>
            </CheckOut>
          </ReserveDate>
          <ReserveDetail>
            <SelectWrapper>
              <SelectLabel>객실수</SelectLabel>
              <Select value={rooms} onChange={e => setRooms(parseInt(e.target.value))}>
              {roomOptions.map(option => (
                <option key={option} value={option}>{option} 개</option>
              ))}
              </Select>
            </SelectWrapper>
            <SelectWrapper>
              <SelectLabel>어른</SelectLabel>
              <Select value={adults} onChange={e => setAdults(parseInt(e.target.value))}>
                {adultOptions.map(option => (
                  <option key={option} value={option}>{option} 명</option>
                ))}
              </Select>
            </SelectWrapper>      
            <SelectWrapper>
              <SelectLabel>어린이</SelectLabel>
              <Select value={children} onChange={e => setChildren(parseInt(e.target.value))}>
                {childrenOptions.map(option => (
                  <option key={option} value={option}>{option} 명</option>
                ))}
              </Select>
            </SelectWrapper>
            <ReservationButton to="/reservation" onClick={() => handleReservation()}>예약하기</ReservationButton>
          </ReserveDetail>         
        </ReserveContainer>
  );
};

export default Reservation;