import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import { styled } from 'styled-components';
import Slide from '../components/Slide';
import Reservation from '../components/Reservation';
import spaImg from '../images/main/spa.jpg';
import KakaoMap from '../utils/KakaoMap';
import dining01 from '../images/dining/Bakery.jpg';
import dining02 from '../images/dining/Bar.jpg';
import dining03 from '../images/dining/Restaurant.jpg';
import dining04 from '../images/dining/RoomService.jpg';
import Deluxe from '../images/room/Deluxe.jpg'
import Family from '../images/room/Family.jpg'
import Suite from '../images/room/Suite.jpg'
import { Link } from 'react-router-dom';
import slideBtn from '../images/icon/ico_slide_btn.png';

const diningImages = [dining01, dining02, dining03, dining04];
const images = [spaImg, dining01, Deluxe];

const FirstArticle = styled.article`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SecondArticle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 256px;
`;

const Room = styled.div`
  width: 1180px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`;

const PackageTitle = styled.h1`
  font-family: "Marcellus", serif;
  font-size: 30px;
  margin-bottom: 12px;
  letter-spacing: 2px;
  width: 100%;
  text-align: center;

  span {
    color: #95846E;
  }
`;

const TitleDescription = styled.p`
  font-size: 15px;
  color: #888888;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 65px;
`;

const RoomDescription = styled.p`
  font-size: 15px;
  color: #888888;
  line-height: 1.5;
`;

const Dining = styled(Room)`
  margin-top: 170px;
`;

const ImgList = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 75px;
`;

const RoomItem = styled.li`
  width: 380px;
`;

const RoomImg = styled.img``;

const PackageName = styled.h1`
  font-size: 18px;
  margin: 20px 0 13px 0;
  color: #444444;
  font-weight: bold;
`;


export const DetailBtn = styled(Link)`
  font-size: 15px;
  padding: 15px 20px;
  background-color: #95846e;
  margin: 0 auto;
  width: 160px;
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #8A7057;
  }
`;

const FacilitiesDetailBtn = styled(DetailBtn)`
  margin: 0;
`;

export const DetailSvg = styled.svg`
  width: 15px;
  height: 15px;
  margin-left: 25px;
  fill: white;
`;

const DiningItem = styled(RoomItem)`
  width: 280px;
`;

const ThirdArticle = styled.article`
  height: 530px;
  width: 100%;
  min-width: 1260px;
  margin-top: 193px;
  background-color: ${props => props.theme.colors.lightGray};
`;

const ActivityContainer = styled.div`
  height: 530px;
  display: flex;
  bottom: 70px;
`;

const ImageSlider = styled.div`
  width: 50%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex; 
  transition: transform 0.5s ease-in-out;
`;

const Image = styled.img`
  height: auto;
  object-fit: cover;
`;

const ActivityInfo = styled.div`
  width: 50%;
  margin-top: 108px;
  float: right;
  margin-left: 99px;
`;

const Activity = styled.p`
  font-size: 18px;
  color: #888888;
  margin-bottom: 59px;
`;

const ActivityTitle = styled.h1`
  font-size: 35px;
  margin-bottom: 26px;
  font-family: "Marcellus", serif;

  span {
    color: #95846E;
  }
`;

const ActivityDescription = styled.p`
  width: 393px;
  font-size: 15px;
  color: #888888;
  margin-bottom: 83px;
  line-height: 1.6;
`;

const FourthArticle = styled.div`
  width: 1180px;
  height: 780px;
  margin: 150px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 15px;
  color: #95846E;
  font-family: "Marcellus", serif;
`;

const MapSubTitle = styled.p`
  font-size: 16px;
  color: #888888;
  margin-bottom: 69px;
`;

const MapAddress = styled.p`
  font-size: 18px;
  color: #888888;
  margin-top: 40px;
`;

const Contact = styled.div`
  display: flex;
  font-size: 15px;
  color: #888888;
  margin-top: 25px;
  margin-bottom: 40px;
`;

const ContactSvg = styled.svg`
  fill: #444444;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const PhoneNumber = styled.div`
  display: flex;
  margin-right: 25px;
`;

const Mail = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const PrevButton = styled.button`
  width: 65px;
  height: 65px;
  background-color: #21201E;
  color: #fff;

  &:hover {
    opacity: 0.7;
  }

  img {
    filter: brightness(0) invert(1);
    width: 24px;
    height: 24px;
  }
`;

const NextButton = styled(PrevButton)`
  background-color: #FFFFFF;
  transform: scaleX(-1);

  img {
    filter: brightness(0);
  }
`;


const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const sliderRef = useRef(null);

  const sliderStyle = {
    transform: `translateX(-${activeIndex * sliderRef.current?.offsetWidth}px)`,
  };

  return (
    <>
      <Header backgroundColor="rgba(51, 51, 51, 0.8)" />
      <FirstArticle>
        <Slide />
        <Reservation />
      </FirstArticle>
      <SecondArticle>
        <Room>
          <PackageTitle>
            <span>ROOMS</span> & SUITES
          </PackageTitle>
          <TitleDescription>
            특별한 상품과 혜택을 지금 만나보세요.
          </TitleDescription>
          <ImgList>
            <RoomItem>
              <RoomImg src={Deluxe} alt="객실" />
              <PackageName>디럭스</PackageName>
              <RoomDescription>
                Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한
                사람과 함께한 특별한 순간을 남겨보세요!
              </RoomDescription>
            </RoomItem>
            <RoomItem>
              <RoomImg src={Family} alt="객실" />
              <PackageName>스위트</PackageName>
              <RoomDescription>
                Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한
                사람과 함께한 특별한 순간을 남겨보세요!
              </RoomDescription>
            </RoomItem>
            <RoomItem>
              <RoomImg src={Suite} alt="객실" />
              <PackageName>패밀리</PackageName>
              <RoomDescription>
                Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한
                사람과 함께한 특별한 순간을 남겨보세요!
              </RoomDescription>
            </RoomItem>
          </ImgList>
            <DetailBtn to="/rooms">
              <p>자세히보기</p>
              <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </g>
              </DetailSvg>
            </DetailBtn>
        </Room>
        <Dining>
          <PackageTitle>
            <span>DINING</span> PROMOTION
          </PackageTitle>
          <TitleDescription>
            특별한 상품과 혜택을 지금 만나보세요.
          </TitleDescription>
          <ImgList>
              <DiningItem >
                <RoomImg src={diningImages[0]} alt={`다이닝 ${diningImages[0]}`} />
                <PackageName>베이커리</PackageName>
                <RoomDescription>
                  Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한
                  사람과 함께한 특별한 순간을 남겨보세요!
                </RoomDescription>
              </DiningItem>
              <DiningItem >
                <RoomImg src={diningImages[1]} alt={`다이닝 ${diningImages[1]}`} />
                <PackageName>바&라운지</PackageName>
                <RoomDescription>
                  Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한
                  사람과 함께한 특별한 순간을 남겨보세요!
                </RoomDescription>
              </DiningItem>
              <DiningItem >
                <RoomImg src={diningImages[2]} alt={`다이닝 ${diningImages[2]}`} />
                <PackageName>레스토랑</PackageName>
                <RoomDescription>
                  Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한
                  사람과 함께한 특별한 순간을 남겨보세요!
                </RoomDescription>
              </DiningItem>
              <DiningItem >
                <RoomImg src={diningImages[3]} alt={`다이닝 ${diningImages[3]}`} />
                <PackageName>룸 서비스</PackageName>
                <RoomDescription>
                  Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한
                  사람과 함께한 특별한 순간을 남겨보세요!
                </RoomDescription>
              </DiningItem>
          </ImgList>
            <DetailBtn to="/rooms">
              <p>자세히보기</p>
              <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </g>
              </DetailSvg>
            </DetailBtn>
        </Dining>
      </SecondArticle>
      <ThirdArticle>
        <ActivityContainer>
          <ImageSlider>
            <ImageContainer style={sliderStyle} ref={sliderRef}>
              {images.map((image, index) => (
                <Image key={index} src={image} alt={`Image ${index}`} />
              ))}
            </ImageContainer>
            <ButtonContainer>
              <PrevButton onClick={handlePrev}>
                <img src={slideBtn} alt="slideBtn" />
              </PrevButton>
              <NextButton onClick={handleNext}>
                <img src={slideBtn} alt="slideBtn" />
              </NextButton>
            </ButtonContainer>
          </ImageSlider>
          <ActivityInfo>
            <Activity>부대시설</Activity>
            <ActivityTitle><span>Retreat</span> Goorm Spa</ActivityTitle>
            <ActivityDescription>
              리트릿 구름 스파는 한국 본연의 철학과 고차원적 감성을 더하여 일상
              속 건강한 아름다움을 경험할 수 있는 휴식 공간입니다.
            </ActivityDescription>
            <FacilitiesDetailBtn to="/">
              <p>자세히보기</p>
              <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </g>
              </DetailSvg>
            </FacilitiesDetailBtn>
          </ActivityInfo>
        </ActivityContainer>
      </ThirdArticle>
      <FourthArticle>
        <MapTitle>LOCATION</MapTitle>
        <MapSubTitle>구름 호텔로 오시는 방법을 안내해드립니다.</MapSubTitle>
        <KakaoMap width="1180px" height="480px" />
        <MapAddress>경기도 성남시 분당구 판교로 242 PDC A동 902호</MapAddress>
        <Contact>
          <PhoneNumber>
            <ContactSvg
              height="48"
              viewBox="0 0 48 48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h48v48H0z" fill="none" />
              <path d="M13.25 21.59c2.88 5.66 7.51 10.29 13.18 13.17l4.4-4.41c.55-.55 1.34-.71 2.03-.49C35.1 30.6 37.51 31 40 31c1.11 0 2 .89 2 2v7c0 1.11-.89 2-2 2C21.22 42 6 26.78 6 8c0-1.11.9-2 2-2h7c1.11 0 2 .89 2 2 0 2.49.4 4.9 1.14 7.14.22.69.06 1.48-.49 2.03l-4.4 4.42z" />
            </ContactSvg>
            <a href="tel:031-600-8586">031-600-8586</a>
          </PhoneNumber>
          <Mail>
            <ContactSvg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <title />
              <g data-name="8-Email" id="_8-Email">
                <path d="M45,7H3a3,3,0,0,0-3,3V38a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V10A3,3,0,0,0,45,7Zm-.64,2L24,24.74,3.64,9ZM2,37.59V10.26L17.41,22.17ZM3.41,39,19,23.41l4.38,3.39a1,1,0,0,0,1.22,0L29,23.41,44.59,39ZM46,37.59,30.59,22.17,46,10.26Z" />
              </g>
            </ContactSvg>
            <a href="mailto:contact@goorm.io">contact@goorm.io</a>
          </Mail>
        </Contact>
        <DetailBtn to="/location">
          <p>자세히보기</p>
          <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <title />
            <g data-name="Layer 2" id="Layer_2">
              <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
            </g>
          </DetailSvg>
        </DetailBtn>
      </FourthArticle>
    </>
  );
};

export default Home;
