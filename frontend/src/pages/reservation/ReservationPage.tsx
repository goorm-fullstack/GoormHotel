import React, { useState, useEffect, useRef } from 'react';
import * as S from './Style';
import moment from 'moment';
import Item from '../../components/Item/Item';
import { useLocation, useNavigate } from 'react-router-dom';
import Reservation from '../../components/Reservation/Reservation';
import {
  PageTitle,
  ContentsTitleXSmall,
  SubmitBtn,
  BtnWrapper,
  AuthBtn,
  InputCheckbox,
  NormalBtn,
  CheckLabel,
  RequiredTitle,
} from '../../Style/commonStyles';
import PrivacyContents from '../../components/Agreement/PrivacyCon';
import PaymentAgree from '../../components/Agreement/PayAgree';
import { AgreementText } from '../member/Style';
import Instance from '../../utils/api/axiosInstance';
import type { RequestPayParams, RequestPayResponse } from '../../portone';
import { response } from 'express';
import { numberWithCommas } from '../../utils/function/comma';

interface GiftCard {
  id: number;
  uuid: string;
  money: number;
  isZeroMoney: string;
  title: string;
  issueDate: string;
  expire: number;
}

interface Coupon {
  id: number;
  uuid: string;
  discountRate: number;
  name: string;
  isUsed: string;
  issueDate: Array<Number>;
  expire: number;
}

const ReservationPage = () => {
  const [giftCardNumber, setGiftCardNumber] = useState('');
  const [memberData, setMemberData] = useState<any>({
    name: '',
    phoneNumber: '',
    email: '',
  });
  const userLoggedIn = localStorage.getItem('memberId');
  const location = useLocation();
  const { reservationData, selectedProduct, selectData, indexImg } = location.state;
  const navigate = useNavigate();
  const [nights, setNights] = useState(1);
  const [giftcardList, setGiftCardList] = useState<GiftCard[]>([]);
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const [selectCoupon, setSelectCoupon] = useState(0); //적용할 쿠폰
  const [selectGiftCard, setSelectGiftCard] = useState<number[]>([]); //적용할 상품권
  const [giftCardUuid, setGiftCardUuid] = useState<string[]>([]);
  const [click, setClick] = useState(false);
  const [memberId, setMemberId] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [notice, setNotice] = useState('');
  const [isLogined, setIsLogined] = useState(false);
  const [coupon, setCoupon] = useState<Coupon>();
  const [giftCards, setGiftCards] = useState<GiftCard>();

  const [reservationNewData, setReservationNewData] = useState<any>();

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    count: '',
    adult: '',
    children: '',
    stay: '',
    notice: '',
    sumPrice: '',
    discountPrice: '0',
    totalPrice: '',
    memberName: '',
    phoneNumber: '',
    email: '',
    itemId: '',
    memberId: '',
    couponId: selectCoupon,
    giftCardId: [],
    site_key: '2MhMz5FPv6G1cuXcwtxuvX1__',
  });
  const [reservations, setReservations] = useState<any>();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const isLoggined = localStorage.getItem('memberId'); // 로그인 유무 확인

  //member데이터를 불러오는 로직
  useEffect(() => {
    if (userLoggedIn) {
      const params = {
        id: localStorage.getItem('memberId'),
      };
      Instance.get('/member/find', { params }).then((response) => {
        setMemberData(response.data);
        setCouponList(response.data.couponList);
        setMemberId(response.data.id);
      });
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, []);

  const handleChangeData = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCouponNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGiftCardNumber(event.target.value);
  };

  const registerGiftCard = () => {
    Instance.post(`/api/giftcard/register?&uuid=${giftCardNumber}`).then((response) => {
      if (response.status === 200) {
        const registerGiftCard = response.data;
        setGiftCardList((g) => [...g, registerGiftCard]);
        setClick(true);
      }
    });
    setClick(!click);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const couponId = parseInt(event.target.value);
    setSelectCoupon(couponId);
  };

  const formatDateForServer = (date: Date) => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
  };

  useEffect(() => {
    if (selectCoupon && selectCoupon !== 0) {
      Instance.get(`/api/coupon/get/${selectCoupon}`).then((response) => {
        if (response.status === 200) setCoupon(response.data);
      });
    }
  }, [selectCoupon]);

  useEffect(() => {
    if (selectGiftCard && selectGiftCard.length > 0) {
      let requestGiftCardIdListDto = {
        giftCardIdList: selectGiftCard,
      };
      Instance.post('/api/giftcard/get', requestGiftCardIdListDto).then((response) => {
        if (response.status === 200) setGiftCards(response.data);
      });
    }
  }, [selectGiftCard]);

  // 예약 및 결제
  const handleReservation = async () => {
    console.log(giftCardUuid);
    console.log(selectCoupon);
    if (memberData.name === '' && memberData.phoneNumber === '' && memberData.email === '') {
      alert('고객 정보를 입력해주세요.');
      return;
    }

    if (checked1 === false || checked2 === false) {
      alert('약관 동의가 필요합니다.');
      return;
    }

    if (!window.IMP) return;

    const { IMP } = window;
    IMP.init('imp32506271'); // 가맹점 식별코드

    const originalPrice = selectedProduct ? (selectedProduct.price as number) : (selectData.price as number);
    const adultCount = selectedProduct ? (selectedProduct.spareAdult as number) : (selectData.spareAdult as number);
    const childrenCount = selectedProduct ? (selectedProduct.spareChildren as number) : (selectData.spareChildren as number);
    const adultPrice = selectedProduct ? (selectedProduct.priceAdult as number) : (selectData.priceAdult as number);
    const childrenPrice = selectedProduct ? (selectedProduct.priceChildren as number) : (selectData.priceChildren as number);
    let adultPriceResult = 0;
    let childrenPriceResult = 0;
    if (reservationNewData.adults > adultCount) {
      adultPriceResult = (reservationNewData.adults - adultCount) * adultPrice;
    }
    if (reservationNewData.children > childrenCount) {
      childrenPriceResult = (reservationNewData.children - childrenCount) * childrenPrice;
    }

    const sumPrice = originalPrice + adultPriceResult + childrenPriceResult;

    let totalPrice = sumPrice;
    let result = 0;
    if (coupon) {
      const discountRate = coupon.discountRate / 100;
      const discount = Math.round(totalPrice * discountRate);
      result = Math.round(discount / 10) * 10;
      totalPrice -= result;
    }
    let giftCardDiscount = 0;
    for (var i = 0; i < giftcardList.length; i++) {
      giftCardDiscount += giftcardList[i].money;
      totalPrice -= giftcardList[i].money;
    }

    const discountPrice = result + giftCardDiscount;

    const reservations = {
      checkIn: formatDateForServer(reservationNewData?.checkInDate),
      checkOut: formatDateForServer(reservationNewData?.checkOutDate),
      count: reservationNewData?.count,
      adult: reservationNewData?.adults,
      children: reservationNewData?.children,
      stay: reservationNewData?.nights,
      notice: notice,
      sumPrice: sumPrice,
      discountPrice: discountPrice,
      totalPrice: totalPrice,
      itemId: selectedProduct ? selectedProduct.id : selectData.id,
      memberId: memberData && memberData.memberId,
      couponId: selectCoupon,
      giftCardId: '',
      memberName: memberData ? memberData.name : '',
      phoneNumber: memberData ? memberData.phoneNumber : '',
      email: memberData ? memberData.email : '',
      site_key: '2MhMz5FPv6G1cuXcwtxuvX1__',
    };

    // 결제 데이터
    const paydata: RequestPayParams = {
      pg: 'kcp.AO09C', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 테스트용 결제금액 고정
      name: '구름호텔 상품 예약 및 결제 테스트', // 주문명
      buyer_name: memberData.memberName, // 구매자 이름
      buyer_tel: memberData.phoneNumber, // 구매자 전화번호
      buyer_email: memberData.email, // 구매자 이메일
    };

    IMP.request_pay(paydata, async function callback(response: RequestPayResponse) {
      const { success, error_msg } = response;

      if (success) {
        console.log('결제 성공');
        try {
          console.log(giftCardUuid);
          console.log(selectCoupon);
          Instance.post(`/reservation/save`, {
            checkIn: formatDateForServer(reservationNewData?.checkInDate),
            checkOut: formatDateForServer(reservationNewData?.checkOutDate),
            count: reservationNewData?.count,
            adult: reservationNewData?.adults,
            children: reservationNewData?.children,
            stay: reservationNewData?.nights,
            notice: notice,
            sumPrice: sumPrice,
            discountPrice: discountPrice,
            totalPrice: totalPrice,
            itemId: selectedProduct ? selectedProduct.id : selectData.id,
            memberId: memberData && memberData.memberId,
            couponId: selectCoupon !== 0 ? selectCoupon : null,
            giftCardId: giftCardUuid,
            memberName: memberData ? memberData.name : '',
            phoneNumber: memberData ? memberData.phoneNumber : '',
            email: memberData ? memberData.email : '',
          }).then((response) => {
            window.location.href = `/reservation/${response.data}`;
          });
        } catch (error) {
          console.error('예약 요청 실패', error);
        }
      } else {
        console.log(`결제 실패: ${error_msg}`);
      }
    });
  };

  useEffect(() => {
    setReservations(formData);
  }, [formData, reservations]);

  const updateReservationData = (newData: any) => {
    setReservationNewData(newData);
  };

  const handleSelectGiftCardAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      const allGiftCardIds = giftcardList?.map((item) => item.id);
      setSelectGiftCard(allGiftCardIds);
      const allGiftCardUuids = giftcardList?.map((item) => item.uuid);
      setGiftCardUuid(allGiftCardUuids);
    } else {
      setSelectGiftCard([]);
    }
  };

  const handleGiftCardCheckboxChange = (giftcard: any) => {
    setSelectGiftCard((prevItems) => {
      if (prevItems.includes(giftcard.id)) {
        return prevItems.filter((item) => item !== giftcard.id);
      } else {
        return [...prevItems, giftcard.id];
      }
    });
    setGiftCardUuid((prevItems) => {
      if (prevItems.includes(giftcard.uuid)) {
        return prevItems.filter((item) => item !== giftcard.uuid);
      } else {
        return [...prevItems, giftcard.uuid];
      }
    });
  };

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMemberData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckBoxForAgree1 = () => {
    setChecked1(!checked1);
  };

  const handleCheckBoxForAgree2 = () => {
    setChecked2(!checked2);
  };

  console.log(selectCoupon);

  return (
    <div>
      <S.Container>
        <PageTitle>상품 예약</PageTitle>
        <S.Wrapper>
          <S.Left>
            <S.Section>
              <ContentsTitleXSmall>상품 상세 설정</ContentsTitleXSmall>
              <S.OptionWrap>
                <Reservation
                  updateReservationData={updateReservationData}
                  selectedProduct={selectedProduct !== undefined ? selectedProduct : selectData}
                />
              </S.OptionWrap>
            </S.Section>

            <S.Section className="privacy">
              <ContentsTitleXSmall>고객 정보 입력</ContentsTitleXSmall>
              <div className="flex">
                <input
                  name="name"
                  type="text"
                  onChange={handleChangeUserInfo}
                  defaultValue={memberData ? memberData.name : ''}
                  placeholder="고객명 (필수)"
                  required
                />
                <input
                  name="phoneNumber"
                  placeholder="연락처 (필수)"
                  type="text"
                  onChange={handleChangeUserInfo}
                  defaultValue={memberData ? memberData.phoneNumber : ''}
                  required
                />
                <input
                  name="email"
                  placeholder="이메일 (필수)"
                  type="text"
                  onChange={handleChangeUserInfo}
                  defaultValue={memberData ? memberData.email : ''}
                  required
                />
              </div>
              <div className="full">
                <input name="notice" placeholder="요청사항" type="text" value={notice} onChange={(e) => setNotice(e.target.value)} />
              </div>
            </S.Section>

            <S.Section>
              <ContentsTitleXSmall>상품권 사용</ContentsTitleXSmall>
              <S.CouponForm>
                <input type="text" placeholder="상품권 번호 입력" value={giftCardNumber} onChange={handleCouponNumber} />
                <AuthBtn onClick={registerGiftCard}>상품권 등록하기</AuthBtn>
              </S.CouponForm>
              <S.CouponInfo>
                <BtnWrapper className="flexspace">
                  <div>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" onChange={handleSelectGiftCardAllChange} /> 전체 선택
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
                  <tbody>
                    {/* 상품권 목록 출력하는 곳*/}
                    {giftcardList.length !== 0 ? (
                      <>
                        {giftcardList.map((giftcard, index) => (
                          <tr key={index}>
                            <td>
                              <CheckLabel>
                                <InputCheckbox
                                  type="checkbox"
                                  checked={selectGiftCard.includes(giftcard.id)}
                                  onChange={() => handleGiftCardCheckboxChange(giftcard)}
                                />
                                {giftcard.title}
                              </CheckLabel>
                            </td>
                            <td className="right">{numberWithCommas(giftcard.money)}원</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td className="center empty">등록된 상품권이 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </S.CouponInfo>
            </S.Section>

            <S.Section>
              <ContentsTitleXSmall>쿠폰 사용</ContentsTitleXSmall>
              <S.CouponSelect onChange={handleChange} disabled={!userLoggedIn} value={selectCoupon}>
                {userLoggedIn !== null ? (
                  <>
                    <option value={0}>선택 안함</option>
                    {couponList.map((coupon: Coupon, index) => (
                      <option value={coupon.id} key={coupon.id}>
                        {coupon.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option>로그인이 필요한 서비스입니다.</option>
                )}
              </S.CouponSelect>
            </S.Section>

            <S.Section className="agreewrapper">
              <ContentsTitleXSmall>약관 동의</ContentsTitleXSmall>
              <div>
                <RequiredTitle>
                  <h4>
                    개인정보처리방침 동의 <span>(필수)</span>
                  </h4>
                  <CheckLabel htmlFor="privacycheck">
                    <InputCheckbox type="checkbox" id="privacycheck" onChange={handleCheckBoxForAgree1} required />
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
                  <CheckLabel htmlFor="canclecheck">
                    <InputCheckbox type="checkbox" id="canclecheck" onChange={handleCheckBoxForAgree2} required />
                    동의합니다
                  </CheckLabel>
                </RequiredTitle>
                <AgreementText className="forreserv">
                  <PaymentAgree />
                </AgreementText>
              </div>
            </S.Section>
          </S.Left>

          <S.Right>
            <ContentsTitleXSmall>상품 개요</ContentsTitleXSmall>
            {indexImg ? (
              <Item
                selectedProduct={selectedProduct ? selectedProduct : selectData}
                indexImg={indexImg}
                updateReservationData={reservationNewData !== undefined ? reservationNewData : reservationData !== undefined ? reservationData : ''}
                selectCoupon={selectCoupon}
                selectGiftCardList={selectGiftCard}
              />
            ) : (
              <Item
                selectedProduct={selectedProduct ? selectedProduct : selectData}
                updateReservationData={reservationNewData !== undefined ? reservationNewData : reservationData !== undefined ? reservationData : ''}
                selectCoupon={selectCoupon}
                selectGiftCardList={selectGiftCard}
              />
            )}
            <BtnWrapper className="full mt20">
              <SubmitBtn type="submit" className="shadow" onClick={handleReservation}>
                예약 및 결제하기
              </SubmitBtn>
            </BtnWrapper>
            <p className="notice">⁕ 테스트 결제금액은 1,000원으로 고정되어 있으며 실제로 출금되지 않습니다.</p>
          </S.Right>
        </S.Wrapper>
      </S.Container>
    </div>
  );
};

export default ReservationPage;
