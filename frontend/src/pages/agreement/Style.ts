import styled from 'styled-components';
import { commonContainerStyle } from '../../Style/commonStyles';

export const Container = styled(commonContainerStyle)``;

export const Section = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  background: ${(props) => props.theme.colors.graybg};
  padding: 40px;
`;

export const OuterDiv = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  padding: 40px;
  line-height: 1.8;
`;
