import React, { useState, useEffect } from 'react';
import * as S from './Style';
import { numberWithCommas } from '../../utils/function/comma';
import Delux from '../../images/room/Deluxe.jpg';

const typeName = [
  { type: 'dining', korean: '다이닝' },
  { type: 'room', korean: '객실' },
];

const typeDetailName = [
  { typeDetail: 'deluxe', korean: '디럭스' },
  { typeDetail: 'sweet', korean: '스위트' },
  { typeDetail: 'family', korean: '패밀리' },
  { typeDetail: 'poolvila', korean: '풀빌라' },
  { typeDetail: 'restaurant', korean: '레스토랑' },
  { typeDetail: 'roomService', korean: '룸서비스' },
  { typeDetail: 'barRounge', korean: '바&라운지' },
  { typeDetail: 'bakery', korean: '베이커리' },
];

const Item = ({ selectedProduct, indexImg, updateReservationData, selectCoupon, selectGiftCardList }: any) => {
  const [type, setType] = useState('');
  const [typeDetail, setTypeDetail] = useState('');
  const [spareAdultPrice, setSpareAdultPrice] = useState(0);
  const [spareChildrenPrice, setSpareChildrenPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const type = typeName.find((item) => item.type === selectedProduct.type);
    const typeDetail = typeDetailName.find((item) => item.typeDetail === selectedProduct.typeDetail);
    const spareAdultPrice =
      selectedProduct && selectedProduct.spareAdult < updateReservationData.adults
        ? selectedProduct.priceAdult * (updateReservationData.adults - selectedProduct.spareAdult)
        : 0;
    const spareChildrenPrice =
      selectedProduct && selectedProduct.spareChildren < updateReservationData.children
        ? selectedProduct.priceChildren * (updateReservationData.children - selectedProduct.spareChildren)
        : 0;

    setType(type ? type.korean : '');
    setTypeDetail(typeDetail ? typeDetail.korean : '');
    setSpareAdultPrice(spareAdultPrice);
    setSpareChildrenPrice(spareChildrenPrice);
  }, [selectedProduct, updateReservationData.adults, updateReservationData.children, updateReservationData.count]);

  useEffect(() => {
    if (selectCoupon === '' && !selectGiftCardList) {
      //쿠폰도 상품권도 없음
      setTotalPrice(selectedProduct.price);
    } else if (selectCoupon === '' && selectGiftCardList) {
      //쿠폰은 없고, 상품권은 있다.
      let currentPrice = selectedProduct.price;
      for (var i = 0; i < selectGiftCardList.length; i++) {
        currentPrice -= selectGiftCardList[i].money;
      }
      setTotalPrice(currentPrice);
    } else if (selectCoupon !== '' && !selectGiftCardList) {
      //쿠폰이 있고, 상품권이 없다.
      let currentPrice = selectedProduct.price;
      let discountPrice = currentPrice / selectCoupon.discountRate;
      currentPrice -= discountPrice;
      setTotalPrice(currentPrice);
    } else {
      // 쿠폰도 상품권도 있다.
      let currentPrice = selectedProduct.price;
      let discountPrice = currentPrice / selectCoupon.discountRate;
      currentPrice -= discountPrice;
      for (var i = 0; i < selectGiftCardList.length; i++) {
        currentPrice -= selectGiftCardList[i].money;
      }
      setTotalPrice(currentPrice);
    }
  }, []);

  console.log(selectCoupon);

  return (
    <>
      <S.SelectItem>
        <S.SelectedItem>
          <div className="imgwrap" style={{ backgroundImage: `url(${indexImg ? indexImg : selectedProduct.imageUrl})` }} />
          <h4>{selectedProduct ? selectedProduct.name : '상품'}</h4>
          <p>{type}</p>
          <p>{typeDetail}</p>
          <p>{selectedProduct ? selectedProduct.capacity : ''}인 기준</p>
          <table>
            <tr>
              <th>기본가</th>
              <td>{selectedProduct ? numberWithCommas(selectedProduct.price) : ''} 원</td>
            </tr>
          </table>
          <h5>추가 인원 비용</h5>
          <table>
            <tr>
              <th>성인</th>
              <td>{numberWithCommas(spareAdultPrice)}원</td>
              {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 

                          예약 정보 입력 페이지에서 기준 인원 초과하여 인원 추가하는 경우 
                          추가된 인원 수에 맞춰 위 계산법 적용됩니다. 이하 동일 */}
            </tr>
            <tr>
              <th>어린이</th>
              <td>{numberWithCommas(spareChildrenPrice)}원</td>
              {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 */}
            </tr>
          </table>
        </S.SelectedItem>
      </S.SelectItem>
      <S.PaymentInfo>
        <table>
          <tr>
            <th>총액</th>
            <td>{selectedProduct && numberWithCommas(selectedProduct.price + spareAdultPrice + spareChildrenPrice)} 원</td>
          </tr>
          <tr className="discount">
            <th>할인액</th>
            <td>-200,000 원</td>
          </tr>
          <tr className="total">
            <th>최종금액</th>
            <td>
              <strong>300,000</strong> 원
            </td>
          </tr>
        </table>
        <p>⁕&nbsp;VAT 포함</p>
      </S.PaymentInfo>
    </>
  );
};

export default Item;
