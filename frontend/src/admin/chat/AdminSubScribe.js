import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn  } from '../../components/common/commonStyles';
import { Link, useParams } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import {
  Container,
  Table,
  TableHeader
} from '../member/AdminMember';
import Paging from '../../components/common/Paging';

const AdminSubScribe = () => {
  const {page} = useParams()
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [subScribeData, setSubScribeData] = useState([
    {
      id: 1,
      emailAddress: "test1@test.com",
      isSubScribe: 'true',
    },
    {
      id: 2,
      emailAddress: "test2@test.com",
      isSubScribe: 'true',
    },
    {
      id: 3,
      emailAddress: "test3@test.com",
      isSubScribe: 'true',
    },
  ]);

  // useEffect(() => {
  //   Instance.get(`/subscribe?page=${page}`).then((response) => {
  //     console.log(response.data);
  //     setChatData(response.data);
  //   });
  // }, []);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);
    console.log("test")
    console.log(subScribeData.chatMessages);
    console.log("===============================")
    if (checked) {
      const allMemberIds = subScribeData.map((item) => item.id);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item) => item !== id);
      } else {
        return [...prevItems, id];
      }
    });
  };

  const handleClosedClick = (e) => {
    checkedItems.map((roomId, index) => {
      Instance.get("/chat/closed/"+roomId).then((response)=>{
        console.log(response)
        // 닫은 방을 다시 열려면 사용자가 채팅을 해야합니다. 수동으로 전환하지 마세요.
      })
    })
    window.location.reload();
  }


  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>채팅 관리</PageTitle>
        <TableHeader>
          <p className='total'>
            전체 <strong>{subScribeData.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header" onClick={handleClosedClick}>구독 상태 변경</NormalBtn>
            <NormalBtn className="header red">블랙리스트 추가</NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <colgroup>
            <col style={{ width: '100px' }} />
            <col style={{ width: '270px' }} />
            <col style={{ width: '360px' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange}/>
              </th>
              <th>번호</th>
              <th>이메일</th>
              <th>구독 상태</th>
            </tr>
          </thead>
          <tbody>
            {
              subScribeData.length === 0 ? (
                <td colSpan="7">채팅 메시지 기록이 없습니다.</td>
              ) : (
                subScribeData.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <InputCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    </td>
                    <td>{item.id}</td>
                    <td className="lastChat">{item.emailAddress}</td>
                    <td>{item.isSubScribe}</td>
                </tr>
                ))
              )
            }
          </tbody>
        </Table>
        <Paging/>
      </Container>
    </AdminLayout>
  );
};

export default AdminSubScribe;
