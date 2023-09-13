import React from 'react';
import AdminLayout from './AdminLayout';
import { Container } from './AdminGiftCard';
import WriteFormDining from '../../components/WriteFormDining';

const subMenus = [
  { name: '판매 상품 관리', link: '/admin/item/list' },
  { name: '상품권 관리', link: '/admin/item/giftCard' },
];

const AdminWriteFormDining = () => {
  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <Container>
        <WriteFormDining></WriteFormDining>
      </Container>
    </AdminLayout>
  );
};

export default AdminWriteFormDining;
