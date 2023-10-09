import React from 'react';
import * as S from './Style';
import { BtnWrapper, SubmitBtn, PageTitle } from '../../Style/commonStyles';

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
      <S.Container>
        <PageTitle>비밀번호 찾기</PageTitle>
        <S.ResultBox>
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
        </S.ResultBox>
      </S.Container>
    </>
  );
};

export default FindPwResult;
