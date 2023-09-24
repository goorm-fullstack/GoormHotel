import React, {useEffect, useState} from 'react';
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
import axios from "axios";

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

  const [board, setBoard] = useState([]);
  useEffect(() => {
    axios.get('/boards/list').then((response) => {
      setBoard(response.data);
      console.log('get 성공');
    });
  }, []);

  let writeDate;
  board.map((Item) => {
    writeDate = Item.boardWriteDate[0] + "-" + Item.boardWriteDate[1] + "-" + Item.boardWriteDate[2];
  });

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
            전체 <Num>{board.length}</Num> 건
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
              <TableHeader>게시판</TableHeader>
              <TableHeader>제목</TableHeader>
              <TableHeader>작성자</TableHeader>
              <TableHeader>작성일</TableHeader>
              <TableHeader>블랙리스트</TableHeader>
            </tr>
          </thead>
          <tbody>
            {board.length === 0 && <TableCell colSpan="7">등록된 회원이 없습니다.</TableCell>}
            {board.map((board) => (
              <tr key={board.boardId}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(board.boardId)}
                    onChange={() => handleCheckboxChange(board.boardId)}
                  />
                </TableCell>
                <TableCell>{board.boardId}</TableCell>
                <TableCell>{board.boardTitle}</TableCell>
                <TableCell>
                  <Link to={`/admin/member/${board.boardId}`}>{board.title}</Link>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/member/${board.boardWriter}`}>{board.boardWriter}</Link>
                </TableCell>
                <TableCell>{`${board.boardWriteDate[0]}-${(board.boardWriteDate[1] < 10 ? '0' : '')}${board.boardWriteDate[1]}-${(board.boardWriteDate[2] < 10 ? '0' : '')}${board.boardWriteDate[2]}`}</TableCell>
                <TableCell>{board.blacklist}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default AdminBoard;
