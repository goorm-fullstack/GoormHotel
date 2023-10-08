import React, {useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel, ContentsTitleXSmall, SubmitBtn, MultiCheck } from '../../Style/commonStyles';
import * as S from './Style';
import { Container, Table, TableHeader } from './Style';
import Paging from '../../components/common/Paging/Paging';
import { useNavigate } from 'react-router-dom';
import Instance from "../../utils/api/axiosInstance";

interface ManagerData {
  id: number;
  adminId: string;
  adminName: string;
  adminNickname: string;
  createdAt: string;
  isActive: boolean;
  password: string;
}

const AdminManager = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedManager, setSelectedManager] = useState<ManagerData | undefined>({} as ManagerData);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");
  const [managerData, setManagerData] = useState<ManagerData[]>([]);

  const [newManager, setNewManager] = useState({
    adminId: '',
    adminName: '',
    adminNickname: '',
    password: '',
    auth: 'AUTH_A'
  });

  // 초기 매니저 정보 불러오기
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await Instance.get('/admin-getlist');
        if (response.status === 200) {
          setManagerData(response.data);
        }
      } catch (error) {
        console.error('매니저 리스트 가져오기 실패', error);
      }
    };
    fetchManagers();
  }, []);

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_A"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  console.log(checkedItems);
  console.log(selectedManager);

  const handleCheckboxChange = (memberId: string) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === managerData.length);
  };

  const handleManagerClick = (manager: ManagerData) => {
    setSelectedManager(manager);
  };

  const handleInputChange = (field: string | React.ChangeEvent<HTMLInputElement>, value?: string | number) => {
    if (typeof field === 'string' && value !== undefined) {
      setSelectedManager((prevManager: ManagerData | undefined): ManagerData | undefined => {
        if (prevManager) {
          return {
            ...prevManager,
            [field]: value,
          };
        }
        return prevManager;
      });
    } else {
      const e = field as React.ChangeEvent<HTMLInputElement>;
      const { name, value } = e.target;
      setNewManager({
        ...newManager,
        [name]: value,
      });
    }
  };

  // 부운영자 등록
  const registerManager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Instance.post('/admin-signup', newManager, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('성공적으로 등록되었습니다.');
        const newManagerData = await Instance.get('/admin-getlist');
        console.log("Backend Response:", response);
        if (newManagerData.status === 200) {
          console.log("Backend Response:", response, newManagerData);
          setManagerData(newManagerData.data);
        }
      }
    } catch (error) {
      alert('등록에 실패했습니다.');
    }
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allAdminIds = managerData.map((item) => item.adminId);
      setCheckedItems(allAdminIds);
    } else {
      setCheckedItems([]);
    }
  };

  if(authItem && authItem.includes("AUTH_A")) {
    return (
        <AdminLayout subMenus="member">
          <Container>
            <PageTitle>부운영자 관리</PageTitle>
            <S.Section>
              <ContentsTitleXSmall>부운영자 계정 등록</ContentsTitleXSmall>
              <S.InputWrapper>
                <form onSubmit={registerManager}>
                  <input type="text" placeholder="운영자 ID" name="adminId" onChange={handleInputChange} />
                  <input type="text" placeholder="운영자명" name="adminName" onChange={handleInputChange} />
                  <input type="text" placeholder="운영자 별명" name="adminNickname" onChange={handleInputChange} />
                  <input type="password" placeholder="접속 비밀번호" name="password" onChange={handleInputChange} />
                  <input type="password" placeholder="접속 비밀번호 확인" name="password" onChange={handleInputChange} />
                  <SubmitBtn className="header" type="submit">부운영자 등록</SubmitBtn>
                </form>
              </S.InputWrapper>
            </S.Section>
            <S.Section>
              <ContentsTitleXSmall>부운영자 계정 목록</ContentsTitleXSmall>
              <TableHeader>
                <p className="total">
                  전체 <strong>{managerData.length}</strong> 건
                </p>
                <BtnWrapper className="flexgap right">
                  <NormalBtn className="header">계정 사용 가능</NormalBtn>
                  <NormalBtn className="header red">계정 사용 정지</NormalBtn>
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
                {managerData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="center empty">
                        등록된 계정이 없습니다.
                      </td>
                    </tr>
                ) : (
                    managerData.map((item) => (
                        <tr key={item.id}>
                      <td className="center">
                        <InputCheckbox
                            type="checkbox"
                            checked={checkedItems.includes(item.adminId)}
                            onChange={() => handleCheckboxChange(item.adminId)}
                        />
                      </td>
                      <td className="center">{item.id}</td>
                      <td className="center">{item.adminName}</td>
                      <td className="center">
                        <button onClick={() => handleManagerClick(item as ManagerData)}>{item.adminId}</button>
                      </td>
                      <td className="center">{item.adminNickname}</td>
                      <td className="center">{item.createdAt}</td>
                          <td className="center">{item.isActive ? '활성화' : '비활성화'}</td>
                        </tr>
                    ))
                )}
                </tbody>
              </Table>
              <Paging totalPage={totalPages} />
            </S.Section>
            <S.Section>
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
                            defaultValue={selectedManager.adminId}
                            onChange={(e) => handleInputChange('adminId', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>운영자명</th>
                      <td>
                        <input
                            type="text"
                            placeholder="운영자명"
                            defaultValue={selectedManager.adminName}
                            onChange={(e) => handleInputChange('adminName', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>운영자 별명</th>
                      <td>
                        <input
                            type="text"
                            placeholder="운영자 별명"
                            defaultValue={selectedManager.adminNickname}
                            onChange={(e) => handleInputChange('adminNickname', e.target.value)}
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
            </S.Section>
          </Container>
        </AdminLayout>
    );
  } else {
    return null;
  }
};

export default AdminManager;