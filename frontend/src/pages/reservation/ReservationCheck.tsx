import React, { useEffect, useState } from 'react';
import * as S from './Style';
import Reservation from '../../components/Reservation/Reservation';
import Product from '../../components/Item/Item';
import { PageTitle, ContentsTitleXSmall } from '../../Style/commonStyles';
import { useParams } from 'react-router';
import Instance from '../../utils/api/axiosInstance';

const ReservationCheck = () => {
  const number = useParams().toString();
  const [reservationData, setReservationData] = useState<any>();
  const [imgUrl, setImgUrl] = useState('');

  // 예약 정보 가져오기
  useEffect(() => {
    const fetchReservationData = async () => {
      const reservation = (await Instance.get(`/reservation/detail/${number}`)).data;
      setReservationData(reservation);
    };
    fetchReservationData();
  }, []);

  // 예약 정보에 담긴 상품 이미지 가져오기
  useEffect(() => {
    const fetchImg = async () => {
      if (reservationData.roomItem !== null) {
        const img = await Instance.get(`/image/${reservationData.roomItem.name}`, {
          responseType: 'arraybuffer',
        });
        const blob = new Blob([img.data], { type: img.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        setImgUrl(imageUrl);
      }
    };
    fetchImg();
  }, [reservationData]);

  return (
    <>
      <S.Container>
        <PageTitle>예약 확인</PageTitle>
        <S.Wrapper>
          <S.Left>
            <S.Section>
              <ContentsTitleXSmall>상품 상세</ContentsTitleXSmall>
              <S.RevNumber>
                [예약번호] <strong>{number}</strong>
              </S.RevNumber>
              <S.OptionWrap className="checkoption">
                <Reservation />
              </S.OptionWrap>
            </S.Section>

            <S.Section className="userinfo">
              <ContentsTitleXSmall>고객 정보</ContentsTitleXSmall>
              <table>
                <tr>
                  <th>고객명</th>
                  <td>{reservationData.member.name}</td>
                  <th>연락처</th>
                  <td>{reservationData.member.phoneNumber}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td colSpan={3}>{reservationData.member.email}</td>
                </tr>
                <tr>
                  <th>요청사항</th>
                  <td colSpan={3}>{reservationData.notice}</td>
                </tr>
              </table>
            </S.Section>

            <S.Section>
              <ContentsTitleXSmall>사용한 상품권</ContentsTitleXSmall>
              <S.CouponInfo className="used">
                <table>
                  {reservationData.giftCard.length === 0 && (
                    <tr>
                      <td colSpan={2}>사용한 상품권이 없습니다.</td>
                    </tr>
                  )}
                  {reservationData.giftCard &&
                    reservationData.giftCard.map((giftCard: any, index: number) => (
                      <tr key={index}>
                        <td>{giftCard.title}</td>
                        {/* <td className="right">{giftCard.price}</td> */} {/* 상품권 가격 표시 필요 */}
                      </tr>
                    ))}
                </table>
              </S.CouponInfo>
            </S.Section>

            <S.Section>
              <ContentsTitleXSmall>사용한 쿠폰</ContentsTitleXSmall>
              <S.CouponInfo className="used">
                <table>
                  {reservationData.coupon !== null ? (
                    <tr>
                      <td>{reservationData.coupon.name}</td>
                      {/* <td className="right">{reservationData.coupon.price}</td> */} {/* 쿠폰 가격 표시 필요 */}
                    </tr>
                  ) : (
                    <tr>
                      {/* 사용한 쿠폰이 없는 경우 */}
                      <td colSpan={2}>사용한 쿠폰이 없습니다.</td>
                    </tr>
                  )}
                </table>
              </S.CouponInfo>
            </S.Section>
          </S.Left>

          <S.Right>
            <ContentsTitleXSmall>상품 개요</ContentsTitleXSmall>
            <Product selectedProduct={reservationData.roomItem !== null ? reservationData.roomItem : reservationData.diningItem} indexImg={imgUrl} />
            <S.Payment>
              <tr>
                <th>결제수단</th>
                <td>신용카드</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>{`${reservationData.orderDate[0]}-${reservationData.orderDate[1] < 10 ? '0' : ''}${reservationData.orderDate[1]}-${
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
            </S.Payment>
          </S.Right>
        </S.Wrapper>
      </S.Container>
    </>
  );
};

export default ReservationCheck;
