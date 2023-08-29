import React from "react";
import Header from "../components/Header";
import { styled } from "styled-components";

const ResultBox = styled.div`
  width: 1180px;
  height: 630px;
  margin: 0 auto;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  gap: 9rem;
`;

const Title = styled.p`
  text-align: left;
  font-size: 36px;
  color: rgb(17, 17, 17);
  line-height: 1.2;
`;

const ResultIdBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`;

const IdResult = styled.p`
  margin-bottom: 25px;
  font-size: 24px;
  color: rgb(186, 160, 133);
  line-height: 1.167;
`;

const ResultInfo = styled.p`
  font-size: 16px;
  color: rgb(136, 136, 136);
  line-height: 1.75;
`;

const PwResultInfo = styled.p`
  font-size: 16px;
  color: rgb(136, 136, 136);
  line-height: 1.75;
  margin-bottom: 25px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

const FindIdResultButton = styled.button`
  display: inline-block;
  color: rgb(186, 160, 133);
  width: 284px;
  height: 64px;
  border: 1px solid rgb(186, 160, 133);
  background-color: rgb(255, 255, 255);
  font-size: 16px;
  line-height: 1.75;
  text-align: center;
  &:hover {
    background-color: rgb(149, 132, 110);
    color: rgb(255, 255, 255);
  }
`;

const FindIdResult = () => {
  return (
    <>
      <Header backgroundColor="rgba(51, 51, 51, 0.8)" />
      <ResultBox>
        <Title>아이디 찾기</Title>
        <ResultIdBox>
          <IdResult>홍구름님의 아이디는 memberID입니다.</IdResult>
          <ResultInfo>고객님 아이디 찾기가 완료되었습니다.</ResultInfo>
          <PwResultInfo>
            비밀번호를 잊으신 경우 비밀번호 찾기를 이용해주세요.
          </PwResultInfo>
          <Buttons>
            <FindIdResultButton>로그인</FindIdResultButton>
            <FindIdResultButton>비밀번호 찾기</FindIdResultButton>
          </Buttons>
        </ResultIdBox>
      </ResultBox>
    </>
  );
};

export default FindIdResult;
