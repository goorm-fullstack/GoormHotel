import React, { useState } from 'react';
import * as S from './Style';
import { NavLink } from 'react-router-dom';
import { StringLiteral } from '@babel/types';

const SubHeaderData = {
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
        linkto: '/board/notice/1',
      },
      {
        title: '문의하기',
        linkto: '/board/qna/1',
      },
      {
        title: '이용후기',
        linkto: '/board/review/1',
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
  facilities: {
    pagetitle: '시설 소개',
    nav: [
      {
        title: '객실',
        linkto: '/rooms',
      },
      {
        title: '다이닝',
        linkto: '/dining',
      },
      {
        title: '부대시설',
        linkto: '/facilities',
      },
    ],
  },
};

type SubHeaderProps = {
  kind: 'facilities' | 'agreement' | 'board' | 'about';
};

const SubHeader = ({ kind }: SubHeaderProps) => {
  return (
      <S.SubHeader>
        <h2>{SubHeaderData[kind].pagetitle}</h2>
        <ul>
          {SubHeaderData[kind].nav.map((nav, index) => (
              <li key={index}>
                <NavLink to={nav.linkto} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {nav.title}
                </NavLink>
              </li>
          ))}
        </ul>
      </S.SubHeader>
  );
};

export default SubHeader;
