import styled from 'styled-components';
import Slider from 'react-slick';
import { ReactComponent as SideMenuIcon } from '../../images/icon/ico_slide_btn.svg';

export const Container = styled.div`
  width: 100%;

  .slidetext {
    // index 슬라이드 문구
    width: 100%;
    min-width: ${(props) => props.theme.wrapper.minwidth};
    text-align: center;
    position: absolute;
    margin-top: 44vh;
    color: #ffffff;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);

    h2 {
      font-family: ${(props) => props.theme.font.family};
      font-size: 56px;
      text-align: center;
      letter-spacing: 0.08em;
    }

    p {
      margin-top: 40px;
      font-size: ${(props) => props.theme.font.sizesl};
      letter-spacing: -0.01em;
      font-weight: 300;
    }
  }

  .slidebtn {
    // 슬라이드 버튼
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    background: transparent;
    transform: translate(0, -45%);

    &.right {
      right: 28px;
    }

    &.left {
      left: 28px;
    }
  }

  .imgcontainer {
    // 슬라이드 이미지 컨테이너
    display: flex;
    transition: transform 0.5s ease-in-out;

    li {
      // 개별 이미지 wrapper
      position: absolute;
      width: 100%;
      min-width: ${(props) => props.theme.wrapper.minwidth};
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 1s ease-in-out;

      &[data-isactive='true'] {
        // 현재 슬라이드 show
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const SideIcon = styled(SideMenuIcon)`
  // 슬라이드 버튼 svg
  width: 60px;
  height: 60px;

  &.right {
    transform: rotate(180deg);
  }
`;

export const FSlider = styled(Slider)`
  .slick-track {
    height: 500px;
  }

  div {
    height: inherit;
  }

  .slick-list {
    width: 100%;
    margin: 0 auto;

    img {
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }

  .slick-next,
  .slick-prev {
    // 슬라이드 버튼 위치
    bottom: 0;
    width: 65px;
    height: 65px;
    top: auto;
    right: 0;
    transform: translate(0, 0);
    z-index: 10;
  }

  .slick-prev {
    left: auto;
    right: 65px;
  }

  .slick-prev:before,
  .slick-next:before {
    // 슬라이드 버튼 스타일
    cursor: pointer;
    content: '';
    display: block;
    width: 65px;
    height: 65px;
    opacity: 1;
    transition: 0.2s all ease-in-out;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40%;
  }

  .slick-prev:before {
    background-color: #21201e;
    background-image: url('data:image/svg+xml;utf8,<svg  height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon fill="white" points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 "/></svg>');
  }
  .slick-prev:hover:before {
    background-color: #333;
  }

  .slick-next:before {
    background-color: #fff;
    background-image: url('data:image/svg+xml;utf8,<svg height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon fill="black" points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "/></svg>');
  }

  .slick-next:hover:before {
    background-color: #f0f0f0;
  }
`;
