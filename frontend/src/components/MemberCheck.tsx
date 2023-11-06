import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const MemberCheck = () => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem('memberId');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!memberId) {
      navigate('/login');
      // console.log('2');
    }
    if (!(role && role.includes('USER'))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/login');
    }
  }, []);

  return <div></div>;
};

export default MemberCheck;
