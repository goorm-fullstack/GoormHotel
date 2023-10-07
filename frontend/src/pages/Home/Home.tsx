import React, { useEffect, useRef, useState } from 'react';
import * as S from './Style';
import { MoreLink, BtnWrapper } from '../../Style/commonStyles';
import Slide from '../../components/Slide/Slide';
import Reservation from '../../components/Reservation/Reservation';
import KakaoMap from '../../utils/api/KakaoMap';
import dining01 from '../../images/dining/Bakery.jpg';
import dining02 from '../../images/dining/Bar.jpg';
import dining03 from '../../images/dining/Restaurant.jpg';
import dining04 from '../../images/dining/RoomService.jpg';
import deluxe from '../../images/room/Deluxe.jpg';
import Family from '../../images/room/Family.jpg';
import Suite from '../../images/room/Suite.jpg';
import FacilitiesSlider from '../../components/Slide/FacilitiesSlider';

const diningImages = [dining01, dining02, dining03, dining04];

interface ReservationData {
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  adults: number;
  children: number;
  nights: number;
}

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [reservationData, setReservationData] = useState({
    checkInDate: '',
    checkOutDate: '',
    rooms: 1,
    adults: 1,
    children: 0,
    nights: 0,
  });

  const updateReservationData = (newData: ReservationData) => {
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
  };
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeIndex === 4) {
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'none';
        }
        setActiveIndex(1);
      }, 500);
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'all 500ms ease-in-out';
        }
      }, 600);
    } else if (activeIndex === 0) {
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'none';
        }
        setActiveIndex(3);
      }, 500);
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'all 500ms ease-in-out';
        }
      }, 600);
    }
  }, [activeIndex]);

  return (
    <>
      <S.SlideWrapper>
        <Slide />
        <S.ReserveContainer>
          <Reservation updateReservationData={updateReservationData} />
          <BtnWrapper className="searchbtnwrap">
            <S.ReservationButton to="/offers/1" state={{ reservationData: reservationData }}>
              상품 검색
            </S.ReservationButton>
          </BtnWrapper>
        </S.ReserveContainer>
      </S.SlideWrapper>
      <S.IndexOffers>
        <S.Wrapper>
          <S.IndexTitle>
            ROOMS <span>& SUITES</span>
          </S.IndexTitle>
          <S.IndexDesc>환상적인 서울 도심의 파노라믹뷰를 만나보세요.</S.IndexDesc>
          <S.ItemList>
            <S.RoomItem>
              <img src={deluxe} alt="객실" />
              <S.ItemTitle>디럭스</S.ItemTitle>
              <S.ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</S.ItemDesc>
            </S.RoomItem>
            <S.RoomItem>
              <img src={Family} alt="객실" />
              <S.ItemTitle>스위트</S.ItemTitle>
              <S.ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</S.ItemDesc>
            </S.RoomItem>
            <S.RoomItem>
              <img src={Suite} alt="객실" />
              <S.ItemTitle>패밀리</S.ItemTitle>
              <S.ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</S.ItemDesc>
            </S.RoomItem>
          </S.ItemList>
          <BtnWrapper className="center">
            <MoreLink to="/offers/1?type=room">자세히보기</MoreLink>
          </BtnWrapper>
        </S.Wrapper>
        <S.Wrapper>
          <S.IndexTitle>
            DINING <span>PROMOTION</span>
          </S.IndexTitle>
          <S.IndexDesc>세계 최고 수준의 셰프들이 직접 선보이는 다양한 요리를 즐겨보세요.</S.IndexDesc>
          <S.ItemList>
            <S.DiningItem>
              <img src={diningImages[0]} alt={`다이닝 ${diningImages[0]}`} />
              <S.ItemTitle>베이커리</S.ItemTitle>
              <S.ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</S.ItemDesc>
            </S.DiningItem>
            <S.DiningItem>
              <img src={diningImages[1]} alt={`다이닝 ${diningImages[1]}`} />
              <S.ItemTitle>바&라운지</S.ItemTitle>
              <S.ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</S.ItemDesc>
            </S.DiningItem>
            <S.DiningItem>
              <img src={diningImages[2]} alt={`다이닝 ${diningImages[2]}`} />
              <S.ItemTitle>레스토랑</S.ItemTitle>
              <S.ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</S.ItemDesc>
            </S.DiningItem>
            <S.DiningItem>
              <img src={diningImages[3]} alt={`다이닝 ${diningImages[3]}`} />
              <S.ItemTitle>룸 서비스</S.ItemTitle>
              <S.ItemDesc>Every GLAD Moment! 세상에 하나 뿐인 글래드 프레임으로 소중한 사람과 함께한 특별한 순간을 남겨보세요!</S.ItemDesc>
            </S.DiningItem>
          </S.ItemList>
          <BtnWrapper className="center">
            <MoreLink to="/offers/1?type=dining">자세히보기</MoreLink>
          </BtnWrapper>
        </S.Wrapper>
      </S.IndexOffers>
      <S.IndexFacilities>
        <S.FacilitiesContainer>
          <S.ImageSlider>
            <FacilitiesSlider />
          </S.ImageSlider>
          <S.FacilitiesInfo>
            <S.IndexDesc className="facilities">부대시설</S.IndexDesc>
            <S.IndexTitle className="facilities">
              Goorm <span>Facilities</span>
            </S.IndexTitle>
            <S.IndexDesc className="facilities">
              심신의 활력과 균형 잡힌 라이프 스타일을 추구하는 구름 호텔의 다양한 시설을 경험해 보세요.
            </S.IndexDesc>
            <BtnWrapper>
              <MoreLink to="/facilities">자세히보기</MoreLink>
            </BtnWrapper>
          </S.FacilitiesInfo>
        </S.FacilitiesContainer>
      </S.IndexFacilities>
      <S.IndexLocation>
        <S.Wrapper>
          <S.IndexTitle>LOCATION</S.IndexTitle>
          <S.IndexDesc>구름 호텔로 오시는 방법을 안내해드립니다.</S.IndexDesc>
          <S.MapWrapper>
            <KakaoMap />
            <S.MapAddress>
              <p>위치 : 경기도 성남시 분당구 판교로 242 PDC A동 902호</p>
              <S.ContactInfo>
                <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h48v48H0z" fill="none" />
                  <path d="M13.25 21.59c2.88 5.66 7.51 10.29 13.18 13.17l4.4-4.41c.55-.55 1.34-.71 2.03-.49C35.1 30.6 37.51 31 40 31c1.11 0 2 .89 2 2v7c0 1.11-.89 2-2 2C21.22 42 6 26.78 6 8c0-1.11.9-2 2-2h7c1.11 0 2 .89 2 2 0 2.49.4 4.9 1.14 7.14.22.69.06 1.48-.49 2.03l-4.4 4.42z" />
                </svg>
                <a href="tel:031-600-8586">031-600-8586</a>
              </S.ContactInfo>
              <S.ContactInfo>
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g data-name="8-Email" id="_8-Email">
                    <path d="M45,7H3a3,3,0,0,0-3,3V38a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V10A3,3,0,0,0,45,7Zm-.64,2L24,24.74,3.64,9ZM2,37.59V10.26L17.41,22.17ZM3.41,39,19,23.41l4.38,3.39a1,1,0,0,0,1.22,0L29,23.41,44.59,39ZM46,37.59,30.59,22.17,46,10.26Z" />
                  </g>
                </svg>
                <a href="mailto:contact@goorm.io">contact@goorm.io</a>
              </S.ContactInfo>
            </S.MapAddress>
          </S.MapWrapper>
          <BtnWrapper className="center">
            <MoreLink to="/location">자세히보기</MoreLink>
          </BtnWrapper>
        </S.Wrapper>
      </S.IndexLocation>
    </>
  );
};

export default Home;