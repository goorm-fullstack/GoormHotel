import React, { useEffect, useState } from "react";
import visual03 from "../images/main/visual03.webp";
import visual02 from "../images/main/visual02.webp";
import visual01 from "../images/main/visual01.webp";
import slideBtnImage from "../images/icon/ico_slide_btn.png";
import { styled } from "styled-components";
import { ReactComponent as SideMenuIcon } from '../images/icon/ico_slide_btn.svg';

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
  width: 60px;
  height: 60px;
  top: 50%;
  background: transparent;
  transform: translate(0, -45%);
  ${(props) => (props.$position === 'right' ? 'right: 28px;' : 'left: 28px;')}
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
  width: 100%;
  min-width: 1260px;
  text-align: center;
  position: absolute;
  margin-top: 44vh;
  color: #ffffff;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
`;

const Text = styled.p`
  font-family: 'Marcellus', serif;
  font-size: 56px;
  text-align: center;
  letter-spacing: 0.08em;
`;

const SubText = styled.p`
  margin-top: 40px;
  font-size: 22px;
  letter-spacing: -0.01em;
  font-weight: 300;
`;

const SideIcon = styled(SideMenuIcon)`
  width: 60px;
  height: 60px;
`;

const SideIconRight = styled(SideIcon)`
  transform: rotate(180deg);
`;

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // 5초마다 슬라이드 변경

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트 될 때 인터벌 정리
    };
  }, [currentIndex]);

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
        <SideIcon />
      </SlideButton>
      <SlideButton onClick={goToNextSlide} $position="right">
        <SideIconRight />
      </SlideButton>
    </>
  );
};

export default Slide;
