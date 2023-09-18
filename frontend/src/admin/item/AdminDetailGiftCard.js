import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { Title, Container, SubmitButton, DateBtn, Now, CalendarSvg, CalendarContainer, CalendarWrapper, StyledCalendar } from './AdminGiftCard';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';

export const Table = styled.table`
  width: 100%;
  margin-bottom: 40px;
  vertical-align: middle;
`;

export const TableTr = styled.tr`
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  height: 60px;
`;

export const BoldTd = styled.td`
  padding: 30px 0 30px 40px;
  font-size: 15px;
  font-weight: 500;
  color: rgb(17, 17, 17);
  text-align: left;
  width: 30%;
`;

export const TableTd = styled.td`
  padding: 30px 0 30px 40px;
  text-align: left;
`;

export const Input = styled.input`
  height: 40px;
  width: 200px;
  vertical-align: middle;
`;

export const Form = styled.form`
  text-align: center;
`;

const DateSelectBtn = styled(DateBtn)`
  width: 200px;
`;

const Calendar = styled(CalendarWrapper)`
  top: 110%;
  left: -80px;
`;

const subMenus = [
  { name: '판매 상품 관리', link: '/admin/item/list' },
  { name: '상품권 관리', link: '/admin/item/giftCard' },
];

const giftCard = [
  {
    name: '[추석맞이] 100,000원 상품권',
    number: 'AJDFLKAJLKDFJLAKJF',
    price: '100,000',
    startDate: '2023.09.07',
    endDate: '2023.09.07',
    isUsed: 'N',
  },
];

const AdminDetailGiftCard = () => {
  const [selectValue, setSelectValue] = useState(new Date());
  const [selectDate, setSelectDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    let placeholder = '';
    giftCard.map((item) => {
      return (placeholder = item.endDate);
    });

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
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <Container>
        <Title>상품권 정보 상세</Title>
        <Form action="#" method="post">
          <Table>
            {giftCard.map((item) => {
              return (
                <>
                  <TableTr>
                    <BoldTd>상품권명</BoldTd>
                    <TableTd>
                      <Input type="text" value={item.name} required />
                    </TableTd>
                  </TableTr>
                  <TableTr>
                    <BoldTd>상품권번호</BoldTd>
                    <TableTd>
                      <Input type="text" value={item.number} required />
                    </TableTd>
                  </TableTr>
                  <TableTr>
                    <BoldTd>상품권 금액</BoldTd>
                    <TableTd>
                      <Input type="text" value={item.price} required />
                    </TableTd>
                  </TableTr>
                  <TableTr>
                    <BoldTd>발행일</BoldTd>
                    <TableTd>{item.startDate}</TableTd>
                  </TableTr>
                  <TableTr>
                    <BoldTd>사용기한</BoldTd>
                    <TableTd>
                      <DateSelectBtn type="button" onClick={handleSelectDateToggle}>
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
                      </DateSelectBtn>
                      <CalendarContainer>
                        <Calendar open={calendarOpen}>
                          <StyledCalendar
                            tileDisabled={({ date }) => isDateDisabled(date)}
                            onChange={handleCheckInDateChange}
                            value={selectValue}
                            formatDay={(locale, date) => moment(date).format('DD')}></StyledCalendar>
                        </Calendar>
                      </CalendarContainer>
                    </TableTd>
                  </TableTr>
                  <TableTr>
                    <BoldTd>사용여부</BoldTd>
                    <TableTd>
                      <Input type="text" value={item.isUsed} required />
                    </TableTd>
                  </TableTr>
                </>
              );
            })}
          </Table>
          <SubmitButton type="submit">수정</SubmitButton>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default AdminDetailGiftCard;
