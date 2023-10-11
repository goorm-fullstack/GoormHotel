import React, { useState } from 'react';
import * as S from './Style';
import { PageTitle, ContentsTitleXSmall, AuthBtn, Auth, BtnWrapper, SubmitBtn } from '../../Style/commonStyles';
import Coupon from '../../components/Coupon/Coupon';
import { Link, useNavigate } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';

interface Member {
  name: string;
  email: string;
  memberId: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birth: string;
  gender: string;
  code?: string;
}

interface RequestCode {
  code: string;
}

interface FindMemberDTO {
  memberId: string;
  name: string;
  email: string;
}

const Mypage = () => {
  const [member, setMember] = useState<Member>({name: '', email: '', memberId: '', password: '',
    confirmPassword: '', phoneNumber: '', birth: '', gender: ''});
  const [findMemberData, setFindMemberData] = useState<FindMemberDTO>({ memberId: '', name: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

// 회원정보 수정 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Instance.post<Member>(`/api/member/${member.memberId}`, member);
      if (response.status === 200) {
        alert('회원정보 수정이 완료되었습니다');
        navigate('/mypage', { state: { memberId: response.data, name: member.memberId } });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원이 없습니다');
      } else {
        alert('에러 발생');
      }
    }
  };

  // 인증번호 요청
  const handleCodeRequest = async () => {
    try {
      const response = await Instance.post<RequestCode>('/api/mail/findpw-code', findMemberData);
      if (response.status === 200) {
        alert('인증 코드가 발송되었습니다.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원이 없습니다');
      } else {
        alert('에러 발생');
      }
    }
  };

  return (
    <>
      <S.Container>
        <PageTitle>마이페이지</PageTitle>
        <S.Mypage>
          <div className="editinfo">
            <ContentsTitleXSmall>회원 정보 수정</ContentsTitleXSmall>
            <form>
              <input name="memberId" placeholder="아이디" onChange={handleChange} value={member.memberId} />
              <input name="password" placeholder="비밀번호" onChange={handleChange} value={member.password} />
              <input name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} value={member.confirmPassword} />
              <input name="name" placeholder="이름" onChange={handleChange} value={member.name} />
              <Auth>
                <input name="email" placeholder="이메일" onChange={handleChange} value={member.email} />
                <AuthBtn>인증번호 요청</AuthBtn>
              </Auth>
              <input name="code" placeholder="인증번호를 입력하세요." onChange={handleChange} value={member.code} />
              <input name="phoneNumber" placeholder="연락처" onChange={handleChange} value={member.phoneNumber} />
              <input name="birth" placeholder="생년월일(선택입력)" onChange={handleChange} value={member.birth} />
              <input name="gender" placeholder="성별(선택입력)" onChange={handleChange} value={member.gender} />
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
