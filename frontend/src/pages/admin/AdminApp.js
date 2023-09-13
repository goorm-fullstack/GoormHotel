import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminMember from './AdminMember';
import AdminMemberDetail from './AdminMemberDetail';
import AdminManager from './AdminManager';
import AdminComment from './AdminComment';
import AdminReport from './AdminReport';

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/member" element={<AdminMember />}></Route>
        <Route path="/admin/member/:memberId" element={<AdminMemberDetail />}></Route>
        <Route path="/admin/managers" element={<AdminManager />}></Route>
        <Route path="/admin/comments" element={<AdminComment />}></Route>
        <Route path="/admin/report" element={<AdminReport />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;