import React, { useState } from "react";
import visual03 from "../images/main/visual03.webp";
import visual02 from "../images/main/visual02.webp";
import visual01 from "../images/main/visual01.webp";
import slideBtnImage from "../images/icon/ico_slide_btn.png";
import { styled } from "styled-components";

const images = [visual03, visual02, visual01];

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const SlideContent = styled.div`
  display: flex;
  width: 100%;
  transition: transform 0.5s ease-in-out;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SlideButton = styled.button`
  position: absolute;
  width: 40px;
  height: 64px;
  top: 45%;
  background-color: rgba(255, 255, 255, 0);
  img {
    filter: brightness(0) invert(1);
  }
  ${(props) => (props.$position === "right" ? "right: 40px;" : "left: 40px;")}
`;

const SlideImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  font-family: "Marcellus", serif;
  font-size: 35px;
  text-align: center;
  color: #FFF;
  
  margin-bottom: 10px;
`;

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <>
      <Container>
        <SlideContent>
          {images.map((image, index) => (
            <SlideImageWrapper key={index} $isActive={index === currentIndex}>
              <MainImage src={image} alt={`Image ${index}`} />
            </SlideImageWrapper>
          ))}
        </SlideContent>
      </Container>
      <Text>구름호텔에 오신 것을 환영합니다</Text>
      <SlideButton onClick={goToPreviousSlide} $position="left">
        <img src={slideBtnImage} alt="slideBtn" />
      </SlideButton>
      <SlideButton onClick={goToNextSlide} $position="right">
        <img
          src={slideBtnImage}
          alt="slideBtn"
          style={{ transform: "scaleX(-1)" }}
        />
      </SlideButton>
    </>
  );
};

export default Slide;
