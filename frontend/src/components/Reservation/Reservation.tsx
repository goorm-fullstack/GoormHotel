import React, { useEffect, useState } from 'react';
import * as S from './Style';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';
import { ValuePiece } from '../common/DateButton/DateButton';

const Reservation = ({ updateReservationData }: any) => {
  const [checkInValue, setCheckInValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());
  const [checkOutValue, setCheckOutValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [checkInOpen, setCheckInOpen] = useState<boolean>(false);
  const [checkOutOpen, setCheckOutOpen] = useState<boolean>(false);
  const [optionOpen, setOptionOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<number>(1);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [nights, setNights] = useState<number>(0);

  useEffect(() => {
    const processedCheckInDate: ValuePiece = Array.isArray(checkInValue) ? checkInValue[0] : checkInValue;
    const processedCheckOutDate: ValuePiece = Array.isArray(checkOutValue) ? checkOutValue[0] : checkOutValue;

    const checkInMoment = moment(processedCheckInDate);
    const checkOutMoment = moment(processedCheckOutDate);

    const nightsDifference = checkOutMoment.diff(checkInMoment, 'day');
    setNights(nightsDifference);
  }, [checkInValue, checkOutValue]);

  const reservationData = {
    checkInDate,
    checkOutDate,
    rooms,
    adults,
    children,
    nights,
  };

  useEffect(() => {
    const updatedData = {
      checkInDate,
      checkOutDate,
      rooms,
      adults,
      children,
      nights,
    };

    updateReservationData(updatedData);
  }, [checkInDate, checkOutDate, rooms, adults, children, nights]);

  useEffect(() => {
    const processedCheckInDate: ValuePiece = Array.isArray(checkInValue) ? checkInValue[0] : checkInValue;
    const processedCheckOutDate: ValuePiece = Array.isArray(checkOutValue) ? checkOutValue[0] : checkOutValue;

    const nightsDifference = moment(processedCheckOutDate).diff(moment(processedCheckInDate), 'day');
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

  const formatAndSetDate = (date: Date) => {
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

  const handleCheckInDateChange = (selectedDate: ValuePiece | [ValuePiece, ValuePiece]) => {
    if (!selectedDate) return;
    setCheckInValue(selectedDate);
    setCheckInOpen(false);

    const processedSelectedDate: ValuePiece = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;
    const checkOutDateValue: ValuePiece = checkOutValue && Array.isArray(checkOutValue) ? checkOutValue[0] : checkOutValue;

    if (processedSelectedDate) {
      const formattedDate = moment(processedSelectedDate).format('YYYY.MM.DD');
      const dayOfWeek = moment(processedSelectedDate).format('ddd');
      setCheckInDate(`${formattedDate} (${dayOfWeek})`);

      const checkOutDate = new Date(checkOutDateValue as Date);
      if (moment(checkOutDate).isBefore(moment(processedSelectedDate), 'day')) {
        const nextDay = new Date(processedSelectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        handleCheckOutDateChange(nextDay);
      }

      const timeDifference = checkOutDate.getTime() - processedSelectedDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

      setNights(daysDifference);
    }
  };

  const handleCheckOutDateChange = (selectedDate: ValuePiece | [ValuePiece, ValuePiece]) => {
    const processedSelectedDate: ValuePiece = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;
    const processedCheckInDate: ValuePiece = Array.isArray(checkInValue) ? checkInValue[0] : checkInValue;

    if (processedCheckInDate && processedSelectedDate && processedSelectedDate < processedCheckInDate) {
      // 이전 날짜인 경우 처리를 막음
      return;
    }

    processedSelectedDate?.setHours(12, 0, 0, 0);
    setCheckOutValue(selectedDate);
    setCheckOutOpen(false);
    const formattedDate = moment(processedSelectedDate).format('YYYY.MM.DD');
    const dayOfWeek = moment(processedSelectedDate).format('ddd');
    setCheckOutDate(`${formattedDate} (${dayOfWeek})`);
  };

  const isDateNotCurrent = (date: Date) => {
    // 현재 날짜보다 이전인 경우 선택 못하게 막음
    return moment(date).isBefore(moment(), 'day');
  };

  const isDateDisabled = (date: Date) => {
    // 체크인 날짜와 이전인 날짜 선택 막음
    return moment(date).isBefore(moment(), 'day') || moment(date).isSameOrBefore(moment(checkInDate), 'day');
  };

  const handleMinusClick = (stateUpdater: React.Dispatch<React.SetStateAction<number>>, minValue: number) => {
    stateUpdater((prevState) => {
      if (prevState > minValue) {
        return prevState - 1;
      }
      return prevState;
    });
  };

  const handlePlusClick = (stateUpdater: React.Dispatch<React.SetStateAction<number>>) => {
    stateUpdater((prevState) => {
      if (prevState < 9) {
        return prevState + 1;
      }
      return prevState;
    });
  };

  return (
    <>
      <S.ReserveDate className="reservedate">
        <S.Check>
          <p>체크인</p>
          <S.CheckBtn type="button" onClick={handleCheckInToggle}>
            {checkInDate}
            {/* {formData.checkIn} */}
            <S.CalendarSvg viewBox="0 0 32 32" width="18" height="18">
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
            </S.CalendarSvg>
          </S.CheckBtn>
          <S.CalendarContainer>
            <div className="calwrap" data-isopen={checkInOpen}>
              <S.StyledCalendar
                tileDisabled={({ date }) => isDateNotCurrent(date)}
                onChange={handleCheckInDateChange}
                value={reservationData ? reservationData.checkInDate : checkInValue}
                formatDay={(locale, date) => moment(date).format('DD')}></S.StyledCalendar>
            </div>
          </S.CalendarContainer>
        </S.Check>
        <p className="stay">{nights}박</p>
        <S.Check>
          <p>체크아웃</p>
          <S.CheckBtn onClick={handleCheckOutToggle}>
            {checkOutDate}
            {/* {formData.checkOut} */}
            <S.CalendarSvg viewBox="0 0 32 32" width="18" height="18">
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
            </S.CalendarSvg>
          </S.CheckBtn>
          <S.CalendarContainer>
            <div className="calwrap" data-isopen={checkOutOpen}>
              <S.StyledCalendar
                tileDisabled={({ date }) => isDateDisabled(date)}
                onChange={handleCheckOutDateChange}
                value={reservationData ? reservationData.checkOutDate : checkOutValue}
                formatDay={(locale, date) => moment(date).format('DD')}></S.StyledCalendar>
            </div>
          </S.CalendarContainer>
        </S.Check>
      </S.ReserveDate>
      <S.ReserveDetail>
        <div className="option">
          <S.SelectWrapper>
            <S.SelectLabel>객실수 {/* 객실이면 객실수, 다이닝이면 좌석수, index 페이지에서는 기본 객실수 */}</S.SelectLabel>
            <button type="button" onClick={handleOptionToggle}>
              {rooms}
            </button>
          </S.SelectWrapper>
          <S.SelectWrapper>
            <S.SelectLabel>성인</S.SelectLabel>
            <button type="button" onClick={handleOptionToggle}>
              {adults}
            </button>
          </S.SelectWrapper>
          <S.SelectWrapper>
            <S.SelectLabel>어린이</S.SelectLabel>
            <button type="button" onClick={handleOptionToggle}>
              {children}
            </button>
          </S.SelectWrapper>
          <S.OptionWrapper data-isopen={optionOpen}>
            <table>
              <tbody>
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
                  <td colSpan={2} className="chilage">
                    <span>!</span> 어린이: 4세~12세
                  </td>
                </tr>
              </tbody>
            </table>
          </S.OptionWrapper>
        </div>
      </S.ReserveDetail>
    </>
  );
};

export default Reservation;
