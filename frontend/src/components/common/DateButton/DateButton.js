import React, { useState, useRef, useEffect } from 'react';
import * as S from './Style';
import * as R from '../../Reservation/Style';
import moment from 'moment';

const DateBtn = () => {
  const [selectValue, setSelectValue] = useState(new Date());
  const [selectDate, setSelectDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    const placeholder = '사용 기한';

    setSelectDate(placeholder);
  }, []);

  const handleSelectDateToggle = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleCheckInDateChange = (selectedDate) => {
    setSelectValue(selectedDate);
    setCalendarOpen(false);
    const formattedDate = moment(selectedDate).format('YYYY.MM.DD');
    const dayOfWeek = moment(selectedDate).format('ddd');
    setSelectDate(`${formattedDate} (${dayOfWeek})`);
  };

  const isDateDisabled = (date) => {
    // 현재 날짜보다 이전인 경우에만 true를 반환
    return moment(date).isBefore(moment(), 'day');
  };

  return (
    <>
      <S.DateButton onClick={handleSelectDateToggle}>
        {selectDate}
        <R.CalendarSvg viewBox="0 0 32 32" width="18" height="18">
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
        </R.CalendarSvg>
      </S.DateButton>
      <R.CalendarContainer>
        <R.CalendarWrapper data-isopen={calendarOpen}>
          <R.StyledCalendar
            tileDisabled={({ date }) => isDateDisabled(date)}
            onChange={handleCheckInDateChange}
            value={selectValue}
            formatDay={(locale, date) => moment(date).format('DD')}></R.StyledCalendar>
        </R.CalendarWrapper>
      </R.CalendarContainer>
    </>
  );
};

export default DateBtn;
