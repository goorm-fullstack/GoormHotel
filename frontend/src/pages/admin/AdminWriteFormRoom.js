import React from 'react';
import AdminLayout from './AdminLayout';
import { Container } from './AdminGiftCard';
import WriteFormRoom from '../../components/WriteFormRoom';

const subMenus = [
  { name: '판매 상품 관리', link: '/admin/item/list' },
  { name: '상품권 관리', link: '/admin/item/giftCard' },
];

const AdminWriteFormRoom = () => {
  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <Container>
        <WriteFormRoom></WriteFormRoom>
      </Container>
    </AdminLayout>
  );
};

export default AdminWriteFormRoom;
