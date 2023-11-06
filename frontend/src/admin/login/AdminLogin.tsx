import React, { useEffect, useState } from 'react';
import * as S from './Style';
import adminLogo from '../../images/common/logo_admin.png';
import { Link, useNavigate } from 'react-router-dom';
import { PageTitle, SubmitBtn, BtnWrapper, CheckLabel, InputCheckbox } from '../../Style/commonStyles';
import Instance from '../../utils/api/axiosInstance';

const AdminLogin: React.FC = () => {
  const [adminId, setAdminId] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [rememberId, setRememberId] = useState<boolean>(false);
  const navigate = useNavigate();
  const getLoginState = localStorage.getItem('adminId');

  useEffect(() => {
    if (getLoginState) {
      navigate('/admin');
    }
  }, []);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginInfo = {
      adminId: adminId,
      password: adminPassword,
    };
    try {
      const response = await Instance.post('/login/manager', loginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        window.location.href = '/admin';
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        alert('비활성화된 관리자 계정입니다.');
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다. 또는 서버 오류가 발생했습니다.');
      }
    }
  };

  const handleRememberIdChange = () => {
    setRememberId(!rememberId);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminId(e.target.value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <SubmitBtn onClick={handleLogin}>로그인</SubmitBtn>
          </BtnWrapper>
        </form>
        <div>
          <CheckLabel>
            <InputCheckbox type="checkbox" checked={rememberId} onChange={handleRememberIdChange} />
            아이디 기억하기
          </CheckLabel>
        </div>
        <S.ShareID>
          <Link to="/">사용자 홈 바로가기</Link>
          <p>[관리자 페이지 체험용 부운영자 계정 정보]</p>
          <p>ID : manager / PW : administrator1!</p>
        </S.ShareID>
      </S.AdminContainer>
    </S.LoginContainer>
  );
};

export default AdminLogin;
