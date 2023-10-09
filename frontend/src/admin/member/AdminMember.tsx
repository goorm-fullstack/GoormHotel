import React, {useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import * as S from './Style';
import {Link, useNavigate} from 'react-router-dom';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import Paging from '../../components/common/Paging/Paging';

const AdminMember = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_A"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);


  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = memberData.map((item) => item.memberId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId: string) => {
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

  if(authItem && authItem.includes("AUTH_A")) {
  return (
    <AdminLayout subMenus="member">
      <S.Container>
        <PageTitle>전체 회원 관리</PageTitle>
        <S.TableHeader>
          <p className="total">
            전체 <strong>{memberData.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header">블랙리스트 해제</NormalBtn>
            <NormalBtn className="header red">블랙리스트 추가</NormalBtn>
          </BtnWrapper>
        </S.TableHeader>
        <S.Table>
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
              <th>회원 ID</th>
              <th>회원 이름</th>
              <th>회원등급</th>
              <th>가입일</th>
              <th>블랙리스트</th>
            </tr>
          </thead>
          <tbody>
            {memberData.length === 0 && (
              <td colSpan={7} className="center empty">
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
                <td className="center">
                  <Link to={`/admin/member/detail/${item.memberId}`}>{item.memberId}</Link>
                </td>
                <td className="center">{item.name}</td>
                <td className="center">{item.grade}</td>
                <td className="center">{item.joinDate}</td>
                <td className="center">{item.blacklist}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>
        <Paging totalPage={totalPages} />
      </S.Container>
    </AdminLayout>
  );
  } else {
    return null;
  }
};

export default AdminMember;
