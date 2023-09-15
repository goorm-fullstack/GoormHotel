import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import kakao from '../images/icon/ico_kakao.png';
import naver from '../images/icon/ico_naver.png';
import google from '../images/icon/ico_google.png';

const Container = styled.div`
  width: 1180px;
  margin: 0 auto;
  padding-top: 280px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 440px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 100px;
`;

const LeftWrapper = styled.div`
  width: 510px;
  height: auto;
  margin-right: 80px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
`;

const MemberBtn = styled.button`
  background-color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#DDDDDD')};
  border: 1px solid ${({ isActive }) => (isActive ? '#BAA085' : '#DDDDDD')};
  color: ${({ isActive }) => (isActive ? '#BAA085' : '#888888')};
  padding: 10px 20px;
  cursor: pointer;
  width: 50%;
  height: 100%;
  border-bottom: none;
`;

const NonMemberBtn = styled(MemberBtn)``;

const Input = styled.input`
  width: 100%;
  height: 60px;
  padding-left: 21px;
  outline: none;
`;

const PasswordInput = styled(Input)`
  margin-top: 12px;
`;

const Form = styled.form``;

const LoginBtn = styled.button`
  width: 100%;
  height: 60px;
  background-color: #95846E;
  color: #FFF;
  margin-top: 20px;

  &:hover {
    background-color: #8a7057;
  }
`;

const RememberBtn = styled.button`
  color: #888888;
  float: left;
  background-color: transparent;
  display: flex;
  align-items: center;

  input {
    width: 16px;
    height: 16px;
    border: 1px solid #DDDDDD;
    margin-right: 10px;
  }
`;

const RememberAndFind = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888888;
  font-size: 14px;
  align-items: center;
  margin-top: 13px;
`;

const AuthWrapper = styled.div`
  display: flex;
  gap: 28px;
  height: 50px;
  width: 206px;
  margin: 0 auto;
  margin-top: 55px;
`;

const AuthBtn = styled.button`
  background-color: transparent;
`;

const CenterLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #DDDDDD;
`;

const RightWrapper = styled.div`
  width: 510px;
  height: 100%;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
`;

const FirstText = styled.p`
  font-size: 24px;
  color: #BAA085;
  margin-top: 80px;
  margin-bottom: 20px;
`;

const SecondText = styled.p`
  font-size: 16px;
  color: #888888;
  margin-bottom: 62px;
  line-height: 1.6;
`;

const SignupBtn = styled(Link)`
  width: 100%;
  padding: 20px 0;
  border: 1px solid #BAA085;
  color: #BAA085;
  text-align: center;

  &:hover {
    background-color: #95846E;
    color: #fff;
  }
`;


const Login = () => {
  const [isMemberActive, setIsMemberActive] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const [rememberId, setRememberId] = useState(false);

  const handleIdChange = (e) => {
    setEmailId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMemberClick = () => {
    setIsMemberActive(true);
  };

  const handleNonMemberClick = () => {
    setIsMemberActive(false);
  };

  const handleRememberIdChange = () => {
    setRememberId(!rememberId);
  };

  console.log(rememberId);

  return (
    <>
      <Header />
      <Container>
        <Title>로그인</Title>
        <Wrapper>
          <LeftWrapper>
            <ButtonWrapper>
              <MemberBtn isActive={isMemberActive} onClick={handleMemberClick}>회원</MemberBtn>
              <NonMemberBtn isActive={!isMemberActive} onClick={handleNonMemberClick}>비회원(예약확인)</NonMemberBtn>
            </ButtonWrapper>
            <Form>
              <Input placeholder="이메일 아이디" value={emailId} onChange={handleIdChange} />
              <PasswordInput placeholder="비밀번호" value={Password} onChange={handlePwChange} />
              <LoginBtn>로그인</LoginBtn>
            </Form>
            <RememberAndFind>
              <RememberBtn>
                <input type="checkbox" checked={rememberId} onChange={handleRememberIdChange} />
                <span onClick={handleRememberIdChange}>아이디 기억하기</span>
              </RememberBtn>
              <Link to="/findAccount">
                아이디/비밀번호 찾기
              </Link>
            </RememberAndFind>
            <AuthWrapper>
              <AuthBtn><img src={google} alt='authImg'/></AuthBtn>
              <AuthBtn><img src={kakao} alt='authImg'/></AuthBtn>
              <AuthBtn><img src={naver} alt='authImg'/></AuthBtn>
            </AuthWrapper>
          </LeftWrapper>
          <CenterLine />
          <RightWrapper>
            <FirstText>아직 회원이 아니신가요?</FirstText>
            <SecondText>
              회원이 되시면 구름 리워즈 멤버십 회원으로서<br />
              더 큰 혜택과 편리함을 누릴 수 있습니다.
            </SecondText>
            <SignupBtn to="/">회원가입</SignupBtn>
          </RightWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;