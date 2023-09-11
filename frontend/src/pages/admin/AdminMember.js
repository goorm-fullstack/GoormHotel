import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 72px;
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
  border: 1px solid #DDDDDD;
  background-color: transparent;
`;

const Add = styled(Delete)`
  border-color: #D30A0A;
  color: #D30A0A;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableCheckboxWrapper = styled.th`
  background-color: #f7f7f7;
  vertical-align: middle;
  width: 1%;
  text-align: center;
`;

const TableHeader = styled.th`
  height: 60px;
  background-color: #f7f7f7;
  text-align: center;
  vertical-align: middle;
  border: none;
  width: 10%;
`;

const TableCell = styled.td`
  vertical-align: middle;
  height: 60px;
  text-align: center;
  color: #444444;
  border-bottom: 1px solid #DDDDDD;
`;

const TableCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #DDDDDD !important;
  outline: none;
  margin-left: 39px;
`;

const AdminMember = () => {
  const [checkedItems, setCheckedItems] = useState([]);

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

  const memberData = [
    {
      id: 1,
      number: 1,
      grade: 'Gold',
      memberId: 'user001',
      name: '홍길동',
      joinDate: '2023.09.01',
      blacklist: 'N'
    },
    {
      id: 2,
      number: 2,
      grade: 'Silver',
      memberId: 'user002',
      name: '김철수',
      joinDate: '2023.09.01',
      blacklist: 'Y'
    },
    {
      id: 3,
      number: 3,
      grade: 'Bronze',
      memberId: 'user003',
      name: '이영희',
      joinDate: '2023.09.01',
      blacklist: 'N'
    },
  ];

  const subMenus = [
    { name: '전체 회원 관리', link: '/admin/member' },
    { name: '부운영자 관리', link: '/admin/managers' },
  ];

  return (
    <AdminLayout title="회원관리" subMenus={subMenus}>
      <Container>
        <Title>전체 회원 관리</Title>
        <ContentHeader>
          <Total>전체 0 건</Total>
          <BlackListBtn>
            <Delete>블랙리스트 해제</Delete>
            <Add>블랙리스트 추가</Add>
          </BlackListBtn>
        </ContentHeader>
        <Table>
          <thead>
            <tr>
              <TableCheckboxWrapper>
                <TableCheckbox/>
              </TableCheckboxWrapper>
              <TableHeader>No.</TableHeader>
              <TableHeader>회원등급</TableHeader>
              <TableHeader>회원ID</TableHeader>
              <TableHeader>회원 이름</TableHeader>
              <TableHeader>가입일</TableHeader>
              <TableHeader>블랙리스트</TableHeader>
            </tr>
          </thead>
          <tbody>
            {memberData.length === 0 && (
              <TableCell colSpan="7">
                등록된 회원이 없습니다.
              </TableCell>
            )}
            {memberData.map((item) => (
              <tr key={item.id}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(item.memberId)}
                    onChange={() => handleCheckboxChange(item.memberId)}
                  />
                </TableCell>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>{item.memberId}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.joinDate}</TableCell>
                <TableCell>{item.blacklist}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default AdminMember;