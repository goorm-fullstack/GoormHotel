import React, { useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { commonContainerStyle, commonTitleStyle } from '../components/common/commonStyles';

const Container = styled.div`
  ${commonContainerStyle}
  width: 1180px;
`;


const Title = styled.h1`
  ${commonTitleStyle}
  margin-bottom: 95px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 756px;
`;

const CenterLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #DDDDDD; 
  margin: 0 80px;
`;

const LeftWrapper = styled.div`
  width: 510px;
`;

const SubTitle = styled.h2`
  color: #21201E;
  font-weight: bold;
  margin-bottom: 33px;
`;

const AgreementSection = styled.div`
  width: 100%;
`;

const PrivacySection = styled(AgreementSection)`
  margin-top: 35px;
`;

const AgreementText = styled.div`
  font-size: 14px;
  color: #444444;
  height: 200px;
  border: 1px solid #DDDDDD;
  padding: 17px 17px 0 21px;
  margin-bottom: 16px;
`;

const TextContent = styled.div`
  line-height: 1.9;
  font-size: 14px;
  color: #444444;
`;

const AgreementCheck = styled.input`
  margin-right: 10px;
  border: 1px solid #DDDDDD !important;
  outline: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='lightgray' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 120% 120%;
  background-position: 50%;
  background-repeat: no-repeat;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #baa085;
  }
`;

const Agreement = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
`;

const AgreementCheckText = styled.span`
  font-size: 14px;
  color: #888888;
`;

const RightWrapper = styled.div`
  width: 510px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  padding-left: 21px;
  color: #888888;
  outline: none;
`;

const EmailInputSection = styled.div`
  display: flex;
`;

const EmailInput = styled(Input)`
  width: 380px;
  margin-right: 10px;
`;

const CertificationBtn = styled.button`
  width: 120px;
  height: 60px;
  background-color: #EDEDED;
  border: 1px solid #DDDDDD;
  color: #888888;
`;

const Button = styled.button`
  width: 100%;
  padding: 20px 0;
  color: #fff;
  text-align: center;
  background-color: #95846E;
  margin-top: 10px;

  &:hover {
    background-color: #8a7057;
  }
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

  console.log(formData)

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
  }

  const handlePrivacyAgree = ()  => {
    setPrivacyAgree(!privacyAgree);
  }

  const handleSignupButton = (e) => {
    e.preventDefault();
    
    if (termsAgree && privacyAgree) {
      //회원가입 요청 로직 작성
      
    } else {
      alert("이용약관과 개인정보 처리방침에 동의해야 합니다.")
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Title>회원가입</Title>
        <Wrapper>
          <LeftWrapper>
            <SubTitle>이용약관/개인정보처리방침 동의</SubTitle>
            <AgreementSection>
              <AgreementText>
                <TextContent>이용약관 내용<br/> 이용약관 내용<br/> 이용약관 내용<br/> 이용약관 내용<br/> 이용약관 내용<br/> 이용약관 내용</TextContent>
              </AgreementText>
              <Agreement onChange={handleTermsCheck}>
                <AgreementCheck type="checkbox" checked={termsAgree} onChange={handleTermsCheck} required />
                <AgreementCheckText>이용약관에 동의합니다.</AgreementCheckText>
              </Agreement>
            </AgreementSection>
            <PrivacySection>
              <AgreementText>
                <TextContent>개인정보처리방침 내용<br/> 이용약관 내용<br/> 이용약관 내용<br/> 이용약관 내용<br/> 이용약관 내용<br/> 이용약관 내용</TextContent>
              </AgreementText>
              <Agreement>
                <AgreementCheck type="checkbox" checked={privacyAgree} onChange={handlePrivacyAgree} required />
                <AgreementCheckText>개인정보처리방침에 동의합니다.</AgreementCheckText>
              </Agreement>
            </PrivacySection>
          </LeftWrapper>
          <CenterLine />
          <RightWrapper>
            <SubTitle>회원정보 입력</SubTitle>
            <Form>
              <Input
                type="text"
                placeholder="아이디"
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="password"
                value={formData.password}
                placeholder="비밀번호"
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="비밀번호 확인"
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="name"
                value={formData.name}
                placeholder="이름"
                onChange={handleChange}
                required
              />
              <EmailInputSection>
                <EmailInput
                  placeholder="이메일"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required />
                <CertificationBtn>인증번호 요청</CertificationBtn>
              </EmailInputSection>
              <Input
                type="text"
                name="certificationCode"
                value={formData.certificationCode}
                placeholder="인증번호를 입력하세요."
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="연락처"
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="birthdate"
                value={formData.birthdate}
                placeholder="생년월일(선택입력)"
                onChange={handleChange}
              />
              <Input
                type="text"
                name="gender"
                value={formData.gender}
                placeholder="성별(선택입력)"
                onChange={handleChange}
              />
              <Button onClick={handleSignupButton}>회원가입</Button>
            </Form>
          </RightWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default Signup;