import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import { Link, useParams } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import { Container, Table, TableHeader } from '../member/Style';
import Paging from '../../components/common/Paging/Paging';

interface Subscribe {
  id : number;
  emailAddress : string;
  isSubscribe : string;
}

const AdminSubScribe = () => {
  const { page } = useParams();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [count, setCount] = useState(1);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [subScribeData, setSubScribeData] = useState<Subscribe[]>([
    {
      id: 1,
      emailAddress: 'test1@test.com',
      isSubscribe: '구독중',
      // 구독 상태: 구독중 또는 수신거부로 표시(UX 고려)
    },
    {
      id: 2,
      emailAddress: 'test2@test.com',
      isSubscribe: '수신거부',
    },
    {
      id: 3,
      emailAddress: 'test3@test.com',
      isSubscribe: '구독중',
    },
  ]);

  useEffect(() => {
    Instance.get(`/subscribe?page=${page}`).then((response) => {
      setSubScribeData(response.data);
    });

    Instance.get("/subscribe/count").then((response) => {
      setCount(response.data);//페이지 수 가져오기
    })
  }, []);

  const handleSelectAllChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      const allMemberIds = subScribeData.map((item) => item.id);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (id : number) => {
    setCheckedItems((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item) => item !== id);
      } else {
        return [...prevItems, id];
      }
    });
  };

  const handleClosedClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(checkedItems);
    checkedItems.map((id, index) => {
      Instance.post('/subscribe/cancel/' + id).then(() => {
        // 구독해지용
      });
    });
  };

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>구독자 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{subScribeData.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header red" onClick={handleClosedClick}>
              {/* * 상태 변경 버튼 붉은 색 */}
              구독 상태 변경
            </NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <colgroup>
            <col style={{ width: '80px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '200px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>번호</th>
              <th>구독자 이메일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {subScribeData.length === 0 ? (
              // empty td의 colspan 개수는 테이블 행의 모든 td 수와 일치해야 합니다.
              <td colSpan={4}>현재 구독자가 없습니다.</td>
            ) : (
              subScribeData.map((item, index) => (
                <tr key={item.id}>
                  {/* 테이블 스타일이 통합되어 있으며 td 클래스명에 center 입력 시 중앙정렬됩니다. inline 스타일 적용 시 추후 스타일 변경할 때 개별적으로 스타일이 적용되므로 통합된 스타일 규칙 따라주세요. */}
                  <td className="center">
                    <InputCheckbox type="checkbox" checked={checkedItems.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
                  </td>
                  <td className="center">{item.id}</td>
                  <td className="lastChat center">
                    <Link to={`/admin/mail?mailto=${item.emailAddress}`}>{item.emailAddress}</Link>
                  </td>
                  <td className="center">{item.isSubscribe}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Paging totalPage={count}/>
      </Container>
    </AdminLayout>
  );
};

export default AdminSubScribe;
