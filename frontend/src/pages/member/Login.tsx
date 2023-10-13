import React, { useEffect, useState } from 'react';
import * as S from './Style';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BtnWrapper, SubmitBtn, PageTitle, InputCheckbox, LinkBtn, CheckLabel } from '../../Style/commonStyles';
import kakao from '../../images/icon/ico_kakao.png';
import naver from '../../images/icon/ico_naver.png';
import google from '../../images/icon/ico_google.png';
import Instance from '../../utils/api/axiosInstance';

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const isReservation: boolean = queryParams.get('type') === 'reservation';

  const [isMemberActive, setIsMemberActive] = useState<boolean>(!isReservation);
  const [memberId, setMemberId] = useState<string>('');
  const [memberPassword, setPassword] = useState<string>('');
  const [reservationNumber, setReservationNumber] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [rememberId, setRememberId] = useState<boolean>(false);

  // 쿠키를 파싱하는 함수
  function getCookie(name: string): string | undefined {
    const cookieString = document.cookie;
    console.log(cookieString);
    const cookies = cookieString.split('; ');

    for (let i = 0; i < cookies.length; i++) {
      console.log(cookies[i]);
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
  }
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const loginInfo = {
      memberId: memberId,
      password: memberPassword,
    };
    console.log('로그인 정보:', JSON.stringify(loginInfo));
    try {
      const response = await Instance.post('/login/member', loginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.clear(); //일단 이전 기록을 좀 지우자~
        if (getCookie('role') === 'BLACKED') {
          alert('차단된 회원입니다. 자세한 사항은 고객센터로 문의 바랍니다.');
        } else {
          alert('로그인 성공');
          const memberId = getCookie('memberId');
          const role = getCookie('role');
          if (memberId !== undefined && role !== undefined) {
            localStorage.setItem('memberId', memberId);
            localStorage.setItem('role', role);
          }
          window.location.href = '/';
        }
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      alert('아이디 또는 비밀번호가 일치하지 않습니다. 또는 서버 오류가 발생했습니다.');
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleReservationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationNumber(e.target.value);
  };

  const handleContactNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactNumber(e.target.value);
  };

  const handleMemberClick = () => {
    setIsMemberActive(true);
  };

  const handleNonMemberClick = () => {
    setIsMemberActive(false);
  };

  const handleRememberIdChange = () => {
    setRememberId(!rememberId);
  };

  const ClickAnonymousLogin = () => {};

  useEffect(() => {
    if (isReservation) {
      setIsMemberActive(false);
    }
  }, [isReservation]);

  return (
    <>
      <S.Container>
        <PageTitle>로그인</PageTitle>
        <S.LoginWrapper>
          <div className="left">
            <div className="tab">
              <S.MemberBtn isActive={isMemberActive} onClick={handleMemberClick}>
                회원
              </S.MemberBtn>
              <S.MemberBtn isActive={!isMemberActive} onClick={handleNonMemberClick}>
                비회원(예약확인)
              </S.MemberBtn>
            </div>
            {isMemberActive ? (
              <form id="memberLogin">
                <input type="text" placeholder="아이디" value={memberId} onChange={handleIdChange} />
                <input type="password" className="second" placeholder="비밀번호" value={memberPassword} onChange={handlePwChange} />
                <BtnWrapper className="mt20 full">
                  <SubmitBtn type="submit" onClick={handleLogin}>
                    로그인
                  </SubmitBtn>
                </BtnWrapper>
              </form>
            ) : (
              <form>
                <input type="text" placeholder="예약번호" value={reservationNumber} onChange={handleReservationNumberChange} />
                <input type="text" className="second" placeholder="연락처" value={contactNumber} onChange={handleContactNumberChange} />
                <BtnWrapper className="mt20 full">
                  <SubmitBtn type="submit" onClick={ClickAnonymousLogin}>
                    예약 확인
                  </SubmitBtn>
                </BtnWrapper>
              </form>
            )}
            {isMemberActive && (
              <div className="remember">
                <CheckLabel htmlFor="rememberId">
                  <InputCheckbox type="checkbox" id="rememberId" checked={rememberId} onChange={handleRememberIdChange} />
                  아이디 기억하기
                </CheckLabel>
                <Link to="/findidpw">아이디/비밀번호 찾기</Link>
              </div>
            )}
          </div>
          <div className="right">
            <p className="first">아직 회원이 아니신가요?</p>
            <p className="second">
              회원이 되시면 구름 리워즈 멤버십 회원으로서
              <br />더 큰 혜택과 편리함을 누릴 수 있습니다.
            </p>
            <BtnWrapper className="full">
              <LinkBtn to="/signup">회원가입</LinkBtn>
            </BtnWrapper>
          </div>
        </S.LoginWrapper>
      </S.Container>
    </>
  );
};

export default Login;
