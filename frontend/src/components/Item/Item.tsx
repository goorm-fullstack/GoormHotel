import React from 'react';
import * as S from './Style';

const Item = ({ selectedProduct }: any) => {
  console.log(selectedProduct.imageUrl);
  return (
    <>
      <S.SelectItem>
        <S.SelectedItem>
          <div className="imgwrap" style={{ backgroundImage: `url(${selectedProduct.imageUrl})` }} />
          <h4>{selectedProduct.name}</h4>
          <p>{selectedProduct.type}</p>
          <p>{selectedProduct.typeDetail}</p>
          <p>성인 2</p>
          <table>
            <tr>
              <th>기본가</th>
              <td>{selectedProduct.price} 원</td>
            </tr>
          </table>
          <h5>추가 인원 비용</h5>
          <table>
            <tr>
              <th>성인</th>
              <td>{selectedProduct.priceAdult} 원</td>
              {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 

                          예약 정보 입력 페이지에서 기준 인원 초과하여 인원 추가하는 경우 
                          추가된 인원 수에 맞춰 위 계산법 적용됩니다. 이하 동일 */}
            </tr>
            <tr>
              <th>어린이</th>
              <td>{selectedProduct.priceChildren} 원</td>
              {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 */}
            </tr>
          </table>
        </S.SelectedItem>
      </S.SelectItem>

      <S.PaymentInfo>
        <table>
          <tr>
            <th>총액</th>
            <td>500,000 원</td>
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
