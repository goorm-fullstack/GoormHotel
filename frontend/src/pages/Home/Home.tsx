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
import FacilitiesSlider from '../../components/Slide/FacilitiesSlider';
import { DiningData, RoomData } from '../../admin/item/AdminItemList';
import axios from 'axios';
import Instance from '../../utils/api/axiosInstance';

const diningImages = [dining01, dining02, dining03, dining04];

interface ReservationData {
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  adults: number;
  children: number;
  nights: number;
}

const productCategories = [
  { korean: '디럭스', english: 'deluxe' },
  { korean: '스위트', english: 'sweet' },
  { korean: '패밀리', english: 'family' },
  { korean: '풀 빌라', english: 'poolVilla' },
];

const diningCategories = [
  { korean: '레스토랑', english: 'restaurant' },
  { korean: '룸서비스', english: 'roomService' },
  { korean: '바&라운지', english: 'barRounge' },
  { korean: '베이커리', english: 'bakery' },
];

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
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [diningData, setDiningData] = useState<DiningData[]>([]);
  const [imgUrlsRoom, setImageUrlsRoom] = useState<string[]>([]);
  const [imageUrlsDining, setImageUrlsDining] = useState<string[]>([]);

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

  // 객실, 다이닝 데이터 가져오기
  useEffect(() => {
    const handleLoadItems = async () => {
      try {
        const responseRoom = await Instance.get('/rooms?page=1');
        const responseDining = await Instance.get('/dinings?page=1');
        const dataRoom = responseRoom.data;
        const dataDining = responseDining.data;
        setDiningData(dataDining);
        setRoomData(dataRoom);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error:', error.message);
        } else {
          console.error('An unknown error occurred.');
        }
      }
    };
    handleLoadItems();
  }, []);

  // 서버에 저장된 이미지 요청
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urlsRoom = await Promise.all(
        roomData.map(async (item) => {
          const response = await axios.get(`/image/${item.name}`, {
            responseType: 'arraybuffer',
          });
          console.log(response);
          const blob = new Blob([response.data], {
            type: response.headers['content-type'],
          });
          console.log('blob = ', blob);
          return URL.createObjectURL(blob);
        })
      );
      const urlsDining = await Promise.all(
        diningData.map(async (item) => {
          const response = await axios.get(`/image/${item.name}`, {
            responseType: 'arraybuffer',
          });
          console.log(response);
          const blob = new Blob([response.data], {
            type: response.headers['content-type'],
          });
          console.log('blob = ', blob);
          return URL.createObjectURL(blob);
        })
      );
      setImageUrlsRoom(urlsRoom);
      setImageUrlsDining(urlsDining);
    };

    fetchImageUrls();
  }, [roomData, diningData]);

  const nameOfTypeDetail = (product: RoomData | DiningData) => {
    const foundCategory = [...diningCategories, ...productCategories].find((category) => product.typeDetail.includes(category.english));
    return foundCategory ? foundCategory.korean : 'none';
  };

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
            {roomData.length === 0 && <S.NoItem>등록된 상품이 없습니다.</S.NoItem>}
            {roomData[0] && (
              <S.RoomItem>
                <div className="imgw">
                  <img src={imgUrlsRoom[0]} alt="객실" />
                </div>
                <S.ItemTitle>{nameOfTypeDetail(roomData[0])}</S.ItemTitle>
                <S.ItemDesc>{roomData[0].description}</S.ItemDesc>
              </S.RoomItem>
            )}
            {roomData[1] && (
              <S.RoomItem>
                <div className="imgw">
                  <img src={imgUrlsRoom[0]} alt="객실" />
                </div>
                <S.ItemTitle>{nameOfTypeDetail(roomData[1])}</S.ItemTitle>
                <S.ItemDesc>{roomData[1].description}</S.ItemDesc>
              </S.RoomItem>
            )}
            {roomData[2] && (
              <S.RoomItem>
                <div className="imgw">
                  <img src={imgUrlsRoom[2]} alt="객실" />
                </div>
                <S.ItemTitle>{nameOfTypeDetail(roomData[2])}</S.ItemTitle>
                <S.ItemDesc>{roomData[2].description}</S.ItemDesc>
              </S.RoomItem>
            )}
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
            {diningData.length === 0 && <S.NoItem>등록된 상품이 없습니다.</S.NoItem>}
            {diningData[0] && (
              <S.DiningItem>
                <div className="imgw">
                  <img src={imageUrlsDining[0]} alt={`다이닝 ${diningImages[0]}`} />
                </div>
                <S.ItemTitle>{nameOfTypeDetail(diningData[0])}</S.ItemTitle>
                <S.ItemDesc>{diningData[0].description}</S.ItemDesc>
              </S.DiningItem>
            )}
            {diningData[1] && (
              <S.DiningItem>
                <div className="imgw">
                  <img src={imageUrlsDining[1]} alt={`다이닝 ${diningImages[1]}`} />
                </div>
                <S.ItemTitle>{nameOfTypeDetail(diningData[1])}</S.ItemTitle>
                <S.ItemDesc>{diningData[1].description}</S.ItemDesc>
              </S.DiningItem>
            )}
            {diningData[2] && (
              <S.DiningItem>
                <div className="imgw">
                  <img src={imageUrlsDining[2]} alt={`다이닝 ${diningImages[2]}`} />
                </div>
                <S.ItemTitle>{nameOfTypeDetail(diningData[2])}</S.ItemTitle>
                <S.ItemDesc>{diningData[2].description}</S.ItemDesc>
              </S.DiningItem>
            )}
            {diningData[3] && (
              <S.DiningItem>
                <div className="imgw">
                  <img src={imageUrlsDining[3]} alt={`다이닝 ${diningImages[3]}`} />
                </div>
                <S.ItemTitle>{nameOfTypeDetail(diningData[3])}</S.ItemTitle>
                <S.ItemDesc>{diningData[3].description}</S.ItemDesc>
              </S.DiningItem>
            )}
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
