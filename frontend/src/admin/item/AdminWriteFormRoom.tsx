import React, {useEffect} from 'react';
import AdminLayout from '../common/AdminLayout';
import WriteFormRoom from '../../components/AddItemForm/WriteFormRoom';
import { Container } from '../member/AdminMember';
import {useNavigate} from "react-router-dom";

const AdminWriteFormRoom = () => {
    const navigate = useNavigate();
    const authItem = localStorage.getItem("auth");

    useEffect(() => {
        if (!(authItem && authItem.includes("AUTH_B"))) {
            alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
            navigate('/admin');
        }
    }, []);

    if(authItem && authItem.includes("AUTH_B")) {
  return (
    <AdminLayout subMenus="item">
      <Container>
        <WriteFormRoom></WriteFormRoom>
      </Container>
    </AdminLayout>
  );
    } else {
        return null;
    }
};

export default AdminWriteFormRoom;
