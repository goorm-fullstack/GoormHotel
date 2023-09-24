import React from 'react';
import { styled } from 'styled-components';

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

const Paging = () => {
  return (
    <PageParam>
      <li className="sideParam">
        <a href="#">«</a>
      </li>
      {/** loop */}
      <li>
        <a href="#">1</a>
      </li>
      <li>
        <a href="#">2</a>
      </li>
      <li>
        <a href="#">3</a>
      </li>
      <li>
        <a href="#">4</a>
      </li>
      <li className="selected">
        <a href="#">5</a>
      </li>
      <li>
        <a href="#">6</a>
      </li>
      <li>
        <a href="#">7</a>
      </li>
      <li>
        <a href="#">8</a>
      </li>
      <li>
        <a href="#">9</a>
      </li>
      <li>
        <a href="#">10</a>
      </li>
      {/** // loop */}
      <li className="sideParam">
        <a href="#">»</a>
      </li>
    </PageParam>
  );
};

export default Paging;
