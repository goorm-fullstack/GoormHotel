import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import {
  Container,
  Title,
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
import axios, {get} from "axios";

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
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [reply, setReply] = useState([]);

  useEffect(() => {
    axios.get('/reply/list').then((response) => {
      setReply(response.data);

      console.log('get 성공');
    });
  }, []);

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

  const subMenus = [
    { name: '게시글 관리', link: '/admin/board' },
    { name: '댓글 관리', link: '/admin/comments' },
    { name: '삭제된 글 관리', link: '/admin/deleteComment' },
    { name: '신고 관리', link: '/admin/report' },
  ];

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
    <AdminLayout title="게시판 관리" subMenus={subMenus}>
      <Container>
        <Title>댓글 관리</Title>
        <ContentHeader>
          <Total>
            전체 <Num>{reply.length}</Num> 건
          </Total>
          <BlackListBtn>
            <Delete>신고처리</Delete>
            <Add>삭제</Add>
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
              <TableHeader>게시글</TableHeader>
              <CommentTableHeader>댓글 내용</CommentTableHeader>
              <CommentTableHeader>작성자명(회원 ID)</CommentTableHeader>
              <TableHeader>작성일</TableHeader>
            </tr>
          </thead>
          <tbody>
            {reply.length === 0 && <TableCell colSpan="7">등록된 댓글이 없습니다.</TableCell>}
            {reply.map((reply) => (
              <tr key={reply.replyId}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(null)}   //item.author.id
                    onChange={() => handleCheckboxChange(null)}   //item.author.id
                  />
                </TableCell>
                <TableCell>{reply.replyId}</TableCell>
                <TableCell>{"카테고리(후기, 문의)"}</TableCell>
                <TableCell>
                  <LinkStyle to="/">{reply.boardId}</LinkStyle>
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
                <TableCell>{`${reply.replyWriteDate[0]}-${(reply.replyWriteDate[1] < 10 ? '0' : '')}${reply.replyWriteDate[1]}-${(reply.replyWriteDate[2] < 10 ? '0' : '')}${reply.replyWriteDate[2]}`}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default AdminComment;
