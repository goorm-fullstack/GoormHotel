import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BtnWrapper, SubmitBtn, PageTitle, InputCheckbox, commonContainerStyle, LinkBtn, CheckLabel } from '../../components/common/commonStyles';
import kakao from '../../images/icon/ico_kakao.png';
import naver from '../../images/icon/ico_naver.png';
import google from '../../images/icon/ico_google.png';

const Container = styled(commonContainerStyle)``;

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  & > div {
    width: 50%;
  }
`;

const LeftWrapper = styled.div`
  padding-right: 80px;
  border-right: 1px solid ${(props) => props.theme.colors.grayborder};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
`;

const MemberBtn = styled.button`
  background-color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#f7f7f7')};
  border: 1px solid ${({ isActive }) => (isActive ? '#baa085' : '#ddd')};
  color: ${({ isActive }) => (isActive ? '#9c836a' : '#888')};
  width: 50%;
  height: 100%;
  border-bottom-color: ${({ isActive }) => (isActive ? 'transparent' : '#baa085')};
  font-size: ${(props) => props.theme.font.sizes};
`;

const NonMemberBtn = styled(MemberBtn)``;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding-left: 18px;

  &.password {
    margin-top: 10px;
  }
`;

const RememberAndFind = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.graylight};
  font-size: ${(props) => props.theme.font.sizexs};
  align-items: center;
  margin-top: 10px;
  letter-spacing: -0.02em;
`;

const AuthWrapper = styled.div`
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
`;

const RightWrapper = styled.div`
  padding-left: 80px;
`;

const FirstText = styled.p`
  font-size: ${(props) => props.theme.font.sizel};
  color: ${(props) => props.theme.colors.goldhover};
  margin: 55px 0 20px;
`;

const SecondText = styled.p`
  color: ${(props) => props.theme.colors.graylight};
  margin-bottom: 60px;
  line-height: 1.6;
`;

const Login = () => {
  const [isMemberActive, setIsMemberActive] = useState(true);
  const [memberId, setMemberId] = useState('');
  const [memberPassword, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  const handleIdChange = (e) => {
    setMemberId(e.target.value);
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
      <Container>
        <PageTitle>로그인</PageTitle>
        <Wrapper>
          <LeftWrapper>
            <ButtonWrapper>
              <MemberBtn isActive={isMemberActive} onClick={handleMemberClick}>
                회원
              </MemberBtn>
              <NonMemberBtn isActive={!isMemberActive} onClick={handleNonMemberClick}>
                비회원(예약확인)
              </NonMemberBtn>
            </ButtonWrapper>
            <div>
              <form id="memberLogin">
                <Input placeholder="아이디" value={memberId} onChange={handleIdChange} />
                <Input className="password" placeholder="비밀번호" value={memberPassword} onChange={handlePwChange} />
                <BtnWrapper className="mt20 full">
                  <SubmitBtn type="submit">로그인</SubmitBtn>
                </BtnWrapper>
              </form>
            </div>
            <RememberAndFind>
              <CheckLabel for="rememberId">
                <InputCheckbox type="checkbox" id="rememberId" checked={rememberId} onChange={handleRememberIdChange} />
                아이디 기억하기
              </CheckLabel>
              <Link to="/findidpw">아이디/비밀번호 찾기</Link>
            </RememberAndFind>
            <AuthWrapper>
              <button type="button">
                <img src={google} alt="authImg" />
              </button>
              <button type="button">
                <img src={kakao} alt="authImg" />
              </button>
              <button type="button">
                <img src={naver} alt="authImg" />
              </button>
            </AuthWrapper>
          </LeftWrapper>
          <RightWrapper>
            <FirstText>아직 회원이 아니신가요?</FirstText>
            <SecondText>
              회원이 되시면 구름 리워즈 멤버십 회원으로서
              <br />더 큰 혜택과 편리함을 누릴 수 있습니다.
            </SecondText>
            <BtnWrapper className="full">
              <LinkBtn to="/signup">회원가입</LinkBtn>
            </BtnWrapper>
          </RightWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
