import styled from 'styled-components';

export const PageParam = styled.ul`
  text-align: center;
  margin-top: 60px;

  li {
    display: inline-block;
    margin: 0 2px;
  }

  li a {
    display: inline-block;
    padding: 0 7px;
    border-radius: 100%;
    height: ${(props) => props.theme.font.sizel};
    line-height: ${(props) => props.theme.font.sizesl};
    color: ${(props) => props.theme.colors.graydark};
  }
  li.selected a {
    color: ${(props) => props.theme.colors.goldhover};
    text-decoration: underline;
  }
  li a:hover {
    text-decoration: underline;
  }
  li.sideParam {
    margin: 0 8px;
  }
  li.sideParam a {
    width: ${(props) => props.theme.font.sizel};
    border: 1px solid ${(props) => props.theme.colors.gold};
    color: ${(props) => props.theme.colors.goldhover};
  }
  li.sideParam a:hover {
    text-decoration: none;
  }
`;
