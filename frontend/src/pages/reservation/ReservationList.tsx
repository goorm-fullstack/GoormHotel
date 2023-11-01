import React, { useState } from 'react';
import * as S from './Style';
import { PageTitle } from '../../Style/commonStyles';
import Paging from '../../components/common/Paging/Paging';
import { useEffect } from 'react';
import Instance from '../../utils/api/axiosInstance';

interface Reservation {
  reservationNumber : string,
  reservationDate : string,
  productName : string,
  paymentAmount : number,
  checkInDate : string,
  checkOutDate : string
}

const ReservationList = () => {
  const [totalPages, setTotalPages] = useState(0);
  const memberId = localStorage.getItem("memberId");
  const [reservations, setReservation] = useState<Reservation[]>([
    {
      reservationNumber: '2023082555672148',
      reservationDate: '2023-09-10',
      productName: '디럭스 디럭스',
      paymentAmount: 500000,
      checkInDate: '2023-09-15',
      checkOutDate: '2023-09-20',
    },
    {
      reservationNumber: '2023082555672149',
      reservationDate: '2023-09-12',
      productName:
        '풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스',
      paymentAmount: 500000,
      checkInDate: '2023-09-17',
      checkOutDate: '2023-09-22',
    },
  ]);

  useEffect(() => {
    if(memberId) {
      // 페이징 코드 추가
      Instance.get(`/reservation/list/count/${memberId}`).then((response) => {
        setTotalPages(response.data);
      })
      Instance.get(`/reservation/list/member/${memberId}`).then((response) => {
        setReservation(response.data)
      });
    }
  }, [])

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
                  <td className="center">{reservation.checkInDate}</td>
                  <td className="center">{reservation.checkOutDate}</td>
                  <td className="center">{reservation.reservationDate}</td>
                  <td className="center">{reservation.paymentAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </S.Table>
        <Paging totalPage={totalPages} />
      </S.Container>
    </>
  );
};

export default ReservationList;
