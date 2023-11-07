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
      alert('로그인 페이지로 이동합니다.');
      navigate('/login');
    }
  }, []);

  return <div></div>;
};

export default MemberCheck;
