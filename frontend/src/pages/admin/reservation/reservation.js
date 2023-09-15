import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import AdminLayout from "../AdminLayout";
import { Num } from "../AdminMember";

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

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Total = styled.span`
  color: #444444;
  font-size: 15px;
`;

export const BlackListBtn = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
`;

export const Redo = styled.button`
  width: 120px;
  height: 100%;
  text-align: center;
  color: #666666;
  border: 1px solid #DDDDDD;
  background-color: transparent;
`;

export const Cancel = styled(Redo)`
  border-color: #D30A0A;
  color: #D30A0A;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableCheckboxWrapper = styled.th`
  background-color: #f7f7f7;
  vertical-align: middle;
  width: 1%;
  text-align: center;
`;

export const TableHeader = styled.th`
  height: 60px;
  background-color: #f7f7f7;
  text-align: center;
  vertical-align: middle;
  border: none;
  width: 10%;
`;

export const TableCell = styled.td`
  vertical-align: middle;
  height: 60px;
  text-align: center;
  color: #444444;
  border-bottom: 1px solid #DDDDDD;
`;

const Reservation = () => {
  const [reservationList, setReservationList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() =>{
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
    setTotalCount(reservations.length)
  })

  const subMenus = [
    { name: '에약 관리', link: '/admin/reservation'},
  ];

  return (
    <AdminLayout title="예약 관리" subMenus={subMenus}>
      <Container>
      <Title>예약 목록</Title>
      <ContentHeader>
          <Total>전체 <Num>{totalCount}</Num> 건</Total>
          <BlackListBtn>
            <Redo>재예약</Redo>
            <Cancel>에약 취소</Cancel>
          </BlackListBtn>
        </ContentHeader>
        <Table>
            <thead>
              <tr>
                <TableHeader>No.</TableHeader>
                <TableHeader>예약 번호</TableHeader>
                <TableHeader>예약자명(회원 ID)</TableHeader>
                <TableHeader>체크인</TableHeader>
                <TableHeader>체크아웃</TableHeader>
                <TableHeader>예약일</TableHeader>
              </tr>
            </thead>
            <tbody>
              {reservationList.map((reservation, index) => (
                <tr key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{reservation.reservationNumber}</TableCell>
                  <TableCell>{reservation.customerName}</TableCell>
                  <TableCell>{reservation.checkInDate}</TableCell>
                  <TableCell>{reservation.checkOutDate}</TableCell>
                  <TableCell>{reservation.reservationDate}</TableCell>
              </tr>
              ))}
            </tbody>
          </Table>
      </Container>
    </AdminLayout>
  );
};

export default Reservation;
