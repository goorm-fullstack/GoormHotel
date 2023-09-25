import React from 'react';
import { styled } from 'styled-components';
import { commonContainerStyle, PageTitle } from '../../components/common/commonStyles';
import { BoardList } from '../board/BoardList';
import Paging from '../../components/common/Paging';

const Container = styled(commonContainerStyle)``;

const ReservationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
  background-color: ${(props) => props.theme.colors.lightGray};
`;

const TableHeaderCell = styled.th`
  padding: 20px;
  border-top: 1px solid #dddddd;
`;

const TableDataRow = styled.tr``;

const TableDataCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #dddddd;
  text-align: center;
  height: 60px;
  vertical-align: middle;
`;

const PriceCell = styled(TableDataCell)`
  text-align: right;
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
      productName: '디럭스 디럭스',
      paymentAmount: '500,000 원',
      checkInDate: '2023-09-15',
      checkOutDate: '2023-09-20',
    },
    {
      reservationNumber: '2023082555672149',
      reservationDate: '2023-09-12',
      productName:
        '풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스풀 빌라 디럭스',
      paymentAmount: '300,000 원',
      checkInDate: '2023-09-17',
      checkOutDate: '2023-09-22',
    },
  ];

  return (
    <>
      <Container>
        <PageTitle>예약 목록</PageTitle>
        <BoardList>
          <thead>
            <tr>
              <th width="110px">번호</th>
              <th width="220px">예약번호</th>
              <th width="280px">상품명</th>
              <th width="140px">체크인</th>
              <th width="140px">체크아웃</th>
              <th width="140px">예약(결제)일</th>
              <th width="150px">결제금액</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="7" className="center">
                  예약 정보가 없습니다.
                </td>
              </tr>
            ) : (
              reservations.map((reservation, index) => (
                <tr key={index}>
                  <td className="center">{index + 1}</td>
                  <td className="center">
                    <a href={`/reservation/:number`}>{reservation.reservationNumber}</a>
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
        </BoardList>
        <Paging />
      </Container>
    </>
  );
};

export default ReservationList;
