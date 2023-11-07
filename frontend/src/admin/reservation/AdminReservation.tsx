import React, { useState, useEffect } from 'react';
import Instance from '../../utils/api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, BtnWrapper, NormalBtn, InputCheckbox } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/Style';
import Paging from '../../components/common/Paging/Paging';
import { RoomData, DiningData } from '../item/AdminItemList';
import { response } from 'express';
import AdminCheck from '../adminCheck';

export interface ReservationData {
  id: number;
  reservationNumber: string;
  orderDate: Date;
  checkIn: Date;
  checkOut: Date;
  count: number;
  adult: number;
  children: number;
  member: any;
  nonMember: any;
  notice: string;
  item: DiningData | RoomData;
  stay: number;
  coupon: any;
  giftCard: any[];
  sumPrice: number;
  discountPrice: number;
  totalPrice: number;
  state: string;
}

const AdminReservation = () => {
  const [reservationList, setReservationList] = useState<ReservationData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  // const [checkIn, setCheckIn] = useState(new Date());
  // const [checkOut, setCheckOut] = useState(new Date());
  // const [orderDate, setOrderDate] = useState(new Date());
  const [checkInDateFormat, setCheckInDateFormat] = useState('');
  const [checkOutDateFormat, setCheckOutDateFormat] = useState('');
  const [orderDateFormat, setOrderDateFormat] = useState('');

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');

  useEffect(() => {
    // 페이징 코드 추가
    Instance.get('/reservation/count').then((response) => {
      setTotalPages(response.data);
    });
  }, []);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allReserationIds = reservationList.map((item) => item.reservationNumber);
      setCheckedItems(allReserationIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId: string) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === reservationList.length);
  };

  useEffect(() => {
    Instance.get('/reservation').then((response) => {
      setReservationList(response.data);
      setTotalCount(response.data.length);

      // setCheckIn(response.data.checkIn);
      // setCheckOut(response.data.checkOut);
      // setOrderDate(response.data.orderDate);

      const checkInDate = moment(response.data.checkIn).format('yyyy/MM/DD');
      const checkOutDate = moment(response.data.checkOut).format('yyyy/MM/DD');
      const orderDate = moment(response.data.orderDate).format('yyyy/MM/DD');

      setCheckInDateFormat(checkInDate);
      setCheckOutDateFormat(checkOutDate);
      setOrderDateFormat(orderDate);
    });
  }, []);

  // 사용되지 않아서 일단 주석처리 하였습니다.
  // const formatDate = (date) => {
  //   const formattedDate = moment(date).format('YYYY.MM.DD');
  //   return `${formattedDate}`;
  // };

  return (
    <AdminLayout subMenus="reservation">
      <Container>
        <PageTitle>예약 목록 </PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{totalCount}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header red">선택 예약 취소</NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <colgroup>
            <col width="80px" />
            <col width="100px" />
            <col width="200px" />
            <col width="200px" />
            <col width="200px" />
            <col width="200px" />
            <col width="150px" />
          </colgroup>
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
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {reservationList.length === 0 ? (
              <tr>
                <td colSpan={8} className="center empty">
                  등록된 예약 건이 없습니다.
                </td>
              </tr>
            ) : (
              <>
                {reservationList.map((reservation, index) => (
                  <tr key={index}>
                    <td className="center">
                      <InputCheckbox
                        type="checkbox"
                        checked={checkedItems.includes(reservation.reservationNumber)}
                        onChange={() => handleCheckboxChange(reservation.reservationNumber)}
                      />
                    </td>
                    <td className="center">{reservationList.length - index}</td>
                    <td className="center">
                      <Link to={`/admin/reservation/detail/${reservation.reservationNumber}`} className="u">
                        {reservation.reservationNumber}
                      </Link>
                    </td>
                    {reservation.member ? (
                      <td className="center">{reservation.member.name}</td>
                    ) : (
                      <td className="center">{reservation.nonMember.name}</td>
                    )}
                    <td className="center">{checkInDateFormat}</td>
                    <td className="center">{checkOutDateFormat}</td>
                    <td className="center">{orderDateFormat}</td>
                    <td className="center">{reservation.state}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
        <Paging totalPage={totalPages} />
      </Container>
      <AdminCheck kind="AUTH_B" />
    </AdminLayout>
  );
};

export default AdminReservation;
