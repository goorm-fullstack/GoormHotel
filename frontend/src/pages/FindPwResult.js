import React from "react";
import Header from "../components/Header";
import { styled } from "styled-components";

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: rgb(136, 136, 136);
  line-height: 1.75;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 500;
  color: rgb(17, 17, 17);
  line-height: 1.2;
  text-align: left;
`;

const BoldText = styled.p`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 400;
  color: rgb(186, 160, 133);
  line-height: 1.167;
`;

const InfoText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
  color: rgb(136, 136, 136);
  line-height: 1.75;
`;

const FindPwResultInput = styled.input`
  border: 1px solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  width: 514px;
  height: 64px;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: rgb(136, 136, 136);
    line-height: 1.75;
    text-align: left;
    padding-left: 1rem;
  }
`;

const FindPwResultButton = styled.button`
  color: #FFFFFF;
  width: 510px;
  height: 60px;
  border: 1px solid rgb(186, 160, 133);
  background-color: ${props => props.theme.colors.brown};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.75;
  text-align: center;
  &:hover {
    background-color: #8a7057;
  }
`;

const FindPwBox = styled.div`
  width: 1180px;
  height: 770px;
  display: flex;
  flex-direction: column;
  gap: 154px;
  margin: 0 auto;
  margin-top: 160px;
`;

const ResetPwBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

const FindPwResultForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const FindPwResult = () => {
  return (
    <>
      <Header backgroundColor="rgba(51, 51, 51, 0.8)" />
      <FindPwBox>
        <Title>비밀번호 찾기</Title>
        <ResetPwBox>
          <BoldText>비밀번호를 재설정해주세요.</BoldText>
          <Text>새로 사용하실 비밀번호를 입력해주세요.</Text>
          <InfoText>기존에 사용하시던 비밀번호는 사용할 수 없습니다.</InfoText>
          <FindPwResultForm action="#" method="post">
            <FindPwResultInput placeholder="비밀번호" name="#" required />
            <FindPwResultInput placeholder="비밀번호 확인" name="#" required />
            <FindPwResultButton>비밀번호 재설정</FindPwResultButton>
          </FindPwResultForm>
        </ResetPwBox>
      </FindPwBox>
    </>
  );
};

export default FindPwResult;
