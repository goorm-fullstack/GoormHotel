import React, { useState } from "react";
import visual03 from "../images/main/visual03.webp";
import visual02 from "../images/main/visual02.webp";
import visual01 from "../images/main/visual01.webp";
import slideBtnImage from "../images/icon/ico_slide_btn.png";
import { styled } from "styled-components";

const images = [visual03, visual02, visual01];

const Container = styled.div`
  width: 1220px;
  margin: 0 auto;
`;

const SlideContent = styled.div`
  display: flex;
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
  min-width: 1260px;
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const TextWrapper = styled.div`
  position: absolute;
  margin-top: 311px;
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
  text-shadow: 0px 0px 19px rgba(0, 0, 0, 0.54);
`;

const Text = styled.p`
  font-family: "Marcellus", serif;
  font-size: 60px;
  text-align: center;
  letter-spacing: 8px;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  margin-top: 60px;
  font-size: 24px;
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
      <TextWrapper>
        <Text>THE HOTEL GOORM</Text>
        <SubText>고객의 작은 관심에도 귀 기울이며, 차별화된 서비스와 시설로써 보다 편안하고 안락한 휴식을 제공합니다.</SubText>
      </TextWrapper>
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
