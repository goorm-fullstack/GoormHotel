import React, { useState, useEffect } from 'react';
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
  const [memberData, setMemberData] = useState();
  const userLoggedIn = localStorage.getItem("memberId");
  const location = useLocation();
  const { reservationData, selectedProduct, selectData, indexImg } = location.state;
  const navigate = useNavigate();
  const [nights, setNights] = useState(1);
  const [giftcardList, setGiftCardList] = useState<GiftCard[]>([]);
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const [selectCoupon, setSelectCoupon] = useState('');//적용할 쿠폰
  const [selectGiftCard, setSelectGiftCard] = useState<number[]>([]);//적용할 상품권
  const [click, setClick] = useState(false);
  const [memberId, setMemberId] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notice, setNotice] = useState('');
  const [isLogined, setIsLogined] = useState(false); 

  const [formData, setFormData] = useState({
    checkIn: reservationData?.checkInDate || '',
    checkOut: reservationData?.checkOutDate || '',
    count: reservationData?.rooms || 1,
    adult: reservationData?.adults || 1,
    children: reservationData?.children || 0,
    stay: reservationData?.nights,
    notice: notice,
    sumPrice: selectedProduct ? selectedProduct.price : selectData.price,
    discountPrice: '0',
    totalPrice: '12345',
  });

  const isLoggined = localStorage.getItem('memberId'); // 로그인 유무 확인

  //member데이터를 불러오는 로직
  useEffect(() => {
    if(userLoggedIn) {
      const params = {
      id: localStorage.getItem('memberId'),
      };
      Instance.get('/member/find', { params }).then((response) => {
        setMemberData(response.data);
        setCouponList(response.data.couponList);
        setMemberId(response.data.id);
      });
      setIsLogined(true)
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
        setGiftCardList((g) => [...g, registerGiftCard])
        setClick(true);
      }
    });
    setClick(!click);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCoupon(event.target.value);
  };

  const formatDateForServer = (date: Date) => {
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

    if(isLogined) {
      if (confirmed) {
        try {
          await Instance.post(`/reservation/save`, {
            params : memberId,
            data : serverFormattedData
          });
          navigate('/');
          window.alert('예약이 완료되었습니다');
        } catch (error) {
          console.error('예약 요청 실패', error);
        }
      }
    } else {
      if(window.confirm('로그인되지 않았습니다. 비회원으로 예약을 진행하시겠습니까?')) {
        try {
          let anonymousSignupDto = {
            name : name,
            email : email,
            phoneNumber : phoneNumber
          };
          const serverFormattedData = {
            ...formData,
            checkIn: formatDateForServer(new Date(2023,11,25,3,50)),//테스트 데이터
            checkOut: formatDateForServer(new Date(2023,11,25,3,50)),
            anonymousSignupDto : anonymousSignupDto
          };
          await Instance.post(`/reservation/save/anonymous`, serverFormattedData);
          navigate('/');
          window.alert('예약이 완료되었습니다');
        } catch (error) {
          console.error('예약 요청 실패', error);
        }
      }
    }
  };

  const updateReservationData = (newData: any) => {
    setFormData(newData);
  };

  const handleSelectGiftCardAllChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      const allGiftCardIds = giftcardList?.map((item) => item.id);
      setSelectGiftCard(allGiftCardIds);
    } else {
      setSelectGiftCard([]);
    }
  };

  const handleGiftCardCheckboxChange = (id : number) => {
    setSelectGiftCard((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item) => item !== id);
      } else {
        return [...prevItems, id];
      }
    });
  };

  return (
    <div>
      <S.Container>
        <PageTitle>상품 예약</PageTitle>
        <S.Wrapper>
          <S.Left>
            <S.Section>
              <ContentsTitleXSmall>상품 상세 설정</ContentsTitleXSmall>
              <S.OptionWrap>
                <Reservation updateReservationData={updateReservationData} selectedProduct={selectedProduct} />
              </S.OptionWrap>
            </S.Section>

            <S.Section className="privacy">
              <ContentsTitleXSmall>고객 정보 입력</ContentsTitleXSmall>
              <div className="flex">
                <input placeholder="고객명" type="text" value={name} onChange={(e) => setName(e.target.value)} required readOnly={isLogined}/>
                <input placeholder="연락처" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required readOnly={isLogined}/>
                <input placeholder="이메일" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required readOnly={isLogined}/>
              </div>
              <div className="full">
                <input placeholder="요청사항" type="text" value={notice} onChange={(e) => setNotice(e.target.value)} />
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
                      <InputCheckbox type="checkbox" onChange={handleSelectGiftCardAllChange}/> 전체 선택
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
                <table>{/* 상품권 목록 출력하는 곳*/}
                  {giftcardList.length !== 0 ? (
                    <>
                      {giftcardList.map((giftcard, index) => (
                      <tr key={index}>
                      <td>
                        <CheckLabel>
                          <InputCheckbox type="checkbox"
                          checked={selectGiftCard.includes(giftcard.id)}
                          onChange={() => handleGiftCardCheckboxChange(giftcard.id)}/>
                          {giftcard.title}
                        </CheckLabel>
                      </td>
                        <td className="right">{giftcard.money}</td>
                      </tr>
                  ))}
                    </>
                  ) : (
                    <tr>
                      <td className="center empty">등록된 상품권이 없습니다.</td>
                    </tr>
                  )}
                </table>
              </S.CouponInfo>
            </S.Section>

            <S.Section>
              <ContentsTitleXSmall>쿠폰 사용</ContentsTitleXSmall>
              <S.CouponSelect value={selectCoupon} onChange={handleChange} disabled={!userLoggedIn}>
                {userLoggedIn ? (
                  <>
                    <option value="">선택 안함</option>
                    {couponList.map((coupon: Coupon, index) => (
                      <option value={coupon.id}>{coupon.name}</option>
                    ))}
                  </>
                ) : (
                  <option disabled value="">
                    로그인이 필요한 서비스입니다.
                  </option>
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
                  <CheckLabel htmlFor="privacycheck">
                    <InputCheckbox type="checkbox" id="privacycheck" required />
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
            {indexImg ? <Item selectedProduct={selectedProduct ? selectedProduct : selectData} indexImg={indexImg} /> : <Item selectedProduct={selectedProduct ? selectedProduct : selectData} />}
            <BtnWrapper className="full mt20">
              <SubmitBtn type="submit" className="shadow" onClick={handleReservation}>
                예약 및 결제하기
              </SubmitBtn>
            </BtnWrapper>
          </S.Right>
        </S.Wrapper>
      </S.Container>
    </div>
  );
};

export default ReservationPage;
