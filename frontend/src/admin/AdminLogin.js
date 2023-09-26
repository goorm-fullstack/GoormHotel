import React, { useState } from 'react';
import styled from 'styled-components';
import adminLogo from '../images/common/logo_admin.png';
import {Link, useNavigate} from 'react-router-dom';
import { commonAdminContainer, PageTitle, SubmitBtn, BtnWrapper, CheckLabel, InputCheckbox } from '../components/common/commonStyles';
import { Container } from './common/AdminHeader';
import Instance from "../utils/api/axiosInstance";

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.graybg};
  text-align: center;
`;

const AdminContainer = styled(commonAdminContainer)`
  width: 400px;
  padding-top: calc(100px + 20vh);

  h2 {
    margin-bottom: 40px;
  }

  form {
    margin-bottom: 10px;

    input {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      padding-left: 12px;
    }
  }
`;

const Header = styled(Container)``;

const HeaderLink = styled.h1`
  margin-right: 45px;
`;

const ShareID = styled.div`
  line-height: 1.6;
  padding: 20px;
  margin-top: 40px;
  color: ${(props) => props.theme.colors.graylight};
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  const handleLogin = async () => {

    const loginInfo = {
      adminId: adminId,
      password: adminPassword,
    };

    try {
      const response = await Instance.post('/login/manager', loginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("세션 응답 아이디: ", response.data);

      if (response.status === 200) {
        sessionStorage.setItem('sessionId', response.data.sessionId);
        console.log("세션: " + sessionStorage.getItem('sessionId'));
        navigate('/admin');
      }

    } catch (error) {
      alert('아이디 혹은 비밀번호가 올바르지 않습니다');
    }
  };

  const handleRememberIdChange = () => {
    setRememberId(!rememberId);
  };

  const handleIdChange = (e) => {
    setAdminId(e.target.value);
  };

  const handlePwChange = (e) => {
    setAdminPassword(e.target.value);
  };

  return (
    <LoginContainer>
      <Header>
        <HeaderLink>
          <Link to="/admin">
            <img src={adminLogo} alt="logo" />
          </Link>
        </HeaderLink>
      </Header>
      <AdminContainer>
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
            <InputCheckbox type="checkbox" checked={handleRememberIdChange} />
            아이디 기억하기
          </CheckLabel>
        </div>
        <ShareID>
          <p>[관리자 페이지 체험용 부운영자 계정 정보]</p>
          <p>ID : manager / PW : administrator1!</p>
        </ShareID>
      </AdminContainer>
    </LoginContainer>
  );
};

export default AdminLogin;
