import styled from 'styled-components';
import Calendar from 'react-calendar';

export const ReserveDate = styled.div`
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

export const Check = styled.div`
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

export const ReserveDetail = styled.div`
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

export const SelectWrapper = styled.div`
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

export const SelectLabel = styled.label`
  display: block;
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.goldhover};
  text-align: center;
  margin-top: 10px;
`;

export const CalendarContainer = styled.div`
  position: relative;

  .calwrap {
    z-index: 10;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    display: block;

    &[data-isopen='false'] {
      display: none;
    }
  }
`;

export const OptionWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  padding: 40px;
  background: white;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  transform: translate(-50%, 0);
  display: block;

  &[data-isopen='false'] {
    display: none;
  }

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
