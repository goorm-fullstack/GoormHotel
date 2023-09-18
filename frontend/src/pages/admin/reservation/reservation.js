import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import AdminLayout from "../AdminLayout";
import { Num } from "../AdminMember";
import Instance from "../../../utils/api/axiosInstance";
import { Link } from "react-router-dom";
import moment from "moment";

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

export const TableCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #dddddd !important;
  outline: none;
  margin-left: 39px;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='lightgray' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 120% 120%;
  background-position: 50%;
  background-repeat: no-repeat;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #baa085;
  }
`;

const Reservation = () => {
  const [reservationList, setReservationList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [orderDate, setOrderDate] = useState(new Date());

  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allReserationIds = reservationList.map((item) => item.reservationNumber);
      setCheckedItems(allReserationIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === reservationList.length);
  };


  useEffect(() =>{
    Instance.get('/reservation')
      .then((response) => {
        setReservationList(response.data);
        setTotalCount(response.data.length);

        const formattedCheckIn = formatDate(response.data.checkIn);
        const formattedCheckOut = formatDate(response.data.checkOut);
        const formattedOrderDate = formatDate(response.data.orderDate);

        setCheckIn(formattedCheckIn);
        setCheckOut(formattedCheckOut);
        setOrderDate(formattedOrderDate);
      })
  },[]);

  const formatDate = (date) => {
    const formattedDate = moment(date).format("YYYY.MM.DD");
    return `${formattedDate}`;
  };

  const subMenus = [
    { name: '예약 관리', link: '/admin/reservation'},
  ];

  return (
    <AdminLayout title="예약 관리" subMenus={subMenus}>
      <Container>
      <Title>예약 목록</Title>
      <ContentHeader>
          <Total>전체 <Num>{totalCount}</Num> 건</Total>
          <BlackListBtn>
            <Redo>재예약</Redo>
            <Cancel>예약 취소</Cancel>
          </BlackListBtn>
        </ContentHeader>
        <Table>
            <thead>
              <tr>
                <TableCheckboxWrapper>
                  <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
                </TableCheckboxWrapper>
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
                  <TableCell>
                    <TableCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(reservation.id)}
                      onChange={() => handleCheckboxChange(reservation.id)}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell><Link to={`/admin/reservation/${reservation.reservationNumber}`}>{reservation.reservationNumber}</Link></TableCell>
                  <TableCell>{reservation.member.name}</TableCell>
                  <TableCell>{checkIn}</TableCell>
                  <TableCell>{checkOut}</TableCell>
                  <TableCell>{orderDate}</TableCell>
              </tr>
              ))}
            </tbody>
          </Table>
      </Container>
    </AdminLayout>
  );
};

export default Reservation;
