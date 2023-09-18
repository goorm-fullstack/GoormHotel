import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';

const ReserveContainer = styled.div`
  background-color: #fff;
  width: 1180px;
  height: 150px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  padding: 0 80px;
  display: flex;
  z-index: 1;
  position: absolute;
  bottom: 0;
  transform: translate(-50%, 50%);
  left: 50%;
  border-radius: 12px;
`;

const ReserveDate = styled.div`
  display: flex;
  align-items: center;

  &::after {
    content: '';
    width: 1px;
    height: 65px;
    background-color: #dddddd;
    display: inline-block;
    margin: 0 60px;
  }
`;

const Now = styled.div``;

const CheckInBtn = styled.button`
  border: 0;
  background-color: #fff;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;
  height: 50px;
  font-weight: 500;
  color: #111;
`;

const CheckIn = styled.div`
  font-size: 19px;

  p {
    font-size: 14px;
    color: #9c836a;
    margin-top: 10px;
  }
`;

const Stay = styled.p`
  background: #baa085;
  color: white;
  border-radius: 20px;
  text-align: center;
  font-size: 0.8rem;
  padding: 6px 4px;
  margin: 28px 35px 0;
  min-width: 45px;
`;

const CalendarSvg = styled.svg`
  fill: #102c57;
  position: relative;
  top: 2px;
`;

const CheckOut = styled(CheckIn)``;

const CheckOutBtn = styled(CheckInBtn)``;

const ReserveDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > div {
    display: flex;
    gap: 40px;
    position: relative;
  }
`;

const SelectWrapper = styled.div`
  width: 50px;

  button {
    border: 0;
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    padding: 15px 0;
    background: transparent;
  }
`;

const SelectLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #95846e;
  text-align: center;
  margin-top: 10px;
`;

const Select = styled.select`
  border: none;
  border-bottom: 1px solid #dddddd;
  height: 50px;
  font-size: 20px;
`;

const ReservationButton = styled(Link)`
  width: 150px;
  height: 65px;
  line-height: 65px;
  background-color: #102c57;
  color: white;
  text-align: center;

  &:hover {
    background-color: #254072;
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
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

const CheckOutCalendarWrapper = styled(CalendarWrapper)``;

const OptionWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  padding: 40px;
  background: white;
  border-radius: 10px;
  border: 1px solid #ddd;
  transform: translate(-50%, 0);
  display: none;

  th,
  td {
    padding: 4px 0;
  }
  th {
    color: #9c836a;
    font-size: 14px;
    min-width: 80px;
    text-align: left;
  }
  td > div {
    display: flex;
    align-items: center;
  }
  input {
    width: 60px;
    text-align: center;
    border: 0;
  }
  button {
    background: white;
    border: 1px solid #baa085;
    border-radius: 100%;
    text-align: center;
    color: #9c836a;
    width: 22px;
    height: 22px;
    line-height: 1;
    vertical-align: text-bottom;
    font-size: 12px;
    padding-left: 1px;
  }
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

const Reservation = () => {
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const roomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const adultOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const childrenOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const reservationData = {
    checkInDate,
    checkOutDate,
    rooms,
    adults,
    children
  };

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
    const formattedDate = moment(date).format('YYYY.MM.DD');
    const dayOfWeek = moment(date).format('ddd');
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
    const formattedDate = moment(selectedDate).format('YYYY.MM.DD');
    const dayOfWeek = moment(selectedDate).format('ddd');
    setCheckInDate(`${formattedDate} (${dayOfWeek})`);
  };

  const handleCheckOutDateChange = (selectedDate) => {
    setCheckOutValue(selectedDate);
    setCheckOutOpen(false);
    const formattedDate = moment(selectedDate).format('YYYY.MM.DD');
    const dayOfWeek = moment(selectedDate).format('ddd');
    setCheckOutDate(`${formattedDate} (${dayOfWeek})`);
  };

  const isDateDisabled = (date) => {
    // 현재 날짜보다 이전인 경우에만 true를 반환
    return moment(date).isBefore(moment(), 'day');
  };


  return (
    <ReserveContainer>
      <ReserveDate>
        <CheckIn>
          <p>체크인</p>
          <CheckInBtn onClick={handleCheckInToggle}>
            <Now>{checkInDate}</Now>
            <CalendarSvg viewBox="0 0 32 32" width="18" height="18">
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
            </CalendarSvg>
          </CheckInBtn>
          <CalendarContainer>
            <CalendarWrapper open={checkInOpen}>
              <StyledCalendar
                tileDisabled={({ date }) => isDateDisabled(date)}
                onChange={handleCheckInDateChange}
                value={checkInValue}
                formatDay={(locale, date) => moment(date).format('DD')}></StyledCalendar>
            </CalendarWrapper>
          </CalendarContainer>
        </CheckIn>
        <Stay>1박</Stay>
        <CheckOut>
          <p>체크아웃</p>
          <CheckOutBtn onClick={handleCheckOutToggle}>
            <Now>{checkOutDate}</Now>
            <CalendarSvg viewBox="0 0 32 32" width="18" height="18">
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
            </CalendarSvg>
          </CheckOutBtn>
          <CalendarContainer>
            <CheckOutCalendarWrapper open={checkOutOpen}>
              <StyledCalendar
                tileDisabled={({ date }) => isDateDisabled(date)}
                onChange={handleCheckOutDateChange}
                value={checkOutValue}
                formatDay={(locale, date) => moment(date).format('DD')}></StyledCalendar>
            </CheckOutCalendarWrapper>
          </CalendarContainer>
        </CheckOut>
      </ReserveDate>
      <ReserveDetail>
        <div>
          <SelectWrapper>
            <SelectLabel>객실수</SelectLabel>
            <button type="button">1</button>
          </SelectWrapper>
          <SelectWrapper>
            <SelectLabel>성인</SelectLabel>
            <button type="button">1</button>
          </SelectWrapper>
          <SelectWrapper>
            <SelectLabel>어린이</SelectLabel>
            <button type="button">0</button>
          </SelectWrapper>
          <OptionWrapper>
            <table>
              <tr>
                <th>객실수</th>
                <td>
                  <div>
                    <button type="button" className="btn-minus">
                      ─
                    </button>
                    <input type="text" value="1" />
                    <button type="button" className="btn-plus">
                      ┼
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>성인</th>
                <td>
                  <div>
                    <button type="button" className="btn-minus">
                      ─
                    </button>
                    <input type="text" value="1" />
                    <button type="button" className="btn-plus">
                      ┼
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>어린이</th>
                <td>
                  <div>
                    <button type="button" className="btn-minus">
                      ─
                    </button>
                    <input type="text" value="0" />
                    <button type="button" className="btn-plus">
                      ┼
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </OptionWrapper>
        </div>
        <ReservationButton state={{ reservationData: reservationData }} to="/offers">
          상품 검색
        </ReservationButton>
      </ReserveDetail>
    </ReserveContainer>
  );
};

export default Reservation;
