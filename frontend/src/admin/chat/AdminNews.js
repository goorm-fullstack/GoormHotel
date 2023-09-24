import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { commonAdminContents, PageTitle } from '../../components/common/commonStyles';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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

const AdminNews = () => {
  const { memberId } = useParams();

  const subMenus = [
    { name: '채팅 관리', link: '/admin/chat' },
    { name: '메일 작성', link: '/admin/mail' },
  ];

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>구독자 관리</PageTitle>
      </Container>
    </AdminLayout>
  );
};

export default AdminNews;
