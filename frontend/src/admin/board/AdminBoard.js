import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    writeDate = Item.boardWriteDate[0] + '-' + Item.boardWriteDate[1] + '-' + Item.boardWriteDate[2];
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

  // 특정 권한이 없다면 다른 렌더링으로 페이지를 보여준다.
  if(localStorage.getItem("auth") && localStorage.getItem("auth").includes("AUTH_C")) {
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
              {board.length === 0 && <td colSpan="7">등록된 글이 없습니다.</td>}
              {board.map((board) => (
                <tr key={board.boardId}>
                  <td>
                    <InputCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(board.boardId)}
                      onChange={() => handleCheckboxChange(board.boardId)}
                    />
                  </td>
                  <td>{board.boardId}</td>
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
  } else {
    return (
      <AdminLayout subMenus="board">
        <Container>
          <p>사용할 수 없는 페이지입니다.</p>
        </Container>
      </AdminLayout>
    )
  }
};

export default AdminBoard;
