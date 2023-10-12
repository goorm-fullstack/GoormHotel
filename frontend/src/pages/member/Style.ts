import styled from 'styled-components';
import { commonContainerStyle } from '../../Style/commonStyles';

export const Container = styled(commonContainerStyle)``;

export const ProcessBox = styled.div`
  // 아이디/비밀번호 찾기
  display: flex;
  width: 100%;

  & > div {
    width: 50%;
  }

  input {
    height: 50px;
    padding-left: 18px;
    margin-top: 10px;
    display: block;
  }
  input:first-child {
    margin-top: 0;
  }

  & form > input {
    width: 100%;
  }
`;

export const IdProcess = styled.div`
  // 아이디 찾기
  padding-right: 80px;
  border-right: 1px solid ${(props) => props.theme.colors.grayborder};
`;

export const PwProcess = styled.div`
  // 비밀번호 찾기
  padding-left: 80px;
`;

export const ResultBox = styled.div`
  // 아이디/비밀번호 찾기, 회원가입 결과
  text-align: center;

  h3 {
    font-size: ${(props) => props.theme.font.sizel};
    color: ${(props) => props.theme.colors.goldhover};
    margin-bottom: 20px;
  }

  p {
    line-height: 1.6;
    color: ${(props) => props.theme.colors.graylight};
  }

  form {
    width: 400px;
    margin: 40px auto 0;
  }

  input {
    width: 100%;
    height: 50px;
    display: block;
    margin-top: 10px;
    padding-left: 12px;
  }

  input:first-child {
    margin-top: 0;
  }
`;

// 로그인
export const LoginWrapper = styled.div`
  display: flex;
  width: 100%;

  & > div {
    width: 50%;

    &.left {
      padding-right: 80px;
      border-right: 1px solid ${(props) => props.theme.colors.grayborder};
    }

    &.right {
      padding-left: 80px;
    }
  }

  .tab {
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
  }

  input[type='text'],
  input[type='password'] {
    width: 100%;
    height: 50px;
    padding-left: 18px;

    &.second {
      margin-top: 10px;
    }
  }

  .remember {
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.graylight};
    font-size: ${(props) => props.theme.font.sizexs};
    align-items: center;
    margin-top: 10px;
    letter-spacing: -0.02em;
  }

  .auth {
    display: flex;
    justify-content: center;
    gap: 0 18px;
    height: 50px;
    width: 100%;
    margin-top: 50px;

    button {
      width: 52px;
      height: 52px;
      background-color: transparent;
    }
  }

  .right {
    p.first {
      font-size: ${(props) => props.theme.font.sizel};
      color: ${(props) => props.theme.colors.goldhover};
      margin: 55px 0 20px;
    }

    p.second {
      color: ${(props) => props.theme.colors.graylight};
      margin-bottom: 60px;
      line-height: 1.6;
    }
  }
`;

export const MemberBtn = styled.button<{ isActive: boolean }>`
  // 로그인 탭 버튼
  background-color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#f7f7f7')};
  border: 1px solid ${({ isActive }) => (isActive ? '#baa085' : '#ddd')};
  color: ${({ isActive }) => (isActive ? '#9c836a' : '#888')};
  width: 50%;
  height: 100%;
  border-bottom-color: ${({ isActive }) => (isActive ? 'transparent' : '#baa085')};
  font-size: ${(props) => props.theme.font.sizes};
`;

export const Mypage = styled.div`
  display: flex;

  & > div {
    width: 50%;
  }

  .editinfo {
    padding-right: 80px;
    border-right: 1px solid ${(props) => props.theme.colors.grayborder};

    input {
      height: 50px;
      padding-left: 18px;
      margin-top: 10px;
      display: block;
    }

    input:first-child {
      margin-top: 0;
    }

    & form > input {
      width: 100%;
    }
  }

  .right {
    padding-left: 80px;

    .historyWrapper {
      margin-bottom: 60px;

      p {
        background-color: ${(props) => props.theme.colors.graybg};
        padding: 32.5px 30px;
        font-size: ${(props) => props.theme.font.sizes};
        display: flex;
        justify-content: space-between;

        a {
          font-size: ${(props) => props.theme.font.sizexs};
          letter-spacing: -0.02em;
          text-decoration: underline;
          color: ${(props) => props.theme.colors.graylight};
        }
      }
    }
  }

  .guide {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graylight};
    line-height: 1.6;
    margin-top: 20px;
  }
`;

export const Signup = styled.div`
  display: flex;

  & > div {
    width: 50%;
  }

  .left {
    padding-right: 80px;
    border-right: 1px solid ${(props) => props.theme.colors.grayborder};

    & > div {
      margin-bottom: 30px;

      label {
        color: ${(props) => props.theme.colors.graydark};
      }
    }
  }

  .right {
    padding-left: 80px;

    input {
      height: 50px;
      padding-left: 18px;
      margin-top: 10px;
      display: block;
    }
    input:first-child {
      margin-top: 0;
    }
    & form > input {
      width: 100%;
    }
  }
`;

export const AgreementText = styled.div`
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.graydark};
  height: 200px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  padding: 20px;
  margin-bottom: 16px;
  overflow-y: scroll;
  line-height: 1.6;
  background: ${(props) => props.theme.colors.graybg};

  &.forreserv {
    height: 130px;
  }
`;
