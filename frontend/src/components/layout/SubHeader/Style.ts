import styled from 'styled-components';

export const SubHeader = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
  position: fixed;
  width: 100%;
  min-width: ${(props) => props.theme.wrapper.minwidth};
  background-color: white;
  z-index: 1000;
  padding: 0 40px;
  top: 120px;

  h2 {
    // 타이틀: GNB 기준 페이지명
    font-size: ${(props) => props.theme.font.sizem};
    font-weight: 500;
    width: 191px;
    margin-right: 45px;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 0 40px;
  }

  li a {
    // 하위 페이지 nav
    font-size: ${(props) => props.theme.font.sizes};
    color: ${(props) => props.theme.colors.graylight};
  }

  li a:hover,
  li a.active {
    color: ${(props) => props.theme.colors.goldhover};
  }
`;
