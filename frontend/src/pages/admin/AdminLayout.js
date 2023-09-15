import React from 'react';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as SideMenuIcon } from '../../images/icon/ico_slide_btn.svg';

const SideMenu = styled.div`
  width: 330px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 97px;
  border-right: 1px solid #dddddd;
`;

const SideMenuWrapper = styled.div`
  width: 276px;
  margin: 0 auto;
  margin-top: 80px;
`;

const SideTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const PageContents = styled.div`
  padding: 177px 40px 100px 370px;
`;

const SideMenuItem = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const SideMenuList = styled(NavLink)`
  display: flex;
  justify-content: space-between;

  &:hover {
    color: #baa085;
  }

  &.active {
    color: #baa085;
  }
`;

const SideIcon = styled(SideMenuIcon)`
  transform: rotate(180deg);
`;

const AdminLayout = ({ children, title, subMenus }) => {
  const location = useLocation();

  return (
    <div>
      <AdminHeader />
      <SideMenu>
        <SideMenuWrapper>
          <SideTitle>{title}</SideTitle>
          <SideMenuItem>
            {subMenus.map((menu, index) => (
              <li key={index}>
                <SideMenuList
                  to={menu.link}
                  $activeClassName="active"
                  $isActive={(match) => {
                    if (match) return true;
                    if (location.pathname.startsWith('/admin/member')) return true;
                    return false;
                  }}>
                  <div>{menu.name}</div>
                  <div>
                    <SideIcon />
                  </div>
                </SideMenuList>
              </li>
            ))}
          </SideMenuItem>
        </SideMenuWrapper>
      </SideMenu>
      <PageContents>{children}</PageContents>
    </div>
  );
};

export default AdminLayout;
