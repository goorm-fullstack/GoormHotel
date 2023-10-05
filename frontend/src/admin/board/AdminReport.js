import React, { useEffect, useState } from 'react';
import * as S from './Style';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/AdminMember';
import Paging from '../../components/common/Paging/Paging';
import axios from 'axios';

const AdminReport = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [report, setReport] = useState([]);
  useEffect(() => {
    axios
      .get('/report/list')
      .then((response) => {
        // 데이터를 가져올 때 reportCheck와 reportResult를 문자열로 처리
        const modifiedData = response.data.map((item) => ({
          ...item,
          reportCheck: item.reportCheck.toString(),
          reportResult: item.reportResult.toString(),
        }));
        setReport(modifiedData);

        console.log('get 성공');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(report);

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
          <p className="total">
            전체 <strong>{report.length}</strong> 건
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
              <td colSpan="8" className="center empty">
                신고된 글이 없습니다.
              </td>
            )}
            {report.map((report) => (
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
                <td className="center">{report.reportId}</td>
                <td className="center">
                  {report.replyId != null ? (
                    <S.LinkStyle>{report.replyContent}</S.LinkStyle>
                  ) : report.boardId != null ? (
                    <S.LinkStyle>{report.title}</S.LinkStyle>
                  ) : (
                    report.reportContent
                  )}
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
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminReport;
