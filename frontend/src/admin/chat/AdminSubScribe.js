import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../components/common/commonStyles';
import { Link, useParams } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import { Container, Table, TableHeader } from '../member/AdminMember';
import Paging from '../../components/common/Paging';

const AdminSubScribe = () => {
  const { page } = useParams();
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [subScribeData, setSubScribeData] = useState([
    {
      id: 1,
      emailAddress: "test1@test.com",
      isSubScribe: 'Y',
    },
    {
      id: 2,
      emailAddress: "test2@test.com",
      isSubScribe: 'Y',
    },
    {
      id: 3,
      emailAddress: "test3@test.com",
      isSubScribe: 'Y',
    },
  ]);

  useEffect(() => {
    Instance.get(`/subscribe?page=${page}`).then((response) => {
      setSubScribeData(response.data);
    });
  }, []);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      const allMemberIds = subScribeData.map((item) => item.id);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item) => item !== id);
      } else {
        return [...prevItems, id];
      }
    });
  };

  const handleClosedClick = (e) => {
    console.log(checkedItems)
    checkedItems.map((id, index) => {
      Instance.post("/subscribe/cancel/"+id).then(()=>{
        // 구독해지용
      })
    })
  }

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>구독자 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{subScribeData.length}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header" onClick={handleClosedClick}>구독 상태 변경</NormalBtn>
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
            {
              subScribeData.length === 0 ? (
                <td colSpan="7">현재 구독자가 없습니다.</td>
              ) : (
                subScribeData.map((item, index) => (
                <tr key={item.id}>
                  <td style={{textAlign : "center"}}>
                    <InputCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    </td>
                    <td style={{textAlign : "center"}}>{item.id}</td>
                    <td style={{textAlign : "center"}} className="lastChat">
                      <Link to={`/admin/mail?mailto=${item.emailAddress}`}>{item.emailAddress}</Link>
                    </td>
                    <td style={{textAlign : "center"}}>{item.isSubscribe}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminSubScribe;
