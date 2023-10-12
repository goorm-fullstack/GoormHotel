import styled from 'styled-components';
import { ReactComponent as SideMenuIcon } from '../../images/icon/ico_slide_btn.svg';

export const AdminHeader = styled.header`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.charcoal};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  padding: 0 40px;
  min-width: ${(props) => props.theme.wrapper.minwidth};

  h1 {
    margin-right: 45px;
  }

  ul.nav {
    display: flex;
    column-gap: 40px;
    color: #ffffff;
    flex: 1;

    li a:hover {
      color: ${(props) => props.theme.colors.gold};
    }
  }

  ul.right {
    display: flex;
    align-items: center;
    column-gap: 20px;
    font-size: ${(props) => props.theme.font.sizes};

    a {
      color: #bbb;
      font-size: ${(props) => props.theme.font.sizexs};
      text-decoration: underline;

      &:hover {
        color: white;
      }
    }

    li.manager {
      color: #ffffff;
      margin-left: 10px;
      display: flex;
      align-items: center;
      column-gap: 8px;
    }
  }

  .logoutbtn {
    border: 1px solid white;
    border-radius: 30px;
    height: 32px;
    line-height: 30px;
    background-color: transparent;
    color: white;
    width: 90px;
    font-size: ${(props) => props.theme.font.sizexs};
    margin-left: 8px;

    &:hover {
      color: ${(props) => props.theme.colors.gold};
      border-color: ${(props) => props.theme.colors.gold};
    }
  }
`;

export const AdminContainer = styled.div`
  .pagecontents {
    padding: 200px 40px 100px 316px;
  }
`;

export const SideMenu = styled.div`
  width: 276px;
  height: calc(100vh - 100px);
  position: fixed;
  left: 0;
  top: 100px;
  bottom: 0;
  border-right: 1px solid ${(props) => props.theme.colors.grayborder};

  h2 {
    font-size: ${(props) => props.theme.font.sizem};
    font-weight: 500;
    height: 70px;
    line-height: 70px;
    padding: 0 40px;
    border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
    color: ${(props) => props.theme.colors.charcoal};
  }

  ul.menulist {
    width: 100%;
    padding: 32px 40px;

    li {
      margin-bottom: 18px;

      a {
        display: flex;
        justify-content: space-between;
        color: ${(props) => props.theme.colors.graydark};

        &:hover,
        &.active {
          color: ${(props) => props.theme.colors.goldhover};
        }

        path {
          stroke: ${(props) => props.theme.colors.graydark} !important;
        }

        &:hover path,
        &.active path {
          stroke: ${(props) => props.theme.colors.goldhover} !important;
        }
      }
    }
  }
`;

export const SideIcon = styled(SideMenuIcon)`
  transform: rotate(180deg);
`;
