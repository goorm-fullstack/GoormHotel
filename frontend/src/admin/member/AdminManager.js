import React, { useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import {
  PageTitle,
  InputCheckbox,
  BtnWrapper,
  NormalBtn,
  CheckLabel,
  ContentsTitleXSmall,
  SubmitBtn,
  MultiCheck,
} from '../../components/common/commonStyles';
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

const InputWrapper = styled.div`
  width: 100%;

  form {
    display: flex;
    column-gap: 10px;

    input {
      padding: 0 12px;
    }

    input,
    button {
      width: 17%;
    }
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
          <ContentsTitleXSmall>부운영자 계정 등록</ContentsTitleXSmall>
          <InputWrapper>
            <form>
              <input type="text" placeholder="운영자 ID" />
              <input type="text" placeholder="운영자명" />
              <input type="text" placeholder="운영자 별명" />
              <input type="password" placeholder="접속 비밀번호" />
              <input type="password" placeholder="접속 비밀번호 확인" />
              <SubmitBtn className="header">부운영자 등록</SubmitBtn>
            </form>
          </InputWrapper>
        </Section>
        <Section>
          <ContentsTitleXSmall>부운영자 계정 목록</ContentsTitleXSmall>
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
            <colgroup>
              <col width="80px" />
              <col width="100px" />
              <col width="200px" />
              <col width="200px" />
              <col width="200px" />
              <col width="200px" />
              <col width="150px" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
                </th>
                <th>번호</th>
                <th>운영자명</th>
                <th>운영자 ID</th>
                <th>운영자 별명</th>
                <th>등록일</th>
                <th>사용여부</th>
              </tr>
            </thead>
            <tbody>
              {managerData.length === 0 && (
                <td colSpan="7" className="center">
                  등록된 계정이 없습니다.
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
                    <button onClick={() => handleManagerClick(item)}>{item.memberId}</button>
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
          <ContentsTitleXSmall>부운영자 계정 설정</ContentsTitleXSmall>
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
                      type="password"
                      placeholder="접속 비밀번호"
                      defaultValue={selectedManager.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>접근 권한</th>
                  <td>
                    <MultiCheck>
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
                    </MultiCheck>
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
                    <input type="password" placeholder="접속 비밀번호" />
                  </td>
                </tr>
                <tr>
                  <th>접속 비밀번호 확인</th>
                  <td>
                    <input type="password" placeholder="접속 비밀번호 확인" />
                  </td>
                </tr>
                <tr>
                  <th>접근 권한</th>
                  <td>
                    <MultiCheck>
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
                    </MultiCheck>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
          <BtnWrapper className="mt40 center">
            <SubmitBtn>수정</SubmitBtn>
          </BtnWrapper>
        </Section>
      </Container>
    </AdminLayout>
  );
};

export default AdminManager;
