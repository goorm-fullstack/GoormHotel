import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel } from '../../components/common/commonStyles';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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

const AdminNews = () => {
  const { memberId } = useParams();

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>구독자 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>0</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header">채팅 상태 변경</NormalBtn>
            <NormalBtn className="header red">블랙리스트 추가</NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <colgroup>
            <col style={{ width: '100px' }} />
            <col style={{ width: '110px' }} />
            <col style={{ width: '180px' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '180px' }} />
            <col style={{ width: '180px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" />
              </th>
              <th>번호</th>
              <th>회원명(회원ID)</th>
              <th>최근 메시지</th>
              <th>최근 발송일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <td colSpan="6" className="center empty">
              등록된 구독자가 없습니다.
            </td>
          </tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminNews;
