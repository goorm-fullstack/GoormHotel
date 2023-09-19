import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const commonContainerStyle = styled.div`
  width: ${(props) => props.theme.wrapper.minwidth};
  margin: 0 auto;
  padding: 280px 40px 0;
`;

export const commonWrapperStyle = styled.div`
  width: ${(props) => props.theme.wrapper.contents};
  margin: 0 auto;
`;

export const commonTitleStyle = styled.div`
  margin-bottom: 94px;
  font-size: 36px;
  font-weight: bold;
  color: #111111;
`;

export const commonSubTitleStyle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 34px;
`;

export const BtnWrapper = styled.div`
  &.center {
    text-align: center;
  }
  &.right {
    text-align: right;
  }
`;

export const MoreBtn = styled(Link)`
  font-size: ${(props) => props.theme.font.sizes};
  background-color: ${(props) => props.theme.colors.gold};
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="white" width="15"><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" /></g></svg>');
  background-repeat: no-repeat;
  background-position: 87% center;
  margin: 0 auto;
  width: 165px;
  color: white;
  height: 42px;
  line-height: 42px;
  padding-left: 20px;
  display: inline-block;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }
`;
