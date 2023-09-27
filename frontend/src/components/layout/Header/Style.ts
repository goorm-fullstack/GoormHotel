import styled from 'styled-components';
import { SubmitLinkBtn } from '../../common/commonStyles';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: ${(props) => props.theme.wrapper.minwidth};
  height: 120px;
  padding: 0 40px;
  z-index: 999;
  background-color: ${(props) => props.theme.colors.charcoal};
  color: white;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);

  &[data-location='/'] {
    // index 페이지 header 배경색 투명도 적용
    background-color: rgba(51, 51, 51, 0.8);
  }

  .topinfo {
    padding: 20px 0;
    display: flex;
    justify-content: right;

    li {
      font-size: ${(props) => props.theme.font.sizexxxs};
      margin-left: 15px;
      color: rgba(255, 255, 255, 0.7);

      &:hover {
        color: white;
      }
    }
  }

  .gnb {
    display: flex;
    justify-content: center;
    align-items: center;

    h1 img {
      // 로고 이미지 사이즈
      width: 191px;
    }

    ul {
      display: flex;
      flex: 1;
      margin-left: 45px;

      li {
        white-space: nowrap;

        &:not(:last-child) {
          margin-right: 40px;
        }

        &:hover {
          color: ${(props) => props.theme.colors.gold};
        }
      }
    }
  }
`;

export const NavReserveBtn = styled(SubmitLinkBtn)`
  // header 예약하기 버튼
  height: 47px;
  line-height: 47px;
  width: 180px;
`;
