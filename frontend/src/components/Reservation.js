import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';

const ReserveDate = styled.div`
  display: flex;
  align-items: center;

  .stay {
    background: ${(props) => props.theme.colors.gold};
    color: white;
    border-radius: 20px;
    text-align: center;
    font-size: ${(props) => props.theme.font.sizexxs};
    padding: 6px 4px;
    margin: 28px 35px 0;
    min-width: 45px;
  }

  &::after {
    content: '';
    width: 1px;
    height: 65px;
    background-color: ${(props) => props.theme.colors.graylightborder};
    display: inline-block;
    margin: 0 60px 0 66px;
  }
`;

export const CheckBtn = styled.button`
  border: 0;
  background-color: #fff;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;
  height: 50px;
  font-weight: 500;
`;

const Check = styled.div`
  font-size: 19px;

  p {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.goldhover};
    margin-top: 10px;
  }
`;

export const CalendarSvg = styled.svg`
  fill: ${(props) => props.theme.colors.navy};
  position: relative;
  top: 2px;
`;

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
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.goldhover};
  text-align: center;
  margin-top: 10px;
`;

export const CalendarContainer = styled.div`
  position: relative;
`;

export const CalendarWrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

const OptionWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  padding: 40px;
  background: white;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  transform: translate(-50%, 0);
  display: ${(props) => (props.open ? 'block' : 'none')};

  th,
  td {
    padding: 4px 0;
  }
  th {
    color: ${(props) => props.theme.colors.goldhover};
    font-size: ${(props) => props.theme.font.sizexs};
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
    border: 1px solid ${(props) => props.theme.colors.gold};
    border-radius: 100%;
    text-align: center;
    color: ${(props) => props.theme.colors.goldhover};
    width: 22px;
    height: 22px;
    line-height: 1;
    vertical-align: text-bottom;
    font-size: ${(props) => props.theme.font.sizexxxs};
    padding-left: 1px;
  }
  td.chilage {
    font-size: ${(props) => props.theme.font.sizexxs};
    padding-top: 12px;
    color: ${(props) => props.theme.colors.graylight};
    text-align: right;
  }

  td.chilage span {
    border-radius: 100%;
    background: ${(props) => props.theme.colors.caution};
    color: white;
    padding: 0 6px;
    margin-right: 2px;
    font-size: 10px;
    font-weight: bold;
  }
`;

export const StyledCalendar = styled(Calendar)`
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  width: 300px;
  font-family: inherit;
  padding: 10px 20px 20px;

  .react-calendar__navigation__label > span {
    font-size: ${(props) => props.theme.font.sizexxs};
    font-weight: 500;
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${(props) => props.theme.colors.black};
  }
  .react-calendar__tile {
    padding: 6px 4px;
    font-size: ${(props) => props.theme.font.sizexxs};
    color: ${(props) => props.theme.colors.black};
    border-radius: 100%;
  }
  .react-calendar__tile:nth-child(7n) {
    color: ${(props) => props.theme.colors.red};
  }
  .react-calendar__tile--now {
    // 오늘 날짜 하이라이트 커스텀
    background: white;
    color: ${(props) => props.theme.colors.goldhover};
  }
  .react-calendar__tile:disabled {
    color: #ccc;
    background-color: white;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: ${(props) => props.theme.colors.navy};
    color: white !important;
  }
  .react-calendar__navigation {
    margin-bottom: 0;
  }
  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:focus {
    background-color: white;
  }
  .react-calendar__month-view__weekdays {
    font-weight: normal;
    font-size: ${(props) => props.theme.font.sizexxxs};
  }
`;

const Reservation = () => {
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [nights, setNights] = useState(0);

  const reservationData = {
    checkInDate,
    checkOutDate,
    rooms,
    adults,
    children,
    nights,
  };

  useEffect(() => {
    const nightsDifference = moment(checkOutValue).diff(moment(checkInValue), 'days');
    setNights(nightsDifference);
  }, [checkInValue, checkOutValue]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formattedToday = formatAndSetDate(today);
    const formattedTomorrow = formatAndSetDate(tomorrow);

    setCheckInDate(formattedToday);
    setCheckOutDate(formattedTomorrow);
  }, []);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckOutValue(tomorrow);
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

  const handleOptionToggle = () => {
    setOptionOpen(!optionOpen);
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

  const handleMinusClick = (stateUpdater, minValue) => {
    stateUpdater((prevState) => {
      if (prevState > minValue) {
        return prevState - 1;
      }
      return prevState;
    });
  };

  const handlePlusClick = (stateUpdater) => {
    stateUpdater((prevState) => {
      if (prevState < 9) {
        return prevState + 1;
      }
      return prevState;
    });
  };

  return (
    <>
      <ReserveDate className="reservedate">
        <Check>
          <p>체크인</p>
          <CheckBtn onClick={handleCheckInToggle}>
            {checkInDate}
            {/* {formData.checkIn} */}
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
          </CheckBtn>
          <CalendarContainer>
            <CalendarWrapper open={checkInOpen}>
              <StyledCalendar
                tileDisabled={({ date }) => isDateDisabled(date)}
                onChange={handleCheckInDateChange}
                value={reservationData ? reservationData.checkInDate : checkInValue}
                formatDay={(locale, date) => moment(date).format('DD')}></StyledCalendar>
            </CalendarWrapper>
          </CalendarContainer>
        </Check>
        <p className="stay">{nights}박</p>
        <Check>
          <p>체크아웃</p>
          <CheckBtn onClick={handleCheckOutToggle}>
            {checkOutDate}
            {/* {formData.checkOut} */}
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
          </CheckBtn>
          <CalendarContainer>
            <CalendarWrapper open={checkOutOpen}>
              <StyledCalendar
                tileDisabled={({ date }) => isDateDisabled(date)}
                onChange={handleCheckOutDateChange}
                value={reservationData ? reservationData.checkOutDate : checkOutValue}
                formatDay={(locale, date) => moment(date).format('DD')}></StyledCalendar>
            </CalendarWrapper>
          </CalendarContainer>
        </Check>
      </ReserveDate>
      <ReserveDetail>
        <div className="option">
          <SelectWrapper>
            <SelectLabel>객실수 {/* 객실이면 객실수, 다이닝이면 좌석수, index 페이지에서는 기본 객실수 */}</SelectLabel>
            <button type="button" onClick={handleOptionToggle}>
              {rooms}
            </button>
          </SelectWrapper>
          <SelectWrapper>
            <SelectLabel>성인</SelectLabel>
            <button type="button" onClick={handleOptionToggle}>
              {adults}
            </button>
          </SelectWrapper>
          <SelectWrapper>
            <SelectLabel>어린이</SelectLabel>
            <button type="button" onClick={handleOptionToggle}>
              {children}
            </button>
          </SelectWrapper>
          <OptionWrapper open={optionOpen}>
            <table>
              <tr>
                <th>객실수</th>
                <td>
                  <div>
                    <button type="button" className="btn-minus" onClick={() => handleMinusClick(setRooms, 1)}>
                      ─
                    </button>
                    <input type="text" value={rooms} readOnly />
                    <button type="button" className="btn-plus" onClick={() => handlePlusClick(setRooms)}>
                      ┼
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>성인</th>
                <td>
                  <div>
                    <button type="button" className="btn-minus" onClick={() => handleMinusClick(setAdults, 1)}>
                      ─
                    </button>
                    <input type="text" value={adults} readOnly />
                    <button type="button" className="btn-plus" onClick={() => handlePlusClick(setAdults)}>
                      ┼
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>어린이</th>
                <td>
                  <div>
                    <button type="button" className="btn-minus" onClick={() => handleMinusClick(setChildren, 0)}>
                      ─
                    </button>
                    <input type="text" value={children} readOnly />
                    <button type="button" className="btn-plus" onClick={() => handlePlusClick(setChildren)}>
                      ┼
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" className="chilage">
                  <span>!</span> 어린이: 4세~12세
                </td>
              </tr>
            </table>
          </OptionWrapper>
        </div>
      </ReserveDetail>
    </>
  );
};

export default Reservation;
