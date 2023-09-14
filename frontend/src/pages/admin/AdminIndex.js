import AdminHeader from "./AdminHeader";
import {Wrapper} from "./AdminHeader";
import styled from "styled-components";
import {Link} from "react-router-dom";

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
  color: rgb(17, 17, 17);
  margin-bottom: 100px;
`;

export const AdminContainer = styled.div`
  width: 1260px;
  margin: 185px auto 0px auto;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 70px;
`;

export const AdminMenu = styled.div`
  width: 400px;
  height: 200px;
`;

export const MenuTitle = styled(Link)`
  font-size: 20px;
  margin-bottom: 20px;
  &:hover {
    color: #baa085;
  }
  color: rgb(136, 136, 136);
`;

export const MenuBorder = styled.div`
  border-top: 1px solid rgb(136, 136, 136);
  margin: 20px 0px 0px 0px;
  width: 340px;
  display: flex;
  flex-direction: column;
`;

export const TopMenuList = styled(Link)`
  margin-top: 20px;
  &:hover {
    color: #baa085;
  }
  font-size: 20px;
  width: fit-content;
  color: rgb(136, 136, 136);
`;

export const MenuList = styled(Link)`
  margin-top: 15px;
  &:hover {
    color: #baa085;
  }
  font-size: 20px;
  width: fit-content;
  color: rgb(136, 136, 136);
`;


const AdminIndex = () => {

    return (
        <div>
            <AdminHeader/>
            <AdminContainer>
                <Title>관리자 홈</Title>
                <Container>
                    <AdminMenu>
                        <MenuTitle to={"/admin/member"}>회원 관리</MenuTitle>
                        <MenuBorder>
                            <TopMenuList to={"/admin/member"}>전체 회원 관리</TopMenuList>
                            <MenuList to={"/admin/managers"}>부운영자 관리</MenuList>
                        </MenuBorder>
                    </AdminMenu>

                    <AdminMenu>
                        <MenuTitle to={"/admin/item/list"}>상품 관리</MenuTitle>
                        <MenuBorder>
                            <TopMenuList to={"/admin/item/list"}>판매 상품 관리</TopMenuList>
                            <MenuList to={"/admin/item/giftCard"}>상품권 관리</MenuList>
                        </MenuBorder>
                    </AdminMenu>

                    <AdminMenu>
                        <MenuTitle to={"/admin/reservation"}>예약 관리</MenuTitle>
                        <MenuBorder>
                            <TopMenuList to={"/admin/reservation"}>예약 관리</TopMenuList>
                        </MenuBorder>
                    </AdminMenu>

                    <AdminMenu>
                        <MenuTitle>게시판 관리</MenuTitle>
                        <MenuBorder>
                            <TopMenuList>게시글 관리</TopMenuList>
                            <MenuList to={"/admin/comments"}>댓글 관리</MenuList>
                            <MenuList>삭제된 글 관리</MenuList>
                            <MenuList to={"/admin/report"}>신고 관리</MenuList>
                        </MenuBorder>
                    </AdminMenu>

                    <AdminMenu>
                        <MenuTitle to={"/admin/chat"}>채팅 / 메일</MenuTitle>
                        <MenuBorder>
                            <TopMenuList to={"/admin/chat"}>채팅 관리</TopMenuList>
                            <MenuList to={"/admin/mail"}>메일 작성</MenuList>
                        </MenuBorder>
                    </AdminMenu>
                </Container>

            </AdminContainer>
        </div>
    );
};

export default AdminIndex;
