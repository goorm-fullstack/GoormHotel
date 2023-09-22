import React from 'react';
import { styled } from 'styled-components';
import { commonContainerStyle, PageTitle, ContentsTitleXSmall, AuthBtn, Auth, BtnWrapper, SubmitBtn } from '../../components/common/commonStyles';
import Coupon from '../../components/Coupon';
import { Link } from 'react-router-dom';

const Container = styled(commonContainerStyle)``;

const Contents = styled.div`
  display: flex;

  & > div {
    width: 50%;
  }
`;

const EditWrapper = styled.div`
  padding-right: 80px;
  border-right: 1px solid ${(props) => props.theme.colors.grayborder};

  input {
    height: 60px;
    padding-left: 18px;
    font-size: ${(props) => props.theme.font.sizes};
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

const RightWrapper = styled.div`
  padding-left: 80px;

  .historyWrapper {
    margin-top: 60px;

    p {
      background-color: ${(props) => props.theme.colors.graybg};
      padding: 25px 20px;
      font-size: ${(props) => props.theme.font.sizes};
      display: flex;
      justify-content: space-between;

      a {
        font-size: ${(props) => props.theme.font.sizexs};
        letter-spacing: -0.02em;
        text-decoration: underline;
        color: ${(props) => props.theme.colors.graylight};
      }
    }
  }
`;

const CouponWrapper = styled.div``;

const GuideText = styled.ul`
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.6;
  margin-top: 20px;
`;

const ModifySubmitBtn = styled(SubmitBtn)`
  width: 100%;
  height: 60px;
  line-height: 60px;
`;

const Mypage = () => {
  return (
    <>
      <Container>
        <PageTitle>마이페이지</PageTitle>
        <Contents>
          <EditWrapper>
            <ContentsTitleXSmall>회원 정보 수정</ContentsTitleXSmall>
            <form>
              <input placeholder="아이디" />
              <input placeholder="비밀번호" />
              <input placeholder="비밀번호 확인" />
              <input placeholder="이름" />
              <Auth>
                <input placeholder="이메일" />
                <AuthBtn>인증번호 요청</AuthBtn>
              </Auth>
              <input placeholder="인증번호를 입력하세요" />
              <input placeholder="연락처" />
              <input placeholder="생년월일(선택입력)" />
              <input placeholder="성별(선택입력)" />
              <BtnWrapper className="mt20">
                <ModifySubmitBtn type="submit">회원 정보 수정</ModifySubmitBtn>
              </BtnWrapper>
            </form>
          </EditWrapper>
          <RightWrapper>
            <div>
              <ContentsTitleXSmall>멤버십 쿠폰</ContentsTitleXSmall>
              <Coupon grade="bronze" />
              <GuideText>
                <li>⁕&nbsp;&nbsp;상기 멤버십 서비스 혜택은 변경 및 종료될 수 있습니다.</li>
                <li>⁕&nbsp;&nbsp;특전의 세부 이용 조건은 약관을 통해 확인하실 수 있습니다.</li>
                <li>⁕&nbsp;&nbsp;등급 심사는 매월 1일 진행되며 최근 2년 간의 실적을 기준으로 합니다.</li>
              </GuideText>
            </div>
            <div className="historyWrapper">
              <ContentsTitleXSmall>예약 내역 확인</ContentsTitleXSmall>
              <p>
                현재까지의 예약 내역을 확인할 수 있습니다.
                <Link to="/reservation/history/:memberid">자세히보기</Link>
              </p>
            </div>
          </RightWrapper>
        </Contents>
      </Container>
    </>
  );
};

export default Mypage;
