import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { commonContainerStyle} from '../../../components/common/commonStyles';
import AdminHeader from "../AdminHeader";

const Container = styled.div`
  ${commonContainerStyle}
  margin: 0;
  height : 100vh;
  margin-bottom : -220px;
  margin-top : 100px;
`;

const FirstArticle = styled.div`
  flex-direction: column;
  width : 20%;
  height : 100%;
  border-right : solid 1px;
  padding-top : 3em;
  padding-left : 2em;
  float : left;
`;

const SecondArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left : 5em;
`;

const ThirdArticle = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  padding-left : 5em;
`;

const TableHeaderInfo = styled.div`
  display: flex;
  width: 1180px;
  padding-bottom : 1em;
  justify-content : space-between;
`;

const TableHead = styled.th`
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  padding: 2em;
  background-color : #ddd;
`;

const TableDataRow = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.theme.colors.lightGray};
  }
`;

const TableDataCell = styled.td`
  padding: 10px;
  border: 1px solid #DDDDDD;
  text-align : center;
  padding: 1em;
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

  return (
    <>
      <AdminHeader />
      <Container>
      <FirstArticle>
        <h2
          style={{
            fontSize: "1.5em",
            fontStyle:"bold",
          }}
        >에약 관리</h2>
        <p
          style={{
            marginTop : "1em",
            color: "#baa085",
          }}
        >예약 관리</p>
      </FirstArticle>
      
      <SecondArticle>
      <h1
        style={{
          fontSize : "2em",
          fontStyle : "bold",
          paddingTop : "2em",
        }}
      >예약 목록</h1>
      </SecondArticle>
      <ThirdArticle>
        <TableHeaderInfo>
          <span
            style={{
            }}
          >전체 {totalCount}건</span>
          <div>
          <button 
            style={{
              width : "100px",
              height : "40px",
              backgroundColor : "white",
              border : "solid 1px black",
              marginRight : "16px",
            }}
          >재예약</button>
          <button
          style={{
            width : "100px",
            height : "40px",
            color : "red",
            backgroundColor : "white",
            border : "solid 1px red",
          }}>예약취소</button>
          </div>
        </TableHeaderInfo>
          <table style={{
            width:"1180px"
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
      </ThirdArticle>
      </Container>
    </>
  );
};

export default Reservation;
