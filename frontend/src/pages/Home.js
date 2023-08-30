import React, { useState } from 'react';
import Header from '../components/Header';
import visual01 from '../images/main/visual01.webp';
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
import Villa from '../images/room/Villa.jpg'

const diningImages = [dining01, dining02, dining03, dining04];

const FirstArticle = styled.article`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondArticle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 222px 0;
`;

const Room = styled.div`
  width: 1180px;
  margin: 0 auto;
  height: 563px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PackageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: bold;
`;

const TitleDescription = styled.p`
  font-size: 16px;
  color: #888888;
  margin-bottom: 69px;
  line-height: 1.3;
`;

const Dining = styled(Room)`
margin-top: 150px;
`;

const ImgList = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const RoomItem = styled.li`
  width: 380px;
  height: 240px;
`;

const RoomImg = styled.img``;

const PackageName = styled.h1`
  font-size: 18px;
  margin: 20px 0 13px 0;
  color: #444444;
  font-weight: bold;
`;

export const DetailBtn = styled.button`
  font-size: 15px;
  padding: 15px 20px;
  background-color: #95846E;
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

const DiningItem = styled(RoomItem)`
  width: 280px;
`;

const ThirdArticle = styled.article`
  height: 601px;
  width: 100%;
  padding-top: 71px;
`;

const ActivityContainer = styled.div`
  width: 100%;
  height: 530px;
  background-color: #F5F5F5;
  float: right;
  position: relative;
`;

const ActivityImg = styled.img`
  width: 943px;
  height: 530px;
  margin-left: 107px;
  margin-top: -71px;
  opacity: ${props => (props.$isActive ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const ActivityInfo = styled.div`
  margin-left: 100px;
  padding-top: 80px;
`;

const Activity = styled.p`
  font-size: 18px;
  color: #888888;
  margin-bottom: 59px;
`;

const ActivityTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15.5px;
`;

const ActivityDescription = styled.p`
  width: 393px;
  font-size: 15px;
  color: #888888;
  margin-bottom: 43.5px;
  line-height: 1.5;
`;

const FourthArticle = styled.div`
  width: 1180px;
  height: 780px;
  margin: 220px auto 0 ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
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
  display: flex;
  gap: 5px;
  margin-top: 71px;
`;

const RoundButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: ${props => (props.$isActive ? '#102c57' : '#dddddd')};
  cursor: pointer;
  width: 14px;
  height: 14px;
`;

const images = [spaImg, spaImg, spaImg];


const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlide = (index) => {
    setActiveIndex(index);
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
          <PackageTitle>객실 패키지</PackageTitle>
          <TitleDescription>특별한 상품과 혜택을 지금 만나보세요.</TitleDescription>
          <ImgList>
            <RoomItem>
              <RoomImg src={Deluxe} alt="객실" />
              <PackageName>글래드 스튜디오</PackageName>
              <TitleDescription>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</TitleDescription>
            </RoomItem>
            <RoomItem>
              <RoomImg src={Family} alt="객실" />
              <PackageName>글래드 스튜디오</PackageName>
              <TitleDescription>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</TitleDescription>
            </RoomItem>
            <RoomItem>
              <RoomImg src={Suite} alt="객실" />
              <PackageName>글래드 스튜디오</PackageName>
              <TitleDescription>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</TitleDescription>
            </RoomItem>
          </ImgList>
          <DetailBtn>
            <p>자세히보기</p>
            <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"/></g></DetailSvg>
          </DetailBtn>
        </Room>
        <Dining>
          <PackageTitle>다이닝 프로모션</PackageTitle>
          <TitleDescription>특별한 상품과 혜택을 지금 만나보세요.</TitleDescription>
          <ImgList>
          {diningImages.map((image, index) => (
            <DiningItem key={index}>
              <RoomImg src={image} alt={`다이닝 ${index + 1}`} />
              <PackageName>글래드 스튜디오</PackageName>
              <TitleDescription>
                Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!
              </TitleDescription>
            </DiningItem>
          ))}
          </ImgList>
          <DetailBtn>
            <p>자세히보기</p>
            <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"/></g></DetailSvg>
          </DetailBtn>
        </Dining>
      </SecondArticle>
      <ThirdArticle>
        <ActivityContainer>
          <ActivityImg src={images[activeIndex]} $isActive={true} />
          <ActivityInfo>
            <Activity>부대시설</Activity>
            <ActivityTitle>리트릿 구름 스파</ActivityTitle>
            <ActivityDescription>리트릿 구름 스파는 한국 본연의 철학과 고차원적 감성을 더하여  일상 속 건강한 아름다움을 경험할 수 있는 휴식 공간입니다.</ActivityDescription>
            <DetailBtn>
            <p>자세히보기</p>
              <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"/></g></DetailSvg>
            </DetailBtn>
            <ButtonContainer>
              {images.map((_, index) => (
                <RoundButton
                  key={index}
                  $isActive={index === activeIndex}
                  onClick={() => handleSlide(index)}
                />
              ))}
            </ButtonContainer>
          </ActivityInfo>
        </ActivityContainer>
      </ThirdArticle>
      <FourthArticle>
        <MapTitle>오시는 길</MapTitle>
        <MapSubTitle>구름 호텔로 오시는 방법을 안내해드립니다.</MapSubTitle>
        <KakaoMap width="1180px" height="480px"/>
        <MapAddress>경기도 성남시 분당구 판교로 242 PDC A동 902호</MapAddress>
        <Contact>
          <PhoneNumber><ContactSvg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M13.25 21.59c2.88 5.66 7.51 10.29 13.18 13.17l4.4-4.41c.55-.55 1.34-.71 2.03-.49C35.1 30.6 37.51 31 40 31c1.11 0 2 .89 2 2v7c0 1.11-.89 2-2 2C21.22 42 6 26.78 6 8c0-1.11.9-2 2-2h7c1.11 0 2 .89 2 2 0 2.49.4 4.9 1.14 7.14.22.69.06 1.48-.49 2.03l-4.4 4.42z"/></ContactSvg><p>031-600-8586</p></PhoneNumber>
          <Mail><ContactSvg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="8-Email" id="_8-Email"><path d="M45,7H3a3,3,0,0,0-3,3V38a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V10A3,3,0,0,0,45,7Zm-.64,2L24,24.74,3.64,9ZM2,37.59V10.26L17.41,22.17ZM3.41,39,19,23.41l4.38,3.39a1,1,0,0,0,1.22,0L29,23.41,44.59,39ZM46,37.59,30.59,22.17,46,10.26Z"/></g></ContactSvg><p>contact@goorm.io</p></Mail>
        </Contact>
        <DetailBtn>
          <p>자세히보기</p>
          <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"/></g></DetailSvg>
        </DetailBtn>
      </FourthArticle>         
    </>
  );
};

export default Home;