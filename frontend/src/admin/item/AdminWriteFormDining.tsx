import React, {useEffect} from 'react';
import AdminLayout from '../common/AdminLayout';
import WriteFormDining from '../../components/AddItemForm/WriteFormDining';
import { Container } from '../member/Style';

const AdminWriteFormDining = () => {
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
        <WriteFormDining></WriteFormDining>
      </Container>
    </AdminLayout>
  );
    } else {
        return null;
    }
};

export default AdminWriteFormDining;
