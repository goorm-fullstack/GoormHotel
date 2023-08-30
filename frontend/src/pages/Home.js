import React from "react";
import Header from "../components/Header";
import { styled } from "styled-components";

export const DetailBtn = styled.button`
  font-size: 15px;
  padding: 15px 20px;
  background-color: #95846e;
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DetailSvg = styled.svg`
  width: 15px;
  height: 15px;
  margin-left: 25px;
  fill: white;
`;

const Home = () => {
  return (
    <>
      <Header backgroundColor="rgba(51, 51, 51, 0.8)" />
    </>
  );
};

export default Home;
