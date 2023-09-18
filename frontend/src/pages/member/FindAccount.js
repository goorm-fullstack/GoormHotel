import React from 'react';
import { styled } from 'styled-components';
import { commonContainerStyle } from '../../components/common/commonStyles';

const FindAccountInput = styled.input`
  display: inline-block;
  border: 1px solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  width: 510px;
  height: 64px;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: rgb(136, 136, 136);
    line-height: 1.75;
    text-align: left;
    padding-left: 20px;
  }
`;

const EmailInput = styled.input`
  display: inline-block;
  border: 1px solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  width: 384px;
  height: 64px;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: rgb(136, 136, 136);
    line-height: 1.75;
    text-align: left;
    padding-left: 20px;
  }
`;

const ButtonTypeButton = styled.button`
  display: inline-block;
  width: 116px;
  height: 64px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  border: 1px solid rgb(221, 221, 221);
  background-color: #21201e;
  line-height: 1.75;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonTypeSubmit = styled.button`
  display: inline-block;
  width: 510px;
  height: 64px;
  background-color: #95846e;
  border: 1px solid rgb(186, 160, 133);
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  line-height: 1.75;
  text-align: center;
  &:hover {
    background-color: #8a7058;
  }
`;

const FindAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Container = styled.div`
  ${commonContainerStyle}
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 500;
  color: rgb(17, 17, 17);
  line-height: 1.2;
  margin-bottom: 100px;
`;

const ProcessBox = styled.div`
  display: flex;
  height: 406px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  gap: 100px;
  & p {
    font-size: 16px;
    font-weight: 500;
  }
`;

const IdProcess = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const PwProcess = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  border-left: 1px solid rgb(221, 221, 221);
  padding-left: 6rem;
`;

const Auth = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FindAccount = () => {
  return (
    <>
      <Container>
        <Title>아이디/비밀번호 찾기</Title>
        <ProcessBox>
          <IdProcess>
            <p>아이디 찾기</p>
            <FindAccountForm id="find-id" action="#" method="post">
              <FindAccountInput placeholder="이름" name="#" required />
              <Auth>
                <EmailInput placeholder="이메일" name="#" required />
                <ButtonTypeButton>인증번호 요청</ButtonTypeButton>
              </Auth>
              <FindAccountInput placeholder="인증번호를 입력하세요." name="#" required />
              <ButtonTypeSubmit form="find-id">아이디 찾기</ButtonTypeSubmit>
            </FindAccountForm>
          </IdProcess>
          <PwProcess>
            <p>비밀번호 찾기</p>
            <FindAccountForm id="find-pw" action="#" method="post">
              <FindAccountInput placeholder="아이디" name="#" required />
              <FindAccountInput placeholder="이름" name="#" required />
              <Auth>
                <EmailInput placeholder="이메일" name="#" required />
                <ButtonTypeButton>인증번호 요청</ButtonTypeButton>
              </Auth>
              <FindAccountInput placeholder="인증번호를 입력하세요." name="#" required />
              <ButtonTypeSubmit form="find-pw">비밀번호 찾기</ButtonTypeSubmit>
            </FindAccountForm>
          </PwProcess>
        </ProcessBox>
      </Container>
    </>
  );
};

export default FindAccount;