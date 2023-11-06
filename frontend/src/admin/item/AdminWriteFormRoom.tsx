import React, { useEffect } from 'react';
import AdminLayout from '../common/AdminLayout';
import WriteFormRoom from '../../components/AddItemForm/WriteFormRoom';
import { Container } from '../member/Style';
import { useNavigate } from 'react-router-dom';
import AdminCheck from '../adminCheck';

const AdminWriteFormRoom = () => {
  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');

  return (
    <AdminLayout subMenus="item">
      <Container>
        <WriteFormRoom></WriteFormRoom>
      </Container>
      <AdminCheck kind="AUTH_B" />
    </AdminLayout>
  );
};

export default AdminWriteFormRoom;
