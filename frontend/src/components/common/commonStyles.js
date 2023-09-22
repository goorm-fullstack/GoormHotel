import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const commonContainerStyle = styled.div`
  width: ${(props) => props.theme.wrapper.minwidth};
  margin: 0 auto;
  padding: 280px 40px 0;
`;

export const commonWrapperStyle = styled(commonContainerStyle)`
  padding: 0 40px;
`;

export const commonContentsStyle = styled.div`
  width: ${(props) => props.theme.wrapper.contents};
  margin: 0 auto;
`;

export const PageTitle = styled.h2`
  color: ${(props) => props.theme.colors.black};
  font-weight: 500;
  font-size: ${(props) => props.theme.font.big};
  margin-bottom: 100px;
`;

export const ContentsTitle = styled.h3`
  font-size: ${(props) => props.theme.font.sizexxl};
  color: ${(props) => props.theme.colors.charcoal};
  margin-bottom: 40px;

  &.center {
    text-align: center;
  }
`;

export const ContentsTitleSmall = styled(ContentsTitle)`
  font-size: ${(props) => props.theme.font.sizel};
`;

export const ContentsTitleXSmall = styled(ContentsTitle)`
  font-size: ${(props) => props.theme.font.default};
  font-weight: 500;
  margin-bottom: 30px;
`;

export const CheckLabel = styled.label`
  color: ${(props) => props.theme.colors.graylight};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizexs};

  input {
    margin-right: 6px;
  }
`;

export const InputCheckbox = styled.input`
  width: 16px;
  height: 18px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='lightgray' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  margin: 0;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: ${(props) => props.theme.colors.navy};
    border-color: ${(props) => props.theme.colors.navy};
  }
`;

export const BtnWrapper = styled.div`
  &.center {
    text-align: center;
  }
  &.right {
    text-align: right;
  }

  &.mt40 {
    margin-top: 40px;
  }
  &.mt30 {
    margin-top: 30px;
  }
  &.mt20 {
    margin-top: 20px;
  }

  &.double > button,
  &.double > a {
    margin: 0 5px;
  }

  &.full > button,
  &.full > a {
    width: 100%;
  }
`;

export const commonLinkBtn = styled(Link)`
  font-size: ${(props) => props.theme.font.sizes};
  width: 165px;
  height: 42px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
`;

export const commonButton = styled.button`
  font-size: ${(props) => props.theme.font.sizes};
  width: 165px;
  height: 42px;
  line-height: 42px;
  display: inline-block;
  text-align: center;
`;

export const LinkBtn = styled(commonLinkBtn)`
  border: 1px solid ${(props) => props.theme.colors.gold};
  color: ${(props) => props.theme.colors.goldhover};

  &:hover {
    background-color: ${(props) => props.theme.colors.gold};
    color: white;
  }

  &.height60 {
    height: 60px;
    line-height: 58px;
  }
`;

export const NormalBtn = styled(commonButton)`
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 40px;

  &:hover {
    border-color: ${(props) => props.theme.colors.gold};
    color: ${(props) => props.theme.colors.goldhover};
  }
`;

export const SubmitBtn = styled(commonButton)`
  background-color: ${(props) => props.theme.colors.gold};
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }

  &.height50 {
    height: 50px;
    line-height: 50px;
  }
  &.height60 {
    height: 60px;
    line-height: 60px;
  }
`;

export const MoreLink = styled(commonLinkBtn)`
  background-color: ${(props) => props.theme.colors.gold};
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="white" width="15"><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" /></g></svg>');
  background-repeat: no-repeat;
  background-position: 87% center;
  color: white;
  line-height: 42px;
  padding-left: 20px;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }
`;

export const MoreBtn = styled(commonButton)`
  background-color: ${(props) => props.theme.colors.gold};
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="white" width="15"><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" /></g></svg>');
  background-repeat: no-repeat;
  background-position: 87% center;
  color: white;
  padding-left: 20px;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }
`;
export const Auth = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  button {
    width: 120px;
    height: 60px;
    line-height: 58px;
  }

  & > input {
    width: 380px;
  }
`;
export const AuthBtn = styled(commonButton)`
  border: 1px solid ${(props) => props.theme.colors.charcoal};
  background: white;
  color: ${(props) => props.theme.colors.charcoal};
  line-height: 40px;
  letter-spacing: -0.02em;

  &:hover {
    background-color: ${(props) => props.theme.colors.charcoal};
    color: white;
  }
`;
