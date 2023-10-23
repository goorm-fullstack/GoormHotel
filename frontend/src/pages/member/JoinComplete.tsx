import React from 'react';
import * as S from './Style';
import { BtnWrapper, PageTitle, LinkBtn } from '../../Style/commonStyles';
import { useLocation } from 'react-router-dom';

const JoinComplete = () => {
  const location = useLocation();
  const name = location.state?.name || 'null';

  return (
    <>
      <S.Container>
        <PageTitle>회원가입 완료</PageTitle>
        <S.ResultBox>
          <h3>{name}님, 환영합니다!</h3>
          <p>
            이제 구름 호텔 멤버십 회원으로서
            <br />더 큰 혜택과 편리함을 누려보세요.
          </p>
          <BtnWrapper className="mt40 double">
            <LinkBtn to="/login">로그인</LinkBtn>
            <LinkBtn to="/">메인 페이지로 이동</LinkBtn>
          </BtnWrapper>
        </S.ResultBox>
      </S.Container>
    </>
  );
};

export default JoinComplete;
