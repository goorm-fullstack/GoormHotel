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
    padding: 0 8px;
    border-radius: 100%;
    height: 1.6rem;
    line-height: 1.3rem;
    color: #666;
  }
  li.selected a {
    color: #baa085;
    text-decoration: underline;
  }
  li a:hover {
    text-decoration: underline;
  }
  li.sideParam {
    margin: 0 8px;
  }
  li.sideParam a {
    border: 1px solid #baa085;
    color: #baa085;
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