import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { commonAdminContents, PageTitle } from '../../components/common/commonStyles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
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

const AdminChat = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [chatData, setChatData] = useState([
    {
      id: 3,
      number: 3,
      memberId: 'user001',
      name: '홍길동',
      lastChat: '마지막 채팅 내용입니다.',
      lastDate: '2023.09.03',
      state: '미확인',
    },
    {
      id: 2,
      number: 2,
      memberId: 'user002',
      name: '홍구름',
      lastChat: '마지막 채팅 내용입니다.',
      lastDate: '2023.09.03',
      state: '종료',
    },
    {
      id: 1,
      number: 1,
      memberId: 'user003',
      name: '김구름',
      lastChat:
        '마지막 채팅 내용입니다. 마지막 채팅 내용입니다. 마지막 채팅 내용입니다. 마지막 채팅 내용입니다.마지막 채팅 내용입니다. 마지막 채팅 내용입니다. 마지막 채팅 내용입니다. 마지막 채팅 내용입니다.',
      lastDate: '2023.09.04',
      state: '종료',
    },
  ]);

  useEffect(() => {
    Instance.get('/chat/getLastMessage').then((response) => {
      console.log(response.data);
      setChatData(response.data);
    });
  }, []);

  const handleCheckboxChange = (memberId) => {
    setCheckedItems((prevItems) => {
      if (prevItems.includes(memberId)) {
        return prevItems.filter((item) => item !== memberId);
      } else {
        return [...prevItems, memberId];
      }
    });
  };

  console.log(checkedItems);

  const subMenus = [
    { name: '채팅 관리', link: '/admin/chat' },
    { name: '메일 작성', link: '/admin/mail' },
  ];

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>채팅 관리</PageTitle>
        <ContentHeader>
          <Total>
            전체 <strong>{chatData.length}</strong> 건
          </Total>
          <BlackListBtn>
            <Delete>채팅 상태 변경</Delete>
            <Delete>블랙리스트 해제</Delete>
            <Add>블랙리스트 추가</Add>
          </BlackListBtn>
        </ContentHeader>
        <Table>
          <colgroup>
            <col style={{ width: '100px' }} />
            <col style={{ width: '110px' }} />
            <col style={{ width: '180px' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '180px' }} />
            <col style={{ width: '180px' }} />
          </colgroup>
          <thead>
            <tr>
              <TableCheckboxWrapper>
                <TableCheckbox type="checkbox" />
              </TableCheckboxWrapper>
              <TableHeader>번호</TableHeader>
              <TableHeader>회원명(회원ID)</TableHeader>
              <TableHeader>최근 메시지</TableHeader>
              <TableHeader>최근 발송일</TableHeader>
              <TableHeader>상태</TableHeader>
            </tr>
          </thead>
          <tbody>
            {chatData.length === 0 && <TableCell colSpan="7">채팅 메시지 기록이 없습니다.</TableCell>}
            {chatData.map((item, index) => (
              <tr key={item.id}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(item.memberId)}
                    onChange={() => handleCheckboxChange(item.memberId)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {item.name}(
                  <Link to={`/admin/member/${item.sender}`} className="memberId">
                    {item.sender}
                  </Link>
                  )
                </TableCell>
                <TableCell className="lastChat">
                  <p>
                    <Link to={`/admin/chat/${item.roomId}`}>{item.message}</Link>
                  </p>
                  <div className="allMessage">{item.message}</div>
                </TableCell>
                <TableCell>{item.createTime}</TableCell>
                <TableCell>{item.state}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default AdminChat;
