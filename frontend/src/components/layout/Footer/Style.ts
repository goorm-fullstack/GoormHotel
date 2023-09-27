import styled from 'styled-components';
import { commonWrapperStyle } from '../../common/commonStyles';
import instagramImg from '../../../images/common/social_instagram.png';
import youtubeImg from '../../../images/common/social_youtube.png';
import owlImg from '../../../images/common/social_owl.png';
import instagramImgHover from '../../../images/common/social_instagram_hover.png';
import youtubeImgHover from '../../../images/common/social_youtube_hover.png';
import owlImgHover from '../../../images/common/social_owl_hover.png';

export const Footer = styled.div`
  margin-top: 150px;
  width: 100%;
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.graylight};

  .subscription {
    // 구독신청
    background-color: ${(props) => props.theme.colors.graybg};
    padding: 60px 0;
    width: 100%;

    form {
      display: flex;
      justify-content: space-between;
    }

    h3 {
      width: 240px;
      font-size: ${(props) => props.theme.font.sizel};
      line-height: 50px;
      color: ${(props) => props.theme.colors.goldhover};
      font-family: ${(props) => props.theme.font.family};
    }

    input {
      width: 715px;
      height: 50px;
      color: ${(props) => props.theme.colors.graylight};
      margin-bottom: 10px;
      padding-left: 16px;
    }

    p {
      font-size: ${(props) => props.theme.font.sizexs};
      display: flex;
      align-items: center;
      letter-spacing: -0.02em;

      a {
        padding: 4px 6px;
        background-color: ${(props) => props.theme.colors.navy};
        color: white;
        font-size: ${(props) => props.theme.font.sizexxxs};
        margin-left: 10px;
      }
    }
  }

  .company {
    // 검은 배경 cs, 회사 정보 영역 container
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.charcoal};
  }

  .footerinfo {
    padding: 50px 0;

    .infoinner {
      // 검은 배경 cs, 회사 정보 영역 inner

      display: flex;
      justify-content: space-between;

      & > div {
        min-width: 380px;
      }
    }

    &.cs {
      border-bottom: 1px solid #2c2b29;

      .social {
        display: inline-block;
        width: 34px;
        height: 34px;
        background-size: cover;
        background-image: url('${instagramImg}');

        &:hover {
          background-image: url('${instagramImgHover}');
        }

        &:not(:last-child) {
          margin-right: 25px;
        }

        &.youtube {
          width: 22px;
          background-image: url('${youtubeImg}');

          &:hover {
            background-image: url('${youtubeImgHover}');
          }
        }

        &.trip {
          width: 54px;
          background-image: url('${owlImg}');

          &:hover {
            background-image: url('${owlImgHover}');
          }
        }
      }

      h3 {
        // cs, social 타이틀
        margin-bottom: 28px;
        font-weight: bold;
        color: ${(props) => props.theme.colors.goldhover};
      }

      ul {
        // cs 정보
        display: flex;
        margin-bottom: 16px;

        &.tel,
        & > li a:hover {
          color: white;
        }
        &.tel li {
          display: flex;
          align-items: center;
        }
        &.tel a {
          font-size: ${(props) => props.theme.font.sizem};
          margin-left: 10px;
        }
        & > li {
          margin-right: 25px;
        }
        & > li a {
          margin-left: 5px;
        }
      }
    }

    &.coinfo {
      // footer 링크
      ul {
        display: grid;
        grid-template-columns: 140px 140px;
        padding-right: 60px;

        li {
          line-height: 1.7;
        }
        a:hover {
          color: white;
        }
      }

      // 회사 정보
      .infowrap {
        line-height: 1.7;
        width: calc(100% - 320px);

        a:hover {
          color: white;
        }
        span {
          margin-right: 10px;
        }
      }
    }
  }
`;

export const Inner = styled(commonWrapperStyle)``;
