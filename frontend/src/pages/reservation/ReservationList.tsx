import React, { useState } from 'react';
import * as S from './Style';
import { PageTitle } from '../../Style/commonStyles';
import Paging from '../../components/common/Paging/Paging';
import { useEffect } from 'react';
import Instance from '../../utils/api/axiosInstance';
import MemberCheck from '../../components/MemberCheck';
import { formatDate } from '../../utils/function/dateFormatter';
import { numberWithCommas } from '../../utils/function/comma';

interface Reservation {
  id: number;
  reservationNumber: string;
  productName: string;
  checkInDate: string;
  checkOutDate: string;
  reservationDate: string;
  paymentAmount: number;
}

const ReservationList = () => {
  const [totalPages, setTotalPages] = useState(0);
  const memberId = localStorage.getItem('memberId');
  const [reservations, setReservation] = useState<Reservation[]>([]);

  useEffect(() => {
    if (memberId) {
      // 페이징 코드 추가
      Instance.get(`/reservation/list/count/${memberId}`).then((response) => {
        setTotalPages(response.data);
      });
      Instance.get(`/reservation/list/member/${memberId}`).then((response) => {
        console.log(response.data);
        setReservation(response.data);
      });
    }
  }, []);

  return (
    <>
      <S.Container>
        <PageTitle>예약 목록</PageTitle>
        <S.Table className="userpage">
          <thead>
            <tr>
              <th style={{ width: '110px' }}>번호</th>
              <th style={{ width: '220px' }}>예약번호</th>
              <th style={{ width: '280px' }}>상품명</th>
              <th style={{ width: '140px' }}>체크인</th>
              <th style={{ width: '140px' }}>체크아웃</th>
              <th style={{ width: '140px' }}>예약(결제)일</th>
              <th style={{ width: '150px' }}>결제금액</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="center empty">
                  예약 정보가 없습니다.
                </td>
              </tr>
            ) : (
              reservations.map((reservation, index) => (
                <tr key={index}>
                  <td className="center">{index + 1}</td>
                  <td className="center">
                    <a href={`/reservation/${reservation.reservationNumber}`} className="u">
                      {reservation.reservationNumber}
                    </a>
                  </td>
                  <td className="center">
                    <p className="textover">{reservation.productName}</p>
                  </td>
                  <td className="center">{formatDate((reservation.checkInDate).toString())}</td>
                  <td className="center">{formatDate((reservation.checkOutDate).toString())}</td>
                  <td className="center">{formatDate((reservation.reservationDate).toString())}</td>
                  <td className="center">{numberWithCommas(reservation.paymentAmount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </S.Table>
        <Paging totalPage={totalPages} />
      </S.Container>
      <MemberCheck />
    </>
  );
};

export default ReservationList;
