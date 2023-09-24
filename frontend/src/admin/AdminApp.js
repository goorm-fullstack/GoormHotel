import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import AdminDeleteComment from './board/AdminDeleteComment';
import AdminChat from './chat/AdminChat';
import AdminChatDetail from './chat/AdminChatDetail';
import AdminMail from './chat/AdminMail';
import AdminNews from './chat/AdminNews';
import AdminIndex from './AdminIndex';

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminIndex />}></Route>
        <Route path="/admin/reservation" element={<AdminReservation />}></Route>
        <Route path="/admin/reservation/:reservationNumber" element={<AdminReservationDetail />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/member" element={<AdminMember />}></Route>
        <Route path="/admin/member/:memberId" element={<AdminMemberDetail />}></Route>
        <Route path="/admin/managers" element={<AdminManager />}></Route>
        <Route path="/admin/comments" element={<AdminComment />}></Route>
        <Route path="/admin/report" element={<AdminReport />}></Route>
        <Route path="/admin/item/list/:page" element={<AdminItemList />}></Route>
        <Route path="/admin/item/list/detail/dining/:type/:name" element={<AdminDetailDining />}></Route>
        <Route path="/admin/item/list/detail/room/:type/:name" element={<AdminDetailRoom />}></Route>
        <Route path="/admin/item/list/add/room" element={<AdminWriteFormRoom />}></Route>
        <Route path="/admin/item/list/add/dining" element={<AdminWriteFormDining />}></Route>
        <Route path="/admin/item/giftcard" element={<AdminGiftCard />}></Route>
        <Route path="/admin/item/giftcard/detail/:id" element={<AdminDetailGiftCard />}></Route>
        <Route path="/admin/board" element={<AdminBoard />}></Route>
        <Route path="/admin/deletepost" element={<AdminDeleteComment />}></Route>
        <Route path="/admin/chat" element={<AdminChat />}></Route>
        <Route path="/admin/chat/:roomId" element={<AdminChatDetail />}></Route>
        <Route path="/admin/mail" element={<AdminMail />}></Route>
        <Route path="/admin/news" element={<AdminNews />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
