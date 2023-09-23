import React from 'react';
import { styled } from 'styled-components';
import { BtnWrapper, SubmitBtn, PageTitle, commonContainerStyle } from '../../components/common/commonStyles';

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

  form {
    width: 400px;
    margin: 40px auto 0;
  }

  input {
    width: 100%;
    height: 50px;
    display: block;
    margin-top: 10px;
    padding-left: 12px;
  }

  input:first-child {
    margin-top: 0;
  }
`;

const FindPwResult = () => {
  return (
    <>
      <Container>
        <PageTitle>비밀번호 찾기</PageTitle>
        <ResultBox>
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
        </ResultBox>
      </Container>
    </>
  );
};

export default FindPwResult;
