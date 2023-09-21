import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import {
  Container,
  Title,
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
import axios from "axios";

const LinkStyle = styled(Link)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: #444444;
    text-underline-offset: 10px;
  }
`;

const PostTableHeader = styled(TableHeader)`
  width: 20%;
`;

const PageParam = styled.ul`
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
  const [report, setReport] = useState([]);
  useEffect(() => {
    axios.get('/report/list').then((response) => {
      setReport(response.data);

      console.log('get 성공');
    })
  }, []);

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

  const subMenus = [
    { name: '게시글 관리', link: '/admin/board' },
    { name: '댓글 관리', link: '/admin/comments' },
    { name: '삭제된 글 관리', link: '/admin/deleteComment' },
    { name: '신고 관리', link: '/admin/report' },
  ];

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
    <AdminLayout title="게시판 관리" subMenus={subMenus}>
      <Container>
        <Title>신고 관리</Title>
        <ContentHeader>
          <Total>
            전체 <Num>{report.length}</Num> 건
          </Total>
          <BlackListBtn>
            <Delete>확인 완료</Delete>
            <Add>블랙리스트 추가</Add>
          </BlackListBtn>
        </ContentHeader>
        <Table>
          <thead>
            <tr>
              <TableCheckboxWrapper>
                <TableCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </TableCheckboxWrapper>
              <TableHeader>No.</TableHeader>
              <PostTableHeader>신고된 글</PostTableHeader>
              <TableHeader>작성자 명</TableHeader>
              <TableHeader>신고사유</TableHeader>
              <TableHeader>신고일</TableHeader>
              <TableHeader>확인여부</TableHeader>
              <TableHeader>처리 결과</TableHeader>
            </tr>
          </thead>
          <tbody>
            {report.length === 0 && <TableCell colSpan="7">등록된 회원이 없습니다.</TableCell>}
            {report.map((report) => (
              <tr key={report.reportId}>
                <TableCell>
                  <TableCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(report.reportId)}
                    onChange={() => handleCheckboxChange(report.reportId)}
                    // checked={checkedItems.includes(item.memberId)}
                    // onChange={() => handleCheckboxChange(item.memberId)}
                  />
                </TableCell>
                <TableCell>{report.reportId}</TableCell>
                <TableCell>
                  <LinkStyle>{report.title}</LinkStyle>
                </TableCell>
                <TableCell>
                  {report.reportWriter}
                  {/*<LinkStyle to={`/admin/member/${item.author.id}`}>({item.author.id})</LinkStyle>*/}
                </TableCell>
                <TableCell>{report.reportReason}</TableCell>
                <TableCell>{`${report.reportDate[0]}-${(report.reportDate[1] < 10 ? '0' : '')}${report.reportDate[1]}-${(report.reportDate[2] < 10 ? '0' : '')}${report.reportDate[2]}`}</TableCell>
                <TableCell>{report.reportCheck}</TableCell>
                <TableCell>{report.reportResult}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>

        <PageParam>
          <li className="sideParam">
            <a href="/">«</a>
          </li>
          {/** loop */}
          <li>
            <a href="/">1</a>
          </li>
          <li>
            <a href="/">2</a>
          </li>
          <li>
            <a href="/">3</a>
          </li>
          <li>
            <a href="/">4</a>
          </li>
          <li className="selected">
            <a href="/">5</a>
          </li>
          <li>
            <a href="/">6</a>
          </li>
          <li>
            <a href="/">7</a>
          </li>
          <li>
            <a href="/">8</a>
          </li>
          <li>
            <a href="/">9</a>
          </li>
          <li>
            <a href="/">10</a>
          </li>
          {/** // loop */}
          <li className="sideParam">
            <a href="/">»</a>
          </li>
        </PageParam>
      </Container>
    </AdminLayout>
  );
};

export default AdminReport;
