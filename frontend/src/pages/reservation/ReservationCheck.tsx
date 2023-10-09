import React, { useState } from 'react';
import * as S from './Style';
import Reservation from '../../components/Reservation/Reservation';
import Product from '../../components/Item/Item';
import { PageTitle, ContentsTitleXSmall } from '../../Style/commonStyles';

const ReservationCheck = () => {
  const [coupons, setCoupons] = useState([
    {
      name: '추석 맞이 특가 이벤트: 객실 금액 100,000원 할인 상품권',
      price: '-100,000 원',
    },
    {
      name: '추석 맞이 특가 이벤트: 전 상품 금액 50,000원 할인 상품권',
      price: '-50,000 원',
    },
  ]);
  return (
    <>
      <S.Container>
        <PageTitle>예약 확인</PageTitle>
        <S.Wrapper>
          <S.Left>
            <S.Section>
              <ContentsTitleXSmall>상품 상세</ContentsTitleXSmall>
              <S.RevNumber>
                [예약번호] <strong>2023092312315646</strong>
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
                  <td>홍길동</td>
                  <th>연락처</th>
                  <td>010-1234-1234</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td colSpan={3}>goorm@goorm.com</td>
                </tr>
                <tr>
                  <th>요청사항</th>
                  <td colSpan={3}>내용</td>
                </tr>
              </table>
            </S.Section>

            <S.Section>
              <ContentsTitleXSmall>사용한 상품권</ContentsTitleXSmall>
              <S.CouponInfo className="used">
                <table>
                  {coupons.map((coupon, index) => (
                    <tr key={index}>
                      <td>{coupon.name}</td>
                      <td className="right">{coupon.price}</td>
                    </tr>
                  ))}
                </table>
              </S.CouponInfo>
            </S.Section>

            <S.Section>
              <ContentsTitleXSmall>사용한 쿠폰</ContentsTitleXSmall>
              <S.CouponInfo className="used">
                <table>
                  {coupons.map((coupon, index) => (
                    <tr key={index}>
                      <td>{coupon.name}</td>
                      <td className="right">{coupon.price}</td>
                    </tr>
                  ))}
                  <tr>
                    {/* 사용한 쿠폰이 없는 경우 */}
                    <td colSpan={2}>사용한 쿠폰이 없습니다.</td>
                  </tr>
                </table>
              </S.CouponInfo>
            </S.Section>
          </S.Left>

          <S.Right>
            <ContentsTitleXSmall>상품 개요</ContentsTitleXSmall>
            <Product />
            <S.Payment>
              <tr>
                <th>결제수단</th>
                <td>신용카드</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>2023.09.23</td>
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
