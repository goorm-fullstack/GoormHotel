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
import axios, { get } from 'axios';
import Paging from '../../components/common/Paging';

const CommentTableHeader = styled(TableHeader)`
  width: 15%;
`;

const CommentTableCell = styled(TableCell)`
  position: relative;
`;

const ModalContainer = styled.div`
  display: none;
  position: absolute;
  width: 217px;
  height: 104px;
  border: 1px solid #dddddd;
  background-color: #fff;
  text-align: left;
  padding-top: 27px;
  padding-left: 21px;
  z-index: 10;
  right: -50px;
  margin-top: 10px;
`;

const CommentText = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-color: #444444;
    text-underline-offset: 10px;
  }

  &:hover + ${ModalContainer} {
    display: block;
  }
`;

const ModalContent = styled.div`
  max-height: 300px;
`;

const LinkStyle = styled(Link)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: #444444;
    text-underline-offset: 10px;
  }
`;

const AdminComment = () => {
  const { page } = useParams();
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [reply, setReply] = useState([]);
  const [board, setBoard] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalReply, setTotalReply] = useState(0);

  useEffect(() => {
    const currentPage = parseInt(page, 10);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/reply/list?page=${currentPage}`);
        const replyData = response.data;
        const totalPages = parseInt(response.headers['totalpages'], 10);
        const totalData = parseInt(response.headers['totaldata'], 10);
        console.log(totalData);

        // 게시물의 title을 가져오는 함수
        const getBoardTitle = async (boardId) => {
          try {
            const titleResponse = await axios.get(`/boards/${boardId}`);
            return titleResponse.data.title;
          } catch (error) {
            console.error('title을 가져오는 중 오류 발생', error);
            return ''; // 오류 발생 시 빈 문자열 반환
          }
        };

        //게시물의 게시판 이름을 가져오는 함수
        const getBoardBoardTitle = async (boardId) => {
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
  const handleSelectAllChange = (e) => {
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
  const handleCheckboxChange = (replyId) => {
    const updatedCheckedItems = checkedItems.includes(replyId) ? checkedItems.filter((id) => id !== replyId) : [...checkedItems, replyId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === reply.length);
  };

  // 댓글 내용 줄이기
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };

  // 선택 댓글 삭제
  const handleDeleteItems = () => {
    let isConfirm = window.confirm('삭제하시겠습니까?');
    const deletions = checkedItems.map((item) => {
      console.log(item);
      const url = `/reply/softdelete/${item}`;
      if (isConfirm) {
        return axios.put(url);
      }
    });

    Promise.all(deletions)
      .then((responses) => {
        const successfulDeletions = responses.filter((response) => response.status === 200);
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
      }
    });

    Promise.all(reportions)
      .then((response) => {
        const successfulReportions = response.filter((response) => response.status === 200);
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

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>댓글 관리</PageTitle>
        <ContentHeader>
          <Total>
            전체 <Num>{totalReply}</Num> 건
          </Total>
          <BlackListBtn>
            <Delete onClick={handleReport}>신고처리</Delete>
            <Add onClick={handleDeleteItems}>삭제</Add>
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
              <TableHeader>게시글 제목</TableHeader>
              <CommentTableHeader>댓글 내용</CommentTableHeader>
              <CommentTableHeader>작성자명(회원 ID)</CommentTableHeader>
              <TableHeader>작성일</TableHeader>
            </tr>
          </thead>
          <tbody>
            {reply.length === 0 && <TableCell colSpan="7">등록된 댓글이 없습니다.</TableCell>}
            {reply.map((reply, idx) => (
              <tr key={reply.replyId}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(reply.replyId)}
                    onChange={() => handleCheckboxChange(reply.replyId)}
                  />
                </TableCell>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{reply.boardTitle}</TableCell>
                <TableCell>
                  <LinkStyle to={`/board/${reply.boardId}/detail`}>{reply.title}</LinkStyle>
                </TableCell>
                <CommentTableCell>
                  <CommentText>{truncateString(reply.replyContent, 8)}</CommentText>
                  <ModalContainer>
                    <ModalContent>{reply.replyContent}</ModalContent>
                  </ModalContainer>
                </CommentTableCell>
                <TableCell>
                  {reply.replyWriter}
                  {/*<LinkStyle to={`/admin/member/${item.author.id}`}>({item.author.id})</LinkStyle>*/}
                </TableCell>
                <TableCell>{`${reply.replyWriteDate[0]}-${reply.replyWriteDate[1] < 10 ? '0' : ''}${reply.replyWriteDate[1]}-${
                  reply.replyWriteDate[2] < 10 ? '0' : ''
                }${reply.replyWriteDate[2]}`}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminComment;
