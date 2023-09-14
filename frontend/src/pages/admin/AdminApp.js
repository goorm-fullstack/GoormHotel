import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminMember from './AdminMember';
import AdminMemberDetail from './AdminMemberDetail';
import AdminChat from './chat/AdminChat';
import AdminChatDetail from './chat/AdminChatDetail';
import AdminMail from './chat/AdminMail';

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/member" element={<AdminMember />}></Route>
        <Route path="/admin/member/:memberId" element={<AdminMemberDetail />}></Route>
        <Route path="/admin/chat" element={<AdminChat />}></Route>
        <Route path="/admin/chat/:memberId" element={<AdminChatDetail />}></Route>
        <Route path="/admin/mail" element={<AdminMail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
