import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel } from '../../components/common/commonStyles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
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
import Paging from '../../components/common/Paging';

const AdminChat = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [chatData, setChatData] = useState([
    {
      id: 3,
      number: 3,
      chatMessages: [
        {
          memberId: 'user001',
          name: '홍길동',
          lastChat: '마지막 채팅 내용입니다.',
          lastDate: '2023.09.03',
        },
      ],
      state: '미확인',
    },
    {
      id: 2,
      number: 2,
      chatMessages: [
        {
          memberId: 'user001',
          name: '홍길동',
          lastChat: '마지막 채팅 내용입니다.',
          lastDate: '2023.09.03',
        },
      ],
      state: '종료',
    },
    {
      id: 1,
      number: 1,
      chatMessages: [
        {
          memberId: 'user001',
          name: '홍길동',
          lastChat: '마지막 채팅 내용입니다.',
          lastDate: '2023.09.03',
        },
      ],
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

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>채팅 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{chatData.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header">채팅 상태 변경</NormalBtn>
            <NormalBtn className="header">블랙리스트 해제</NormalBtn>
            <NormalBtn className="header red">블랙리스트 추가</NormalBtn>
          </BtnWrapper>
        </TableHeader>
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
              <th>
                <InputCheckbox type="checkbox" />
              </th>
              <th>번호</th>
              <th>회원명(회원ID)</th>
              <th>최근 메시지</th>
              <th>최근 발송일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {chatData.length === 0 && <td colSpan="7">채팅 메시지 기록이 없습니다.</td>}
            {chatData.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(item.chatMessages.memberId)}
                    onChange={() => handleCheckboxChange(item.chatMessages.memberId)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>
                  {item.chatMessages.name}(
                  <Link to={`/admin/member/${item.chatMessages[0].sender}`} className="memberId">
                    {item.chatMessages[0].sender}
                  </Link>
                  )
                </td>
                <td className="lastChat">
                  <p>
                    <Link to={`/admin/chat/${item.roomId}`}>{item.chatMessages[0].message}</Link>
                  </p>
                  <div className="allMessage">{item.chatMessages[0].message}</div>
                </td>
                <td>{item.timestamp}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminChat;
