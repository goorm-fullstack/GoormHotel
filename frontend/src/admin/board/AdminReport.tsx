import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import {
  Container,
  Table,
  TableHeader
} from '../member/AdminMember';
import Paging from '../../components/common/Paging/Paging';
import axios from 'axios';
import { ReportData } from './AdminBoard';

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
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [report, setReport] = useState<ReportData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    axios
      .get('/report/list')
      .then((response) => {
        // 데이터를 가져올 때 reportCheck와 reportResult를 문자열로 처리
        const modifiedData: ReportData[] = response.data.map((item: ReportData) => ({
          ...item,
          reportCheck: item.reportCheck.toString(),
          reportResult: item.reportResult.toString(),
        }));
        const totalPages = parseInt(response.headers['totalpages'], 10);
        const totalData = parseInt(response.headers['totaldata'], 10);
        setReport(modifiedData);
        setTotalPage(totalPages);
        setTotalData(totalData);
        console.log('get 성공');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(report);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked: boolean = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = report.map((item) => item.reportId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (memberId: number) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === report.length);
  };

  console.log(checkedItems);

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>신고 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{totalData}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header">확인(이상 없음)</NormalBtn>
            <NormalBtn className="header red">블랙리스트 추가</NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>번호</th>
              <th>신고된 글</th>
              <th>작성자 명</th>
              <th>신고사유</th>
              <th>신고일</th>
              <th>확인여부</th>
              <th>처리 결과</th>
            </tr>
          </thead>
          <tbody>
            {report.length === 0 && (
              <td colSpan={8} className="center empty">
                신고된 글이 없습니다.
              </td>
            )}
            {report &&
            report.map((report, idx) => (
              <tr key={report.reportId}>
                <td className="center">
                  <InputCheckbox
                    type="checkbox"
                    checked={checkedItems.includes(report.reportId)}
                    onChange={() => handleCheckboxChange(report.reportId)}
                    // checked={checkedItems.includes(item.memberId)}
                    // onChange={() => handleCheckboxChange(item.memberId)}
                  />
                </td>
                <td className="center">{totalData - idx}</td>
                <td className="center">
                  {/* todo: 페이지 이동(상세페이지 인것 같음)을 어떻게 할 건지 필요 */}
                  {report.replyId != null ? (
                    <LinkStyle to={'/'}>{report.replyContent}</LinkStyle>
                  ) : report.boardId != null ? (
                    <LinkStyle to={'/'}>{report.title}</LinkStyle>
                  ) : (
                    '신고된 내용이 없습니다.'
                  )};
                </td>
                <td className="center">
                  {report.reportWriter}
                  {/*<LinkStyle to={`/admin/member/${item.author.id}`}>({item.author.id})</LinkStyle>*/}
                </td>
                <td className="center">{report.reportReason}</td>
                <td className="center">{`${report.reportDate[0]}.${report.reportDate[1] < 10 ? '0' : ''}${report.reportDate[1]}.${
                  report.reportDate[2] < 10 ? '0' : ''
                }${report.reportDate[2]}`}</td>
                <td className="center">{report.reportResult}</td>
                {/*{(() => {*/}
                {/*  switch (report.reportCheck) {*/}
                {/*    case 'false':*/}
                {/*      return <td>N</td>;*/}
                {/*    case 'true':*/}
                {/*      return <td>Y</td>;*/}
                {/*    default:*/}
                {/*      return <td>N</td>;*/}
                {/*  }*/}
                {/*})()}*/}
                {(() => {
                  switch (report.reportResult) {
                    case 'false':
                      return <td className="center">N</td>;
                    case 'true':
                      return <td className="center">Y</td>;
                    default:
                      return <td className="center">N</td>;
                  }
                })()}
              </tr>
            ))}
          </tbody>
        </Table>
        <Paging totalPage={totalPage} />
      </Container>
    </AdminLayout>
  );
};

export default AdminReport;
