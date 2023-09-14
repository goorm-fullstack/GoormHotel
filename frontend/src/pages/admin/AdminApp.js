import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminMember from './AdminMember';
import AdminMemberDetail from './AdminMemberDetail';
import AdminManager from './AdminManager';
import AdminComment from './AdminComment';
import AdminReport from './AdminReport';
import Reservation from './reservation/reservation';
import ReservationDetail from './reservation/reservationDetail';
import AdminGiftCard from './AdminGiftCard';
import AdminDetailGiftCard from './AdminDetailGiftCard';
import AdminItemList from './AdminItemList';
import AdminWriteFormRoom from './AdminWriteFormRoom';
import AdminWriteFormDining from './AdminWriteFormDining';
import AdminDetailDining from './AdminDetailDining';
import AdminDetailRoom from './AdminDetailRoom';
import AdminIndex from "./AdminIndex";

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminIndex/>}></Route>
        <Route path="/admin/reservation" element={<Reservation />}></Route>
        <Route path="/admin/reservation/detail" element={<ReservationDetail />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/member" element={<AdminMember />}></Route>
        <Route path="/admin/member/:memberId" element={<AdminMemberDetail />}></Route>
        <Route path="/admin/managers" element={<AdminManager />}></Route>
        <Route path="/admin/comments" element={<AdminComment />}></Route>
        <Route path="/admin/report" element={<AdminReport />}></Route>
        <Route path="/admin/item/list" element={<AdminItemList />}></Route>
        <Route path="/admin/item/list/view/dining/:id" element={<AdminDetailDining />}></Route>
        <Route path="/admin/item/list/view/room/:id" element={<AdminDetailRoom />}></Route>
        <Route path="/admin/item/list/writeForm/room" element={<AdminWriteFormRoom />}></Route>
        <Route path="/admin/item/list/writeForm/dining" element={<AdminWriteFormDining />}></Route>
        <Route path="/admin/item/giftCard" element={<AdminGiftCard />}></Route>
        <Route path="/admin/item/giftCard/view/:id" element={<AdminDetailGiftCard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
