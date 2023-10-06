import styled from 'styled-components';
import { commonContainerStyle } from '../../../Style/commonStyles';

export const Container = styled(commonContainerStyle)``;

export const Table = styled.table`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.charcoal};

  th,
  td {
    border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
    padding: 40px 60px;
    vertical-align: middle;
  }

  th {
    width: 300px;
    font-size: ${(props) => props.theme.font.sizem};
  }

  td {
    border-left: 1px solid ${(props) => props.theme.colors.grayborder};
    color: ${(props) => props.theme.colors.graydark};
    line-height: 1.6;
  }
`;

export const MapAddress = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  z-index: 10;
  font-size: ${(props) => props.theme.font.sizexs};
  padding: 20px 24px;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.blacklight};

  & > p {
    margin-bottom: 10px;
  }
`;

export const MapWrapper = styled.div`
  position: relative;
  margin-bottom: 60px;
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: ${(props) => props.theme.colors.goldhover};
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
`;

export const IcoWrapper = styled.div`
  padding: 10px;
  text-align: center;
  margin: 0 auto 20px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 60px;
    filter: invert(1);
  }
`;
