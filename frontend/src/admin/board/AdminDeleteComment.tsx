import React, { useEffect, useState } from 'react';
import * as S from './Style';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/Style';
import Paging from '../../components/common/Paging/Paging';
import axios from 'axios';
import { BoardData } from './AdminBoard';

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
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [board, setBoard] = useState<BoardData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    axios
      .get('/boards/deleted')
      .then((response) => {
        const totalPages = parseInt(response.headers['totalpages'], 10);
        const totalData = parseInt(response.headers['totaldata'], 10);
        setBoard(response.data);
        setTotalPage(totalPages);
        setTotalData(totalData);
        console.log('get 성공');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = board.map((item) => item.boardId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId: number) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === board.length);
  };

  const unDeleteBtnClick = () => {
    checkedItems.forEach((boardId) => {
      axios
        .put(`/boards/undelete/${boardId}`)
        .then(() => {
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
        .then(() => {
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
            전체 <strong>{totalData}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn type="button" className="header" onClick={unDeleteBtnClick}>
              선택 글 복원하기
            </NormalBtn>
            <NormalBtn type="button" className="header red" onClick={realDeleteBtnClick}>
              영구 삭제
            </NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <colgroup>
            <col width="80px" />
            <col width="100px" />
            <col width="200px" />
            <col width="auto" />
            <col width="200px" />
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>번호</th>
              <th>게시판</th>
              <th>삭제된 글</th>
              <th>작성자명(회원 ID)</th> {/** 회원 ID의 ID는 대문자로 통일합시다. */}
              <th>삭제일</th>
            </tr>
          </thead>
          <tbody>
            {board.length === 0 && (
              <td colSpan={6} className="center empty">
                삭제된 글이 없습니다.
              </td>
            )}
            {board &&
            board.map((board) => (
              <tr key={board.boardId}>
                <td className="center">
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(board.boardId)}
                    onChange={() => handleCheckboxChange(board.boardId)}
                  />
                </td>
                <td className="center">{board.boardId}</td>
                <td className="center">{`${board.boardTitle}`}</td>
                <td className="center">
                  <S.LinkStyle to={`/admin/member/${board.boardContent}`}>{board.boardContent}</S.LinkStyle>
                </td>
                <td className="center">
                  {board.boardWriter}
                  <S.LinkStyle to={`/admin/member/${board.boardWriter}`}>({board.boardWriter})</S.LinkStyle>
                </td>
                <td className="center">{`${board.boardWriteDate[0]}.${board.boardWriteDate[1] < 10 ? '0' : ''}${board.boardWriteDate[1]}.${
                  board.boardWriteDate[2] < 10 ? '0' : ''
                }${board.boardWriteDate[2]}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging totalPage={totalPage} />
      </Container>
    </AdminLayout>
  );
};

export default AdminDeleteComment;
