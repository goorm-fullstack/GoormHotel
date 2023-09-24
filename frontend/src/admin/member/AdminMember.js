import React, { useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { commonAdminContents, PageTitle } from '../../components/common/commonStyles';

export const Container = styled(commonAdminContents)``;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 72px;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Total = styled.span`
  color: #444444;
  font-size: 15px;
`;

export const BlackListBtn = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
`;

export const Delete = styled.button`
  width: 120px;
  height: 100%;
  text-align: center;
  color: #666666;
  border: 1px solid #dddddd;
  background-color: transparent;
`;

export const Add = styled(Delete)`
  border-color: #d30a0a;
  color: #d30a0a;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableCheckboxWrapper = styled.th`
  background-color: #f7f7f7;
  vertical-align: middle;
  width: 1%;
  text-align: center;
`;

export const TableHeader = styled.th`
  height: 60px;
  background-color: #f7f7f7;
  text-align: center;
  vertical-align: middle;
  border: none;
  width: 10%;
`;

export const TableCell = styled.td`
  vertical-align: middle;
  height: 60px;
  text-align: center;
  color: #444444;
  border-bottom: 1px solid #dddddd;
`;

export const TableCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #dddddd !important;
  outline: none;
  margin-left: 39px;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='lightgray' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 120% 120%;
  background-position: 50%;
  background-repeat: no-repeat;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #baa085;
  }
`;

export const Num = styled.span`
  font-weight: bold;
`;

const AdminMember = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = memberData.map((item) => item.memberId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === memberData.length);
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
      blacklist: 'N',
    },
    {
      id: 2,
      number: 2,
      grade: 'Silver',
      memberId: 'user002',
      name: '김철수',
      joinDate: '2023.09.01',
      blacklist: 'Y',
    },
    {
      id: 3,
      number: 3,
      grade: 'Bronze',
      memberId: 'user003',
      name: '이영희',
      joinDate: '2023.09.01',
      blacklist: 'N',
    },
  ];

  return (
    <AdminLayout subMenus="member">
      <Container>
        <PageTitle>전체 회원 관리</PageTitle>
        <ContentHeader>
          <Total>
            전체 <Num>{memberData.length}</Num> 건
          </Total>
          <BlackListBtn>
            <Delete>블랙리스트 해제</Delete>
            <Add>블랙리스트 추가</Add>
          </BlackListBtn>
        </ContentHeader>
        <Table>
          <thead>
            <tr>
              <TableCheckboxWrapper>
                <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
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
            {memberData.length === 0 && <TableCell colSpan="7">등록된 회원이 없습니다.</TableCell>}
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
                <TableCell>
                  <Link to={`/admin/member/${item.memberId}`}>{item.memberId}</Link>
                </TableCell>
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
