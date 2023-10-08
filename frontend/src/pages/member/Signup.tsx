import React, { useState } from 'react';
import * as S from './Style';
import {
  PageTitle,
  InputCheckbox,
  CheckLabel,
  ContentsTitleXSmall,
  AuthBtn,
  BtnWrapper,
  SubmitBtn,
  Auth,
  RequiredTitle,
} from '../../Style/commonStyles';
import AgreementContents from '../../components/Agreement/AgreementCon';
import PrivacyContents from '../../components/Agreement/PrivacyCon';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSignupButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (termsAgree && privacyAgree) {
      //회원가입 요청 로직 작성
    } else {
      alert('이용약관과 개인정보 처리방침에 동의해야 합니다.');
    }
  };

  return (
    <>
      <S.Container>
        <PageTitle>회원가입</PageTitle>
        <S.Signup>
          <div className="left">
            <ContentsTitleXSmall>약관 동의</ContentsTitleXSmall>
            <div>
              <RequiredTitle>
                <h4>
                  이용약관 동의 <span>(필수)</span>
                </h4>
                <CheckLabel onChange={handleTermsCheck} htmlFor="agreementcheck">
                  <InputCheckbox type="checkbox" id="agreementcheck" checked={termsAgree} onChange={handleTermsCheck} required />
                  동의합니다
                </CheckLabel>
              </RequiredTitle>
              <S.AgreementText>
                <AgreementContents />
              </S.AgreementText>
            </div>
            <div>
              <RequiredTitle>
                <h4>
                  개인정보처리방침 동의 <span>(필수)</span>
                </h4>
                <CheckLabel htmlFor="privacycheck">
                  <InputCheckbox type="checkbox" id="privacycheck" checked={privacyAgree} onChange={handlePrivacyAgree} required />
                  동의합니다
                </CheckLabel>
              </RequiredTitle>
              <S.AgreementText>
                <PrivacyContents />
              </S.AgreementText>
            </div>
          </div>
          <div className="right">
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
              <BtnWrapper className="mt20 full">
                <SubmitBtn type="submit" onClick={handleSignupButton}>
                  회원가입
                </SubmitBtn>
              </BtnWrapper>
            </form>
          </div>
        </S.Signup>
      </S.Container>
    </>
  );
};

export default Signup;
