import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../common/AdminLayout';
import * as S from './Style';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, LinkBtn } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/Style';
import Paging from '../../components/common/Paging/Paging';
import { IsReply } from '../../pages/board/Style';
import Instance from '../../utils/api/axiosInstance';

export interface BoardData {
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
  boardDeleteTime: number[];
  isComment: string;
  parentBoardId: number; // parentBoardId 속성 추가
}

export interface ReplyData {
  replyId: number;
  boardId: number;
  replyContent: string;
  replyWriteDate: number[];
  replyWriter: string;
  report: ReportData[];
  responseBoardDto: BoardData;
  boardTitle: string;
  replyDeleteTime: number[];
}

export interface ReportData {
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
  boardTitle: string;
}

export const boardTitleList = [
  { board: '공지사항', english: 'notice' },
  { board: '문의하기', english: 'qna' },
  { board: '이용후기', english: 'review' },
];

const AdminBoard = () => {
  const { page } = useParams<{ page: string }>();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalBoard, setTotalBoard] = useState<number>(0);
  const [board, setBoard] = useState<BoardData[]>([]);
  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');
  let count : number = 1;

  useEffect(() => {
    if (!(authItem && authItem.includes('AUTH_C'))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  // 전체 게시글 목록 조회
  useEffect(() => {
    const currentPage: number = parseInt(page ? page : '1', 10);
    Instance
      .get(`/boards/list?page=${currentPage}`)
      .then((response) => {
        const totalPages = parseInt(response.headers['totalpages'], 10);
        const totalData = parseInt(response.headers['totaldata'], 10);
        setBoard(response.data);
        setTotalPage(totalPages);
        setTotalBoard(totalData);
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
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      checkedItems.forEach((boardId) => {
        Instance
            .get(`/boards/${boardId}`)
            .then((response) => {
              if(response.data.parentBoardId === 0){        //답글이 아니라면
                Instance
                    .put(`/boards/softdelete/${boardId}`)
                    .then(() => {
                      alert('삭제되었습니다.');
                      window.location.reload();
                    })
                    .catch((error) => {
                      console.error(error.message);
                    });
              }
              if(response.data.parentBoardId != 0){       //답글이라면
                Instance            //parentBoardId의 isComment값 true => false 변경
                    .put(`/boards/updateIsComment/${response.data.parentBoardId}`)
                    .then()
                    .catch((error) => {
                      console.error(error);
                    });
                Instance            //답글 소프트딜리트
                    .put(`/boards/softdelete/${boardId}`)
                    .then(() => {
                      alert('삭제되었습니다.');
                      window.location.reload();
                    })
                    .catch((error) => {
                      console.error(error.message);
                    });
              }
                }
            )


      });
    }
  };

  const ReportBoard = () => {
    const isConfirm = window.confirm('신고하시겠습니까?');
    if (isConfirm) {
      checkedItems.forEach((boardId) => {
        const data = {
          boardId: boardId,
          reportWriter: '관리자',
          reportReason: '관리자 임의 배정',
        };
        Instance
          .post(`/report/writeform`, data)
          .then(() => {
            alert('신고처리되었습니다.');
            window.location.reload();
          })
          .catch((error) => {
            console.error(error.message);
          });
      });
    }
  };

  console.log(board);

  const setCommentBoard = (boardId : number) => {
    Instance.get(`/boards/findParentBoardId/${boardId}`)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.error(error.message);
        })
  }


  //   useEffect(() => {
  //     Instance.get('/report/list')
  //         .then(async (response) => {
  //           // ...
  //           const modifiedDataPromises = response.data.map(async (item: ReportData) => {
  //             let boardId = null;
  //
  //             if(item.replyId){
  //               try {
  //                 const response2 = await Instance.get(`/reply/replyId/${item.replyId}`);
  //                 boardId = parseInt(response2.data.boardId);
  //               } catch (error) {
  //                 console.error("Error fetching boardId:", error);
  //               }
  //             }
  //
  //             return {
  //               ...item,
  //               reportCheck: item.reportCheck.toString(),
  //               reportResult: item.reportResult.toString(),
  //               boardId,  // Add boardId here
  //             };
  //           });
  //
  //           // Since modifiedDataPromises is an array of promises, we'll wait for all of them to resolve
  //           const modifiedData = await Promise.all(modifiedDataPromises);
  //           const totalPages = parseInt(response.headers['totalpages'], 10);
  //           const totalData = parseInt(response.headers['totaldata'], 10);
  //           setReport(modifiedData);
  //           setTotalPage(totalPages);
  //           setTotalData(totalData);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //   }, []);

  if (authItem && authItem.includes('AUTH_C')) {
    return (
      <AdminLayout subMenus="board">
        <Container>
          <PageTitle>게시글 관리</PageTitle>
          <TableHeader>
            <p className="total">
              전체 <strong>{totalBoard}</strong> 건
            </p>
            <BtnWrapper className="flexgap right">
              <LinkBtn className="header" to="/admin/board/write" state={{ checkedItems: checkedItems }}>
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
                <th>블랙리스트</th>
              </tr>
            </thead>
            <tbody>
              {board.length === 0 && (
                <tr>
                  {/* colSpan 개수, className 맞추셔야 한다고 계속해서 말씀드리고 있습니다. */}
                  <td colSpan={8} className="center empty">
                    등록된 게시글이 없습니다.
                  </td>
                </tr>
              )}
              {board && board
                  .map((board, idx: number) => {
                    return (
                        <tr key={board.boardId}>
                          <td className="center">
                            <InputCheckbox
                                type="checkbox"
                                checked={checkedItems.includes(board.boardId)}
                                onChange={() => handleCheckboxChange(board.boardId)}
                            />
                          </td>
                          <td className="center">
                            {board.parentBoardId !== 0 ? '↳' : `${count++}`}
                          </td>
                          <td className="center">{board.boardTitle}</td>
                          <td className="center">{board.category}</td>
                          <td className="center">
                            <S.LinkStyle
                                to={`/admin/board/${boardTitleList.find((item) => item.board === board.boardTitle)?.english}/detail/${board.boardId}`}>
                              {board.parentBoardId !== 0 ? <IsReply>답글</IsReply> : null}
                              {board.title}
                            </S.LinkStyle>
                          </td>
                          <td className="center">
                            <S.LinkStyle to={`/admin/member/detail/${board.boardWriter}`}>{board.boardWriter}</S.LinkStyle>
                          </td>
                          <td className="center">{`${board.boardWriteDate[0]}-${board.boardWriteDate[1] < 10 ? '0' : ''}${board.boardWriteDate[1]}-${
                              board.boardWriteDate[2] < 10 ? '0' : ''
                          }${board.boardWriteDate[2]}`}</td>
                          <td>{board.blackList}</td>
                        </tr>
                    );
                  })}
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
