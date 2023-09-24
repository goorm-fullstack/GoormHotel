import React, { useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { commonAdminContents, PageTitle, commonTable, InputCheckbox, BtnWrapper, NormalBtn } from '../../components/common/commonStyles';
import Paging from '../../components/common/Paging';

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
  color: ${(props) => props.theme.colors.charcoal};

  strong {
    font-weight: 500;
    color: ${(props) => props.theme.colors.goldhover};
  }
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

export const Table = styled(commonTable)``;

export const TableCheckboxWrapper = styled.th`
  background-color: #f7f7f7;
  vertical-align: middle;
  width: 1%;
  text-align: center;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;

  strong {
    color: ${(props) => props.theme.colors.goldhover};
  }
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
        <TableHeader>
          <p className="total">
            전체 <strong>{memberData.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header">블랙리스트 해제</NormalBtn>
            <NormalBtn className="header red">블랙리스트 추가</NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>No.</th>
              <th>회원등급</th>
              <th>회원ID</th>
              <th>회원 이름</th>
              <th>가입일</th>
              <th>블랙리스트</th>
            </tr>
          </thead>
          <tbody>
            {memberData.length === 0 && (
              <td colSpan="7" className="center">
                등록된 회원이 없습니다.
              </td>
            )}
            {memberData.map((item) => (
              <tr key={item.id}>
                <td className="center">
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(item.memberId)}
                    onChange={() => handleCheckboxChange(item.memberId)}
                  />
                </td>
                <td className="center">{item.number}</td>
                <td className="center">{item.grade}</td>
                <td className="center">
                  <Link to={`/admin/member/detail/${item.memberId}`}>{item.memberId}</Link>
                </td>
                <td className="center">{item.name}</td>
                <td className="center">{item.joinDate}</td>
                <td className="center">{item.blacklist}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminMember;
