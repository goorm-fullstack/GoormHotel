import styled from 'styled-components';
import { commonContainerStyle } from '../../../Style/commonStyles';

export const Container = styled(commonContainerStyle)`
  a {
    color: inherit;
  }
`;

export const SiteMap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 100px 80px;

  h3 {
    color: ${(props) => props.theme.colors.goldhover};
    font-size: ${(props) => props.theme.font.sizem};
    font-weight: 500;
    width: 340px;
    padding-bottom: 20px;
    margin-bottom: 32px;
    border-bottom: 1px solid ${(props) => props.theme.colors.graylightborder};
  }

  ul li {
    color: ${(props) => props.theme.colors.graylight};
    line-height: 1.8;
    & > a:hover {
      color: ${(props) => props.theme.colors.charcoal};
    }
  }
`;
