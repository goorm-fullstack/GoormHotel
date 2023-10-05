import React, { useState } from 'react';
import * as S from './Style';
import adminLogo from '../../images/common/logo_admin.png';
import { Link } from 'react-router-dom';
import { PageTitle, SubmitBtn, BtnWrapper, CheckLabel, InputCheckbox } from '../../Style/commonStyles';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  const handleRememberIdChange = () => {
    setRememberId(!rememberId);
  };

  const handleIdChange = (e: any) => {
    setAdminId(e.target.value);
  };

  const handlePwChange = (e: any) => {
    setAdminPassword(e.target.value);
  };

  return (
    <S.LoginContainer>
      <S.Header>
        <h1>
          <Link to="/admin">
            <img src={adminLogo} alt="logo" />
          </Link>
        </h1>
      </S.Header>
      <S.AdminContainer>
        <PageTitle>관리자 로그인</PageTitle>
        <form>
          <input placeholder="아이디" type="text" value={adminId} onChange={handleIdChange} />
          <input placeholder="비밀번호" type="password" value={adminPassword} onChange={handlePwChange} />
          <BtnWrapper className="full mt20">
            <SubmitBtn>로그인</SubmitBtn>
          </BtnWrapper>
        </form>
        <div>
          <CheckLabel>
            <InputCheckbox type="checkbox" />
            {/* checked={handleRememberIdChange} */}
            아이디 기억하기
          </CheckLabel>
        </div>
        <S.ShareID>
          <p>[관리자 페이지 체험용 부운영자 계정 정보]</p>
          <p>ID : manager / PW : administrator1!</p>
        </S.ShareID>
      </S.AdminContainer>
    </S.LoginContainer>
  );
};

export default AdminLogin;
