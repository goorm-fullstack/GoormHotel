import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Instance from '../../utils/api/axiosInstance';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AdminLayout from '../common/AdminLayout';
import { commonAdminContents, PageTitle } from '../../components/common/commonStyles';
import {
  Container,
  Title,
  ContentHeader,
  Total,
  BlackListBtn,
  Table,
  TableCheckboxWrapper,
  TableHeader,
  TableCell,
  TableCheckbox,
  Num,
} from '../member/AdminMember';

export const Redo = styled.button`
  width: 120px;
  height: 100%;
  text-align: center;
  color: #666666;
  border: 1px solid #dddddd;
  background-color: transparent;
`;

export const Cancel = styled(Redo)`
  border-color: #d30a0a;
  color: #d30a0a;
`;

const AdminReservation = () => {
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

  useEffect(() => {
    Instance.get('/reservation').then((response) => {
      setReservationList(response.data);
      setTotalCount(response.data.length);

      const formattedCheckIn = formatDate(response.data.checkIn);
      const formattedCheckOut = formatDate(response.data.checkOut);
      const formattedOrderDate = formatDate(response.data.orderDate);

      setCheckIn(formattedCheckIn);
      setCheckOut(formattedCheckOut);
      setOrderDate(formattedOrderDate);
    });
  }, []);

  const formatDate = (date) => {
    const formattedDate = moment(date).format('YYYY.MM.DD');
    return `${formattedDate}`;
  };

  const subMenus = [{ name: '예약 관리', link: '/admin/reservation' }];

  return (
    <AdminLayout subMenus="reservation">
      <Container>
        <PageTitle>예약 목록 </PageTitle>
        <ContentHeader>
          <Total>
            전체 <Num>{totalCount}</Num> 건
          </Total>
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
                <TableCell>
                  <Link to={`/admin/reservation/${reservation.reservationNumber}`}>{reservation.reservationNumber}</Link>
                </TableCell>
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

export default AdminReservation;
