import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import moment from 'moment';
import Item from '../../components/Item';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Reservation from '../../components/Reservation';
import {
  commonContainerStyle,
  PageTitle,
  ContentsTitleXSmall,
  SubmitBtn,
  BtnWrapper,
  AuthBtn,
  InputCheckbox,
  NormalBtn,
  CheckLabel,
  RequiredTitle,
} from '../../components/common/commonStyles';
import PrivacyContents from '../../components/PrivacyCon';
import PaymentAgree from '../../components/PayAgree';
import { AgreementText } from '../member/Signup';

const Container = styled(commonContainerStyle)``;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Left = styled.div`
  width: 75%;
  padding-right: 40px;
`;

export const Right = styled.div`
  width: 25%;
`;

export const Section = styled.div`
  margin-bottom: 50px;

  &.privacy {
    input {
      height: 50px;
      padding-left: 18px;
    }
    .flex {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      input {
        width: calc((100% - 32px) / 3);
      }
    }
    .full input {
      width: 100%;
    }
  }

  &.agreewrapper > div {
    margin-bottom: 30px;
  }
`;

export const CouponForm = styled.div`
  margin-bottom: 20px;

  form {
    display: flex;
    height: 50px;
    justify-content: space-between;

    input {
      width: calc(100% - 210px);
      padding-left: 18px;
    }
  }
`;

export const CouponInfo = styled.div`
  table {
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    margin-top: 16px;
  }

  td {
    border-bottom: 1px solid ${(props) => props.theme.colors.graylightborder};
    vertical-align: middle;
    padding: 13px 0;
    font-size: ${(props) => props.theme.font.sizes};
    color: ${(props) => props.theme.colors.blacklight};

    &.right {
      text-align: right;
      color: ${(props) => props.theme.colors.charcoal};
      font-weight: 500;
      width: 20%;
    }

    label {
      color: ${(props) => props.theme.colors.blacklight};
      font-size: ${(props) => props.theme.font.sizes};
    }
  }
`;

const CouponSelect = styled.select`
  width: 100%;
  height: 50px;
  font-size: ${(props) => props.theme.font.sizes};
  background-position: 98% center;
`;

export const OptionWrap = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  padding: 45px 45px 46px;
  display: flex;
  justify-content: center;

  .reservedate::after {
    margin: 0 47px 0 53px;
  }

  .stay {
    margin-left: 28px;
    margin-right: 28px;
  }

  .option {
    gap: 30px;
  }
`;

const ReservationPage = () => {
  const [giftCardNumber, setGiftCardNumber] = useState('');
  const [memberData, setMemberData] = useState(null);

  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  const userLoggedIn = false;
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation();
  const { reservationData, selectedProduct } = location.state;
  const navigate = useNavigate();
  const [nights, setNights] = useState(1);

  console.log(reservationData);
  console.log(selectedProduct);

  const [formData, setFormData] = useState({
    checkIn: reservationData?.checkInDate || '',
    checkOut: reservationData?.checkOutDate || '',
    count: reservationData?.rooms || 1,
    adult: reservationData?.adults || 1,
    children: reservationData?.children || 0,
    stay: reservationData?.nights,
    name: '',
    phone: '',
    email: '',
    notice: '',
    sumPrice: selectedProduct.price,
    discountPrice: '0',
    totalPrice: '12345',
  });

  // const reservationData = {
  //   checkInDate,
  //   checkOutDate,
  //   rooms,
  //   adults,
  //   children,
  //   nights,
  // };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      stay: nights,
    }));
  }, [nights, reservationData]);

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

  const handleChangeData = (field, e) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCouponNumber = (event) => {
    setGiftCardNumber(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected option:', event.target.value);
  };

  const handleRemoveCoupon = (index) => {
    // 해당 인덱스의 쿠폰을 삭제합니다.
    const updatedCoupons = coupons.filter((_, i) => i !== index);
    setCoupons(updatedCoupons);
  };

  //member데이터를 불러오는 로직
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/member');
        setMemberData(response.data);
      } catch (error) {
        console.error('사용자 데이터를 불러오지 못했습니다.', error);
      }
    };

    fetchMember();
  }, []);

  const formatDateForServer = (date) => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
  };

  //예약을 저장하는 함수
  const handleReservation = async () => {
    const confirmed = window.confirm('예약을 진행하시겠습니까?');

    const serverFormattedData = {
      ...formData,
      checkIn: formatDateForServer(formData.checkIn),
      checkOut: formatDateForServer(formData.checkOut),
    };

    if (confirmed) {
      try {
        await axios.post(`http://127.0.0.1:8080/reservation/save?memberId=1`, serverFormattedData);

        navigate('/');
        window.alert('예약이 완료되었습니다');
      } catch (error) {
        console.error('예약 요청 실패', error);
      }
    }
  };

  const updateReservationData = (newData) => {
    setFormData(newData);
  };

  return (
    <div>
      <Container>
        <PageTitle>상품 예약</PageTitle>
        <Wrapper>
          <Left>
            <Section>
              <ContentsTitleXSmall>상품 상세 설정</ContentsTitleXSmall>
              <OptionWrap>
                <Reservation updateReservationData={updateReservationData} />
              </OptionWrap>
            </Section>

            <Section className="privacy">
              <ContentsTitleXSmall>고객 정보 입력</ContentsTitleXSmall>
              <div className="flex">
                <input placeholder="고객명" type="text" value={formData.name} onChange={(e) => handleChangeData('name', e)} required />
                <input placeholder="연락처" type="text" value={formData.phone} onChange={(e) => handleChangeData('phone', e)} required />
                <input placeholder="이메일" type="text" value={formData.email} onChange={(e) => handleChangeData('email', e)} required />
              </div>
              <div className="full">
                <input placeholder="요청사항" type="text" value={formData.notice} onChange={(e) => handleChangeData('notice', e)} />
              </div>
            </Section>

            <Section>
              <ContentsTitleXSmall>상품권 사용</ContentsTitleXSmall>
              <CouponForm>
                <form>
                  <input type="text" placeholder="상품권 번호 입력" value={giftCardNumber} onChange={handleCouponNumber} />
                  <AuthBtn type="submit">상품권 등록하기</AuthBtn>
                </form>
              </CouponForm>
              <CouponInfo>
                <BtnWrapper className="flexspace">
                  <div>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" /> 전체 선택
                    </CheckLabel>
                  </div>
                  <BtnWrapper className="flexgap">
                    <NormalBtn type="button" className="mini">
                      선택 삭제
                    </NormalBtn>
                    <NormalBtn type="button" className="mini">
                      전체 삭제
                    </NormalBtn>
                  </BtnWrapper>
                </BtnWrapper>
                <table>
                  {coupons.map((coupon, index) => (
                    <tr key={index}>
                      <td>
                        <CheckLabel>
                          <InputCheckbox type="checkbox" />
                          {coupon.name}
                        </CheckLabel>
                      </td>
                      <td className="right">{coupon.price}</td>
                    </tr>
                  ))}
                </table>
              </CouponInfo>
            </Section>

            <Section>
              <ContentsTitleXSmall>쿠폰 사용</ContentsTitleXSmall>
              <CouponSelect value={selectedOption} onChange={handleChange} disabled={!userLoggedIn}>
                {userLoggedIn ? (
                  <>
                    <option value="">선택 안함</option>
                    <option value="coupon1"> [Bronze 등급 혜택] 객실 5% 할인 쿠폰(-100,000원 적용)</option>
                    <option value="coupon2"> [Bronze 등급 혜택] 객실 10% 할인 쿠폰(-150,000원 적용)</option>
                  </>
                ) : (
                  <option disabled value="">
                    로그인이 필요한 서비스입니다.
                  </option>
                )}
              </CouponSelect>
            </Section>

            <Section className="agreewrapper">
              <ContentsTitleXSmall>약관 동의</ContentsTitleXSmall>
              <div>
                <RequiredTitle>
                  <h4>
                    개인정보처리방침 동의 <span>(필수)</span>
                  </h4>
                  <CheckLabel for="privacycheck">
                    <InputCheckbox type="checkbox" id="privacycheck" required />
                    동의합니다
                  </CheckLabel>
                </RequiredTitle>
                <AgreementText className="forreserv">
                  <PrivacyContents />
                </AgreementText>
              </div>
              <div>
                <RequiredTitle>
                  <h4>
                    취소 환불 수수료에 관한 동의 <span>(필수)</span>
                  </h4>
                  <CheckLabel for="privacycheck">
                    <InputCheckbox type="checkbox" id="privacycheck" required />
                    동의합니다
                  </CheckLabel>
                </RequiredTitle>
                <AgreementText className="forreserv">
                  <PaymentAgree />
                </AgreementText>
              </div>
            </Section>
          </Left>

          <Right>
            <ContentsTitleXSmall>상품 개요</ContentsTitleXSmall>
            <Item selectedProduct={selectedProduct} />
            <BtnWrapper className="full mt20">
              <SubmitBtn type="submit" className="shadow" onClick={handleReservation}>
                예약 및 결제하기
              </SubmitBtn>
            </BtnWrapper>
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default ReservationPage;
