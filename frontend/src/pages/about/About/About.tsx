import React from 'react';
import * as S from './Style';
import { BtnWrapper, MoreLink, PageTitle, ContentsTitle } from '../../../Style/commonStyles';
import SubHeader from '../../../components/layout/SubHeader/SubHeader';
import diningImg from '../../../images/about/dining.jpg';
import facilitiesImg from '../../../images/about/facilities.jpg';
import membershipImg from '../../../images/about/membership.jpg';
import roomImg from '../../../images/about/room.jpg';

const About = () => {
  return (
    <>
      <SubHeader kind="about" />
      <S.ContainerWrapper>
        <S.Container>
          <PageTitle>호텔 소개</PageTitle>
          <S.Section>
            <S.ImgWrapper style={{ backgroundImage: `url(${roomImg})` }}></S.ImgWrapper>
            <div>
              <ContentsTitle>객실</ContentsTitle>
              <S.ContentsDesc>
                전 객실 서울의 환상적인 파노라믹뷰
                <br /> 예술적 품격을 갖춘 모던한 디럭스 객실부터 우아한 감성의 스위트 객실과 최고급 풀빌라까지, <br />
                다양한 객실에서 격이 다른 휴식과 여유를 경험해 보세요.
              </S.ContentsDesc>
              <MoreLink to="/rooms">자세히보기</MoreLink>
            </div>
          </S.Section>
          <S.Section className="right">
            <div>
              <ContentsTitle>다이닝</ContentsTitle>
              <S.ContentsDesc>최상급 식자재를 사용한 미슐랭 스타 레스토랑부터 프리미엄 뷔페까지 호텔 다이닝을 만나보세요.</S.ContentsDesc>
              <MoreLink to="/dining">자세히보기</MoreLink>
            </div>
            <S.ImgWrapper style={{ backgroundImage: `url(${diningImg})` }}></S.ImgWrapper>
          </S.Section>
          <S.Section>
            <S.ImgWrapper style={{ backgroundImage: `url(${facilitiesImg})` }}></S.ImgWrapper>
            <div>
              <ContentsTitle>부대시설</ContentsTitle>
              <S.ContentsDesc>
                자연이 주는 낭만 속의 이국적인 수영장과 다채로운 액티비티를 즐길 수 있는 엔터테인먼트 공간까지, <br />
                도심 속에서 여유로운 시간을 느껴보세요
              </S.ContentsDesc>
              <MoreLink to="/facilities">자세히보기</MoreLink>
            </div>
          </S.Section>
          <div>
            <ContentsTitle className="center">멤버십</ContentsTitle>
            <S.MerbershipImg src={membershipImg} alt="membership" />
            <BtnWrapper className="center">
              <MoreLink to="/membership">자세히보기</MoreLink>
            </BtnWrapper>
          </div>
        </S.Container>
      </S.ContainerWrapper>
    </>
  );
};

export default About;
