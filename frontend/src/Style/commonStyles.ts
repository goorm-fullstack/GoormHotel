import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const commonContainerStyle = styled.div`
  // 레이아웃용 컨테이너
  width: ${(props) => props.theme.wrapper.minwidth};
  margin: 0 auto;
  padding: 280px 40px 0;
`;

export const commonAdminContainer = styled(commonContainerStyle)`
  // 레이아웃용 컨테이너
  padding-top: 200px;
  padding-bottom: 100px;
`;

export const commonAdminContents = styled.div`
  // 어드민 레이아웃
  width: 100%;
  max-width: ${(props) => props.theme.wrapper.minwidth};
  min-width: 760px;
  margin: 0 auto;
`;

export const commonWrapperStyle = styled(commonContainerStyle)`
  // 레이아웃
  padding: 0 40px;
`;

export const commonContentsStyle = styled.div`
  // 레이아웃
  width: ${(props) => props.theme.wrapper.contents};
  margin: 0 auto;
`;

export const PageTitle = styled.h2`
  // 페이지 타이틀
  color: ${(props) => props.theme.colors.black};
  font-weight: 500;
  font-size: ${(props) => props.theme.font.sizexxl};
  margin-bottom: 80px;
`;

export const ContentsTitle = styled.h3`
  // 콘텐츠 타이틀(폰트 큰 사이즈)
  font-size: ${(props) => props.theme.font.sizexxl};
  color: ${(props) => props.theme.colors.charcoal};
  margin-bottom: 40px;

  &.center {
    // 중앙정렬일 때 클래스명 추가
    text-align: center;
  }
`;

export const ContentsTitleSmall = styled(ContentsTitle)`
  // 콘텐츠 타이틀(폰트 작은 사이즈)
  font-size: ${(props) => props.theme.font.sizel};
`;

export const ContentsTitleXSmall = styled(ContentsTitle)`
  // 콘텐츠 타이틀(폰트 제일 작은 사이즈)
  font-size: ${(props) => props.theme.font.default};
  font-weight: 500;
  margin-bottom: 30px;
`;

export const RequiredTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => props.theme.font.sizexs};
  margin-bottom: 16px;
  font-weight: normal;

  span {
    color: ${(props) => props.theme.colors.red};
  }
`;

export const CheckLabel = styled.label`
  // 체크 박스 선택 옵션명 있을 때 같이 사용
  color: ${(props) => props.theme.colors.graylight};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizexs};

  input {
    margin-right: 8px;
  }
`;

export const InputCheckbox = styled.input`
  // 체크 박스
  width: 16px;
  height: 18px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='lightgray' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  margin: 0;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: ${(props) => props.theme.colors.navy};
    border-color: ${(props) => props.theme.colors.navy};
  }
`;

export const BtnWrapper = styled.div`
  // 버튼 중앙 정렬, 여백 등 필요할 때 부모 요소로 사용
  &.center {
    // 중앙정렬
    text-align: center;
  }
  &.right {
    // 우측정렬
    text-align: right;
  }

  // 상단 여백
  &.mt40 {
    margin-top: 40px;
  }
  &.mt30 {
    margin-top: 30px;
  }
  &.mt20 {
    margin-top: 20px;
  }
  &.mt10 {
    margin-top: 20px;
  }

  // 버튼 두개 한 줄에 정렬할 때: 작성/취소 등의 경우
  &.double > button,
  &.double > a {
    margin: 0 5px;
  }

  // 버튼 width: 100%로 한 줄에 꽉 차는 경우
  &.full > button,
  &.full > a {
    width: 100%;
  }

  // 버튼 또는 그 외 다른 요소와 양 끝 정렬일 때
  &.flexspace {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // 여러 버튼이 있는 경우
  &.flexgap {
    display: flex;
    column-gap: 10px;

    &.right {
      justify-content: flex-end;
    }
  }
`;

export const commonLinkBtn = styled(Link)`
  // a 태그 버튼 공통 스타일: 단순 페이지 이동 목적일 때 사용
  font-size: ${(props) => props.theme.font.sizes};
  width: 200px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  text-align: center;

  &.height60 {
    // 세로 사이즈 60px 버튼
    height: 60px;
    line-height: 58px;
  }

  &.shadow {
    // 그림자 추가(사용자 예약쪽에서만 강조 목적으로 사용)
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
  }

  &.mini {
    // 작은 버튼
    width: 80px;
    height: 32px;
    line-height: 30px;
    font-size: ${(props) => props.theme.font.sizexs};
  }

  &.header {
    // 테이블 상단에 사용하는 버튼
    width: 140px;
    height: 40px;
    line-height: 40px;
    font-size: ${(props) => props.theme.font.sizexs};
  }
`;

export const CloseButton = styled.button`
  border: 1px solid #ddd;
  background: white;
  color: #666;
  padding: 6px 16px;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const commonButton = styled.button`
  // button 태그 버튼 공통 스타일: 클릭 후 액션이 필요할 때 사용
  // 이하 a 태그와 유사
  font-size: ${(props) => props.theme.font.sizes};
  width: 200px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  text-align: center;

  &.height60 {
    height: 60px;
    line-height: 60px;
  }

  &.shadow {
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
  }

  &.mini {
    width: 80px;
    height: 32px;
    line-height: 30px;
    font-size: ${(props) => props.theme.font.sizexs};
  }

  &.header {
    width: 140px;
    height: 40px;
    line-height: 40px;
    font-size: ${(props) => props.theme.font.sizexs};
  }

  &.search {
    width: 80px !important;
  }

  &.withinput {
    // table 안에서 input 옆에 같이 사용
    width: 80px;
    height: 36px;
    line-height: 34px;
    margin-left: 8px;
    border: 1px solid ${(props) => props.theme.colors.gold};
    color: ${(props) => props.theme.colors.goldhover};
  }
`;

export const LinkBtn = styled(commonLinkBtn)`
  // LinkBtn 기본 스타일: 선 gold, hover 배경색 채워짐, 보통 submit 버튼과 같이 취소 버튼 등으로 사용
  border: 1px solid ${(props) => props.theme.colors.gold};
  color: ${(props) => props.theme.colors.goldhover};

  &:hover {
    background-color: ${(props) => props.theme.colors.gold};
    color: white;
  }

  &.red {
    // 사용에 주의 필요한 버튼들, 붉게 강조
    border-color: ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.colors.red};

    &:hover {
      background-color: white;
      color: ${(props) => props.theme.colors.red};
    }
  }
`;

export const SubmitLinkBtn = styled(commonLinkBtn)`
  // submit처럼 보이지만 단순 링크 이동인 경우 사용
  background-color: ${(props) => props.theme.colors.gold};
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }
`;

export const NormalBtn = styled(commonButton)`
  // button 기본 스타일, 대부분의 경우 해당
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 40px;

  &:hover {
    border-color: ${(props) => props.theme.colors.gold};
    color: ${(props) => props.theme.colors.goldhover};
  }

  &.red {
    // 사용에 주의 필요한 버튼들, 붉게 강조
    border-color: ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.colors.red};
  }

  &.header {
    // table header 버튼들 또는 height 40이면서 선스타일인 경우에 사용
    line-height: 38px;
  }
`;

export const NormalLinkBtn = styled(commonLinkBtn)`
  // NormalBtn a태그 버전
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 40px;

  &:hover {
    border-color: ${(props) => props.theme.colors.gold};
    color: ${(props) => props.theme.colors.goldhover};
  }

  &.red {
    border-color: ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.colors.red};
  }

  &.header {
    line-height: 38px;
  }
`;

export const SubmitBtn = styled(commonButton)`
  background-color: ${(props) => props.theme.colors.gold};
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }

  &.header {
    width: 200px;
    font-size: ${(props) => props.theme.font.sizes};
  }
`;

export const MoreLink = styled(commonLinkBtn)`
  // 자세히보기 a태그 버튼 스타일: 화살표 있음
  background-color: ${(props) => props.theme.colors.gold};
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="white" width="15"><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" /></g></svg>');
  background-repeat: no-repeat;
  background-position: 87% center;
  color: white;
  padding-left: 20px;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }
`;

export const MoreBtn = styled(commonButton)`
  // 자세히보기 button 태그 버튼 스타일: 화살표 있음
  background-color: ${(props) => props.theme.colors.gold};
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="white" width="15"><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" /></g></svg>');
  background-repeat: no-repeat;
  background-position: 87% center;
  color: white;
  padding-left: 20px;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldhover};
  }
`;

export const CircleCloseBtn = styled(commonButton)`
  // 동그란 X 버튼, 선색 gold
  background-color: white;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="rgb(156,131,106)"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  border: 1px solid ${(props) => props.theme.colors.gold};
  border-radius: 50%;
  width: 24px;
  height: 24px;

  &.small {
    width: 18px;
    height: 18px;
  }
`;

export const Auth = styled.div`
  // 인증 버튼 wrapper
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  button {
    width: 120px;
    height: 50px;
    line-height: 48px;
  }

  & > input {
    width: 380px;
  }
`;

export const AuthBtn = styled(commonButton)`
  // 인증 버튼
  border: 1px solid ${(props) => props.theme.colors.charcoal};
  background: white;
  color: ${(props) => props.theme.colors.charcoal};
  line-height: 40px;
  letter-spacing: -0.02em;

  &:hover {
    background-color: ${(props) => props.theme.colors.charcoal};
    color: white;
  }
`;

export const MultiCheck = styled.div`
  // 다중 체크박스 옵션이 있는 경우 wrapper
  display: flex;
  column-gap: 16px;
  align-items: center;
  padding: 9px 0;

  &.fit {
    padding: 0;
  }
`;

export const commonTable = styled.table`
  // 테이블 스타일
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.charcoal};

  th {
    border-top: 1px solid ${(props) => props.theme.colors.charcoal};
    border-bottom: 1px solid ${(props) => props.theme.colors.graylightborder};
    font-weight: 500;
    background: ${(props) => props.theme.colors.graybg};
    color: ${(props) => props.theme.colors.charcoal};
  }
  th,
  td {
    padding: 16.5px 12px;
    vertical-align: middle;
  }
  td {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    color: ${(props) => props.theme.colors.blacklight};

    input[type='text'],
    input[type='password'],
    input[type='email'],
    input[type='tel'],
    input[type='date'],
    select {
      height: 36px;
      min-width: 240px;
      padding-left: 12px;
    }

    select {
      background-position: 96% center;
    }

    &.empty {
      // 데이터가 없는 경우 td에 추가
      padding: 19px 12px;
    }

    &.commonetwrap {
      position: relative;
    }
  }
  td.center {
    // 텍스트 중앙 정렬
    text-align: center;
  }
  tr:hover th,
  tr:hover td {
    background-color: ${(props) => props.theme.colors.graybg};
  }

  &.horizontal {
    // 게시글 작성 등 형태의 테이블에 classname 추가: 한 줄에 왼쪽 th, 오른쪽 td 레이아웃
    tr:last-child th {
      border-bottom-color: ${(props) => props.theme.colors.charcoal};
    }
    tr:first-child td {
      border-top-color: ${(props) => props.theme.colors.charcoal};
    }
    tr.conbtm th,
    tr.conbtm td {
      border-top-color: ${(props) => props.theme.colors.graylightborder};
    }
    td {
      padding-top: 9px;
      padding-bottom: 9px;

      &.header {
        background-color: ${(props) => props.theme.colors.graybg};
        border-top-color: ${(props) => props.theme.colors.grayborder};
        font-weight: 500;
        color: ${(props) => props.theme.colors.charcoal};
      }

      &.text {
        // input이 안 들어가있는 경우 추가해서 행 세로 사이즈 맞추는 용도
        padding: 16.5px 12px;
      }

      &.writeWrapper {
        // 텍스트 에디터 들어 있거나 td 칸에 꽉 차게 무언가 넣어야 하는 경우 td에 추가
        padding: 0;
        border-top-color: ${(props) => props.theme.colors.grayborder};
      }
    }
    th {
      text-align: center;

      &.innerheader {
        border-top-color: ${(props) => props.theme.colors.graylightborder};
      }
    }
    tr:hover td {
      background-color: white;

      &.header {
        background-color: ${(props) => props.theme.colors.graybg};
      }
    }
  }

  .textover {
    // 텍스트가 많은 경우 ...으로 텍스트 줄임
    width: 100%;
    max-width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .mailcheck {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graydark};
    padding-left: 12px;
    letter-spacing: -0.01em;
  }

  button {
    background-color: transparent;
  }

  &.userpage {
    // 사용자 페이지는 한 행 세로 사이즈 다르므로 추가
    th,
    td {
      padding: 19px 12px;
    }
  }

  a.u,
  button.u {
    text-decoration: underline;
  }
`;

// 첨부 파일 이미지 선택 및 미리보기
export const SelectImage = styled.div`
  background-color: ${(props) => props.theme.colors.graybg};
  background-image: url('data:image/svg+xml;utf8,<svg id="Layer_1" version="1.1" fill="silver" viewBox="0 0 80 70" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><g id="Layer_2"><g id="Layer_3"><path d="M5.4,5.6v58.8h69.1V5.6H5.4z M71.6,61.4H8.4V8.6h63.1V61.4z"/><polygon points="28.3,27.7 39,38.4 41.2,36.3 28.3,23.4 15.4,36.3 17.6,38.4   "/><polygon points="41.8,27.7 62.3,48.2 64.4,46.1 41.8,23.4 35.3,29.9 37.4,32   "/><path d="M59.4,23.1c3,0,5.4-2.4,5.4-5.4s-2.4-5.4-5.4-5.4S54,14.8,54,17.7S56.5,23.1,59.4,23.1L59.4,23.1z M59.4,15.4    c1.3,0,2.4,1.1,2.4,2.4c0,1.3-1.1,2.4-2.4,2.4c-1.3,0-2.4-1.1-2.4-2.4C57,16.4,58.1,15.4,59.4,15.4C59.4,15.3,59.4,15.3,59.4,15.4    L59.4,15.4z"/></g></g></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30%;
  width: 100%;
  height: 240px;
  text-align: center;
  position: relative;

  label {
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
  }

  input[type='file'] {
    width: 0;
    height: 0;
    padidng: 0;
    border: 0;
    overflow: hidden;
    position: absolute;
  }

  .imgwrapper {
    width: 100%;
    height: 100%;
  }

  img {
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

// 중복 검사 결과
const responseMessege = styled.p`
  display: inline-block;
  margin-left: 16px;
  font-size: ${(props) => props.theme.font.sizexs};
`;

// 중복검사 경고 문구
export const RedP = styled(responseMessege)`
  color: #ec5353;
`;

// 중복검사 성공 문구
export const GreenP = styled(responseMessege)`
  color: #111;
`;
