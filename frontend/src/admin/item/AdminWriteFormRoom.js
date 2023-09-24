import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { commonAdminContents, PageTitle } from '../../components/common/commonStyles';
import WriteFormRoom from '../../components/WriteFormRoom';
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

const subMenus = [
  { name: '판매 상품 관리', link: '/admin/item/list/1' },
  { name: '상품권 관리', link: '/admin/item/giftCard' },
];

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
