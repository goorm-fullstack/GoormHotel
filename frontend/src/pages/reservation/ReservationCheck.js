import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Reservation from '../../components/Reservation/Reservation';
import Product from '../../components/Item/Item';
import { commonContainerStyle, PageTitle, ContentsTitleXSmall } from '../../Style/commonStyles';
import { Wrapper, Left, Right, Section, OptionWrap, CouponInfo } from './ReservationPage';

const Container = styled(commonContainerStyle)`
  .used td {
    padding: 17px 0;
  }

  .userinfo {
    table {
      width: 100%;
      border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    }
    th,
    td {
      border-bottom: 1px solid ${(props) => props.theme.colors.graylightborder};
      text-align: left;
      padding: 16.5px 20px;
      font-size: ${(props) => props.theme.font.sizes};
    }
    th {
      width: 120px;
      background: ${(props) => props.theme.colors.graybg};
      color: ${(props) => props.theme.colors.charcoal};
    }
    td {
      width: 302.5px;
      color: ${(props) => props.theme.colors.blacklight};
    }
  }

  .checkoption {
    svg {
      display: none;
    }
  }
`;

const Payment = styled.table`
  margin-top: 20px;
  width: 100%;
  line-height: 1.6;

  th,
  td {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.blacklight};
  }

  th {
    text-align: left;
  }
  td {
    text-align: right;

    &.notice {
      color: ${(props) => props.theme.colors.graylight};
      padding-top: 16px;
      text-align: left;
      line-height: 1.4;

      a {
        text-decoration: underline;
      }
    }
  }
`;

const RevNumber = styled.p`
  background: ${(props) => props.theme.colors.graybg};
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.charcoal};
  font-size: ${(props) => props.theme.font.sizes};
  font-weight: 500;

  strong {
    font-size: ${(props) => props.theme.font.default};
    color: ${(props) => props.theme.colors.goldhover};
    margin-left: 6px;
  }
`;

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
      <Container>
        <PageTitle>예약 확인</PageTitle>
        <Wrapper>
          <Left>
            <Section>
              <ContentsTitleXSmall>상품 상세</ContentsTitleXSmall>
              <RevNumber>
                [예약번호] <strong>2023092312315646</strong>
              </RevNumber>
              <OptionWrap className="checkoption">
                <Reservation />
              </OptionWrap>
            </Section>

            <Section className="userinfo">
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
                  <td colSpan="3">goorm@goorm.com</td>
                </tr>
                <tr>
                  <th>요청사항</th>
                  <td colSpan="3">내용</td>
                </tr>
              </table>
            </Section>

            <Section>
              <ContentsTitleXSmall>사용한 상품권</ContentsTitleXSmall>
              <CouponInfo className="used">
                <table>
                  {coupons.map((coupon, index) => (
                    <tr key={index}>
                      <td>{coupon.name}</td>
                      <td className="right">{coupon.price}</td>
                    </tr>
                  ))}
                </table>
              </CouponInfo>
            </Section>

            <Section>
              <ContentsTitleXSmall>사용한 쿠폰</ContentsTitleXSmall>
              <CouponInfo className="used">
                <table>
                  {coupons.map((coupon, index) => (
                    <tr key={index}>
                      <td>{coupon.name}</td>
                      <td className="right">{coupon.price}</td>
                    </tr>
                  ))}
                  <tr>
                    {/* 사용한 쿠폰이 없는 경우 */}
                    <td colSpan="2">사용한 쿠폰이 없습니다.</td>
                  </tr>
                </table>
              </CouponInfo>
            </Section>
          </Left>

          <Right>
            <ContentsTitleXSmall>상품 개요</ContentsTitleXSmall>
            <Product />
            <Payment>
              <tr>
                <th>결제수단</th>
                <td>신용카드</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>2023.09.23</td>
              </tr>
              <tr>
                <td colSpan="2" className="notice">
                  ⁕ 결제된 금액은 포트원 정책에 따라 매일 자동 취소됩니다. 자세한 내용은{' '}
                  <a href="https://developers.portone.io/docs/ko/readme/get-started" target="_blank">
                    포트원 개발자센터 홈페이지
                  </a>
                  를 확인해주세요.
                </td>
              </tr>
            </Payment>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default ReservationCheck;
