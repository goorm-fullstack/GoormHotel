import React, { useEffect, useState } from 'react';
import * as S from './Style';
import { PageTitle, ContentsTitleXSmall, AuthBtn, Auth, BtnWrapper, SubmitBtn } from '../../Style/commonStyles';
import Coupon from '../../components/Coupon/Coupon';
import { Link, useNavigate } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import MemberCheck from '../../components/MemberCheck';

interface Member {
  name: string;
  email: string;
  memberId: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birth: number[];
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
  code?: string;
}

const Mypage = () => {
  const [member, setMember] = useState<Member>({
    name: '',
    email: '',
    memberId: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    birth: [],
    gender: '',
    code: '',
  });
  const [findMemberData, setFindMemberData] = useState<FindMemberDTO>({ memberId: '', name: '', email: '' });
  const [isPasswordChanged, setPasswordChanged] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let finalValue: any = value;
    if (name === 'birth') {
      finalValue = value.split('-').map((n) => Number(n));
    }
    if (name === 'password') {
      setPasswordChanged(true);
    }
    setMember({ ...member, [name]: finalValue });
  };

  // 마이페이지 로딩
  useEffect(() => {
    const fetchMemberInfo = async () => {
      const storedMemberId = localStorage.getItem('memberId');
      if (storedMemberId) {
        try {
          const response = await Instance.get(`/member/api/${storedMemberId}`);
          if (response.status === 200) {
            const { password, ...otherData } = response.data;
            console.log(otherData);
            setMember(otherData);
            setCouponList(otherData.couponList);
            setFindMemberData({ memberId: otherData.memberId, name: otherData.name, email: otherData.email });
          }
        } catch (error: any) {
          alert('로그인 상태가 아니거나 회원이 없습니다.');
        }
      }
    };
    fetchMemberInfo();
  }, []);

  // 회원정보 수정 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // birth 배열을 문자열로 변환
    const birthString = member.birth.map((n) => n.toString().padStart(2, '0')).join('-');

    if (isPasswordChanged && !member.code) {
      alert('비밀번호를 변경하려면 인증번호가 필요합니다.');
      return;
    }

    try {
      const payload = isPasswordChanged ? { ...member, birth: birthString, needCodeValidation: true } : { ...member, birth: birthString };
      console.log('Sending payload: ', payload);
      const response = await Instance.put<Member>(`/member/api/change-member/${member.memberId}`, payload);

      if (response.status === 200) {
        navigate('/mypage');
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
  const handleCodeRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!findMemberData.email || !findMemberData.memberId || !findMemberData.name) {
      console.log('findMemberData: ', findMemberData);
      alert('필수 입력 값을 모두 입력해주세요.');
      return;
    }
    try {
      const response = await Instance.post<RequestCode>('/api/mail/changepw-code', findMemberData);
      if (response.status === 200) {
        console.log(findMemberData);
        alert('인증 코드가 발송되었습니다.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.log(findMemberData);
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
              <input name="password" placeholder="비밀번호" type="password" onChange={handleChange} value={member.password} />
              <input name="confirmPassword" placeholder="비밀번호 확인" type="password" onChange={handleChange} value={member.confirmPassword} />
              <input name="name" placeholder="이름" onChange={handleChange} value={member.name} />
              <Auth>
                <input name="email" placeholder="이메일" onChange={handleChange} value={member.email} />
                <AuthBtn onClick={handleCodeRequest}>인증번호 요청</AuthBtn>
              </Auth>
              <input name="code" placeholder="인증번호를 입력하세요." onChange={handleChange} value={member.code} />
              <input name="phoneNumber" placeholder="연락처" onChange={handleChange} value={member.phoneNumber} />
              <input name="birth" placeholder="생년월일(선택입력)" onChange={handleChange} value={member.birth ? member.birth.join('-') : ''} />
              <input name="gender" placeholder="성별(선택입력)" onChange={handleChange} value={member.gender} />
              <BtnWrapper className="mt20 full">
                <SubmitBtn onClick={handleSubmit}>회원 정보 수정</SubmitBtn>
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
              <ContentsTitleXSmall>작성한 글 확인</ContentsTitleXSmall>
              <p>
                작성한 게시글, 댓글을 확인할 수 있습니다.
                <Link to="/myboard/1">자세히보기</Link>
              </p>
            </div>
            <div>
              <ContentsTitleXSmall>멤버십 쿠폰</ContentsTitleXSmall>
              <Coupon grade="bronze" couponList={couponList} />
              <ul className="guide">
                <li>⁕&nbsp;&nbsp;상기 멤버십 서비스 혜택은 변경 및 종료될 수 있습니다.</li>
                <li>⁕&nbsp;&nbsp;특전의 세부 이용 조건은 약관을 통해 확인하실 수 있습니다.</li>
                <li>⁕&nbsp;&nbsp;등급 심사는 매월 1일 진행되며 최근 2년 간의 실적을 기준으로 합니다.</li>
              </ul>
            </div>
          </div>
        </S.Mypage>
      </S.Container>
      <MemberCheck />
    </>
  );
};

export default Mypage;
