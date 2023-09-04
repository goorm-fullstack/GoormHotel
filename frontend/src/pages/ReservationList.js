import React from 'react';
import Header from '../components/Header';
import { styled } from 'styled-components';
import { commonContainerStyle, commonTitleStyle } from '../components/common/commonStyles';

const Container = styled.div`
  ${commonContainerStyle}
`;

const Title = styled.h1`
  ${commonTitleStyle}
`;

const ReservationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
  background-color: ${props => props.theme.colors.lightGray};
`;

const TableHeaderCell = styled.th`
  padding: 20px;
  border: 1px solid #DDDDDD;
`;

const TableDataRow = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.theme.colors.lightGray};
  }
`;

const TableDataCell = styled.td`
  padding: 10px;
  border: 1px solid #DDDDDD;
`;

const NoReservationsMessage = styled.p`
  font-size: 16px;
  text-align: center;
  padding: 16px;
  color: #666;
`;

const ReservationList = () => {
  const reservations = [
    {
      reservationNumber: '2023082555672148',
      reservationDate: '2023-09-10',
      productName: '디럭스',
      paymentAmount: '500,000 원',
      checkInDate: '2023-09-15',
      checkOutDate: '2023-09-20',
    },
    {
      reservationNumber: '2023082555672149',
      reservationDate: '2023-09-12',
      productName: '풀 빌라',
      paymentAmount: '300,000 원',
      checkInDate: '2023-09-17',
      checkOutDate: '2023-09-22',
    },
  ];

  return (
    <>
      <Header />
      <Container>
        <Title>예약 목록</Title>
        <ReservationTable>
          <thead>
            <TableHeaderRow>
              <TableHeaderCell>번호</TableHeaderCell>
              <TableHeaderCell>예약번호</TableHeaderCell>
              <TableHeaderCell>예약날짜</TableHeaderCell>
              <TableHeaderCell>상품명</TableHeaderCell>
              <TableHeaderCell>결제 금액</TableHeaderCell>
              <TableHeaderCell>체크인 날짜</TableHeaderCell>
              <TableHeaderCell>체크아웃 날짜</TableHeaderCell>
            </TableHeaderRow>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
            <tr>
              <TableDataCell colSpan="7">
                <NoReservationsMessage>예약 정보가 없습니다.</NoReservationsMessage>
              </TableDataCell>
            </tr>
          ) : (
            reservations.map((reservation, index) => (
              <TableDataRow key={index}>
                <TableDataCell>{index + 1}</TableDataCell>
                <TableDataCell>{reservation.reservationNumber}</TableDataCell>
                <TableDataCell>{reservation.reservationDate}</TableDataCell>
                <TableDataCell>{reservation.productName}</TableDataCell>
                <TableDataCell>{reservation.paymentAmount}</TableDataCell>
                <TableDataCell>{reservation.checkInDate}</TableDataCell>
                <TableDataCell>{reservation.checkOutDate}</TableDataCell>
              </TableDataRow>
            ))
          )}
          </tbody>
        </ReservationTable>
      </Container>
    </>
  );
};

export default ReservationList;