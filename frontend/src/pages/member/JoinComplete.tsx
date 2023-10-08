import React from 'react';
import * as S from './Style';
import { BtnWrapper, SubmitBtn, PageTitle, LinkBtn } from '../../Style/commonStyles';

const JoinComplete = () => {
  return (
    <>
      <S.Container>
        <PageTitle>회원가입 완료</PageTitle>
        <S.ResultBox>
          <h3>홍구름님, 환영합니다!</h3>
          <p>
            이제 구름 호텔 멤버십 회원으로서
            <br />더 큰 혜택과 편리함을 누려보세요.
          </p>
          <BtnWrapper className="mt40 double">
            <SubmitBtn>로그인</SubmitBtn>
            <LinkBtn to="/">메인 페이지로 이동</LinkBtn>
          </BtnWrapper>
        </S.ResultBox>
      </S.Container>
    </>
  );
};

export default JoinComplete;
