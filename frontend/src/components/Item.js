import React from 'react';
import item from '../images/item/item1.jpg';
import { styled } from 'styled-components';

const PaymentInfo = styled.div`
  line-height: 1.6;
  margin-top: 24px;

  table {
    width: 100%;
  }

  th,
  td {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graydark};
    vertical-align: middle;
  }

  th {
    text-align: left;
  }

  td {
    text-align: right;
  }

  .discount td {
    color: ${(props) => props.theme.colors.red};
  }

  .discount th,
  .discount td {
    padding-bottom: 16px;
  }

  .total th,
  .total td {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    border-bottom: 1px solid ${(props) => props.theme.colors.graylightborder};
    padding: 16px 0;
    color: ${(props) => props.theme.colors.goldhover};

    strong {
      font-size: ${(props) => props.theme.font.sizesl};
      font-weight: bold;
      letter-spacing: -0.01em;
    }
  }

  p {
    text-align: right;
    color: ${(props) => props.theme.colors.goldhover};
    margin-top: 8px;
    font-size: ${(props) => props.theme.font.sizexs};
  }
`;

const SelectedItem = styled.div`
  .imgwrap {
    width: 100%;
    height: 165px;
    background-size: cover;
  }

  h4 {
    font-weight: 500;
    color: ${(props) => props.theme.colors.goldhover};
    padding: 21px 20px;
    border-top: 1px solid ${(props) => props.theme.colors.grayborder};
    border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
    margin-bottom: 20px;
    background: white;
    position: relative;
  }

  h5 {
    font-size: ${(props) => props.theme.font.sizes};
    color: ${(props) => props.theme.colors.blacklight};
    font-weight: 500;
    margin-top: 30px;
    padding: 0 20px;
  }

  button {
    position: absolute;
    top: 16px;
    right: 20px;
  }

  p {
    padding: 0 20px;
    line-height: 1.5;
    font-size: ${(props) => props.theme.font.sizes};
    color: ${(props) => props.theme.colors.graydark};
  }

  table {
    margin-top: 20px;
    width: 100%;

    th,
    td {
      line-height: 1.5;
      font-size: ${(props) => props.theme.font.sizes};
      color: ${(props) => props.theme.colors.graydark};
    }

    th {
      padding-left: 20px;
      text-align: left;
    }

    td {
      padding-right: 20px;
      text-align: right;
    }
  }
`;

const SelectItem = styled.div`
  width: 100%;
  height: 552px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.graybg};
  overflow: hidden;
`;

const Item = () => {
  return (
    <>
      <SelectItem>
        <SelectedItem>
          <div className="imgwrap" style={{ backgroundImage: `url(${item})` }} alt="ItemImg" />
          <h4>Sweet Moment</h4>
          <p>객실</p>
          <p>패밀리</p>
          <p>성인 2</p>
          <table>
            <tr>
              <th>기본가</th>
              <td>160,000 원</td>
            </tr>
          </table>
          <h5>추가 인원 비용</h5>
          <table>
            <tr>
              <th>성인</th>
              <td>0 원</td>
              {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 

                          예약 정보 입력 페이지에서 기준 인원 초과하여 인원 추가하는 경우 
                          추가된 인원 수에 맞춰 위 계산법 적용됩니다. 이하 동일 */}
            </tr>
            <tr>
              <th>어린이</th>
              <td>0 원</td>
              {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 */}
            </tr>
          </table>
        </SelectedItem>
      </SelectItem>

      <PaymentInfo>
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
      </PaymentInfo>
    </>
  );
};

export default Item;
