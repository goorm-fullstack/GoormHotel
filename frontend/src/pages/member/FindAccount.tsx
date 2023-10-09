import React from 'react';
import * as S from './Style';
import { PageTitle, ContentsTitleXSmall, AuthBtn, SubmitBtn, BtnWrapper, Auth } from '../../Style/commonStyles';

const FindAccount = () => {
  return (
    <>
      <S.Container>
        <PageTitle>아이디/비밀번호 찾기</PageTitle>
        <S.ProcessBox>
          <S.IdProcess>
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
          </S.IdProcess>
          <S.PwProcess>
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
          </S.PwProcess>
        </S.ProcessBox>
      </S.Container>
    </>
  );
};

export default FindAccount;
