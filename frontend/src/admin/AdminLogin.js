import React, { useState } from 'react';
import styled from 'styled-components';
import adminLogo from '../images/common/logo_admin.png';
import { Link, useNavigate } from 'react-router-dom';
import Instance from '../utils/api/axiosInstance';

const Header = styled.div`
  width: 100%;
  height: 97px;
  background-color: #21201e;
`;

const HeaderLink = styled(Link)`
  img {
    margin-top: 30px;
    margin-left: 40px;
  }
`;

const Wrapper = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 243px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 510px;
  height: 60px;
  color: #888888;
  border: 1px solid #dddddd;
  padding: 15px 0 15px 20px;
  outline: none;
`;

const PwInput = styled(Input)`
  margin-top: 12px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #95846e;
  height: 60px;
  text-align: center;
  color: #ffffff;
  margin-top: 20px;
`;

const RememberBtn = styled.button`
  margin-top: 15px;
  font-size: 14px;
  color: #888888;
  float: left;
  background-color: transparent;
  display: flex;
  align-items: center;

  input {
    width: 16px;
    height: 16px;
    border: 1px solid #dddddd;
    margin-right: 10px;
  }
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  const handleLogin = async () => {
    const params = new URLSearchParams();
    params.append('adminId', adminId);
    params.append('password', adminPassword);

    try {
      const response = await Instance.post('/login/adminlogin', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      if (response.status === 200) {
        sessionStorage.setItem('sessionId', response.data.sessionId);
        navigate('/admin');
      }
    } catch (error) {
      console.log(error)
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
    <div>
      <Header>
        <HeaderLink to="/admin/member">
          <img src={adminLogo} alt="logo" />
        </HeaderLink>
      </Header>
      <Wrapper>
        <Title>관리자 로그인</Title>
        <form>
          <Input placeholder="아이디" type="text" value={adminId} onChange={handleIdChange} />
          <PwInput placeholder="비밀번호" type="password" value={adminPassword} onChange={handlePwChange} />
          <Button onClick={handleLogin}>로그인</Button>
        </form>
        <RememberBtn>
          <input type="checkbox" checked={handleRememberIdChange} />
          아이디 기억하기
        </RememberBtn>
      </Wrapper>
    </div>
  );
};

export default AdminLogin;
