import React, { useState } from 'react';
import styled from 'styled-components';
import {
  commonContainerStyle,
  PageTitle,
  InputCheckbox,
  CheckLabel,
  ContentsTitleXSmall,
  AuthBtn,
  BtnWrapper,
  SubmitBtn,
  Auth,
} from '../../components/common/commonStyles';
import AgreementContents from '../../components/AgreementCon';
import PrivacyContents from '../../components/PrivacyCon';

const Container = styled(commonContainerStyle)``;

const Wrapper = styled.div`
  display: flex;

  & > div {
    width: 50%;
  }
`;

const LeftWrapper = styled.div`
  padding-right: 80px;
  border-right: 1px solid ${(props) => props.theme.colors.grayborder};

  & > div {
    margin-bottom: 20px;
  }
`;

const AgreementText = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.blacklight};
  height: 200px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  padding: 20px;
  margin-bottom: 16px;
  overflow-y: scroll;
  line-height: 1.6;
`;

const RightWrapper = styled.div`
  padding-left: 80px;

  input {
    height: 60px;
    padding-left: 18px;
    font-size: ${(props) => props.theme.font.sizes};
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

const JoinSubmitBtn = styled(SubmitBtn)`
  width: 100%;
  height: 60px;
  line-height: 60px;
`;

const Signup = () => {
  const [termsAgree, setTermsAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    memberId: '',
    email: '',
    certificationCode: '',
    phoneNumber: '',
    birthdate: '',
    gender: '',
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //약관 동의 확인
  const handleTermsCheck = () => {
    setTermsAgree(!termsAgree);
  };

  const handlePrivacyAgree = () => {
    setPrivacyAgree(!privacyAgree);
  };

  const handleSignupButton = (e) => {
    e.preventDefault();

    if (termsAgree && privacyAgree) {
      //회원가입 요청 로직 작성
    } else {
      alert('이용약관과 개인정보 처리방침에 동의해야 합니다.');
    }
  };

  return (
    <>
      <Container>
        <PageTitle>회원가입</PageTitle>
        <Wrapper>
          <LeftWrapper>
            <ContentsTitleXSmall>이용약관/개인정보처리방침 동의</ContentsTitleXSmall>
            <div>
              <AgreementText>
                <AgreementContents />
              </AgreementText>
              <CheckLabel onChange={handleTermsCheck} for="agreementcheck">
                <InputCheckbox type="checkbox" id="agreementcheck" checked={termsAgree} onChange={handleTermsCheck} required />
                이용약관에 동의합니다.
              </CheckLabel>
            </div>
            <div>
              <AgreementText>
                <PrivacyContents />
              </AgreementText>
              <CheckLabel for="privacycheck">
                <InputCheckbox type="checkbox" id="privacycheck" checked={privacyAgree} onChange={handlePrivacyAgree} required />
                개인정보처리방침에 동의합니다.
              </CheckLabel>
            </div>
          </LeftWrapper>
          <RightWrapper>
            <ContentsTitleXSmall>회원정보 입력</ContentsTitleXSmall>
            <form>
              <input type="text" placeholder="아이디" name="memberId" value={formData.memberId} onChange={handleChange} required />
              <input type="password" name="password" value={formData.password} placeholder="비밀번호" onChange={handleChange} required />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="비밀번호 확인"
                onChange={handleChange}
                required
              />
              <input type="text" name="name" value={formData.name} placeholder="이름" onChange={handleChange} required />
              <Auth>
                <input placeholder="이메일" type="email" name="email" value={formData.email} onChange={handleChange} required />
                <AuthBtn>인증번호 요청</AuthBtn>
              </Auth>
              <input
                type="text"
                name="certificationCode"
                value={formData.certificationCode}
                placeholder="인증번호를 입력하세요."
                onChange={handleChange}
                required
              />
              <input type="text" name="phoneNumber" value={formData.phoneNumber} placeholder="연락처" onChange={handleChange} required />
              <input type="text" name="birthdate" value={formData.birthdate} placeholder="생년월일(선택입력)" onChange={handleChange} />
              <input type="text" name="gender" value={formData.gender} placeholder="성별(선택입력)" onChange={handleChange} />
              <BtnWrapper className="mt20">
                <JoinSubmitBtn type="submit" onClick={handleSignupButton}>
                  회원가입
                </JoinSubmitBtn>
              </BtnWrapper>
            </form>
          </RightWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default Signup;
