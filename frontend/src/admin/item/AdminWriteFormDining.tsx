import React, { useEffect } from 'react';
import AdminLayout from '../common/AdminLayout';
import WriteFormDining from '../../components/AddItemForm/WriteFormDining';
import { Container } from '../member/Style';
import { useNavigate } from 'react-router-dom';
import AdminCheck from '../adminCheck';

const AdminWriteFormDining = () => {
  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');

  return (
    <AdminLayout subMenus="item">
      <Container>
        <WriteFormDining></WriteFormDining>
      </Container>
      <AdminCheck kind="AUTH_B" />
    </AdminLayout>
  );
};

export default AdminWriteFormDining;
