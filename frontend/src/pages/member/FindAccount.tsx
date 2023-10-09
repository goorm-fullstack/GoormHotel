import React, {useState} from 'react';
import { styled } from 'styled-components';
import { commonContainerStyle, PageTitle, ContentsTitleXSmall, AuthBtn, SubmitBtn, BtnWrapper, Auth } from '../../Style/commonStyles';
import Instance from "../../utils/api/axiosInstance";

const Container = styled(commonContainerStyle)``;

const ProcessBox = styled.div`
  display: flex;
  width: 100%;

  & > div {
    width: 50%;
  }

  input {
    height: 50px;
    padding-left: 18px;
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

const IdProcess = styled.div`
  padding-right: 80px;
  border-right: 1px solid ${(props) => props.theme.colors.grayborder};
`;

const PwProcess = styled.div`
  padding-left: 80px;
`;

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

const FindAccount = () => {
  const [findIdData, setFindIdData] = useState<FindMemberIdDTO>({ name: '', email: '' });
  const [findPasswordData, setFindPasswordData] = useState<FindPasswordDTO>({ memberId: '', name: '', email: '' });

  // 아이디 찾기 인증번호 요청
  const handleIdAuthRequest = async () => {
    try {
      const response = await Instance.post('/find-id', { name: findIdData.name, email: findIdData.email });
      if (response.status === 200) {
        console.log("인증번호가 발송되었습니다:", response.data);
      }
    } catch (error) {
      console.error("인증번호 발송 실패:", error);
    }
  };

  const handleFindPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Instance.post('/find-password', findPasswordData);
      if (response.status === 200) {
        console.log("비밀번호 찾기 성공:", response.data);
      }
    } catch (error) {
      console.error("비밀번호 찾기 실패:", error);
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
      <Container>
        <PageTitle>아이디/비밀번호 찾기</PageTitle>
        <ProcessBox>
          <IdProcess>
            <ContentsTitleXSmall>아이디 찾기</ContentsTitleXSmall>
            <form id="find-id" action="#" method="post">
              <input placeholder="이름" name="name" required onChange={handleIdInputChange} />
              <Auth>
                <input placeholder="이메일" name="email" required onChange={handleIdInputChange} />
                <AuthBtn onClick={handleIdAuthRequest}>인증번호 요청</AuthBtn>
              </Auth>
              <input placeholder="인증번호를 입력하세요." name="code" required onChange={handleIdInputChange} />
              <BtnWrapper className="mt20 full">
                <SubmitBtn type="submit" form="find-id">
                  아이디 찾기
                </SubmitBtn>
              </BtnWrapper>
            </form>
          </IdProcess>
          <PwProcess>
            <ContentsTitleXSmall>비밀번호 찾기</ContentsTitleXSmall>
            <form id="find-pw" onSubmit={handleFindPasswordSubmit}>
              <input placeholder="아이디" name="memberId" required onChange={handlePasswordInputChange} />
              <input placeholder="이름" name="name" required onChange={handlePasswordInputChange} />
              <Auth>
                <input placeholder="이메일" name="email" required onChange={handlePasswordInputChange} />
                <AuthBtn>인증번호 요청</AuthBtn>
              </Auth>
              <input placeholder="인증번호를 입력하세요." name="code" required onChange={handlePasswordInputChange} />
              <BtnWrapper className="mt20 full">
                <SubmitBtn type="submit" form="find-pw">
                  비밀번호 찾기
                </SubmitBtn>
              </BtnWrapper>
            </form>
          </PwProcess>
        </ProcessBox>
      </Container>
    </>
  );
};

export default FindAccount;
