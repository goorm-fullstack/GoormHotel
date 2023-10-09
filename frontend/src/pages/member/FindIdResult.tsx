import React from 'react';
import * as S from './Style';
import { BtnWrapper, SubmitBtn, PageTitle, LinkBtn } from '../../Style/commonStyles';

const FindIdResult = () => {
  return (
    <>
      <S.Container>
        <PageTitle>아이디 찾기</PageTitle>
        <S.ResultBox>
          <h3>홍구름님의 아이디는 memberID입니다.</h3>
          <p>
            고객님 아이디 찾기가 완료되었습니다.
            <br />
            비밀번호를 잊으신 경우 비밀번호 찾기를 이용해주세요.
          </p>
          <BtnWrapper className="mt40 double">
            <SubmitBtn>로그인</SubmitBtn>
            <LinkBtn to="/findidpw">비밀번호 찾기</LinkBtn>
          </BtnWrapper>
        </S.ResultBox>
      </S.Container>
    </>
  );
};

export default FindIdResult;
