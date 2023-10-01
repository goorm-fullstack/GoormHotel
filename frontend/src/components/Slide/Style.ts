import styled from 'styled-components';
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
