import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { commonWrapperStyle, MoreBtn, BtnWrapper } from '../components/common/commonStyles';
import { Link } from 'react-router-dom';
import Slide from '../components/Slide';
import Reservation from '../components/Reservation';
import spaImg from '../images/main/spa.jpg';
import KakaoMap from '../utils/KakaoMap';
import dining01 from '../images/dining/Bakery.jpg';
import dining02 from '../images/dining/Bar.jpg';
import dining03 from '../images/dining/Restaurant.jpg';
import dining04 from '../images/dining/RoomService.jpg';
import Deluxe from '../images/room/Deluxe.jpg';
import Family from '../images/room/Family.jpg';
import Suite from '../images/room/Suite.jpg';
import slideBtn from '../images/icon/ico_slide_btn.png';

const diningImages = [dining01, dining02, dining03, dining04];
const images = [spaImg, dining01, Deluxe];

const SlideWrapper = styled.article`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const IndexOffers = styled.article`
  margin-top: 200px;
`;

const Wrapper = styled(commonWrapperStyle)`
  margin-bottom: 150px;
`;

const IndexTitle = styled.h2`
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.big};
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.goldhover};

  span {
    color: ${(props) => props.theme.colors.charcoal};
  }
  &.facilities {
    text-align: left;
    font-size: ${(props) => props.theme.font.bigx};
  }
`;

const IndexDesc = styled.p`
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.6;
  text-align: center;
  margin-bottom: 60px;
  letter-spacing: -0.02em;

  &.facilities {
    text-align: left;
    word-break: keep-all;
  }
`;

const ItemDesc = styled.p`
  font-size: ${(props) => props.theme.font.sizes};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const ItemList = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 60px;
`;

const RoomItem = styled.li`
  width: 380px;
`;

const ItemTitle = styled.h3`
  font-size: ${(props) => props.theme.font.sizem};
  margin: 20px 0 12px;
  color: ${(props) => props.theme.colors.charcoal};
  font-weight: 500;
`;

const DiningItem = styled(RoomItem)`
  width: 280px;
`;

const IndexFacilities = styled.article`
  height: 500px;
  width: 100%;
  min-width: ${(props) => props.theme.wrapper.minwidth};
  margin-top: 130px;
  background-color: ${(props) => props.theme.colors.graybg};
`;

const FacilitiesContainer = styled.div`
  height: 500px;
  display: flex;
  position: relative;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FacilitiesInfo = styled.div`
  width: 50%;
  max-width: calc(1180px / 2);
  position: absolute;
  top: 50%;
  left: 50%;
  padding-left: 100px;
  transform: translate(0, -50%);
`;

const Activity = styled.p`
  color: ${(props) => props.theme.colors.graylight};
  margin-bottom: 50px;
`;

const IndexLocation = styled.div`
  margin-top: 130px;
`;

const MapAddress = styled.p`
  font-size: ${(props) => props.theme.font.sizem};
  color: ${(props) => props.theme.colors.graylight};
  margin-top: 40px;
`;

const Contact = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.font.sizes};
  color: ${(props) => props.theme.colors.graylight};
  margin-top: 25px;
  margin-bottom: 40px;
`;

const ContactSvg = styled.svg`
  fill: ${(props) => props.theme.colors.blacklight};
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
  background-color: ${(props) => props.theme.colors.charcoal};
  color: #fff;

  &:hover {
    background-color: ${(props) => props.theme.colors.blacklight};
  }

  img {
    filter: brightness(0) invert(1);
    width: 24px;
    height: 24px;
  }
`;

const NextButton = styled(PrevButton)`
  background-color: #ffffff;
  transform: scaleX(-1);

  &:hover {
    background-color: #f0f0f0;
  }

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
      <SlideWrapper>
        <Slide />
        <Reservation />
      </SlideWrapper>
      <IndexOffers>
        <Wrapper>
          <IndexTitle>
            ROOMS <span>& SUITES</span>
          </IndexTitle>
          <IndexDesc>환상적인 서울 도심의 파노라믹뷰를 만나보세요.</IndexDesc>
          <ItemList>
            <RoomItem>
              <img src={Deluxe} alt="객실" />
              <ItemTitle>디럭스</ItemTitle>
              <ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</ItemDesc>
            </RoomItem>
            <RoomItem>
              <img src={Family} alt="객실" />
              <ItemTitle>스위트</ItemTitle>
              <ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</ItemDesc>
            </RoomItem>
            <RoomItem>
              <img src={Suite} alt="객실" />
              <ItemTitle>패밀리</ItemTitle>
              <ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</ItemDesc>
            </RoomItem>
          </ItemList>
          <BtnWrapper className="center">
            <MoreBtn to="/offers?type=rooms">자세히보기</MoreBtn>
          </BtnWrapper>
        </Wrapper>
        <Wrapper>
          <IndexTitle>
            DINING <span>PROMOTION</span>
          </IndexTitle>
          <IndexDesc>세계 최고 수준의 셰프들이 직접 선보이는 다양한 요리를 즐겨보세요.</IndexDesc>
          <ItemList>
            <DiningItem>
              <img src={diningImages[0]} alt={`다이닝 ${diningImages[0]}`} />
              <ItemTitle>베이커리</ItemTitle>
              <ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</ItemDesc>
            </DiningItem>
            <DiningItem>
              <img src={diningImages[1]} alt={`다이닝 ${diningImages[1]}`} />
              <ItemTitle>바&라운지</ItemTitle>
              <ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</ItemDesc>
            </DiningItem>
            <DiningItem>
              <img src={diningImages[2]} alt={`다이닝 ${diningImages[2]}`} />
              <ItemTitle>레스토랑</ItemTitle>
              <ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</ItemDesc>
            </DiningItem>
            <DiningItem>
              <img src={diningImages[3]} alt={`다이닝 ${diningImages[3]}`} />
              <ItemTitle>룸 서비스</ItemTitle>
              <ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</ItemDesc>
            </DiningItem>
          </ItemList>
          <BtnWrapper className="center">
            <MoreBtn to="/offers?type=dining">자세히보기</MoreBtn>
          </BtnWrapper>
        </Wrapper>
      </IndexOffers>
      <IndexFacilities>
        <FacilitiesContainer>
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
          <FacilitiesInfo>
            <IndexDesc className="facilities">부대시설</IndexDesc>
            <IndexTitle className="facilities">
              Goorm <span>Facilities</span>
            </IndexTitle>
            <IndexDesc className="facilities">심신의 활력과 균형 잡힌 라이프 스타일을 추구하는 구름 호텔의 다양한 시설을 경험해 보세요.</IndexDesc>
            <BtnWrapper>
              <MoreBtn to="/facilities">자세히보기</MoreBtn>
            </BtnWrapper>
          </FacilitiesInfo>
        </FacilitiesContainer>
      </IndexFacilities>
      <IndexLocation>
        <Wrapper>
          <IndexTitle>LOCATION</IndexTitle>
          <IndexDesc>구름 호텔로 오시는 방법을 안내해드립니다.</IndexDesc>
          <KakaoMap width="1180px" height="480px" />
          <IndexDesc className="location">경기도 성남시 분당구 판교로 242 PDC A동 902호</IndexDesc>
          <IndexDesc>
            <PhoneNumber>
              <ContactSvg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
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
          </IndexDesc>
          <MoreBtn to="/location">
            <p>자세히보기</p>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
              </g>
            </svg>
          </MoreBtn>
        </Wrapper>
      </IndexLocation>
    </>
  );
};

export default Home;
