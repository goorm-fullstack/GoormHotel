import React from 'react';
import AdminLayout from '../common/AdminLayout';
import WriteFormDining from '../../components/AddItemForm/WriteFormDining';
import { Container } from '../member/AdminMember';

const AdminWriteFormDining = () => {
  return (
    <AdminLayout subMenus="item">
      <Container>
        <WriteFormDining></WriteFormDining>
      </Container>
    </AdminLayout>
  );
};

export default AdminWriteFormDining;
