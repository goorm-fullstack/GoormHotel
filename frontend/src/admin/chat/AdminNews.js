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
          <Total>
            전체 <strong>0</strong> 건
          </Total>
          <BlackListBtn>
            <Delete>채팅 상태 변경</Delete>
            <Delete>블랙리스트 해제</Delete>
            <Add>블랙리스트 추가</Add>
          </BlackListBtn>
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
                <TableCheckbox type="checkbox" />
              </th>
              <th>번호</th>
              <th>회원명(회원ID)</th>
              <th>최근 메시지</th>
              <th>최근 발송일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminNews;
