import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from "moment";
import Instance from '../../utils/api/axiosInstance';

const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Total = styled.span`
  color: #444444;
  font-size: 15px;

  strong {
    font-weight: bold;
  }
`;

const BlackListBtn = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
`;

const Delete = styled.button`
  width: 120px;
  height: 100%;
  text-align: center;
  color: #666666;
  border: 1px solid #dddddd;
  background: white;
  font-size: 15px;

  &:hover {
    background: #f7f7f7;
  }
`;

const Add = styled(Delete)`
  border-color: #d30a0a;
  color: #d30a0a;

  &:hover {
    background: #d30a0a;
    color: white;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;

  th,
  td {
    padding: 18.25px 20px;
    text-align: center;
    vertical-align: middle;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #dddddd;
  }

  th {
    background-color: #f7f7f7;
    font-weight: 500;
    color: #111;
  }
`;

const TableCheckboxWrapper = styled.th``;

const TableHeader = styled.th``;

const TableCell = styled.td`
  color: #444;
  position: relative;

  &.lastChat p {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    max-width: 300px;
    padding: 3px 0;
  }
  .allMessage {
    position: absolute;
    top: 75%;
    left: 40%;
    max-width: 60%;
    background: white;
    border: 1px solid #ddd;
    padding: 20px;
    z-index: 1;
    text-align: left;
    display: none;
    line-height: 1.4;
  }
  &.lastChat:hover .allMessage {
    display: block;
  }
  &.lastChat a:hover,
  a.memberId {
    text-decoration: underline;
  }
`;

const TableCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='lightgray' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  cursor: pointer;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #baa085;
  }
`;

const AdminChat = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [chatData, setChatData] = useState([
    {
      id: 3,
      number: 3,
      chatMessages : [
        {
          memberId: 'user001',
          name: '홍길동',
          lastChat: '마지막 채팅 내용입니다.',
          lastDate: '2023.09.03',
        }
      ],
      state: '미확인',
    },
    {
      id: 2,
      number: 2,
      chatMessages : [
        {
          memberId: 'user001',
          name: '홍길동',
          lastChat: '마지막 채팅 내용입니다.',
          lastDate: '2023.09.03',
        }
      ],
      state: '종료',
    },
    {
      id: 1,
      number: 1,
      chatMessages : [
        {
          memberId: 'user001',
          name: '홍길동',
          lastChat: '마지막 채팅 내용입니다.',
          lastDate: '2023.09.03',
        }
      ],
      state: '종료',
    },
  ])

  useEffect(()=> {
    Instance.get("/chat/getLastMessage")
      .then((response) =>{
        console.log(response.data);
        setChatData(response.data)
      })
  },[])

  const handleCheckboxChange = (memberId) => {
    setCheckedItems((prevItems) => {
      if (prevItems.includes(memberId)) {
        return prevItems.filter((item) => item !== memberId);
      } else {
        return [...prevItems, memberId];
      }
    });
  };


  const subMenus = [
    { name: '채팅 관리', link: '/admin/chat' },
    { name: '메일 작성', link: '/admin/mail' },
  ];

  return (
    <AdminLayout title="채팅/메일 관리" subMenus={subMenus}>
      <Container>
        <Title>채팅 관리</Title>
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
                    checked={checkedItems.includes(item.chatMessages.memberId)}
                    onChange={() => handleCheckboxChange(item.chatMessages.memberId)}
                  />
                </TableCell>
                <TableCell>{index+1}</TableCell>
                <TableCell>
                  {item.chatMessages.name}(
                  <Link to={`/admin/member/${item.chatMessages[0].sender}`} className="memberId">
                    {item.chatMessages[0].sender}
                  </Link>
                  )
                </TableCell>
                <TableCell className="lastChat">
                  <p>
                    <Link to={`/admin/chat/${item.roomId}`}>{item.chatMessages[0].message}</Link>
                  </p>
                  <div className="allMessage">{item.chatMessages[0].message}</div>
                </TableCell>
                <TableCell>{item.chatMessages[0].createTime}</TableCell>
                <TableCell>{item.status}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default AdminChat;
