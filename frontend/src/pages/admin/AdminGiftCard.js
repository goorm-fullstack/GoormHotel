import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AdminLayout from './AdminLayout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import { TableCheckbox } from './AdminMember';

export const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin-left: 50px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: rgb(17, 17, 17);
  margin-bottom: 60px;
`;

const SubTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: rgb(17, 17, 17);
  margin-bottom: 45px;
`;

const GiftCardBox = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

export const Now = styled.div`
  color: #8f8f8f;
`;

export const DateBtn = styled.button`
  border: 1px solid #dddddd;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const CalendarSvg = styled.svg`
  fill: #102c57;
`;

export const CalendarContainer = styled.div`
  position: relative;
`;

export const CalendarWrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: 110%;
  left: -250px;
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

const GiftCardForm = styled.form`
  width: 100%;
  display: flex;
  & input {
    width: 200px;
    height: 40px;
    margin-right: 20px;
  }
  & input:first-child {
    width: 400px;
  }
  & button {
    width: 200px;
    height: 40px;
    margin-right: 20px;
  }
`;

export const SubmitButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 15px;
  color: #95846e;
  background-color: #ffffff;
  border: 1px solid rgb(186, 160, 133);
  &:hover {
    color: #ffffff;
    background-color: #95846e;
  }
`;

export const FilterButton = styled.button``;

export const TopMenuOfTable = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  & p {
    font-size: 15px;
    font-weight: 500;
    vertical-align: text-bottom;
    color: rgb(68, 68, 68);
  }
  & button {
    width: 120px;
    border: 1px solid rgb(221, 221, 221);
    background-color: rgb(255, 255, 255);
    height: 40px;
    margin-left: 10px;
    font-size: 15px;
    color: rgb(102, 102, 102);
    line-height: 1.2;
  }
  & ${FilterButton} {
    width: 120px;
    background-color: rgb(255, 255, 255);
    height: 40px;
    margin-left: 10px;
    font-size: 15px;
    line-height: 1.2;
    border: 1px solid #d30a0a;
    color: #d30a0a;
  }
`;

export const GiftCardTable = styled.table`
  width: 100%;
  text-align: center;
`;

export const TableTh = styled.th`
  padding: 15px 0 40px 0;
  font-size: 15px;
  font-weight: 500;
  color: rgb(17, 17, 17);
`;

export const TableTd = styled.td`
  padding: 30px 0 30px 0;
  font-size: 15px;
  font-weight: 400;
  color: rgb(68, 68, 68);
`;

export const InputLabel = styled.label`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(221, 221, 221);
  vertical-align: text-bottom;
`;

export const CheckBoxInput = styled.input`
  &:checked + ${InputLabel}:after {
    content: '\\2714';
    font-size: 12px;
  }
`;

const CheckBox = styled(TableCheckbox)`
  margin: 0;
  vertical-align: middle;
`;

export const TableTr = styled.tr`
  ${CheckBoxInput}[type=checkbox] {
    display: none;
  }
`;

export const TableListTr = styled.tr`
  ${CheckBoxInput}[type=checkbox] {
    display: none;
  }
  border-bottom: 1px solid #dddddd;
`;

export const DetailLink = styled(Link)`
  text-decoration: none;
  &:hover {
    border-bottom: 1px solid #dddddd;
  }
`;

const subMenus = [
  { name: '판매 상품 관리', link: '/admin/item/list' },
  { name: '상품권 관리', link: '/admin/item/giftCard' },
];

const checkboxList = [
  {
    name: '[추석맞이] 100,000원 상품권',
    number: 'AJDFLKAJLKDFJLAKJF',
    price: '100,000',
    startDate: '2023.09.07',
    endDate: '2023.09.07',
    isUsed: 'N',
  },
  {
    name: '[추석맞이] 100,000원 상품권',
    number: 'AJDFLKAJLKDFJLAKJF',
    price: '100,000',
    startDate: '2023.09.07',
    endDate: '2023.09.07',
    isUsed: 'N',
  },
];

const AdminGiftCard = () => {
  const [selectValue, setSelectValue] = useState(new Date());
  const [selectDate, setSelectDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [avaliableClick, setAvaliableClick] = useState(false);
  const [unAvaliableClick, setUnAvaliableClick] = useState(false);
  const length = checkboxList.length;

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

  // 체크박스 전체 선택 or 해체 기능
  const inputRef = useRef([]);

  const handleAllChecked = (e) => {
    inputRef.current.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  // 사용가능, 불가능 버튼 클릭 이벤트
  const handleAvaliableClicked = () => {
    setAvaliableClick(!avaliableClick);
  };

  const handleUnAvaliableClicked = () => {
    setUnAvaliableClick(!unAvaliableClick);
  };

  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <Container>
        <div>
          <Title>상품권 관리</Title>
          <GiftCardBox>
            <SubTitle>상품권 발행</SubTitle>
            <GiftCardForm action="#" method="post">
              <input type="text" placeholder="상품권 이름" required />
              <input type="number" placeholder="상품권 금액(원)" min="1000" required />
              <DateBtn type="button" onClick={handleSelectDateToggle}>
                <Now>{selectDate}</Now>
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
              </DateBtn>
              <CalendarContainer>
                <CalendarWrapper open={calendarOpen}>
                  <StyledCalendar
                    tileDisabled={({ date }) => isDateDisabled(date)}
                    onChange={handleCheckInDateChange}
                    value={selectValue}
                    formatDay={(locale, date) => moment(date).format('DD')}></StyledCalendar>
                </CalendarWrapper>
              </CalendarContainer>
              <input type="password" placeholder="관리자 비밀번호 확인" required />
              <SubmitButton type="submit">상품권 발행</SubmitButton>
            </GiftCardForm>
          </GiftCardBox>
          <div>
            <SubTitle>상품권 목록</SubTitle>
            <TopMenuOfTable>
              <p className="number-of-list">전체{length}건</p>
              <div>
                {avaliableClick ? (
                  <FilterButton type="button" onClick={handleAvaliableClicked}>
                    사용가능
                  </FilterButton>
                ) : (
                  <button type="button" onClick={handleAvaliableClicked}>
                    사용가능
                  </button>
                )}
                {unAvaliableClick ? (
                  <FilterButton type="button" onClick={handleUnAvaliableClicked}>
                    사용불가
                  </FilterButton>
                ) : (
                  <button type="button" onClick={handleUnAvaliableClicked}>
                    사용불가
                  </button>
                )}
              </div>
            </TopMenuOfTable>
            <GiftCardTable>
              <thead>
                <TableTr>
                  <TableTh>
                    <CheckBox type="checkbox" id="all-select-label" onClick={handleAllChecked} />
                  </TableTh>
                  <TableTh>No.</TableTh>
                  <TableTh>상품권명</TableTh>
                  <TableTh>상품권번호</TableTh>
                  <TableTh>상품권 금액</TableTh>
                  <TableTh>발행일</TableTh>
                  <TableTh>사용기한</TableTh>
                  <TableTh>사용여부</TableTh>
                </TableTr>
              </thead>
              <tbody>
                {checkboxList.map((item, idx) => {
                  const id = 'checkbox' + idx;
                  return (
                    <TableListTr>
                      <TableTd>
                        <CheckBox type="checkbox" id={id} ref={(el) => (inputRef.current[idx] = el)} />
                      </TableTd>
                      <TableTd>{idx + 1}</TableTd>
                      <TableTd>
                        <DetailLink to={`view/${idx}`}>{item.name}</DetailLink>
                      </TableTd>
                      <TableTd>{item.number}</TableTd>
                      <TableTd>{item.price}</TableTd>
                      <TableTd>{item.startDate}</TableTd>
                      <TableTd>{item.endDate}</TableTd>
                      <TableTd>{item.isUsed}</TableTd>
                    </TableListTr>
                  );
                })}
              </tbody>
            </GiftCardTable>
          </div>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default AdminGiftCard;
