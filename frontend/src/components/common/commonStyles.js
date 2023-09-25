import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const commonContainerStyle = styled.div`
  width: ${(props) => props.theme.wrapper.minwidth};
  margin: 0 auto;
  padding: 280px 40px 0;
`;

export const commonAdminContainer = styled(commonContainerStyle)`
  padding-top: 200px;
  padding-bottom: 100px;
`;

export const commonAdminContents = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.wrapper.minwidth};
  min-width: 760px;
  margin: 0 auto;
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
  font-size: ${(props) => props.theme.font.sizexxl};
  margin-bottom: 80px;
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

export const RequiredTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => props.theme.font.sizexs};
  margin-bottom: 16px;
  font-weight: normal;

  span {
    color: ${(props) => props.theme.colors.red};
  }
`;

export const CheckLabel = styled.label`
  color: ${(props) => props.theme.colors.graylight};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizexs};

  input {
    margin-right: 8px;
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
  &.mt10 {
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

  &.flexspace {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &.flexgap {
    display: flex;
    column-gap: 10px;
  }
`;

export const commonLinkBtn = styled(Link)`
  font-size: ${(props) => props.theme.font.sizes};
  width: 200px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  text-align: center;

  &.height60 {
    height: 60px;
    line-height: 58px;
  }
  &.shadow {
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const commonButton = styled.button`
  font-size: ${(props) => props.theme.font.sizes};
  width: 200px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  text-align: center;

  &.height60 {
    height: 60px;
    line-height: 60px;
  }

  &.shadow {
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
  }

  &.mini {
    width: 80px;
    height: 32px;
    line-height: 30px;
    font-size: ${(props) => props.theme.font.sizexs};
  }

  &.header {
    width: 140px;
    height: 40px;
    line-height: 40px;
    font-size: ${(props) => props.theme.font.sizexs};
  }
`;

export const LinkBtn = styled(commonLinkBtn)`
  border: 1px solid ${(props) => props.theme.colors.gold};
  color: ${(props) => props.theme.colors.goldhover};

  &:hover {
    background-color: ${(props) => props.theme.colors.gold};
    color: white;
  }
`;

export const SubmitLinkBtn = styled(commonLinkBtn)`
  background-color: ${(props) => props.theme.colors.gold};
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
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

  &.red {
    border-color: ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.colors.red};
  }

  &.header {
    line-height: 38px;
  }
`;

export const SubmitBtn = styled(commonButton)`
  background-color: ${(props) => props.theme.colors.gold};
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }

  &.header {
    width: 200px;
    font-size: ${(props) => props.theme.font.sizes};
  }
`;

export const MoreLink = styled(commonLinkBtn)`
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

export const CircleCloseBtn = styled(commonButton)`
  background-color: white;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="rgb(156,131,106)"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  border: 1px solid ${(props) => props.theme.colors.gold};
  border-radius: 50%;
  width: 24px;
  height: 24px;

  &.small {
    width: 18px;
    height: 18px;
  }
`;

export const Auth = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  button {
    width: 120px;
    height: 50px;
    line-height: 48px;
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

export const MultiCheck = styled.div`
  display: flex;
`;

export const commonTable = styled.table`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.charcoal};

  th {
    border-top: 1px solid ${(props) => props.theme.colors.charcoal};
    border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
    font-weight: 500;
    background: ${(props) => props.theme.colors.graybg};
    color: ${(props) => props.theme.colors.charcoal};
  }
  th,
  td {
    padding: 16.5px 12px;
  }
  td {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    color: ${(props) => props.theme.colors.blacklight};

    input[type='text'],
    input[type='password'],
    input[type='email'],
    input[type='tel'],
    input[type='date'],
    select {
      height: 36px;
      min-width: 240px;
      padding-left: 12px;
    }

    select {
      background-position: 96% center;
    }
  }
  td.center {
    text-align: center;
  }
  tr:hover th,
  tr:hover td {
    background-color: ${(props) => props.theme.colors.graybg};
  }

  &.horizontal {
    tr:last-child th {
      border-bottom-color: ${(props) => props.theme.colors.charcoal};
    }
    tr:first-child td {
      border-top-color: ${(props) => props.theme.colors.charcoal};
    }
    td {
      padding-top: 9px;
      padding-bottom: 9px;
    }
    th {
      text-align: center;
    }
    tr:hover td {
      background-color: white;
    }
  }

  .textover {
    width: 100%;
    max-width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .mailcheck {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graydark};
    padding-left: 12px;
    letter-spacing: -0.01em;
  }

  a,
  button {
    text-decoration: underline;
    font-size: ${(props) => props.theme.font.sizes};
  }

  button {
    background-color: transparent;
  }
`;
