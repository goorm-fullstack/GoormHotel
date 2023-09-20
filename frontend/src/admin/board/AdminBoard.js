import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import {
  Container,
  Title,
  ContentHeader,
  Total,
  BlackListBtn,
  Delete,
  Add,
  Table,
  TableCheckboxWrapper,
  TableHeader,
  TableCell,
  TableCheckbox,
  Num,
} from '../member/AdminMember';

const subMenus = [
  { name: '게시글 관리', link: '/admin/board' },
  { name: '댓글 관리', link: '/admin/comments' },
  { name: '삭제된 글 관리', link: '/admin/deleteComment' },
  { name: '신고 관리', link: '/admin/report' },
];

const memberData = [
  {
    id: 1,
    number: 1,
    grade: 'Gold',
    memberId: 'user001',
    name: '홍길동',
    joinDate: '2023.09.01',
    blacklist: 'N',
  },
  {
    id: 2,
    number: 2,
    grade: 'Silver',
    memberId: 'user002',
    name: '김철수',
    joinDate: '2023.09.01',
    blacklist: 'Y',
  },
  {
    id: 3,
    number: 3,
    grade: 'Bronze',
    memberId: 'user003',
    name: '이영희',
    joinDate: '2023.09.01',
    blacklist: 'N',
  },
];

const AdminBoard = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = memberData.map((item) => item.memberId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === memberData.length);
  };

  return (
    <AdminLayout title="게시판 관리" subMenus={subMenus}>
      <Container>
        <Title>게시글 관리</Title>
        <ContentHeader>
          <Total>
            전체 <Num>{memberData.length}</Num> 건
          </Total>
          <BlackListBtn>
            <Delete>블랙리스트 해제</Delete>
            <Add>블랙리스트 추가</Add>
          </BlackListBtn>
        </ContentHeader>
        <Table>
          <thead>
            <tr>
              <TableCheckboxWrapper>
                <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </TableCheckboxWrapper>
              <TableHeader>No.</TableHeader>
              <TableHeader>회원등급</TableHeader>
              <TableHeader>회원ID</TableHeader>
              <TableHeader>회원 이름</TableHeader>
              <TableHeader>가입일</TableHeader>
              <TableHeader>블랙리스트</TableHeader>
            </tr>
          </thead>
          <tbody>
            {memberData.length === 0 && <TableCell colSpan="7">등록된 회원이 없습니다.</TableCell>}
            {memberData.map((item) => (
              <tr key={item.id}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(item.memberId)}
                    onChange={() => handleCheckboxChange(item.memberId)}
                  />
                </TableCell>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>
                  <Link to={`/admin/member/${item.memberId}`}>{item.memberId}</Link>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.joinDate}</TableCell>
                <TableCell>{item.blacklist}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default AdminBoard;
