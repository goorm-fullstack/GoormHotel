import React, { ReactNode } from 'react';
import AdminHeader from './AdminHeader';
import * as S from './Style';
import { NavLink, useLocation } from 'react-router-dom';

interface AdminSubNav {
  pagetitle: string;
  nav: { title: string; linkto: string }[];
}

interface AdminSubNavMap {
  member: AdminSubNav;
  item: AdminSubNav;
  reservation: AdminSubNav;
  board: AdminSubNav;
  chat: AdminSubNav;
  [key: string]: AdminSubNav;
}

export const adminsubnav: AdminSubNavMap = {
  member: {
    pagetitle: '회원 관리',
    nav: [
      {
        title: '전체 회원 관리',
        linkto: '/admin/member/1',
      },
      {
        title: '부운영자 관리',
        linkto: '/admin/managers/1',
      },
    ],
  },
  item: {
    pagetitle: '상품 관리',
    nav: [
      {
        title: '판매 상품 관리',
        linkto: '/admin/item/1',
      },
      {
        title: '상품권 관리',
        linkto: '/admin/giftcard/1',
      },
    ],
  },
  reservation: {
    pagetitle: '예약 관리',
    nav: [
      {
        title: '예약 관리',
        linkto: '/admin/reservation/1',
      },
    ],
  },
  board: {
    pagetitle: '게시판 관리',
    nav: [
      {
        title: '게시글 관리',
        linkto: '/admin/board/1',
      },
      {
        title: '댓글 관리',
        linkto: '/admin/comments/1',
      },
      {
        title: '삭제된 글 관리',
        linkto: '/admin/deletepost/1',
      },
      {
        title: '신고 관리',
        linkto: '/admin/report/1',
      },
    ],
  },
  chat: {
    pagetitle: '채팅/메일 관리',
    nav: [
      {
        title: '채팅 관리',
        linkto: '/admin/chat/1',
      },
      {
        title: '메일 작성',
        linkto: '/admin/mail',
      },
      {
        title: '구독자 관리',
        linkto: '/admin/subscriber/1',
      },
    ],
  },
};

const AdminLayout = ({ children, subMenus }: {children: ReactNode; subMenus: string;}) => {
  const location = useLocation();

  // const isActive = () => {
  //   if (location.pathname === nav.linkto) {
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <S.AdminContainer>
      <AdminHeader />
      <S.SideMenu>
        <h2>{adminsubnav[subMenus].pagetitle}</h2>
        <ul className="menulist">
          {adminsubnav[subMenus].nav.map((nav) => (
            <li>
              <NavLink
                to={nav.linkto}
                className={({isActive}) => {
                  return isActive ? 'active' : '';
                }}>
                <p>{nav.title}</p>
                <div>
                  <S.SideIcon />
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </S.SideMenu>
      <div className="pagecontents">{children}</div>
    </S.AdminContainer>
  );
};

export default AdminLayout;
