import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle } from '../../components/common/commonStyles';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import moment from "moment";
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
        <ContentHeader>
          <Total>
            전체 <strong>{subScribeData.length}</strong> 건
          </Total>
          <BlackListBtn>
            <Delete onClick={handleClosedClick}>구독 상태 변경</Delete>
            <Add>블랙리스트 추가</Add>
          </BlackListBtn>
        </ContentHeader>
        <Table>
          <colgroup>
            <col style={{ width: '100px' }} />
            <col style={{ width: '270px' }} />
            <col style={{ width: '360px' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <TableCheckboxWrapper>
                <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange}/>
              </TableCheckboxWrapper>
              <TableHeader>번호</TableHeader>
              <TableHeader>이메일</TableHeader>
              <TableHeader>구독 상태</TableHeader>
            </tr>
          </thead>
          <tbody>
            {
              subScribeData.length === 0 ? (
                <TableCell colSpan="7">채팅 메시지 기록이 없습니다.</TableCell>
              ) : (
                subScribeData.map((item, index) => (
                <tr key={item.id}>
                  <TableCell>
                    <TableCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="lastChat">{item.emailAddress}</TableCell>
                    <TableCell>{item.isSubScribe}</TableCell>
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
