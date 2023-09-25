import React, {useEffect, useState} from 'react';
import AdminLayout from '../common/AdminLayout';
import styled from 'styled-components';
import axios from "axios";
import {
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
import {AdminAuthCheck} from "../../utils/api/AdminAuthCheck";

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 72px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin: 0 auto;
`;

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
  const [managerData, setManagerData] = useState([]);

  const [adminId, setAdminId] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminNickname, setAdminNickname] = useState("");
  const [password, setPassword] = useState("");

  console.log('checkedItems', checkedItems);
  console.log('selectedManager', selectedManager);

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

    // 부운영자 등록
    const addManager = async () => {
      const newManager = {
        adminId,
        password,
        adminName,
        adminNickname,
        isActive: true,
        authorities: ["ROLE_MANAGER"]
      };
      try {
        const response = await axios.post("/api/managers", newManager);
        if (response.status === 200) {
          setManagerData([...managerData, response.data]);  // 상태 업데이트
        }
      } catch (error) {
        console.error("Manager addition failed:", error);
      }
    };

    const managerDataExample = [
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

    const subMenus = [
      {name: '전체 회원 관리', link: '/admin/member'},
      {name: '부운영자 관리', link: '/admin/managers'},
    ];

    return (
        <AdminAuthCheck requiredAuthorities={['MemberManage']}>
        <AdminLayout title="회원관리" subMenus={subMenus}>
          <Container>
            <Title>부운영자 관리</Title>
            <Section>
              <SubTitle>부운영자 계정 등록</SubTitle>
              <InputWrapper>
                <Input placeholder="운영자 ID" value={adminId} onChange={(e) => setAdminId(e.target.value)}/>
                <Input placeholder="운영자명" value={adminName} onChange={(e) => setAdminName(e.target.value)}/>
                <Input placeholder="운영자 별명" value={adminNickname} onChange={(e) => setAdminNickname(e.target.value)}/>
                <Input placeholder="접속 비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <Input placeholder="접속 비밀번호 확인" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <AddBtn onClick={addManager}>부운영자 등록</AddBtn>
              </InputWrapper>
            </Section>
            <Section>
              <SubTitle>부운영자 계정 목록</SubTitle>
              <ContentHeader>
                <Total>
                  전체 <Num>{managerData.length}</Num> 건
                </Total>
                <BlackListBtn>
                  <Delete>사용함</Delete>
                  <Add>사용안함</Add>
                </BlackListBtn>
              </ContentHeader>
              <Table>
                <thead>
                <tr>
                  <TableCheckboxWrapper>
                    <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange}/>
                  </TableCheckboxWrapper>
                  <TableHeader>No.</TableHeader>
                  <TableHeader>운영자명</TableHeader>
                  <TableHeader>운영자 ID</TableHeader>
                  <TableHeader>운영자 별명</TableHeader>
                  <TableHeader>생성일</TableHeader>
                  <TableHeader>사용여부</TableHeader>
                </tr>
                </thead>
                <tbody>
                {managerData.length === 0 && <TableCell colSpan="7">등록된 회원이 없습니다.</TableCell>}
                {managerData.map((item) => (
                    <tr key={item.id}>
                      <TableCell>
                        <TableCheckbox
                            type="checkbox"
                            checked={checkedItems.includes(item.memberId)}
                            onChange={() => handleCheckboxChange(item.memberId)}
                        />
                      </TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <ManagerInfoBtn onClick={() => handleManagerClick(item)}>{item.memberId}</ManagerInfoBtn>
                      </TableCell>
                      <TableCell>{item.nickname}</TableCell>
                      <TableCell>{item.joinDate}</TableCell>
                      <TableCell>{item.use}</TableCell>
                    </tr>
                ))}
                </tbody>
              </Table>
            </Section>
            <Section>
              <SubTitle>부운영자 계정 설정</SubTitle>
              <InfoContainer>
                {selectedManager ? (
                    <>
                      <InfoWrapper>
                        <Label>운영자 ID</Label>
                        <AccoutInput
                            placeholder="운영자 ID"
                            defaultValue={selectedManager.memberId}
                            onChange={(e) => handleInputChange('memberId', e.target.value)}
                        />
                      </InfoWrapper>
                      <InfoWrapper>
                        <Label>운영자명</Label>
                        <AccoutInput
                            placeholder="운영자명"
                            defaultValue={selectedManager.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </InfoWrapper>
                      <InfoWrapper>
                        <Label>운영자 별명</Label>
                        <AccoutInput
                            placeholder="운영자 별명"
                            defaultValue={selectedManager.nickname}
                            onChange={(e) => handleInputChange('nickname', e.target.value)}
                        />
                      </InfoWrapper>
                      <InfoWrapper>
                        <Label>접속 비밀번호</Label>
                        <AccoutInput
                            placeholder="접속 비밀번호"
                            defaultValue={selectedManager.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                      </InfoWrapper>
                    </>
                ) : (
                    <>
                      <InfoWrapper>
                        <Label>운영자 ID</Label>
                        <AccoutInput placeholder="운영자 ID"/>
                      </InfoWrapper>
                      <InfoWrapper>
                        <Label>운영자명</Label>
                        <AccoutInput placeholder="운영자명"/>
                      </InfoWrapper>
                      <InfoWrapper>
                        <Label>운영자 별명</Label>
                        <AccoutInput placeholder="운영자 별명"/>
                      </InfoWrapper>
                      <InfoWrapper>
                        <Label>접속 비밀번호</Label>
                        <AccoutInput placeholder="접속 비밀번호"/>
                      </InfoWrapper>
                      <InfoWrapper>
                        <Label>접속 비밀번호 확인</Label>
                        <AccoutInput placeholder="접속 비밀번호 확인"/>
                      </InfoWrapper>
                    </>
                )}
                <InfoWrapper>
                  <Label>접근 권한</Label>
                  <CheckInputWrapper>
                    <CheckInput type="checkbox" placeholder="회원 관리"/>
                    <span>회원관리</span>
                    <CheckInput type="checkbox" placeholder="회원 관리"/>
                    <span>상품 및 예약 관리</span>
                    <CheckInput type="checkbox" placeholder="회원 관리"/>
                    <span>사이트 관리</span>
                  </CheckInputWrapper>
                </InfoWrapper>
              </InfoContainer>
              <ModifyBtnWrapper>
                <ModifyBtn>수정</ModifyBtn>
              </ModifyBtnWrapper>
            </Section>
          </Container>
        </AdminLayout>
        </AdminAuthCheck>
    );
  };

  export default AdminManager;

