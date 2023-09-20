import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const commonContainerStyle = styled.div`
  width: ${(props) => props.theme.wrapper.minwidth};
  margin: 0 auto;
  padding: 280px 40px 0;
`;

export const commonWrapperStyle = styled.div`
  width: ${(props) => props.theme.wrapper.minwidth};
  margin: 0 auto;
  padding: 0 40px;
`;

export const commonContentsStyle = styled.div`
  width: ${(props) => props.theme.wrapper.contents};
  margin: 0 auto;
`;

export const SubHeader = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 99;
  padding-left: 40px;
  top: 120px;

  h2 {
    /* GNB 기준 페이지명 */
    font-size: ${(props) => props.theme.font.sizem};
    font-weight: 500;
    width: 191px;
    margin-right: 45px;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 0 40px;
  }

  li {
    /* 하위 페이지명 */
    font-size: ${(props) => props.theme.font.sizes};
  }

  li a:hover,
  li a.active {
    color: ${(props) => props.theme.colors.goldhover};
  }
`;

export const PageTitle = styled.h2`
  color: ${(props) => props.theme.colors.black};
  font-weight: 500;
  font-size: ${(props) => props.theme.font.big};
  margin-bottom: 100px;
`;

export const PageDesc = styled.div`
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

export const MoreLink = styled(Link)`
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

export const MoreBtn = styled.button`
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
