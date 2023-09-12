import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { commonContainerStyle} from '../../../components/common/commonStyles';
import AdminHeader from "../AdminHeader";
import { Left } from "../../ReservationPage";
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // css import
import moment from "moment";
import slideBtn from "../../../images/icon/ico_slide_btn.png"

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
`

const TableDL = styled.dl`
  display: table;
  display: flex;
  flex-direction : row;
  width : 100%;
  border : 1px solid #ddd;
`;

const TableDLDD = styled.dd`
  display: table-cell;
  vertical-align: middle;
  border-top: 1px solid #ccc;
  text-align: center;
  padding : 1em;
`;

const TableDLDT = styled.dt`
  display: table-cell;
  text-align: center;
  background-color : #ddd;
  width : 200px;
  padding : 1em;
`;

const CalendarContainer = styled.div`
  position: relative;
`;

const CalendarWrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const CheckOutCalendarWrapper = styled(CalendarWrapper)``;

export const StyledCalendar = styled(Calendar)`
  border-radius: 10px;
  border: 1px solid #c8c8c8;

  .react-calendar__navigation__label > span {
    font-size: 13px;
    font-weight: 600;
  }
  
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #102C57;
    color: white;
  }
  
  .react-calendar__tile--now {
    // 오늘 날짜 하이라이트 커스텀
    background: white;
    color: #102C57;
  }
  .react-calendar__tile--active {
    background: #102C57;
    color: white;
  }
`;

const UserInfo = styled.input`
  width: 250px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  font-size: 18px;
  border: 1px solid #ddd;
  background-color: #fff;
`

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

const ReservationDetail = () => {
  const [reservationDate, setReservationDate] = useState("");//예약번호
  const [checkInDate, setCheckInDate] = useState("");//예약일
  const [checkOutDate, setCheckOutDate] = useState("");//체크인
  const [reservationCode, setReservationCode] = useState("");//체크 아웃
  const [reservationItem, setReservationItem] = useState("");//에약 상품
  const[customerName, setCustomerName] = useState("");//예약자명
  const[phoneNumber, setPhoneNumber] = useState("");//연락처
  const[emailAddress, setEmailAddress] = useState("");//이메일
  const[customerRequest, setCustomerRequest] = useState("");//요청 사항
  const[applyCoupon, setApplyCoupon] = useState("");//적용 쿠폰
  const[applyGiftCard, setApplyGiftCard] = useState("");//적용 상품권
  const[totalPrice, setTotalPrice] = useState("");//결제 금액
  const [updateClick, setUpdateClick] = useState(true);

  // 캘린더 관련
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());

  const reservationData = {
    reservationNumber : "테스트",
    orderDae : "2023.09.01",
    checkIn : "2023.09.25",
    checkOut : "2023.09.27",
    count : 3,
    adult : 2,
    children : 2,
    notice : "test",
    member : {
      name : "name",
      email : "test@naver.com",
      phoneNumber : "010-0000-0000"
    },
    item : {
      name : "itemName",
    },
    stay : 3,
    coupon : {
      name : "coupon name",
    },
    giftcard : [
      {
        name : "giftcard Name"
      },
    ],
    sumPrice : 10000,
    discountPrice : 0,
    totalPrice : 10000,
    state : "에약"

  }
  useEffect(()=>{

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    
    const formattedToday = formatDate(today);
    const formattedTomorrow = formatDate(tomorrow);
    const formattedReservationDate = formatDate(tomorrow);

    setCheckInDate(formattedToday);
    setCheckOutDate(formattedTomorrow);
    setReservationDate(formattedReservationDate);
    setCustomerName(reservationData.member.name);
    setPhoneNumber(reservationData.member.phoneNumber);
    setEmailAddress(reservationData.member.email);
    setCustomerRequest(reservationData.notice);
  },[]);

  const formatDate = (date) => {
    const formattedDate = moment(date).format("YYYY.MM.DD");
    return `${formattedDate}`;
  };


  const isDateDisabled = (date) => {
    return moment(date).isBefore(moment(), "day");
  };

  const handleNoticeInputChange = (e) => {
    if(!updateClick) {
      setCustomerRequest(e.target.value);
    }
  }

  const handleNameInputChange = (e) => {
    if(!updateClick) {
      setCustomerName(e.target.value);
    }
  }

  const handlePhoneNumberInputChange = (e) => {
    if(!updateClick) {
      setPhoneNumber(e.target.value);
    }
  }


  const handleEmailInputChange = (e) => {
    if(!updateClick) {
      setEmailAddress(e.target.value);
    }
  }

  const handleCheckInToggle = () => {
    if(!updateClick) {
      setCheckInOpen(!checkInOpen);
      setCheckOutOpen(false);
    }
  };

  const handleCheckOutToggle = () => {
    if(!updateClick) {
      setCheckOutOpen(!checkOutOpen);
      setCheckInOpen(false);
    }
  };

  const handleCheckInDateChange = (selectedDate) => {
    setCheckInValue(selectedDate);
    setCheckInOpen(false);
    const formattedDate = moment(selectedDate).format("YYYY.MM.DD");
    setCheckInDate(`${formattedDate}`);
  };

  const handleCheckOutDateChange = (selectedDate) => {
    setCheckOutValue(selectedDate);
    setCheckOutOpen(false);
    const formattedDate = moment(selectedDate).format("YYYY.MM.DD");
    setCheckOutDate(`${formattedDate}`);
  };

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
        <CategoryLink
          to = "/admin/reservation/detail"
          $activeClassName = "active"
          style={{
            display:"flex",
            marginTop : "1em",
            justifyContent : "space-between",
          }}
        ><span>예약 관리</span><span style={{marginRight : "25px"}}>&gt;</span></CategoryLink>
      </FirstArticle>
      
      <SecondArticle>
      <h1
        style={{
          fontSize : "2em",
          fontStyle : "bold",
          paddingTop : "2em",
        }}
      >예약 상세</h1>
      </SecondArticle>
      <ThirdArticle>
          <div style={{
            display:"flex",
            width : "1180px",
            flexDirection : "column",
          }}>
          <TableDL>
            <TableDLDT>
              예약 번호
            </TableDLDT>
            <TableDLDD>
              <p>020221611653456465</p>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              에약일
            </TableDLDT>
            <TableDLDD>
                <p>{reservationDate}</p>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              체크인
            </TableDLDT>
            <TableDLDD>
            <div>
            <button style={{
              width: "250px",
              height: "45px",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
              alignItems: "center",
              fontSize: "18px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
            }} onClick={handleCheckInToggle}><p>{checkInDate}</p>
            <svg viewBox="0 0 32 32" width="18" height="18" style={{fill : "#102C57"}}>
                      <g xmlns="http://www.w3.org/2000/svg" id="calendar_1_">
                        <path
                          d="M 29.334 3 H 25 V 1 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 2 h -6 V 1 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 2 H 9 V 1 c 0 -0.553 -0.448 -1 -1 -1 S 7 0.447 7 1 v 2 H 2.667 C 1.194 3 0 4.193 0 5.666 v 23.667 C 0 30.806 1.194 32 2.667 32 h 26.667 C 30.807 32 32 30.806 32 29.333 V 5.666 C 32 4.193 30.807 3 29.334 3 Z M 30 29.333 C 30 29.701 29.701 30 29.334 30 H 2.667 C 2.299 30 2 29.701 2 29.333 V 5.666 C 2 5.299 2.299 5 2.667 5 H 7 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 V 5 h 4.334 C 29.701 5 30 5.299 30 5.666 V 29.333 Z"
                        />
                        <rect
                          x="7"
                          y="12"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="7"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="7"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="12"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="12"
                          width="4"
                          height="3"
                        />
                      </g>
                    </svg>
            </button>
                    <CalendarContainer>
                    <CalendarWrapper open={checkInOpen}>
                    <StyledCalendar
                        tileDisabled={({ date }) => isDateDisabled(date)}
                        onChange={handleCheckInDateChange}
                        value={checkInValue}
                        formatDay={(locale, date) => moment(date).format("DD")}
                      ></StyledCalendar>
                    </CalendarWrapper>
                  </CalendarContainer>
            </div>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              체크아웃
            </TableDLDT>
            <TableDLDD>
            <div>
            <button style={{
              width: "250px",
              height: "45px",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
              alignItems: "center",
              fontSize: "18px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
            }} onClick={handleCheckOutToggle}><p>{checkOutDate}</p>
            <svg viewBox="0 0 32 32" width="18" height="18" style={{fill : "#102C57"}}>
                      <g xmlns="http://www.w3.org/2000/svg" id="calendar_1_">
                        <path
                          d="M 29.334 3 H 25 V 1 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 2 h -6 V 1 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 2 H 9 V 1 c 0 -0.553 -0.448 -1 -1 -1 S 7 0.447 7 1 v 2 H 2.667 C 1.194 3 0 4.193 0 5.666 v 23.667 C 0 30.806 1.194 32 2.667 32 h 26.667 C 30.807 32 32 30.806 32 29.333 V 5.666 C 32 4.193 30.807 3 29.334 3 Z M 30 29.333 C 30 29.701 29.701 30 29.334 30 H 2.667 C 2.299 30 2 29.701 2 29.333 V 5.666 C 2 5.299 2.299 5 2.667 5 H 7 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 5 h 6 v 2 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 V 5 h 4.334 C 29.701 5 30 5.299 30 5.666 V 29.333 Z"
                        />
                        <rect
                          x="7"
                          y="12"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="7"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="7"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="14"
                          y="12"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="22"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="17"
                          width="4"
                          height="3"
                        />
                        <rect
                          x="21"
                          y="12"
                          width="4"
                          height="3"
                        />
                      </g>
                    </svg>
                    </button>
            </div>
              <CalendarContainer>
                <CalendarWrapper open={checkOutOpen}>
                  <StyledCalendar
                    tileDisabled={({ date }) => isDateDisabled(date)}
                    onChange={handleCheckOutDateChange}
                    value={checkOutValue}
                    formatDay={(locale, date) => moment(date).format("DD")}
                  ></StyledCalendar>
                </CalendarWrapper>
              </CalendarContainer>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              예약 상품
            </TableDLDT>
            <TableDLDD>
                <span style={{textDecoration : "underline"}}>{"[스페셜 오퍼] 상품명"}</span>
                <span>{"(스페셜 오퍼] 상품명)"}</span>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              예약자명
            </TableDLDT>
            <TableDLDD>
            <UserInfo value={customerName} readOnly={updateClick} onChange={handleNameInputChange}></UserInfo>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              연락처
            </TableDLDT>
            <TableDLDD>
            <UserInfo value={phoneNumber} readOnly={updateClick} onChange={handlePhoneNumberInputChange}></UserInfo>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              이메일
            </TableDLDT>
            <TableDLDD>
            <UserInfo value={emailAddress} readOnly={updateClick} onChange={handleEmailInputChange}></UserInfo>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
            요청사항
            </TableDLDT>
            <TableDLDD>
            <UserInfo value={customerRequest} readOnly={updateClick} onChange={handleNoticeInputChange}></UserInfo>
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              적용 쿠폰
            </TableDLDT>
            <TableDLDD>
              {reservationData.coupon.name}
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              적용 상품권
            </TableDLDT>
            <TableDLDD>
              {reservationData.giftcard.map((gift, index) => {
                <>{gift.name}</>
              })}
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              결제 금액
            </TableDLDT>
            <TableDLDD>
              <UserInfo value={reservationData.totalPrice}></UserInfo>
            </TableDLDD>
          </TableDL>
          <div style={{
            margin : "2em",
            marginLeft : '600px'
          }}>
            {
              updateClick === true ?
              <button 
              style={{
              width : "100px",
              height : "40px",
              backgroundColor : "white",
              border : "solid 1px black",
              marginRight : "16px",
            }}
            updateClick = {true}
            onClick={() => setUpdateClick(!updateClick)}
            >수정</button> : 
            <button 
              style={{
              width : "100px",
              height : "40px",
              backgroundColor : "white",
              border : "solid 1px black",
              marginRight : "16px",
            }}
            updateClick = {false}
            onClick={() => setUpdateClick(!updateClick)}
            >완료</button>
            }
            <button
            style={{
              width : "100px",
              height : "40px",
              color : "red",
              backgroundColor : "white",
              border : "solid 1px red",
            }}>예약취소</button>
          </div>
        </div>
      </ThirdArticle>
      </Container>
    </>
  );
};

export default ReservationDetail;
