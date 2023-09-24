import React from 'react';
import { styled } from 'styled-components';
import { BtnWrapper, SubmitBtn, PageTitle, LinkBtn, commonContainerStyle } from '../../components/common/commonStyles';

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
`;

const JoinComplete = () => {
  return (
    <>
      <Container>
        <PageTitle>회원가입 완료</PageTitle>
        <ResultBox>
          <h3>홍구름님, 환영합니다!</h3>
          <p>
            이제 구름 호텔 멤버십 회원으로서
            <br />더 큰 혜택과 편리함을 누려보세요.
          </p>
          <BtnWrapper className="mt40 double">
            <SubmitBtn>로그인</SubmitBtn>
            <LinkBtn to="/">메인 페이지로 이동</LinkBtn>
          </BtnWrapper>
        </ResultBox>
      </Container>
    </>
  );
};

export default JoinComplete;
