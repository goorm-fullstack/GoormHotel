import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel } from '../../components/common/commonStyles';
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
} from '../member/AdminMember';
import Paging from '../../components/common/Paging';

const LinkStyle = styled(Link)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: #444444;
    text-underline-offset: 10px;
  }
`;

export const PageParam = styled.ul`
  text-align: center;
  margin-top: 50px;

  li {
    display: inline-block;
    margin: 0 2px;
  }
  li a {
    display: inline-block;
    padding: 0 8px;
    border-radius: 100%;
    height: 1.6rem;
    line-height: 1.3rem;
    color: #666;
  }
  li.selected a {
    color: #baa085;
    text-decoration: underline;
  }
  li a:hover {
    text-decoration: underline;
  }
  li.sideParam {
    margin: 0 8px;
  }
  li.sideParam a {
    border: 1px solid #baa085;
    color: #baa085;
  }
  li.sideParam a:hover {
    text-decoration: none;
  }
`;

const AdminReport = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = reportData.map((item) => item.memberId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === reportData.length);
  };

  console.log(checkedItems);

  const reportData = [
    {
      id: 1,
      reportedPost: '이것은 게시글인가 댓글인가 둘 다임',
      author: { name: '홍구름', id: 'memberId1' },
      reportReason: '스팸',
      reportDate: '2023.09.13',
      confirmation: 'N',
      result: '처리 중',
    },
    {
      id: 2,
      reportedPost: '안녕하세요안녕하세요',
      author: { name: '김철수', id: 'memberId2' },
      reportReason: '광고',
      reportDate: '2023.09.14',
      confirmation: 'Y',
      result: '처리 완료',
    },
  ];

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>신고 관리</PageTitle>
        <TableHeader>
          <Total>
            전체 <Num>{reportData.length}</Num> 건
          </Total>
          <BlackListBtn>
            <Delete>확인 완료</Delete>
            <Add>블랙리스트 추가</Add>
          </BlackListBtn>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <th>
                <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>No.</th>
              <th>신고된 글</th>
              <th>작성자 명</th>
              <th>신고사유</th>
              <th>신고일</th>
              <th>확인여부</th>
              <th>처리 결과</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length === 0 && <td colSpan="7">등록된 회원이 없습니다.</td>}
            {reportData.map((item) => (
              <tr key={item.id}>
                <td>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(item.memberId)}
                    onChange={() => handleCheckboxChange(item.memberId)}
                  />
                </td>
                <td>{item.id}</td>
                <td>
                  <LinkStyle>{item.reportedPost}</LinkStyle>
                </td>
                <td>
                  {item.author.name}
                  <LinkStyle to={`/admin/member/${item.author.id}`}>({item.author.id})</LinkStyle>
                </td>
                <td>{item.reportReason}</td>
                <td>{item.reportDate}</td>
                <td>{item.confirmation}</td>
                <td>{item.result}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminReport;
