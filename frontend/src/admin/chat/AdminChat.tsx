import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import { Link, useParams } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import Paging from '../../components/common/Paging/Paging';
import { Container, Table, TableHeader } from '../member/AdminMember';

interface ChatMessage {
  id : number;
  roomId : string;
  sender : string;
  message : string;
  createTime : string;
  type : string;
}

interface ChatRoom {
  id : number
  roomId : string;
  name : string;
  chatMessages : ChatMessage[];
  status : string;
  timestamp : string;
}



const AdminChat = () => {
  const { page } = useParams();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [chatData, setChatData] = useState<ChatRoom[]>([]);

  useEffect(() => {
    Instance.get(`/chat/getLastMessage?page=${page}`).then((response) => {
      setChatData(response.data);
    });

    Instance.get("/chat/count").then((response)=>{
      setCount(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSelectAllChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      const allMemberIds = chatData.map((item) => item.chatMessages[0].roomId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (id : string) => {
    setCheckedItems((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item) => item !== id);
      } else {
        return [...prevItems, id];
      }
    });
  };

  const handleClosedClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    checkedItems.map((roomId, index) => {
      Instance.get('/chat/closed/' + roomId).then((response) => {
        console.log(response);
        // 닫은 방을 다시 열려면 사용자가 채팅을 해야합니다. 수동으로 전환하지 마세요.
      });
    });
    window.location.reload();
  };

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>채팅 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{chatData.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header" onClick={handleClosedClick}>
              채팅 상태 변경
            </NormalBtn>
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
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>번호</th>
              <th>회원명(회원ID)</th>
              <th>최근 메시지</th>
              <th>최근 발송일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {chatData.length === 0 ? (
              <td colSpan={6} className="center empty">
                채팅 메시지 기록이 없습니다.
              </td>
            ) : (
              chatData.map((item : ChatRoom, index : number) => (
                <tr key={item.id}>
                  <td style={{textAlign : "center"}}>
                    <InputCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(item.chatMessages[0].roomId)}
                      onChange={() => handleCheckboxChange(item.chatMessages[0].roomId)}
                    />
                    </td>
                    <td style={{textAlign : "center"}}>{index + 1}</td>
                    <td style={{textAlign : "center"}}>
                      {item.chatMessages[0].sender}(
                      <Link to={`/admin/member/${item.chatMessages[0].sender}`} className="memberId">
                        {item.chatMessages[0].sender}
                      </Link>
                      )
                      </td>
                      <td style={{textAlign : "center"}} className="lastChat">
                      <p>
                        <Link to={`/admin/chat/detail/${item.roomId}`}>{item.chatMessages[0].message}</Link>
                      </p>
                    </td>
                    <td style={{textAlign : "center"}}>{item.chatMessages[0].createTime}</td>
                    <td style={{textAlign : "center"}}>{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Paging totalPage={count} />
      </Container>
    </AdminLayout>
  );
};

export default AdminChat;
