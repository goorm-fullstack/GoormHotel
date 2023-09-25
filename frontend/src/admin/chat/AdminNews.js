import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle } from '../../components/common/commonStyles';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../member/AdminMember';
import Paging from '../../components/common/Paging';

const AdminNews = () => {
  const { memberId } = useParams();

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>구독자 관리</PageTitle>
        <Paging />
      </Container>
    </AdminLayout>
  );
};

export default AdminNews;
