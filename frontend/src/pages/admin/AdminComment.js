import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Container, Title, ContentHeader, Total, BlackListBtn, Delete, Add, Table, TableCheckboxWrapper, TableHeader, TableCell, TableCheckbox, Num } from './AdminMember';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  border: 1px solid #DDDDDD;
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
    const updatedCheckedItems = checkedItems.includes(memberId)
      ? checkedItems.filter((id) => id !== memberId)
      : [...checkedItems, memberId];

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
      board: "이용후기",
      post: "게시글 제목",
      content: "이것은 첫 번째 댓글입니다.",
      author:  { name: "홍구름", id: "memberId1" },
      date: "2023.09.13",
    },
    {
      id: 2,
      board: "이용후기",
      post: "게시글 2",
      content: "두 번째 댓글입니다.",
      author: { name: "홍구름", id: "memberId2" },
      date: "2023.09.14",
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
          <Total>전체 <Num>{comments.length}</Num> 건</Total>
          <BlackListBtn>
            <Delete>신고처리</Delete>
            <Add>삭제</Add>
          </BlackListBtn>
        </ContentHeader>
        <Table>
          <thead>
            <tr>
              <TableCheckboxWrapper>
                <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange}/>
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
            {comments.length === 0 && (
              <TableCell colSpan="7">
                등록된 회원이 없습니다.
              </TableCell>
            )}
            {comments.map((item) => (
              <tr key={item.id}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(item.author.id)}
                    onChange={() => handleCheckboxChange(item.author.id)}
                  />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.board}</TableCell>
                <TableCell>
                  <LinkStyle to="/">
                    {item.post}
                  </LinkStyle>
                </TableCell>
                <CommentTableCell>
                  <CommentText>
                    {truncateString(item.content, 8)}
                  </CommentText>
                  <ModalContainer>
                    <ModalContent>{item.content}</ModalContent>
                  </ModalContainer>
                </CommentTableCell>
                <TableCell>
                  {item.author.name}
                  <LinkStyle to={`/admin/member/${item.author.id}`}>
                    ({item.author.id})
                  </LinkStyle>
                </TableCell>
                <TableCell>{item.date}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default AdminComment;