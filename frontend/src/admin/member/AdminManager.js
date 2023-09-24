import React, { useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel } from '../../components/common/commonStyles';
import styled from 'styled-components';
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
} from './AdminMember';
import { InfoContainer, InfoWrapper, Label, ModifyBtnWrapper, ModifyBtn } from './AdminMemberDetail';
import Paging from '../../components/common/Paging';

const Section = styled.section`
  margin-bottom: 60px;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const Input = styled.input`
  font-size: 15px;
  border: 1px solid #dddddd;
  width: 200px;
  height: 40px;
  outline: none;
`;

const AddBtn = styled.button`
  background-color: #95846e;
  width: 200px;
  height: 40px;
  text-align: center;
  color: #ffffff;

  &:hover {
    background-color: #8a7057;
  }
`;

const AccoutInput = styled(Input)`
  margin-left: 20px;
`;

const CheckInputWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckInput = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  margin: 10px;
  border: none;

  &:checked {
    background-color: #95846e;
    border: 1px solid #95846e;
  }
`;

const ManagerInfoBtn = styled.button`
  background-color: transparent;

  &:hover {
    text-decoration: underline;
  }
`;

const AdminManager = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  console.log(checkedItems);
  console.log(selectedManager);

  const handleCheckboxChange = (memberId) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === managerData.length);
  };

  const handleManagerClick = (manager) => {
    setSelectedManager(manager);
  };

  const handleInputChange = (field, value) => {
    setSelectedManager((prevManager) => ({
      ...prevManager,
      [field]: value,
    }));
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = managerData.map((item) => item.memberId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const managerData = [
    {
      id: 1,
      number: 1,
      name: '홍구름',
      memberId: 'memberId',
      nickname: '테스트',
      joinDate: '2023.09.01',
      use: 'N',
    },
    {
      id: 2,
      number: 2,
      name: '김봉수',
      memberId: 'testId',
      nickname: '봉수',
      joinDate: '2023.09.03',
      use: 'N',
    },
  ];

  return (
    <AdminLayout subMenus="member">
      <Container>
        <PageTitle>부운영자 관리</PageTitle>
        <Section>
          <SubTitle>부운영자 계정 등록</SubTitle>
          <InputWrapper>
            <Input placeholder="운영자 ID" />
            <Input placeholder="운영자명" />
            <Input placeholder="운영자 별명" />
            <Input placeholder="접속 비밀번호" />
            <Input placeholder="접속 비밀번호 확인" />
            <AddBtn>부운영자 등록</AddBtn>
          </InputWrapper>
        </Section>
        <Section>
          <SubTitle>부운영자 계정 목록</SubTitle>
          <TableHeader>
            <p className="total">
              전체 <strong>{managerData.length}</strong> 건
            </p>
            <BtnWrapper className="flexgap right">
              <NormalBtn className="header">사용함</NormalBtn>
              <NormalBtn className="header red">사용안함</NormalBtn>
            </BtnWrapper>
          </TableHeader>
          <Table>
            <thead>
              <tr>
                <th>
                  <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
                </th>
                <th>No.</th>
                <th>운영자명</th>
                <th>운영자 ID</th>
                <th>운영자 별명</th>
                <th>생성일</th>
                <th>사용여부</th>
              </tr>
            </thead>
            <tbody>
              {managerData.length === 0 && (
                <td colSpan="7" className="center">
                  등록된 회원이 없습니다.
                </td>
              )}
              {managerData.map((item) => (
                <tr key={item.id}>
                  <td className="center">
                    <InputCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(item.memberId)}
                      onChange={() => handleCheckboxChange(item.memberId)}
                    />
                  </td>
                  <td className="center">{item.number}</td>
                  <td className="center">{item.name}</td>
                  <td className="center">
                    <ManagerInfoBtn onClick={() => handleManagerClick(item)}>{item.memberId}</ManagerInfoBtn>
                  </td>
                  <td className="center">{item.nickname}</td>
                  <td className="center">{item.joinDate}</td>
                  <td className="center">{item.use}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paging />
        </Section>
        <Section>
          <SubTitle>부운영자 계정 설정</SubTitle>
          <Table className="horizontal">
            <colgroup>
              <col width="240px" />
              <col width="auto" />
            </colgroup>
            {selectedManager ? (
              <tbody>
                <tr>
                  <th>운영자 ID</th>
                  <td>
                    <input
                      type="text"
                      placeholder="운영자 ID"
                      defaultValue={selectedManager.memberId}
                      onChange={(e) => handleInputChange('memberId', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>운영자명</th>
                  <td>
                    <input
                      type="text"
                      placeholder="운영자명"
                      defaultValue={selectedManager.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>운영자 별명</th>
                  <td>
                    <input
                      type="text"
                      placeholder="운영자 별명"
                      defaultValue={selectedManager.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>접속 비밀번호</th>
                  <td>
                    <input
                      type="text"
                      placeholder="접속 비밀번호"
                      defaultValue={selectedManager.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>접근 권한</th>
                  <td>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" placeholder="회원 관리" />
                      회원관리
                    </CheckLabel>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" placeholder="회원 관리" />
                      상품 및 예약 관리
                    </CheckLabel>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" placeholder="회원 관리" />
                      사이트 관리
                    </CheckLabel>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <th>운영자 ID</th>
                  <td>
                    <input type="text" placeholder="운영자 ID" />
                  </td>
                </tr>
                <tr>
                  <th>운영자명</th>
                  <td>
                    <input type="text" placeholder="운영자명" />
                  </td>
                </tr>
                <tr>
                  <th>운영자 별명</th>
                  <td>
                    <input type="text" placeholder="운영자 별명" />
                  </td>
                </tr>
                <tr>
                  <th>접속 비밀번호</th>
                  <td>
                    <input type="text" placeholder="접속 비밀번호" />
                  </td>
                </tr>
                <tr>
                  <th>접속 비밀번호 확인</th>
                  <td>
                    <input type="text" placeholder="접속 비밀번호 확인" />
                  </td>
                </tr>
                <tr>
                  <th>접근 권한</th>
                  <td>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" placeholder="회원 관리" />
                      회원관리
                    </CheckLabel>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" placeholder="회원 관리" />
                      상품 및 예약 관리
                    </CheckLabel>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" placeholder="회원 관리" />
                      사이트 관리
                    </CheckLabel>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
          <BtnWrapper>
            <ModifyBtn>수정</ModifyBtn>
          </BtnWrapper>
        </Section>
      </Container>
    </AdminLayout>
  );
};

export default AdminManager;
