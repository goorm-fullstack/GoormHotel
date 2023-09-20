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

const TableHeaderStyle = styled(TableHeader)`
  width: 20%;
`;

const WriterTableHeader = styled(TableHeader)`
  width: 15%;
`;

const LinkStyle = styled(Link)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: #444444;
    text-underline-offset: 10px;
  }
`;

const subMenus = [
  { name: '게시글 관리', link: '/admin/board' },
  { name: '댓글 관리', link: '/admin/comments' },
  { name: '삭제된 글 관리', link: '/admin/managers' },
  { name: '신고 관리', link: '/admin/report' },
];

const tableData = [
  {
    id: 1,
    board: '이용후기',
    post: '게시글 제목111',
    content: '첫 번째 댓글입니다.',
    author: { name: '홍구름', id: 'memberId1' },
    date: '2023.09.13',
  },
  {
    id: 2,
    board: '공지사항',
    post: '게시글 제목222',
    content: '두 번째 댓글입니다.',
    author: { name: '홍구름', id: 'memberId2' },
    date: '2023.09.14',
  },
];

const AdminDeleteComment = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = tableData.map((item) => item.memberId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === tableData.length);
  };

  return (
    <AdminLayout title="게시판 관리" subMenus={subMenus}>
      <Container>
        <Title>삭제된 글 관리</Title>
        <ContentHeader>
          <Total>
            전체 <Num>{tableData.length}</Num> 건
          </Total>
          <BlackListBtn>
            <Delete>복원</Delete>
            <Add>영구삭제</Add>
          </BlackListBtn>
        </ContentHeader>
        <Table>
          <thead>
            <tr>
              <TableCheckboxWrapper>
                <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </TableCheckboxWrapper>
              <TableHeader>No.</TableHeader>
              <TableHeader>게시판</TableHeader>
              <TableHeaderStyle>삭제된 글</TableHeaderStyle>
              <WriterTableHeader>작성자 명(회원 Id)</WriterTableHeader>
              <TableHeader>삭제일</TableHeader>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 && <TableCell colSpan="7">등록된 회원이 없습니다.</TableCell>}
            {tableData.map((item) => (
              <tr key={item.id}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(item.memberId)}
                    onChange={() => handleCheckboxChange(item.memberId)}
                  />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.board}</TableCell>
                <TableCell>
                  <LinkStyle to={`/admin/member/${item.content}`}>{item.content}</LinkStyle>
                </TableCell>
                <TableCell>
                  {item.author.name}
                  <LinkStyle to={`/admin/member/${item.author.id}`}>({item.author.id})</LinkStyle>
                </TableCell>
                <TableCell>{item.date}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default AdminDeleteComment;
