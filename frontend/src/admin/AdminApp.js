import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminMember from './member/AdminMember';
import AdminMemberDetail from './member/AdminMemberDetail';
import AdminManager from './member/AdminManager';
import AdminComment from './board/AdminComment';
import AdminReport from './board/AdminReport';
import AdminReservation from './reservation/AdminReservation';
import AdminReservationDetail from './reservation/AdminReservationDetail';
import AdminGiftCard from './item/AdminGiftCard';
import AdminDetailGiftCard from './item/AdminDetailGiftCard';
import AdminItemList from './item/AdminItemList';
import AdminWriteFormRoom from './item/AdminWriteFormRoom';
import AdminWriteFormDining from './item/AdminWriteFormDining';
import AdminDetailDining from './item/AdminDetailDining';
import AdminDetailRoom from './item/AdminDetailRoom';
import AdminBoard from './board/AdminBoard';
import AdminBoardWrite from './board/AdminBoardWrite';
import AdminDeleteComment from './board/AdminDeleteComment';
import AdminChat from './chat/AdminChat';
import AdminChatDetail from './chat/AdminChatDetail';
import AdminMail from './chat/AdminMail';
import AdminNews from './chat/AdminNews';
import AdminIndex from './AdminIndex';
import Instance from "../utils/api/axiosInstance";
import {useAuth} from "../utils/api/AuthContext";

const AdminApp = () => {
  const { setAuthState } = useAuth();
  const [isLogined, setIsLogined] = useState(false);

  // 쿠키를 파싱하는 함수
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Auth쪽 대시로 분리
  const splitDashLine = (str) => {
    if(str!==undefined) {
      const data = str.split("-");
      return data;
    } else {
      return [];
    }
  }

  useEffect(() => {
    // 쿠키에서 값을 가져옵니다.
    const adminId = getCookie("adminId");
    const role = getCookie("role");
    const auth = getCookie("auth");

    // 로컬 스토리지에 정보를 저장한다.
    // 추후 업그레이드한다면 json으로 Object데이터를 넣을까요?
    splitDashLine(auth);
    localStorage.setItem("adminId", adminId);
    localStorage.setItem("role", role);
    localStorage.setItem("auth", splitDashLine(auth));

    // 가져온 값이 있다면 상태를 설정합니다.
    if (adminId && role && auth) {
      setAuthState({ adminId, role, auth });
      setIsLogined(true);
    } else {
      // 원래대로 서버에서 상태를 가져올 수도 있습니다.
      Instance.get('/api/adminCheck').then(response => {
        setAuthState({
          adminId: response.data.adminId,
          role: response.data.role,
          auth: response.data.auth
        });
      }).catch(error => {
        console.error("로그인 상태를 가져오지 못했습니다.", error);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isLogined ? (
          <>
          <Route path="/admin" element={<AdminIndex />}></Route>
          <Route path="/admin/reservation/:page" element={<AdminReservation />}></Route>
          <Route path="/admin/reservation/detail/:reservationNumber" element={<AdminReservationDetail />}></Route>
          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route path="/admin/member/:page" element={<AdminMember />}></Route>
          <Route path="/admin/member/detail/:memberId" element={<AdminMemberDetail />}></Route>
          <Route path="/admin/managers/:page" element={<AdminManager />}></Route>
          <Route path="/admin/comments/:page" element={<AdminComment />}></Route>
          <Route path="/admin/report/:page" element={<AdminReport />}></Route>
          <Route path="/admin/item/:page" element={<AdminItemList />}></Route>
          <Route path="/admin/item/detail/dining/:type/:name" element={<AdminDetailDining />}></Route>
          <Route path="/admin/item/detail/room/:type/:name" element={<AdminDetailRoom />}></Route>
          <Route path="/admin/item/add/room" element={<AdminWriteFormRoom />}></Route>
          <Route path="/admin/item/add/dining" element={<AdminWriteFormDining />}></Route>
          <Route path="/admin/giftcard/:page" element={<AdminGiftCard />}></Route>
          <Route path="/admin/giftcard/detail/:id" element={<AdminDetailGiftCard />}></Route>
          <Route path="/admin/board/:page" element={<AdminBoard />}></Route>
          <Route path="/admin/board/write" element={<AdminBoardWrite />}></Route>
          <Route path="/admin/deletepost/:page" element={<AdminDeleteComment />}></Route>
          <Route path="/admin/chat/:page" element={<AdminChat />}></Route>
          <Route path="/admin/chat/detail/:roomId" element={<AdminChatDetail />}></Route>
          <Route path="/admin/mail" element={<AdminMail />}></Route>
          <Route path="/admin/subscriber/:page" element={<AdminNews />}></Route>
          </>
        ) : (
          <> {/* 로그인하지 않은 경우엔 모두 로그인 페이지로 이동시킵니다.*/}
            <Route path="/admin/*" element={<AdminLogin />}></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
