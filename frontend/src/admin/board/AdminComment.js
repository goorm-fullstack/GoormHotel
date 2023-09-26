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
import axios, { get } from 'axios';
import Paging from '../../components/common/Paging';

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
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [reply, setReply] = useState([]);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/reply/list');
        const replyData = response.data;

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
        console.log('get 성공');
      } catch (error) {
        console.error('댓글 목록을 불러오는 중 오류 발생', error);
      }
    };

    fetchData();
  }, []);

  console.log(reply);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = comments.map((item) => item.author.id);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === comments.length);
  };

  const comments = [
    {
      id: 1,
      board: '이용후기',
      post: '게시글 제목',
      content: '이것은 첫 번째 댓글입니다.',
      author: { name: '홍구름', id: 'memberId1' },
      date: '2023.09.13',
    },
    {
      id: 2,
      board: '이용후기',
      post: '게시글 2',
      content: '두 번째 댓글입니다.',
      author: { name: '홍구름', id: 'memberId2' },
      date: '2023.09.14',
    },
  ];

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>댓글 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{reply.length}</strong> 건
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
              <th>게시글 제목</th>
              <th>댓글 내용</th>
              <th>작성자명(회원 ID)</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {reply.length === 0 && (
              <td colSpan="7" className="center empty">
                등록된 댓글이 없습니다.
              </td>
            )}
            {reply.map((reply) => (
              <tr key={reply.replyId}>
                <td>
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(null)} //item.author.id
                    onChange={() => handleCheckboxChange(null)} //item.author.id
                  />
                </td>
                <td>{reply.replyId}</td>
                <td>{reply.boardTitle}</td>
                <td>
                  <LinkStyle to={`/board/${reply.boardId}/detail`}>{reply.title}</LinkStyle>
                </td>
                <td>
                  <CommentText>{truncateString(reply.replyContent, 8)}</CommentText>
                  <ModalContainer>
                    <ModalContent>{reply.replyContent}</ModalContent>
                  </ModalContainer>
                </td>
                <td>
                  {reply.replyWriter}
                  {/*<LinkStyle to={`/admin/member/${item.author.id}`}>({item.author.id})</LinkStyle>*/}
                </td>
                <td>{`${reply.replyWriteDate[0]}-${reply.replyWriteDate[1] < 10 ? '0' : ''}${reply.replyWriteDate[1]}-${
                  reply.replyWriteDate[2] < 10 ? '0' : ''
                }${reply.replyWriteDate[2]}`}</td>
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
