import React, { useState, useEffect } from 'react';
import * as S from './Style';
import { numberWithCommas } from '../../utils/function/comma';
import Delux from '../../images/room/Deluxe.jpg'

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

const Item = ({ selectedProduct }: any) => {
  const [type, setType] = useState('');
  const [typeDetail, setTypeDetail] = useState('');
  const [coupon, setCoupon] = useState();
  const [giftCard, setGiftCard] = useState<any>();
  const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   const type = typeName.find((item) => item.type === selectedProduct.type);
  //   const typeDetail = typeDetailName.find((item) => item.typeDetail === selectedProduct.typeDetail);

  //   setType(type ? type.korean : '');
  //   setTypeDetail(typeDetail ? typeDetail.korean : '');
  // }, []);

  // useEffect(() => {
  //   if(!coupon && !giftCard){
  //     setTotalPrice(selectedProduct.price);
  //   }else if(!coupon && giftCard){
  //     const currentPrice = selectedProduct.price - giftCard.money;
  //   }else if(coupon && !giftCard){

  //   }else
  // }, [coupon, giftCard])

  return (
    <>
      <S.SelectItem>
        <S.SelectedItem>
          <div className="imgwrap" style={{ backgroundImage: `url(${Delux})` }} />
          <h4>{selectedProduct ? selectedProduct.name : '상품'}</h4>
          <p>{typeName[0].korean}</p>
          <p>{typeDetailName[0].korean}</p>
          <p>5인 기준</p>
          <table>
            <tr>
              <th>기본가</th>
              <td>100000 원</td>
            </tr>
          </table>
          <h5>추가 인원 비용</h5>
          <table>
            <tr>
              <th>성인</th>
              <td>10000 원</td>
              {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 

                          예약 정보 입력 페이지에서 기준 인원 초과하여 인원 추가하는 경우 
                          추가된 인원 수에 맞춰 위 계산법 적용됩니다. 이하 동일 */}
            </tr>
            <tr>
              <th>어린이</th>
              <td>10000 원</td>
              {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 */}
            </tr>
          </table>
        </S.SelectedItem>
      </S.SelectItem>

      <S.PaymentInfo>
        <table>
          <tr>
            <th>총액</th>
            <td>1000000 원</td>
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
