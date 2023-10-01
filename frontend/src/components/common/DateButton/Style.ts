import styled from 'styled-components';
import { CheckBtn } from '../../Reservation/Style';

export const DateButton = styled(CheckBtn)`
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  padding: 0 12px;
  font-size: ${(props) => props.theme.font.sizes};
  height: 40px;
  line-height: 40px;
  text-decoration: none !important;
`;
