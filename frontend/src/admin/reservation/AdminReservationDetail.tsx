import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, BtnWrapper, SubmitBtn, NormalBtn } from '../../Style/commonStyles';
import { Container, Table } from '../member/Style';
import { numberWithCommas } from '../../utils/function/comma';
import { ReservationData } from './AdminReservation';
import { ValuePiece } from '../../components/common/DateButton/DateButton';
import AdminCheck from '../adminCheck';

const AdminReservationDetail = () => {
  const { reservationNumber } = useParams(); //예약 번호로 조회
  const [reservationDate, setReservationDate] = useState(''); //예약 일자
  const [checkInDate, setCheckInDate] = useState(''); //체크인
  const [checkOutDate, setCheckOutDate] = useState(''); //체크아웃
  const [reservationItem, setReservationItem] = useState(''); //에약 상품
  const [customerName, setCustomerName] = useState(''); //예약자명
  const [phoneNumber, setPhoneNumber] = useState(''); //연락처
  const [emailAddress, setEmailAddress] = useState(''); //이메일
  const [customerRequest, setCustomerRequest] = useState(''); //요청 사항
  const [applyCoupon, setApplyCoupon] = useState(''); //적용 쿠폰
  const [applyGiftCard, setApplyGiftCard] = useState<any[]>([]); //적용 상품권
  const [totalPrice, setTotalPrice] = useState(''); //결제 금액
  const [updateClick, setUpdateClick] = useState(true);
  const [reservationData, setReservationData] = useState<ReservationData>();

  // 캘린더 관련
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkInValue, setCheckInValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());
  const [checkOutValue, setCheckOutValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());
  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');

  useEffect(() => {
    Instance.get(`/reservation/detail/${reservationNumber}`).then((response) => {
      setReservationData(response.data);

      const formattedCheckIn = formatDate(response.data.checkIn);
      const formattedCheckOut = formatDate(response.data.checkOut);
      const formattedReservationDate = formatDate(response.data.orderDate);

      setCheckInDate(formattedCheckIn);
      setCheckOutDate(formattedCheckOut);
      setReservationDate(formattedReservationDate);
      if (response.data.member) {
        setCustomerName(response.data.member.name);
        setPhoneNumber(response.data.member.phoneNumber);
        setEmailAddress(response.data.member.email);
      } else {
        setCustomerName(response.data.nonMember.name);
        setPhoneNumber(response.data.nonMember.phoneNumber);
        setEmailAddress(response.data.nonMember.email);
      }

      setCustomerRequest(response.data.notice);
      
      if(response.data.coupon)
        setApplyCoupon(response.data.coupon.name);
      if(response.data.giftCard)
        setApplyGiftCard(response.data.giftCard);
    });
  }, []);

  const formatDate = (date: Date) => {
    const formattedDate = moment(date).format('YYYY.MM.DD');
    return `${formattedDate}`;
  };

  const isDateDisabled = (date: Date) => {
    return moment(date).isBefore(moment(), 'day');
  };

  const handleNoticeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updateClick) {
      setCustomerRequest(e.target.value);
    }
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updateClick) {
      setCustomerName(e.target.value);
    }
  };

  const handlePhoneNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updateClick) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updateClick) {
      setEmailAddress(e.target.value);
    }
  };

  const handleCheckInToggle = () => {
    if (!updateClick) {
      setCheckInOpen(!checkInOpen);
      setCheckOutOpen(false);
    }
  };

  const handleCheckOutToggle = () => {
    if (!updateClick) {
      setCheckOutOpen(!checkOutOpen);
      setCheckInOpen(false);
    }
  };

  const handleCheckInDateChange = (selectedDate: ValuePiece | [ValuePiece, ValuePiece]) => {
    setCheckInValue(selectedDate);
    setCheckInOpen(false);
    const processedSelectedDate: ValuePiece = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;
    const formattedDate = moment(processedSelectedDate).format('YYYY.MM.DD');
    setCheckInDate(`${formattedDate}`);
  };

  const handleCheckOutDateChange = (selectedDate: ValuePiece | [ValuePiece, ValuePiece]) => {
    setCheckOutValue(selectedDate);
    setCheckOutOpen(false);
    const processedSelectedDate: ValuePiece = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;
    const formattedDate = moment(processedSelectedDate).format('YYYY.MM.DD');
    setCheckOutDate(`${formattedDate}`);
  };

  return (
    <AdminLayout subMenus="reservation">
      <Container>
        <PageTitle>예약 상세</PageTitle>
        <Table className="horizontal">
          <colgroup>
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>예약 번호</th>
              <td>
                {reservationNumber}(상태: 예약 또는 취소){' '}
                <NormalBtn type="button" className="red mini">
                  예약취소{/** 예약 상태면 예약취소, 취소 상태면 재예약 */}
                </NormalBtn>
              </td>
            </tr>
            <tr>
              <th>예약일</th>
              <td>{reservationDate}</td>
            </tr>
            <tr>
              <th>체크인</th>
              <td>
                <input type="date" />
              </td>
            </tr>
            <tr>
              <th>체크아웃</th>
              <td>
                <input type="date" />
              </td>
            </tr>
            <tr>
              <th>예약 상품</th>
              <td>
                {/** 클릭 시 관리자 해당 상품 상세 페이지로 이동 */}
                <Link to="/admin/item/detail/type/000" className="u">
                  [스페셜 오퍼] 상품명
                </Link>
              </td>
            </tr>
            <tr>
              <th>예약자명</th>
              <td>
                <input type="text" value={customerName} readOnly={updateClick} onChange={handleNameInputChange} />
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>
                <input type="text" value={phoneNumber} readOnly={updateClick} onChange={handlePhoneNumberInputChange} />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input type="email" value={emailAddress} readOnly={updateClick} onChange={handleEmailInputChange} />
              </td>
            </tr>
            <tr>
              <th>요청사항</th>
              <td>
                <input type="text" value={customerRequest} readOnly={updateClick} onChange={handleNoticeInputChange} className="long" />
              </td>
            </tr>
            <tr>
              <th>적용 쿠폰</th>
              <td>
                {reservationData && reservationData.coupon !== null ? (
                  <span>
                    {reservationData.coupon.name}(적용 금액 : {numberWithCommas(reservationData.coupon.discountPrice)})
                  </span>
                ) : (
                  <span>적용된 쿠폰이 없습니다.</span>
                )}
              </td>
            </tr>
            <tr>
              <th>적용 상품권</th>
              <td>
                {reservationData && reservationData.giftCard !== null && reservationData.giftCard.length > 0
                  ? reservationData.giftCard.map((gift, index) => (
                      <span key={index}>
                        {gift.name}(적용 금액 : {numberWithCommas(gift.money)}){index < reservationData.giftCard.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : '적용된 상품권이 없습니다.'}
              </td>
            </tr>
            <tr>
              <th>결제 금액</th>
              <td>{reservationData && numberWithCommas(reservationData.totalPrice)} 원</td>
            </tr>
          </tbody>
        </Table>
        <BtnWrapper className="center double mt40">
          <SubmitBtn type="button">수정</SubmitBtn>
          <NormalBtn type="button" onClick={() => navigate(-1)}>
            목록
          </NormalBtn>
        </BtnWrapper>
      </Container>
      <AdminCheck kind="AUTH_A" />
    </AdminLayout>
  );
};

export default AdminReservationDetail;
