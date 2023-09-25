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

const LinkStyle = styled(Link)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: #444444;
    text-underline-offset: 10px;
  }
`;

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
  const [board, setBoard] = useState([]);
  useEffect(() => {
    axios.get('/boards/deleted').then((response) => {
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

  const unDeleteBtnClick = () => {
    checkedItems.forEach((boardId) => {
      axios
        .put(`/boards/undelete/${boardId}`)
        .then((response) => {
          console.log(`${boardId} 복원 성공`);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  const realDeleteBtnClick = () => {
    checkedItems.forEach((boardId) => {
      axios
        .delete(`/boards/${boardId}`)
        .then((response) => {
          console.log(`${boardId} 삭제 성공`);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>삭제된 글 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{board.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn type="button" className="header" onClick={unDeleteBtnClick}>
              복원
            </NormalBtn>
            <NormalBtn type="button" className="header red" onClick={realDeleteBtnClick}>
              영구삭제
            </NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>No.</th>
              <th>게시판</th>
              <th>삭제된 글</th>
              <th>작성자 명(회원 Id)</th>
              <th>삭제일</th>
            </tr>
          </thead>
          <tbody>
            {board.length === 0 && <td colSpan="6">등록된 글이 없습니다.</td>}
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
                <td>{`${board.boardTitle}`}</td>
                <td>
                  <LinkStyle to={`/admin/member/${board.boardContent}`}>{board.boardContent}</LinkStyle>
                </td>
                <td>
                  {board.boardWriter}
                  <LinkStyle to={`/admin/member/${board.boardWriter}`}>({board.boardWriter})</LinkStyle>
                </td>
                <td>{`${board.boardWriteDate[0]}-${board.boardWriteDate[1] < 10 ? '0' : ''}${board.boardWriteDate[1]}-${
                  board.boardWriteDate[2] < 10 ? '0' : ''
                }${board.boardWriteDate[2]}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminDeleteComment;
