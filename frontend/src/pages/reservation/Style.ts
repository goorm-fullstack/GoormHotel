import styled from 'styled-components';
import { commonContainerStyle, commonTable } from '../../Style/commonStyles';

// 공통
export const Table = styled(commonTable)``;

export const Container = styled(commonContainerStyle)`
  // 예약 확인
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

export const Payment = styled.table`
  // 결제 정보
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

export const RevNumber = styled.p`
  // 예약 번호
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

// 예약(상품)
export const SelectWrapper = styled.div`
  margin-bottom: 40px;

  .typewrapper {
    background-color: ${(props) => props.theme.colors.graybg};
    display: flex;
    padding: 21px 20px;
    gap: 0 20px;
  }

  .typewrapper label {
    color: ${(props) => props.theme.colors.blacklight};
  }

  .categorywrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    p {
      font-weight: 500;
      font-size: ${(props) => props.theme.font.sizexs};
    }

    strong {
      color: ${(props) => props.theme.colors.goldhover};
    }
  }
`;

export const RoomItemWrapper = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px 16px;

  .empty {
    text-align: center;
    width: 100%;
    padding: 180px 0;
  }
`;

export const RoomItem = styled.li`
  width: calc((100% / 3) - (32px / 3));
  border: 1px solid ${(props) => props.theme.colors.graylightborder};

  .imgwrap {
    width: 100%;
    height: 165px;
    background-size: cover;
  }
`;

export const RoomItemInfo = styled.div`
  width: 100%;
  padding: 30px;
  letter-spacing: -0.02em;

  h4 {
    font-size: ${(props) => props.theme.font.sizem};
    font-weight: 500;
    color: ${(props) => props.theme.colors.charcoal};
    margin-bottom: 10px;
  }

  p {
    color: ${(props) => props.theme.colors.graydark};
    font-size: ${(props) => props.theme.font.sizexs};

    span::before {
      content: '';
      width: 1px;
      height: 9px;
      background: ${(props) => props.theme.colors.grayborder};
      display: inline-block;
      margin: 0 8px;
    }
  }

  p.price {
    color: ${(props) => props.theme.colors.blacklight};
    font-weight: 500;
    margin: 15px 0 30px;
    letter-spacing: -0.02em;

    strong {
      font-size: ${(props) => props.theme.font.sizem};
    }
  }

  h5 {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.blacklight};
    font-weight: 500;
    margin-bottom: 10px;
  }

  p.desc {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graydark};
    font-weight: 500;
    margin-top: 15px;
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden;
    width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    line-height: 1.4;
  }

  table {
    width: 100%;
  }

  th,
  td {
    color: ${(props) => props.theme.colors.graydark};
    font-size: ${(props) => props.theme.font.sizexs};
    line-height: 1.5;
  }

  th {
    width: 50%;
  }

  td {
    text-align: right;
  }

  button {
    border-color: ${(props) => props.theme.colors.graylightborder};
  }
`;

export const NoItem = styled.div`
  width: 293px;
  height: 550px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.graylight};
  font-size: ${(props) => props.theme.font.sizes};
  letter-spacing: -0.02em;

  svg {
    width: 100px;
  }
`;

export const SelectedItem = styled.div`
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
    top: 17px;
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

export const SelectItem = styled.div`
  width: 100%;
  height: 552px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.graybg};
  overflow: hidden;
`;

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

  p.notice {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graylight};
    padding-top: 16px;
    text-align: left;
    line-height: 1.4;
  }
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

  display: flex;
  height: 50px;
  justify-content: space-between;

  input {
    width: calc(100% - 210px);
    padding-left: 18px;
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

    &.empty {
      text-align: center;
      color: ${(props) => props.theme.colors.graylight};
    }

    label {
      color: ${(props) => props.theme.colors.blacklight};
      font-size: ${(props) => props.theme.font.sizes};
    }
  }
`;

export const CouponSelect = styled.select`
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
