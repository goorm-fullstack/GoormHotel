import React from 'react';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as SideMenuIcon } from '../../images/icon/ico_slide_btn.svg';

const SideMenu = styled.div`
  width: 276px;
  height: calc(100vh - 100px);
  position: fixed;
  left: 0;
  top: 100px;
  bottom: 0;
  border-right: 1px solid ${(props) => props.theme.colors.grayborder};
`;

const SideMenuWrapper = styled.ul`
  width: 100%;
  padding: 32px 40px;

  li {
    margin-bottom: 18px;
  }
`;

const SideTitle = styled.h2`
  font-size: ${(props) => props.theme.font.sizem};
  font-weight: 500;
  height: 70px;
  line-height: 70px;
  padding: 0 40px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
  color: ${(props) => props.theme.colors.charcoal};
`;

const PageContents = styled.div`
  padding: 200px 40px 100px 316px;
`;

const SideMenuList = styled(NavLink)`
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
`;

const SideIcon = styled(SideMenuIcon)`
  transform: rotate(180deg);
`;

export const adminsubnav = {
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

const AdminLayout = ({ children, subMenus }) => {
  const location = useLocation();

  return (
    <div>
      <AdminHeader />
      <SideMenu>
        <SideTitle>{adminsubnav[subMenus].pagetitle}</SideTitle>
        <SideMenuWrapper>
          {adminsubnav[subMenus].nav.map((nav) => (
            <li>
              <SideMenuList
                to={nav.linkto}
                $activeClassName="active"
                $isActive={(match) => {
                  if (match) return true;
                  if (location.pathname.startsWith('/admin/member')) return true;
                  return false;
                }}>
                <p>{nav.title}</p>
                <div>
                  <SideIcon />
                </div>
              </SideMenuList>
            </li>
          ))}
        </SideMenuWrapper>
      </SideMenu>
      <PageContents>{children}</PageContents>
    </div>
  );
};

export default AdminLayout;
