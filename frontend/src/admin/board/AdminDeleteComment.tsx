import React, { useEffect, useState } from 'react';
import * as S from './Style';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/Style';
import Paging from '../../components/common/Paging/Paging';
import { BoardData, ReplyData } from './AdminBoard';
import { useNavigate, Link } from 'react-router-dom';
import { boardTitleList } from './AdminBoard';
import Instance from '../../utils/api/axiosInstance';
import AdminCheck from '../adminCheck';

const AdminDeleteComment = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [board, setBoard] = useState<BoardData[]>([]);
  const [reply, setReply] = useState<ReplyData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const navigate = useNavigate();
  const [parsedContent, setParsedContent] = useState<JSX.Element[][]>([]);
  const authItem = localStorage.getItem('auth');

  useEffect(() => {
    Instance.get('/boards/deleted')
      .then((response) => {
        setBoard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    Instance.get('/reply/deleted')
      .then((response) => {
        setReply(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    Instance.get('/boards/deletedall')
      .then((response) => {
        const totalPages = parseInt(response.headers['totalpages'], 10);
        const totalData = parseInt(response.headers['totaldata'], 10);
        setTotalPage(totalPages);
        setTotalData(totalData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allBoardIds = board.map((item) => `board${item.boardId}`);
      const allReplyIds = reply.map((item) => `reply${item.replyId}`);
      setCheckedItems([...allBoardIds, ...allReplyIds]);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId: string) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === board.length);
  };

  const unDeleteBtnClick = () => {
    const isConfirm = window.confirm('복구하시겠습니까?');
    if (isConfirm) {
      checkedItems.forEach((boardId) => {
        if (boardId.startsWith('board')) {
          //게시글이라면
          boardId = boardId.replace('board', '');
          Instance.get(`/boards/${boardId}`).then((response) => {
            if (response.data.parentBoardId === 0) {
              //답글이 아니라면
              Instance.put(`/boards/undelete/${response.data.boardId}`)
                .then(() => {
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }
            if (response.data.parentBoardId != 0) {
              //답글이라면
              Instance.put(
                //parentBoardId의 isComment값 false => true 변경
                `/boards/updateIsComment/${response.data.parentBoardId}`
              )
                .then()
                .catch((error) => {
                  console.error(error.message);
                });
              Instance.put(`/boards/undelete/${response.data.boardId}`)
                .then(() => {
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }
          });
        } else {
          const id = boardId.replace('reply', '');
          Instance.put(`/reply/undelete/${id}`)
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error(error.message);
            });
        }
      });
    }
  };

  const realDeleteBtnClick = () => {
    const isConfirm = window.confirm('영구삭제 하시겠습니까?');
    if (isConfirm) {
      checkedItems.forEach((boardId) => {
        if (boardId.startsWith('board')) {
          const id = boardId.replace('board', '');
          Instance.delete(`/boards/${id}`)
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error(error.message);
            });
        } else {
          const id = boardId.replace('reply', '');
          Instance.delete(`/reply/${id}`)
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error(error.message);
            });
        }
      });
    }
  };

  const parseBoardContent = (content: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p'));

    return paragraphs.map((p) => p.textContent);
  };

  useEffect(() => {
    const parsedContentArray = board.map((item) => parseBoardContent(item.boardContent).map((paragraph, index) => <p key={index}>{paragraph}</p>));
    const parsedTextArray = parsedContentArray.map((contentArray) => contentArray.map((paragraph, index) => paragraph.props.children));
    setParsedContent(parsedTextArray);
  }, [board]);

  const isBoardWriter = (board: BoardData) => {
    if (!board.boardPassword) {
      return (
        <Link className="u" to={`/admin/member/detail/${board.boardWriter}`}>
          {board.boardWriter}
        </Link>
      );
    }
    return <p>{board.boardWriter}</p>;
  };

  const isReplyWriter = (reply: ReplyData) => {
    if (!reply.replyPassword) {
      return (
        <Link className="u" to={`/admin/member/detail/${reply.replyWriter}`}>
          {reply.replyWriter}
        </Link>
      );
    }
    return <p>{reply.replyWriter}</p>;
  };

  // 댓글 내용 줄이기
  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
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
            {board.length === 0 && reply.length === 0 && (
              <tr>
                <td colSpan={6} className="center empty">
                  삭제된 글이 없습니다.
                </td>
              </tr>
            )}
            {parsedContent.length > 0 &&
              board.length > 0 &&
              board.map((board, index) => (
                <tr key={board.boardId}>
                  <td className="center">
                    <InputCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(`board${board.boardId}`)}
                      onChange={() => handleCheckboxChange(`board${board.boardId}`)}
                    />
                  </td>
                  <td className="center">{totalData - index}</td>
                  <td className="center">{`${board.boardTitle}`}</td>
                  <td className="center">
                    <Link
                      className="u"
                      to={`/admin/${`board/${boardTitleList.find((item) => item.board === board.boardTitle)?.english}/detail/${board.boardId}`}`}>
                      {parsedContent[index][0]}
                    </Link>
                  </td>
                  <td className="center">{isBoardWriter(board)}</td>
                  <td className="center">
                    {`${board.boardDeleteTime[0]}/${board.boardDeleteTime[1] < 10 ? '0' : ''}${board.boardDeleteTime[1]}/${
                      board.boardDeleteTime[2] < 10 ? '0' : ''
                    }${board.boardDeleteTime[2]}`}
                  </td>
                </tr>
              ))}
            {reply.length > 0 &&
              reply.map((reply, index) => (
                <tr key={reply.replyId}>
                  <td className="center">
                    <InputCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(`reply${reply.replyId}`)}
                      onChange={() => handleCheckboxChange(`reply${reply.replyId}`)}
                    />
                  </td>
                  <td className="center">{totalData - board.length - index}</td>
                  <td className="center">댓글</td>
                  <td className="center commonetwrap">
                    <S.CommentText>{truncateString(reply.replyContent, 8)}</S.CommentText>
                    <S.ModalContainer>
                      <S.ModalContent>{reply.replyContent}</S.ModalContent>
                    </S.ModalContainer>
                  </td>
                  <td className="center">{isReplyWriter(reply)}</td>
                  <td className="center">
                    {`${reply.replyDeleteTime[0]}/${reply.replyDeleteTime[1] < 10 ? '0' : ''}${reply.replyDeleteTime[1]}/${
                      reply.replyDeleteTime[2] < 10 ? '0' : ''
                    }${reply.replyDeleteTime[2]}`}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Paging totalPage={totalPage} />
      </Container>
      <AdminCheck kind="AUTH_C" />
    </AdminLayout>
  );
};

export default AdminDeleteComment;
