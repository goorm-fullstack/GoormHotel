import React from 'react';
import { useNavigate } from 'react-router';
import { NormalBtn } from '../Style/commonStyles';

const PrevButton = () => {
  const navigate = useNavigate();

  return (
    <NormalBtn type="button" onClick={() => navigate(-1)}>
      목록
    </NormalBtn>
  );
};

export default PrevButton;
