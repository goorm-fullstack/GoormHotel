import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { PageTitle } from '../../components/common/commonStyles';
import {
  Container,
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
import Paging from '../../components/common/Paging';
import axios from 'axios';

const AdminBoard = () => {
  const { page } = useParams();
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [totalBoard, setTotalBoard] = useState(0);

  const [board, setBoard] = useState([]);
  // 전체 게시글 목록 조회
  useEffect(() => {
    const currentPage = parseInt(page, 10);
    axios.get(`/boards/list?page=${currentPage}`).then((response) => {
      const totalPages = parseInt(response.headers['totalpages'], 10);
      const totalData = parseInt(response.headers['totaldata'], 10);
      setBoard(response.data);
      setTotalPage(totalPages);
      setTotalBoard(totalData);
      console.log('get 성공');
    });
  }, []);

  // 전체 선택
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = board.map((item) => item.boardId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  // 하나씩 선택해서 전부 선택시 맨 위에 체크되도록 하는 기능
  const handleCheckboxChange = (boardId) => {
    const updatedCheckedItems = checkedItems.includes(boardId) ? checkedItems.filter((id) => id !== boardId) : [...checkedItems, boardId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === board.length);
  };

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>게시글 관리</PageTitle>
        <ContentHeader>
          <Total>
            전체 <Num>{totalBoard}</Num> 건
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
            {board.map((board, idx) => (
              <tr key={board.boardId}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(board.boardId)}
                    onChange={() => handleCheckboxChange(board.boardId)}
                  />
                </TableCell>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{board.boardTitle}</TableCell>
                <TableCell>
                  <Link to={`/admin/member/${board.boardId}`}>{board.title}</Link>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/member/${board.boardWriter}`}>{board.boardWriter}</Link>
                </TableCell>
                <TableCell>{`${board.boardWriteDate[0]}-${board.boardWriteDate[1] < 10 ? '0' : ''}${board.boardWriteDate[1]}-${
                  board.boardWriteDate[2] < 10 ? '0' : ''
                }${board.boardWriteDate[2]}`}</TableCell>
                <TableCell>{board.blacklist}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminBoard;
