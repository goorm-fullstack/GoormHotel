import React from 'react';
import AdminLayout from '../common/AdminLayout';
import WriteFormRoom from '../../components/WriteFormRoom';
import { Container } from '../member/AdminMember';

const AdminWriteFormRoom = () => {
  return (
    <AdminLayout subMenus="item">
      <Container>
        <WriteFormRoom></WriteFormRoom>
      </Container>
    </AdminLayout>
  );
};

export default AdminWriteFormRoom;
