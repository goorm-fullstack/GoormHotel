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

const FindIdResult = () => {
  return (
    <>
      <Container>
        <PageTitle>아이디 찾기</PageTitle>
        <ResultBox>
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
        </ResultBox>
      </Container>
    </>
  );
};

export default FindIdResult;
