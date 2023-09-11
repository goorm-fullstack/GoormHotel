import React from 'react';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SideMenuIcon } from '../../images/icon/ico_slide_btn.svg';


const SideMenu = styled.div`
  width: 330px; 
  height: 100%;
  position: fixed;
  left: 0;
  top: 97px;
  border-right: 1px solid #DDDDDD;
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
  padding-top: 177px;
  padding-left: 470px;
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
  return (
    <div>
      <AdminHeader />
      <SideMenu>
        <SideMenuWrapper>
          <SideTitle>{title}</SideTitle>
          <SideMenuItem>
            {subMenus.map((menu, index) => (
              <li key={index}>
                <SideMenuList to={menu.link}>
                  <div>{menu.name}</div>
                  <div><SideIcon /></div>
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