import styled from 'styled-components';

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
  color: #008000;
`;
