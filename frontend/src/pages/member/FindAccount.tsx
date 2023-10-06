import React from 'react';
import { styled } from 'styled-components';
import { commonContainerStyle, PageTitle, ContentsTitleXSmall, AuthBtn, SubmitBtn, BtnWrapper, Auth } from '../../Style/commonStyles';

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

const FindAccount = () => {
  return (
    <>
      <Container>
        <PageTitle>아이디/비밀번호 찾기</PageTitle>
        <ProcessBox>
          <IdProcess>
            <ContentsTitleXSmall>아이디 찾기</ContentsTitleXSmall>
            <form id="find-id" action="#" method="post">
              <input placeholder="이름" name="#" required />
              <Auth>
                <input placeholder="이메일" name="#" required />
                <AuthBtn>인증번호 요청</AuthBtn>
              </Auth>
              <input placeholder="인증번호를 입력하세요." name="#" required />
              <BtnWrapper className="mt20 full">
                <SubmitBtn type="submit" form="find-id">
                  아이디 찾기
                </SubmitBtn>
              </BtnWrapper>
            </form>
          </IdProcess>
          <PwProcess>
            <ContentsTitleXSmall>비밀번호 찾기</ContentsTitleXSmall>
            <form id="find-pw" action="#" method="post">
              <input placeholder="아이디" name="#" required />
              <input placeholder="이름" name="#" required />
              <Auth>
                <input placeholder="이메일" name="#" required />
                <AuthBtn>인증번호 요청</AuthBtn>
              </Auth>
              <input placeholder="인증번호를 입력하세요." name="#" required />
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
