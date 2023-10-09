import React from 'react';
import * as S from './Style';
import { PageTitle, ContentsTitleXSmall, AuthBtn, SubmitBtn, BtnWrapper, Auth } from '../../Style/commonStyles';

interface FindMemberIdDTO {
  name: string;
  email: string;
  code?: string;
}

interface FindPasswordDTO {
  memberId: string;
  name: string;
  email: string;
  code?: string;
}

interface EmailResponseDto {
  code: string;
}

interface FindPasswordResponse {
  resetToken: string;
}

const FindAccount = () => {
  const [findIdData, setFindIdData] = useState<FindMemberIdDTO>({ name: '', email: '' });
  const [findPasswordData, setFindPasswordData] = useState<FindPasswordDTO>({ memberId: '', name: '', email: '' });
  const navigate = useNavigate();

  // 아이디 찾기 인증번호 요청
  const handleFindIdCodeRequest = async () => {
    try {
      const response = await Instance.post<EmailResponseDto>('/api/mail/findid-code', findIdData);
      if (response.status === 200) {
        alert('인증 코드가 발송되었습니다.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원이 없습니다');
      } else {
        alert('에러 발생');
      }
    }
  };

  // 아이디 찾기 제출
  const handleFindIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Instance.post<FindMemberIdDTO>('/find-id', findIdData);
      if (response.status === 200) {
        navigate('/findid/result', { state: { memberId: response.data, name: findIdData.name } });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원이 없습니다');
      } else {
        alert('에러 발생');
      }
    }
  };

  // 비밀번호 찾기 인증번호 요청
  const handleFindPwCodeRequest = async () => {
    try {
      const response = await Instance.post<EmailResponseDto>('/api/mail/findpw-code', findPasswordData);
      if (response.status === 200) {
        alert('인증 코드가 발송되었습니다.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원이 없습니다');
      } else {
        alert('에러 발생');
      }
    }
  };

  // 비밀번호 찾기 제출
  const handleFindPwSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Instance.post<FindPasswordResponse>('/find-pw', findPasswordData);
      if (response.status === 200 && response.data.resetToken) {
        navigate(`/findpw/result/${response.data.resetToken}`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원이 없습니다');
      } else {
        alert('에러 발생');
      }
    }
  };

  // 아이디 찾기 필드 업데이트
  const handleIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFindIdData({
      ...findIdData,
      [name]: value,
    });
  };

  // 비밀번호 찾기 필드 업데이트
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFindPasswordData({
      ...findPasswordData,
      [name]: value,
    });
  };

  return (
    <>
      <S.Container>
        <PageTitle>아이디/비밀번호 찾기</PageTitle>
        <S.ProcessBox>
          <S.IdProcess>
            <ContentsTitleXSmall>아이디 찾기</ContentsTitleXSmall>
            <form id="find-id" action="#" method="post">
              <input placeholder="이름" name="name" required onChange={handleIdInputChange} />
              <Auth>
                <input placeholder="이메일" name="email" required onChange={handleIdInputChange} />
                <AuthBtn onClick={handleFindIdCodeRequest}>인증번호 요청</AuthBtn>
              </Auth>
              <input placeholder="인증번호를 입력하세요." name="code" required onChange={handleIdInputChange} />
              <BtnWrapper className="mt20 full">
                <SubmitBtn onClick={handleFindIdSubmit}>
                  아이디 찾기
                </SubmitBtn>
              </BtnWrapper>
            </form>
          </S.IdProcess>
          <S.PwProcess>
            <ContentsTitleXSmall>비밀번호 찾기</ContentsTitleXSmall>
            <form id="find-pw" action="#" method="post">
              <input placeholder="아이디" name="memberId" required onChange={handlePasswordInputChange} />
              <input placeholder="이름" name="name" required onChange={handlePasswordInputChange} />
              <Auth>
                <input placeholder="이메일" name="email" required onChange={handlePasswordInputChange} />
                <AuthBtn onClick={handleFindPwCodeRequest}>인증번호 요청</AuthBtn>
              </Auth>
              <input placeholder="인증번호를 입력하세요." name="code" required onChange={handlePasswordInputChange} />
              <BtnWrapper className="mt20 full">
                <SubmitBtn onClick={handleFindPwSubmit}>
                  비밀번호 찾기
                </SubmitBtn>
              </BtnWrapper>
            </form>
          </S.PwProcess>
        </S.ProcessBox>
      </S.Container>
    </>
  );
};

export default FindAccount;
