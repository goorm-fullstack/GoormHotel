import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel } from '../../components/common/commonStyles';
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

  let writeDate;
  board.map((Item) => {
    writeDate = Item.boardWriteDate[0] + '-' + Item.boardWriteDate[1] + '-' + Item.boardWriteDate[2];
  });

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
        <TableHeader>
          <p className="total">
            전체 <strong>{board.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header">신고된 글로 이동</NormalBtn>
            <NormalBtn className="header red">삭제</NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>번호</th>
              <th>게시판</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>블랙리스트</th>
            </tr>
          </thead>
          <tbody>
            {board.length === 0 && <td colSpan="7">등록된 회원이 없습니다.</td>}
            {board.map((board, idx) => (
              <tr key={board.boardId}>
                <td>
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(board.boardId)}
                    onChange={() => handleCheckboxChange(board.boardId)}
                  />
                </td>
                <td>{idx + 1}</td>
                <td>{board.boardTitle}</td>
                <td>
                  <Link to={`/admin/member/${board.boardId}`}>{board.title}</Link>
                </td>
                <td>
                  <Link to={`/admin/member/${board.boardWriter}`}>{board.boardWriter}</Link>
                </td>
                <td>{`${board.boardWriteDate[0]}-${board.boardWriteDate[1] < 10 ? '0' : ''}${board.boardWriteDate[1]}-${
                  board.boardWriteDate[2] < 10 ? '0' : ''
                }${board.boardWriteDate[2]}`}</td>
                <td>{board.blacklist}</td>
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
