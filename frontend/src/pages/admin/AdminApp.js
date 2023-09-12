import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminMember from './AdminMember';
import AdminMemberDetail from './AdminMemberDetail';
import Reservation from './reservation/reservation';
import ReservationDetail from './reservation/reservationDetail';

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/reservation" element={<Reservation />}></Route>
        <Route path="/admin/reservation/detail" element={<ReservationDetail />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/member" element={<AdminMember />}></Route>
        <Route path="/admin/member/:memberId" element={<AdminMemberDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;