import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { commonWrapperStyle, MoreLink, BtnWrapper } from '../components/common/commonStyles';
import Slide from '../components/Slide';
import Reservation from '../components/Reservation';
import spaImg from '../images/main/spa.jpg';
import KakaoMap from '../utils/KakaoMap';
import dining01 from '../images/dining/Bakery.jpg';
import dining02 from '../images/dining/Bar.jpg';
import dining03 from '../images/dining/Restaurant.jpg';
import dining04 from '../images/dining/RoomService.jpg';
import deluxe from '../images/room/Deluxe.jpg';
import Family from '../images/room/Family.jpg';
import Suite from '../images/room/Suite.jpg';
import slideBtn from '../images/icon/ico_slide_btn.png';

const diningImages = [dining01, dining02, dining03, dining04];
const images = [spaImg, dining01, deluxe];

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

const IndexLocation = styled.div`
  margin-top: 130px;
`;

const MapAddress = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  z-index: 10;
  font-size: ${(props) => props.theme.font.sizexs};
  padding: 20px 24px;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.blacklight};

  & > p {
    margin-bottom: 10px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: ${(props) => props.theme.colors.goldhover};
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
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
  background-color: white;
  transform: scaleX(-1);

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    filter: brightness(0);
  }
`;

const MapWrapper = styled.div`
  position: relative;
  margin-bottom: 60px;
`;

const ReserveContainer = styled.div`
  background-color: white;
  width: 1180px;
  height: 150px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  padding: 0 80px;
  display: flex;
  z-index: 1;
  position: absolute;
  bottom: 0;
  transform: translate(-50%, 50%);
  left: 50%;
  border-radius: 12px;

  .searchbtnwrap {
    display: flex;
    align-items: center;
  }
`;

const ReservationButton = styled(Link)`
  width: 150px;
  height: 65px;
  line-height: 65px;
  background-color: ${(props) => props.theme.colors.navy};
  color: white;
  text-align: center;
  display: inline-block;

  &:hover {
    background-color: ${(props) => props.theme.colors.navyhover};
  }
`;

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const SLIDE_NUM = images.length;
  const beforeSlide = images[SLIDE_NUM - 1];
  const afterSlide = images[0];
  let copiedArr = [beforeSlide, ...images, afterSlide];
  const [reservationData, setReservationData] = useState({
    checkInDate: '',
    checkOutDate: '',
    rooms: 1,
    adults: 1,
    children: 0,
    nights: 0
  });

  const updateReservationData = (newData) => {
    setReservationData(newData);
  };

  const handlePrev = () => {
    if (activeIndex !== 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex !== 4) {
      setActiveIndex(activeIndex + 1);
    }
  }
  const sliderRef = useRef(null);

  useEffect(() => {
    if (activeIndex === 4) {
      if (sliderRef.current) {  
        setTimeout(() => {
          sliderRef.current.style.transition = "none";
          setActiveIndex(1);
        }, 500);
        setTimeout(() => {
          sliderRef.current.style.transition = "all 500ms ease-in-out";
        }, 600);
      }
    } else if (activeIndex === 0) {
      if (sliderRef.current) {
        setTimeout(() => {
          sliderRef.current.style.transition = "none";
          setActiveIndex(3);
        }, 500);
        setTimeout(() => {
          sliderRef.current.style.transition = "all 500ms ease-in-out";
        }, 600);
      }
    }
  }, [activeIndex]);

  return (
    <>
      <SlideWrapper>
        <Slide />
        <ReserveContainer>
          <Reservation updateReservationData={updateReservationData} />
          <BtnWrapper className="searchbtnwrap">
            <ReservationButton to="/offers" state={{ reservationData: reservationData }}>
              상품 검색
            </ReservationButton>
          </BtnWrapper>
        </ReserveContainer>
      </SlideWrapper>
      <IndexOffers>
        <Wrapper>
          <IndexTitle>
            ROOMS <span>& SUITES</span>
          </IndexTitle>
          <IndexDesc>환상적인 서울 도심의 파노라믹뷰를 만나보세요.</IndexDesc>
          <ItemList>
            <RoomItem>
              <img src={deluxe} alt="객실" />
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
            <MoreLink to="/offers?type=rooms">자세히보기</MoreLink>
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
            <MoreLink to="/offers?type=dining">자세히보기</MoreLink>
          </BtnWrapper>
        </Wrapper>
      </IndexOffers>
      <IndexFacilities>
        <FacilitiesContainer>
          <ImageSlider>
            <ImageContainer style={{transform: `translateX(-${activeIndex * 100}%)`}} ref={sliderRef}>
                {copiedArr.map((image, index) => (
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
              <MoreLink to="/facilities">자세히보기</MoreLink>
            </BtnWrapper>
          </FacilitiesInfo>
        </FacilitiesContainer>
      </IndexFacilities>
      <IndexLocation>
        <Wrapper>
          <IndexTitle>LOCATION</IndexTitle>
          <IndexDesc>구름 호텔로 오시는 방법을 안내해드립니다.</IndexDesc>
          <MapWrapper>
            <KakaoMap width="1180px" height="480px" />
            <MapAddress>
              <p>위치 : 경기도 성남시 분당구 판교로 242 PDC A동 902호</p>
              <ContactInfo>
                <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h48v48H0z" fill="none" />
                  <path d="M13.25 21.59c2.88 5.66 7.51 10.29 13.18 13.17l4.4-4.41c.55-.55 1.34-.71 2.03-.49C35.1 30.6 37.51 31 40 31c1.11 0 2 .89 2 2v7c0 1.11-.89 2-2 2C21.22 42 6 26.78 6 8c0-1.11.9-2 2-2h7c1.11 0 2 .89 2 2 0 2.49.4 4.9 1.14 7.14.22.69.06 1.48-.49 2.03l-4.4 4.42z" />
                </svg>
                <a href="tel:031-600-8586">031-600-8586</a>
              </ContactInfo>
              <ContactInfo>
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g data-name="8-Email" id="_8-Email">
                    <path d="M45,7H3a3,3,0,0,0-3,3V38a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V10A3,3,0,0,0,45,7Zm-.64,2L24,24.74,3.64,9ZM2,37.59V10.26L17.41,22.17ZM3.41,39,19,23.41l4.38,3.39a1,1,0,0,0,1.22,0L29,23.41,44.59,39ZM46,37.59,30.59,22.17,46,10.26Z" />
                  </g>
                </svg>
                <a href="mailto:contact@goorm.io">contact@goorm.io</a>
              </ContactInfo>
            </MapAddress>
          </MapWrapper>
          <BtnWrapper className="center">
            <MoreLink to="/location">자세히보기</MoreLink>
          </BtnWrapper>
        </Wrapper>
      </IndexLocation>
    </>
  );
};

export default Home;
