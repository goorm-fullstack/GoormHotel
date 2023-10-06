import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, LinkBtn } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/Style';
import Paging from '../../components/common/Paging/Paging';
import axios from 'axios';

export interface BoardData{
  boardId: number;
  title: string;
  boardContent: string;
  boardWriteDate: number[];
  boardWriter: string;
  reply: ReplyData[];
  boardTitle: string;
  category: string;
  report: ReportData[];
  boardImage: ImageData;
  blackList: string;
}

export interface ReplyData{
  replyId: number;
  boardId: number;
  replyContent: string;
  replyWriteDate: number[];
  replyWriter: string;
  report: ReportData[];
  board: BoardData;
}

export interface ReportData{
  reportId: number;
  boardId: number;
  title: string;
  replyId: number;
  replyContent: string;
  reportReason: string;
  reportDate: number[];
  reportWriter: string;
  reportCheck: boolean;
  reportResult: string;
}

const AdminBoard = () => {
  const { page } = useParams<{page: string}>();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalBoard, setTotalBoard] = useState<number>(0);
  const [board, setBoard] = useState<BoardData[]>([]);
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_C"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  // 전체 게시글 목록 조회
  useEffect(() => {
    const currentPage: number = parseInt(page ? page : '1', 10);
    axios
      .get(`/boards/list?page=${currentPage}`)
      .then((response) => {
        const totalPages = parseInt(response.headers['totalpages'], 10);
        const totalData = parseInt(response.headers['totaldata'], 10);
        setBoard(response.data);
        setTotalPage(totalPages);
        setTotalBoard(totalData);
        console.log('get 성공');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 전체 선택
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked: boolean = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = board.map((item) => item.boardId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  // 하나씩 선택해서 전부 선택시 맨 위에 체크되도록 하는 기능
  const handleCheckboxChange = (boardId: number) => {
    const updatedCheckedItems: number[] = checkedItems.includes(boardId) ? checkedItems.filter((id) => id !== boardId) : [...checkedItems, boardId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === board.length);
  };

  const DeleteBoard = () => {
    checkedItems.forEach((boardId) => {
      axios
        .put(`/boards/softdelete/${boardId}`)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  };

  const ReportBoard = () => {
    checkedItems.forEach((boardId) => {
      const data = {
        boardId: boardId,
        reportWriter: '관리자',
        reportReason: '관리자 임의 배정',
      };
      axios
        .post(`/report/writeform`, data)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  };

  if(authItem && authItem.includes("AUTH_C")) {
  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>게시글 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{totalBoard}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <LinkBtn className="header" to="/admin/board/write">
              게시글 작성
            </LinkBtn>
            <NormalBtn className="header" onClick={ReportBoard}>
              신고된 글로 이동
            </NormalBtn>
            <NormalBtn className="header red" onClick={DeleteBoard}>
              게시글 삭제
            </NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <colgroup>
            <col width="80px" />
            <col width="100px" />
            <col width="200px" />
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
              <th>카테고리</th>
              <th>제목</th>
              <th>작성자명(회원 ID)</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {board.length === 0 && (
              <td colSpan={7} className="center">
                등록된 게시글이 없습니다.
              </td>
            )}
            {board &&
            board.map((board, idx: number) => (
              <tr key={board.boardId}>
                <td className="center">
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(board.boardId)}
                    onChange={() => handleCheckboxChange(board.boardId)}
                  />
                </td>
                <td className="center">{totalBoard - idx}</td>
                <td className="center">{board.boardTitle}</td>
                <td className="center">카테고리</td>
                <td className="center">
                  <Link to={`/admin/member/${board.boardId}`}>{board.title}</Link>
                </td>
                <td className="center">
                  <Link to={`/admin/member/${board.boardWriter}`}>{board.boardWriter}</Link>
                </td>
                <td className="center">{`${board.boardWriteDate[0]}-${board.boardWriteDate[1] < 10 ? '0' : ''}${board.boardWriteDate[1]}-${
                  board.boardWriteDate[2] < 10 ? '0' : ''
                }${board.boardWriteDate[2]}`}</td>
                <td>{board.blackList}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging totalPage={totalPage} />
      </Container>
    </AdminLayout>
  );
} else {
    return null;
  }
};

export default AdminBoard;
