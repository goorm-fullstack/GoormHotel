import styled from 'styled-components';

export const PaymentInfo = styled.div`
  // 결제 정보
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
    // 할인액
    color: ${(props) => props.theme.colors.red};
  }

  .discount th,
  .discount td {
    padding-bottom: 16px;
  }

  .total th,
  .total td {
    // 최종금액
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
    // VAT
    text-align: right;
    color: ${(props) => props.theme.colors.goldhover};
    margin-top: 8px;
    font-size: ${(props) => props.theme.font.sizexs};
  }
`;

export const SelectedItem = styled.div`
  // 스페셜 오퍼 선택된 상품 상품 개요
  .imgwrap {
    width: 100%;
    height: 165px;
    background-size: cover;
  }

  h4 {
    // 상품명
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
    // 상품 선택 해제 버튼
    position: absolute;
    top: 16px;
    right: 20px;
  }

  p {
    // 상품 상세 정보
    padding: 0 20px;
    line-height: 1.5;
    font-size: ${(props) => props.theme.font.sizes};
    color: ${(props) => props.theme.colors.graydark};
  }

  table {
    // 추가 비용
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

export const SelectItem = styled.div`
  // 스펠셜오퍼 상품 개요 컨테이너
  width: 100%;
  height: 552px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.graybg};
  overflow: hidden;
`;
