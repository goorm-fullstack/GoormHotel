import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import * as S from './Style';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/Style';
import axios from 'axios';
import Paging from '../../components/common/Paging/Paging';
import { ReplyData } from './AdminBoard';

const AdminComment = () => {
  const { page } = useParams<{page: string}>();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [reply, setReply] = useState<ReplyData[]>([]);
  // const [board, setBoard] = useState<BoardData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalReply, setTotalReply] = useState<number>(0);
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_C"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  useEffect(() => {
    const currentPage: number = parseInt(page ? page : '1', 10);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/reply/list?page=${currentPage}`);
        const replyData: ReplyData[] = response.data;
        const totalPages = parseInt(response.headers['totalpages'], 10);
        const totalData = parseInt(response.headers['totaldata'], 10);
        console.log(totalData);

        // 게시물의 title을 가져오는 함수
        const getBoardTitle = async (boardId: number) => {
          try {
            const titleResponse = await axios.get(`/boards/${boardId}`);
            return titleResponse.data.title;
          } catch (error) {
            console.error('title을 가져오는 중 오류 발생', error);
            return ''; // 오류 발생 시 빈 문자열 반환
          }
        };

        //게시물의 게시판 이름을 가져오는 함수
        const getBoardBoardTitle = async (boardId: number) => {
          try {
            const titleResponse = await axios.get(`/boards/${boardId}`);
            return titleResponse.data.boardTitle;
          } catch (error) {
            console.error('title을 가져오는 중 오류 발생', error);
            return ''; // 오류 발생 시 빈 문자열 반환
          }
        };

        // 각 댓글의 title을 가져오고 데이터에 추가
        const updatedReplyData = await Promise.all(
          replyData.map(async (replyItem) => {
            const title = await getBoardTitle(replyItem.boardId);
            const boardTitle = await getBoardBoardTitle(replyItem.boardId);
            return { ...replyItem, title: title, boardTitle: boardTitle };
          })
        );

        setReply(updatedReplyData);
        setTotalPage(totalPages);
        setTotalReply(totalData);
        console.log('get 성공');
      } catch (error) {
        console.error('댓글 목록을 불러오는 중 오류 발생', error);
      }
    };

    fetchData();
  }, []);

  console.log(reply);

  // 전체 선택
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allReplyIds = reply.map((item) => item.replyId);
      setCheckedItems(allReplyIds);
    } else {
      setCheckedItems([]);
    }
  };

  // 하나씩 선택해서 전부 선택시 맨 위에 체크되도록 하는 기능
  const handleCheckboxChange = (replyId: number) => {
    const updatedCheckedItems = checkedItems.includes(replyId) ? checkedItems.filter((id) => id !== replyId) : [...checkedItems, replyId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === reply.length);
  };

  // 댓글 내용 줄이기
  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };

  // 선택 댓글 삭제
  const handleDeleteItems = () => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    const deletions = checkedItems.map((item) => {
      console.log(item);
      const url = `/reply/softdelete/${item}`;
      if (isConfirm) {
        return axios.put(url);
      }else {
        return null;
      }
    });

    Promise.all(deletions)
      .then((responses) => {
        const successfulDeletions = responses.filter((response) => response?.status === 200);
        if (successfulDeletions.length === deletions.length) {
          setCheckedItems([]); // 모든 항목이 성공적으로 삭제된 경우 setCheckedItems 초기화합니다.
          window.location.reload();
        } else {
          throw new Error('모든 항목을 삭제하지 못했습니다.');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  // 신고처리
  const handleReport = () => {
    let isConfirm = window.confirm('신고하시겠습니까?');
    const reportions = checkedItems.map((item) => {
      const url = '/report/writeform';
      const requestReportDto = {
        replyId: item,
        reportWriter: '관리자',
        reportReason: '관리자 임의 배정',
      };
      if (isConfirm) {
        return axios.post(url, requestReportDto);
      }else {
        return null;
      }
    });

    Promise.all(reportions)
      .then((response) => {
        const successfulReportions = response.filter((response) => response?.status === 200);
        if (successfulReportions.length === reportions.length) {
          setCheckedItems([]);
          alert('신고처리 되었습니다.');
          window.location.reload();
        } else {
          throw new Error('신고를 완료하지 못했습니다.');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  if(authItem && authItem.includes("AUTH_C")) {
  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>댓글 관리</PageTitle>
        <TableHeader>
          <p className={'total'}>
            전체 <strong>{totalReply}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header" onClick={handleReport}>
              신고된 글로 이동
            </NormalBtn>
            <NormalBtn className="header red" onClick={handleDeleteItems}>
              댓글 삭제
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
            <col width="150px" />
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>번호</th>
              <th>게시판</th>
              <th>게시글 제목</th>
              <th>댓글 내용</th>
              <th>작성자명(회원 ID)</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {reply.length === 0 && (
              <tr>
                <td colSpan={7} className="center">
                  등록된 댓글이 없습니다.
                </td>
              </tr>
            )}
            {reply &&
            reply.map((reply, idx) => (
              <tr key={reply.replyId}>
                <td className="center">
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(reply.replyId)}
                    onChange={() => handleCheckboxChange(reply.replyId)}
                  />
                </td>
                <td className="center">{totalReply - idx}</td>
                <td className="center">{reply.board.boardTitle}</td>
                <td className="center">
                  <S.LinkStyle to={`/board/${reply.boardId}/detail`}>{reply.board.title}</S.LinkStyle>
                </td>
                <td className="center">
                  <S.CommentText>{truncateString(reply.replyContent, 8)}</S.CommentText>
                  <S.ModalContainer>
                    <S.ModalContent>{reply.replyContent}</S.ModalContent>
                  </S.ModalContainer>
                </td>
                <td className="center">
                  {reply.replyWriter}
                  {/*<LinkStyle to={`/admin/member/${item.author.id}`}>({item.author.id})</LinkStyle>*/}
                </td>
                <td className="center">{`${reply.replyWriteDate[0]}.${reply.replyWriteDate[1] < 10 ? '0' : ''}${reply.replyWriteDate[1]}.${
                  reply.replyWriteDate[2] < 10 ? '0' : ''
                }${reply.replyWriteDate[2]}`}</td>
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

export default AdminComment;
