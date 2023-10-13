import React from 'react';
import * as S from './Style';
import { PageTitle, ContentsTitleXSmall, AuthBtn, Auth, BtnWrapper, SubmitBtn } from '../../Style/commonStyles';
import Coupon from '../../components/Coupon/Coupon';
import { Link } from 'react-router-dom';

const Mypage = () => {
  return (
    <>
      <S.Container>
        <PageTitle>마이페이지</PageTitle>
        <S.Mypage>
          <div className="editinfo">
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
              <BtnWrapper className="mt20 full">
                <SubmitBtn type="submit">회원 정보 수정</SubmitBtn>
              </BtnWrapper>
            </form>
          </div>
          <div className="right">
            <div className="historyWrapper">
              <ContentsTitleXSmall>예약 내역 확인</ContentsTitleXSmall>
              <p>
                현재까지의 예약 내역을 확인할 수 있습니다.
                <Link to="/myhistory/1">자세히보기</Link>
              </p>
            </div>
            <div className="historyWrapper">
              <ContentsTitleXSmall>나의 활동</ContentsTitleXSmall>
              <p>
                현재까지의 게시글, 댓글의 작성 내용을 확인할 수 있습니다.
                <Link to="/myboard/1">자세히보기</Link>
              </p>
            </div>
            <div>
              <ContentsTitleXSmall>멤버십 쿠폰</ContentsTitleXSmall>
              <Coupon grade="bronze" />
              <ul className="guide">
                <li>⁕&nbsp;&nbsp;상기 멤버십 서비스 혜택은 변경 및 종료될 수 있습니다.</li>
                <li>⁕&nbsp;&nbsp;특전의 세부 이용 조건은 약관을 통해 확인하실 수 있습니다.</li>
                <li>⁕&nbsp;&nbsp;등급 심사는 매월 1일 진행되며 최근 2년 간의 실적을 기준으로 합니다.</li>
              </ul>
            </div>
          </div>
        </S.Mypage>
      </S.Container>
    </>
  );
};

export default Mypage;
