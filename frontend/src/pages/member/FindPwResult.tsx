import React from 'react';
import * as S from './Style';
import { BtnWrapper, SubmitBtn, PageTitle } from '../../Style/commonStyles';

const FindPwResult = () => {
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
            <input placeholder="비밀번호" name="#" required />
            <input placeholder="비밀번호 확인" name="#" required />
            <BtnWrapper className="mt20 full">
              <SubmitBtn>비밀번호 재설정</SubmitBtn>
            </BtnWrapper>
          </form>
        </S.ResultBox>
      </S.Container>
    </>
  );
};

export default FindPwResult;
