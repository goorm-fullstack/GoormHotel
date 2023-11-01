import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type AdminAuth = {
  kind: string;
};

const AdminCheck = ({ kind }: AdminAuth) => {
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId');
  const authItem = localStorage.getItem('auth');

  useEffect(() => {
    if (kind === 'ANY') {
      if (!adminId) {
        navigate('/admin/login');
      }
    } else {
      if (!adminId) {
        navigate('/admin/login');
      }
      if (!(authItem && authItem.includes(kind))) {
        alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
        navigate('/admin');
      }
    }
  }, []);

  return <div></div>;
};

export default AdminCheck;
