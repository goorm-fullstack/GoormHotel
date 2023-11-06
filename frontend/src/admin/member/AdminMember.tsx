import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import * as S from './Style';
import { Link, useNavigate } from 'react-router-dom';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import Paging from '../../components/common/Paging/Paging';
import Instance from '../../utils/api/axiosInstance';
import AdminCheck from '../adminCheck';

interface Member {
  id: number;
  memberId: string;
  name: string;
  signupDate: string;
  grade: string;
  role: string;
}

const AdminMember = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');
  const [memberData, setMemberData] = useState<Member[]>([]);

  useEffect(() => {
    Instance.get('/member/list').then((response) => {
      setMemberData(response.data);
      console.log(response.data);
    });

    Instance.get('/member/count').then((response) => {
      setTotalPages(response.data);
    });
  }, []);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = memberData.map((item) => item.id);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId: number) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === memberData.length);
  };

  const handleAddBlackList = () => {
    Instance.post('/member/blacked', checkedItems).then(() => {
      window.location.reload();
    });
  };

  const handleRemoveBlackList = () => {
    Instance.post('/member/unBlacked', checkedItems).then(() => {
      window.location.reload();
    });
  };

  return (
    <AdminLayout subMenus="member">
      <S.Container>
        <PageTitle>전체 회원 관리</PageTitle>
        <S.TableHeader>
          <p className="total">
            전체 <strong>{memberData.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header" onClick={handleRemoveBlackList}>
              블랙리스트 해제
            </NormalBtn>
            <NormalBtn className="header red" onClick={handleAddBlackList}>
              블랙리스트 추가
            </NormalBtn>
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
            {memberData.map((item, index: number) => (
              <tr key={item.id}>
                <td className="center">
                  <InputCheckbox type="checkbox" checked={checkedItems.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
                </td>
                <td className="center">{index}</td>
                <td className="center">
                  <Link to={`/admin/member/detail/${item.memberId}`} className="u">
                    {item.memberId}
                  </Link>
                </td>
                <td className="center">{item.name}</td>
                <td className="center">{item.grade}</td>
                <td className="center">{item.signupDate}</td>
                {item.role === 'BLACKED' ? <td className="center">Y</td> : <td className="center">N</td>}
              </tr>
            ))}
          </tbody>
        </S.Table>
        <Paging totalPage={totalPages} />
      </S.Container>
      <AdminCheck kind="AUTH_A" />
    </AdminLayout>
  );
};

export default AdminMember;
