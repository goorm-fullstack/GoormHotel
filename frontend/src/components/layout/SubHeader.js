import React, { useState } from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SubHeaderWrapper = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
  position: fixed;
  width: 100%;
  min-width: ${(props) => props.theme.wrapper.minwidth};
  background-color: white;
  z-index: 99;
  padding: 0 40px;
  top: 120px;

  h2 {
    /* GNB 기준 페이지명 */
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
    /* 하위 페이지명 */
    font-size: ${(props) => props.theme.font.sizes};
    color: ${(props) => props.theme.colors.graylight};
  }

  li a:hover,
  li a.active {
    color: ${(props) => props.theme.colors.goldhover};
  }
`;

const contents = {
  about: {
    pagetitle: '구름호텔 소개',
    nav: [
      {
        title: '호텔 소개',
        linkto: '/about',
      },
      {
        title: '오시는 길',
        linkto: '/location',
      },
    ],
  },
  board: {
    pagetitle: '고객지원',
    nav: [
      {
        title: '공지사항',
        linkto: '/board/notice',
      },
      {
        title: '문의하기',
        linkto: '/board/qna',
      },
      {
        title: '이용후기',
        linkto: '/board/review',
      },
    ],
  },
  agreement: {
    pagetitle: '약관 안내',
    nav: [
      {
        title: '이용약관',
        linkto: '/agreement',
      },
      {
        title: '개인정보처리방침',
        linkto: '/privacy',
      },
    ],
  },
};

const SubHeader = ({ kind }) => {
  return (
    <SubHeaderWrapper>
      <h2>{contents[kind].pagetitle}</h2>
      <ul>
        {contents[kind].nav.map((nav) => (
          <li>
            <NavLink to={nav.linkto} $activeClassName="active">
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </SubHeaderWrapper>
  );
};

export default SubHeader;
