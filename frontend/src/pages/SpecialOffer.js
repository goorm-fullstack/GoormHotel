import React from 'react';
import Header from '../components/Header';
import { styled } from 'styled-components';
import { commonContainerStyle } from '../components/common/commonStyles';

export const Container = styled.div`
  ${commonContainerStyle}
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: rgb(17, 17, 17);
  margin-bottom: 100px;
`;

const SpecialOffer = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>스페셜오퍼</Title>
        <div></div>
        <div></div>
        <div></div>
      </Container>
    </>
  );
};

export default SpecialOffer;
