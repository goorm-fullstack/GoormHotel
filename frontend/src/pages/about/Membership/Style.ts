import styled from 'styled-components';
import { commonContainerStyle } from '../../../Style/commonStyles';

export const ImageBorder = styled.div`
  background-color: ${(props) => props.theme.colors.graybg};
  width: 100%;
  text-align: center;
  padding: 55px 0;
`;

export const Grade = styled.h3`
  font-size: ${(props) => props.theme.font.sizel};
  font-weight: 500;
  color: ${(props) => props.theme.memberColors.bronze};
  margin: 15px 0;

  &.silver {
    color: ${(props) => props.theme.memberColors.silver};
  }
  &.gold {
    color: ${(props) => props.theme.memberColors.gold};
  }
`;

export const ImageBorderFooter = styled.p`
  font-size: ${(props) => props.theme.font.sizes};
  color: ${(props) => props.theme.colors.graylight};
`;

export const Benefit = styled.div`
  width: 100%;
  padding: 0 40px;

  h4 {
    margin: 40px 0 10px;
    font-weight: 500;
    color: rgb(33, 32, 30);
    line-height: 2;
    font-size: ${(props) => props.theme.font.sizes};
  }

  li {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graylight};
    line-height: 1.8;
  }

  li::before {
    content: '•';
    margin-right: 8px;
  }
`;

export const Container = styled(commonContainerStyle)``;

export const MembershipBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MembershipItemBox = styled.div`
  width: 360px;
  height: 750px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
`;

export const MembershipDetailInfo = styled.ul`
  margin-top: 20px;
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.6;
`;

export const MemberIcon = styled.svg`
  width: 160px;
  position: relative;
  left: 6px; /* 시각 보정 */

  &.bronze path {
    fill: url('#gradient1');
  }
  &.silver path {
    fill: url('#gradient2');
  }
  &.gold path {
    fill: url('#gradient3');
  }
`;
