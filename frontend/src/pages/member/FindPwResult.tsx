import React, { useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { BtnWrapper, SubmitBtn, PageTitle, commonContainerStyle } from '../../Style/commonStyles';
import Instance from '../../utils/api/axiosInstance';

const Container = styled(commonContainerStyle)``;

const ResultBox = styled.div`
  text-align: center;

  h3 {
    font-size: ${(props) => props.theme.font.sizel};
    color: ${(props) => props.theme.colors.goldhover};
    margin-bottom: 20px;
  }

  p {
    line-height: 1.6;
    color: ${(props) => props.theme.colors.graylight};
  }

  form {
    width: 400px;
    margin: 40px auto 0;
  }

  input {
    width: 100%;
    height: 50px;
    display: block;
    margin-top: 10px;
    padding-left: 12px;
  }

  input:first-child {
    margin-top: 0;
  }
`;

const FindPwResult = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await Instance.post('/reset-pw', {
        resetToken,
        newPassword: password,
      });

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigate('/login');
      }
    } catch (error) {
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <>
      <Container>
        <PageTitle>비밀번호 찾기</PageTitle>
        <ResultBox>
          <h3>비밀번호를 재설정해주세요.</h3>
          <p>
            새로 사용하실 비밀번호를 입력해주세요.
            <br />
            기존에 사용하시던 비밀번호는 사용할 수 없습니다.
          </p>
          <form action="#" method="post">
            <input
                type="password"
                placeholder="비밀번호"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호 확인"
                name="confirmPassword"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <BtnWrapper className="mt20 full">
              <SubmitBtn onClick={handleResetPassword}>비밀번호 재설정</SubmitBtn>
            </BtnWrapper>
          </form>
        </ResultBox>
      </Container>
    </>
  );
};

export default FindPwResult;
