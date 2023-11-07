import React, { useEffect, useState } from 'react';
import * as S from './Style';
import Reservation from '../../components/Reservation/Reservation';
import Product from '../../components/Item/Item';
import { PageTitle, ContentsTitleXSmall } from '../../Style/commonStyles';
import { useLocation, useParams } from 'react-router';
import Instance from '../../utils/api/axiosInstance';
import moment from 'moment';
import { numberWithCommas } from '../../utils/function/comma';

const ReservationCheck = () => {
  const number = useParams().number;
  const [reservationData, setReservationData] = useState<any>();
  const [giftcardList, setGiftCardList] = useState([]);
  const [updateData, setUpdateData] = useState<any>();
  const [roomItem, setRoomItem] = useState<any>();
  const [diningItem, setDiningItem] = useState<any>();
  const [imgUrl, setImgUrl] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [reservationNewData, setReservationNewData] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0); //쿠폰 할인 금액
  // 예약 정보 가져오기
  useEffect(() => {
    const fetchReservationData = () => {
      Instance.get(`/reservation/detail/${number}`).then((response) => {
        console.log(response.data);
        setReservationData(response.data);
        setRoomItem(response.data.roomItem);
        setDiningItem(response.data.diningItem);
        setTotalPrice(response.data.sumPrice);
        setGiftCardList(response.data.giftCard);
      });
    };
    fetchReservationData();
  }, [number, checkInDate, checkOutDate]);

  // 예약 정보에 담긴 상품 이미지 가져오기
  useEffect(() => {
    const fetchImg = async () => {
      if (reservationData) {
        if (reservationData.roomItem !== null) {
          const img = await Instance.get(`/image/${roomItem.name}`, {
            responseType: 'arraybuffer',
          });
          const blob = new Blob([img.data], { type: img.headers['content-type'] });
          const imageUrl = URL.createObjectURL(blob);
          setImgUrl(imageUrl);
        } else {
          const img = await Instance.get(`/image/${diningItem.name}`, {
            responseType: 'arraybuffer',
          });
          const blob = new Blob([img.data], { type: img.headers['content-type'] });
          const imageUrl = URL.createObjectURL(blob);
          setImgUrl(imageUrl);
        }
      }
    };
    fetchImg();
    if (reservationData) {
      const checkInDate = moment(reservationData.checkIn, 'YYYY, MM, DD, HH, mm, ss, SSS');
      const formattedCheckInDate = checkInDate.format('YYYY/MM/DD (ddd)');

      const checkOutDate = moment(reservationData.checkOut, 'YYYY, MM, DD, HH, mm, ss, SSS');
      const formattedCheckOutDate = checkOutDate.format('YYYY/MM/DD (ddd)');

      setCheckInDate(formattedCheckInDate);
      setCheckOutDate(formattedCheckOutDate);
      setUpdateData({
        adults: reservationData.adult,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        children: reservationData.children,
        count: reservationData.count,
        nights: reservationData.stay,
      });
      if (reservationData.coupon) calcDiscountPrice(reservationData.coupon.discountRate);
    }
  }, [reservationData, roomItem, diningItem]);

  const updateReservationData = (newData: any) => {
    setReservationNewData(newData);
  };

  const calcDiscountPrice = (discountRate: number) => {
    const price = reservationData.sumPrice;
    const rate = discountRate / 100;
    const discount = Math.round(price * rate);
    const result = Math.round(discount / 10) * 10;
    setDiscountPrice(result);
    setTotalPrice(result);
  };

  const calcGiftCardPrice = (money: number) => {
    if (totalPrice >= money) {
      return money;
    } else {
      const result = totalPrice;
      return result;
    }
  };

  return (
    <>
      <S.Container>
        <PageTitle>예약 확인</PageTitle>
        {reservationData && updateData && (
          <S.Wrapper>
            <S.Left>
              <S.Section>
                <ContentsTitleXSmall>상품 상세</ContentsTitleXSmall>
                <S.RevNumber>
                  [예약번호] <strong>{number}</strong>
                </S.RevNumber>
                <S.OptionWrap className="checkoption">
                  <Reservation selectedProduct={roomItem !== null ? roomItem : diningItem} reservation={updateData} />
                </S.OptionWrap>
              </S.Section>
              <S.Section className="userinfo">
                <ContentsTitleXSmall>고객 정보</ContentsTitleXSmall>
                <table>
                  <tbody>
                    <tr>
                      {reservationData.member !== null ? (
                        <>
                          <th>고객명</th>
                          <td>{reservationData.member.name}</td>
                          <th>연락처</th>
                          <td>{reservationData.member.phoneNumber}</td>
                        </>
                      ) : (
                        <>
                          <th>고객명</th>
                          <td>{reservationData.nonMember.name}</td>
                          <th>연락처</th>
                          <td>{reservationData.nonMember.phoneNumber}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      {reservationData.member ? (
                        <>
                          <th>이메일</th>
                          <td colSpan={3}>{reservationData.member.email}</td>
                        </>
                      ) : (
                        <>
                          <th>이메일</th>
                          <td colSpan={3}>{reservationData.nonMember.email}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <th>요청사항</th>
                      <td colSpan={3}>{reservationData.notice}</td>
                    </tr>
                  </tbody>
                </table>
              </S.Section>

              <S.Section>
                <ContentsTitleXSmall>사용한 상품권</ContentsTitleXSmall>
                <S.CouponInfo className="used">
                  <table>
                    <tbody>
                      {giftcardList.length !== 0 ? (
                        <>
                          {reservationData.giftCard.map((giftCard: any, index: number) => (
                            <tr key={index}>
                              <td>{giftCard.title}</td>
                              <td className="right">-{numberWithCommas(calcGiftCardPrice(giftCard.money))}원</td> {/* 상품권 가격 표시 필요 */}
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
                          <tr>
                            <td colSpan={2}>사용한 상품권이 없습니다.</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </S.CouponInfo>
              </S.Section>
              <S.Section>
                <ContentsTitleXSmall>사용한 쿠폰</ContentsTitleXSmall>
                <S.CouponInfo className="used">
                  <table>
                    <tbody>
                      {reservationData.coupon !== null ? (
                        <tr>
                          <td>{reservationData.coupon.name}</td>
                          <td className="right">-{numberWithCommas(discountPrice)}원</td> {/* 쿠폰 가격 표시 필요 */}
                        </tr>
                      ) : (
                        <tr>
                          {/* 사용한 쿠폰이 없는 경우 */}
                          <td colSpan={2}>사용한 쿠폰이 없습니다.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </S.CouponInfo>
              </S.Section>
            </S.Left>
            <S.Right>
              <ContentsTitleXSmall>상품 개요</ContentsTitleXSmall>
              <Product
                selectedProduct={reservationData && reservationData.roomItem !== null ? reservationData.roomItem : reservationData.diningItem}
                indexImg={imgUrl}
                updateReservationData={updateData}
              />
              <S.Payment>
                <tbody>
                  <tr>
                    <th>결제수단</th>
                    <td>신용카드</td>
                  </tr>
                  <tr>
                    <th>결제일</th>
                    <td>{`${reservationData.orderDate[0]}/${reservationData.orderDate[1] < 10 ? '0' : ''}${reservationData.orderDate[1]}/${
                      reservationData.orderDate[2] < 10 ? '0' : ''
                    }${reservationData.orderDate[2]}`}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="notice">
                      ⁕ 결제된 금액은 포트원 정책에 따라 매일 자동 취소됩니다. 자세한 내용은{' '}
                      <a href="https://developers.portone.io/docs/ko/readme/get-started" target="_blank">
                        포트원 개발자센터 홈페이지
                      </a>
                      를 확인해주세요.
                    </td>
                  </tr>
                </tbody>
              </S.Payment>
            </S.Right>
          </S.Wrapper>
        )}
      </S.Container>
    </>
  );
};

export default ReservationCheck;
