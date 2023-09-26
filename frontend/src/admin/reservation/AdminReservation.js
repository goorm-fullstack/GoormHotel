import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Instance from '../../utils/api/axiosInstance';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, BtnWrapper, NormalBtn, InputCheckbox } from '../../components/common/commonStyles';
import { Container, Table, TableHeader } from '../member/AdminMember';
import Paging from '../../components/common/Paging';

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

  return (
    <AdminLayout subMenus="reservation">
      <Container>
        <PageTitle>예약 목록 </PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{totalCount}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header">재예약</NormalBtn>
            <NormalBtn className="header red">예약 취소</NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>번호</th>
              <th>예약 번호</th>
              <th>예약자명(회원 ID)</th>
              <th>체크인</th>
              <th>체크아웃</th>
              <th>예약일</th>
            </tr>
          </thead>
          <tbody>
            {reservationList.map((reservation, index) => (
              <tr key={index}>
                <td>
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(reservation.id)}
                    onChange={() => handleCheckboxChange(reservation.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/admin/reservation/${reservation.reservationNumber}`}>{reservation.reservationNumber}</Link>
                </td>
                <td>{reservation.member.name}</td>
                <td>{checkIn}</td>
                <td>{checkOut}</td>
                <td>{orderDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminReservation;
