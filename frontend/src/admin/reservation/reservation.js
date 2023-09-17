import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { commonContainerStyle } from '../../components/common/commonStyles';
import AdminHeader from '../common/AdminHeader';
import { NavLink } from 'react-router-dom';
import AdminLayout from '../common/AdminLayout';

const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 72px;
`;

const TableHeaderInfo = styled.div`
  display: flex;
  width: 1180px;
  padding-bottom: 1em;
  justify-content: space-between;
`;

const TableHead = styled.th`
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  padding: 2em;
  background-color: #ddd;
`;

const TableDataRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.colors.lightGray};
  }
`;

const TableDataCell = styled.td`
  padding: 10px;
  border: 1px solid #dddddd;
  text-align: center;
  padding: 1em;
`;

const CategoryLink = styled(NavLink)`
  font-size: 14px;
  color: #888888;

  &:hover {
    color: #baa085;
  }

  &.active {
    color: #baa085;
  }
`;

const Reservation = () => {
  const [reservationList, setReservationList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const reservations = [
      {
        reservationNumber: '2023082555672148',
        reservationDate: '2023-09-10',
        customerName: 'Test1',
        paymentAmount: '500,000 원',
        checkInDate: '2023-09-15',
        checkOutDate: '2023-09-20',
      },
      {
        reservationNumber: '2023082555672149',
        reservationDate: '2023-09-12',
        customerName: 'Test2',
        paymentAmount: '300,000 원',
        checkInDate: '2023-09-17',
        checkOutDate: '2023-09-22',
      },
    ];

    setReservationList(reservations);
    setTotalCount(reservations.length);
  });

  const subMenus = [{ name: '에약 관리', link: '/admin/reservation' }];

  return (
    <AdminLayout title="예약 관리" subMenus={subMenus}>
      <Container>
        <Title>예약 목록</Title>
        <TableHeaderInfo>
          <span style={{}}>전체 {totalCount}건</span>
          <div>
            <button
              style={{
                width: '100px',
                height: '40px',
                backgroundColor: 'white',
                border: 'solid 1px black',
                marginRight: '16px',
              }}>
              재예약
            </button>
            <button
              style={{
                width: '100px',
                height: '40px',
                color: 'red',
                backgroundColor: 'white',
                border: 'solid 1px red',
              }}>
              예약취소
            </button>
          </div>
        </TableHeaderInfo>
        <table
          style={{
            width: '1180px',
          }}>
          <thead>
            <TableHead>No.</TableHead>
            <TableHead>예약 번호</TableHead>
            <TableHead>예약자명(회원 ID)</TableHead>
            <TableHead>체크인</TableHead>
            <TableHead>체크아웃</TableHead>
            <TableHead>예약일</TableHead>
          </thead>
          <tbody>
            {reservationList.map((reservation, index) => (
              <TableDataRow key={index}>
                <TableDataCell>{index + 1}</TableDataCell>
                <TableDataCell>{reservation.reservationNumber}</TableDataCell>
                <TableDataCell>{reservation.customerName}</TableDataCell>
                <TableDataCell>{reservation.checkInDate}</TableDataCell>
                <TableDataCell>{reservation.checkOutDate}</TableDataCell>
                <TableDataCell>{reservation.reservationDate}</TableDataCell>
              </TableDataRow>
            ))}
          </tbody>
        </table>
      </Container>
    </AdminLayout>
  );
};

export default Reservation;
