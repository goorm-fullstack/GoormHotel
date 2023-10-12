import styled from 'styled-components';
import { commonAdminContainer, commonContentsStyle } from '../../Style/commonStyles';

export const AdminContainer = styled(commonAdminContainer)``;

export const Container = styled(commonContentsStyle)`
  & > h3 {
    border-bottom: 1px solid ${(props) => props.theme.colors.graylightborder};
    padding-bottom: 20px;
    margin-bottom: 32px;
    font-size: ${(props) => props.theme.font.sizem};
    font-weight: bold;
    color: ${(props) => props.theme.colors.goldhover};
    margin-top: 80px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export const MenuWrap = styled.ul`
  li {
    line-height: 1.8;
  }

  a {
    color: ${(props) => props.theme.colors.graydark};

    &:hover {
      color: ${(props) => props.theme.colors.charcoal};
    }
  }
`;

export const Sitemap = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 100px 32px;

  & > li {
    width: calc((1180px - (32px * 4)) / 5);

    h4 {
      font-weight: 500;
      color: ${(props) => props.theme.colors.charcoal};
      padding-top: 14px;
      margin-bottom: 20px;
    }
  }
`;

export const Latest = styled.ul`
  display: flex;
  column-gap: 28px;
  justify-content: space-between;

  & > li {
    width: calc((1180px - (28px * 2)) / 3);
    padding: 28px 22px;
    background-color: ${(props) => props.theme.colors.graybg};
    border-radius: 5px;

    h4 {
      font-weight: 500;
      color: ${(props) => props.theme.colors.charcoal};
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;

      a {
        font-size: ${(props) => props.theme.font.sizexxs};
        letter-spacing: -0.02em;
        color: ${(props) => props.theme.colors.graylight};
        text-decoration: underline;
      }
    }
  }
`;

export const LatestList = styled.ul`
  li {
    width: 100%;
    overflow: hidden;
    line-height: 1.8;
    font-size: ${(props) => props.theme.font.sizes};
    letter-spacing: -0.01em;
    position: relative;
    padding-left: 12px;
    display: flex;
    justify-content: space-between;

    &::before {
      content: '';
      display: block;
      width: 3px;
      height: 3px;
      background-color: ${(props) => props.theme.colors.goldhover};
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      border-radius: 50%;
    }

    span {
      font-size: ${(props) => props.theme.font.sizexs};
      color: ${(props) => props.theme.colors.graylight};
    }

    p {
      width: 70%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      a:hover {
        text-decoration: underline;
      }
    }
  }
`;
