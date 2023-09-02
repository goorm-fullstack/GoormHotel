import React from "react";
import diningImg from "../images/about/dining.jpg";
import facilitiesImg from "../images/about/facilities.jpg";
import membershipImg from "../images/about/membership.jpg";
import roomImg from "../images/about/room.jpg";
import Header from "../components/Header";
import { styled } from "styled-components";
import { Link, NavLink } from "react-router-dom";
// import Map from "./Map";
import { DetailBtn, DetailSvg } from "./Home";

const AboutHeader = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 10;
`;

const AboutHeaderTitle = styled.h1`
  margin-left: 70px;
  font-size: 18px;
  font-weight: bold;
`;

const LinkWrapper = styled.div`
  float: left;
  margin-left: 107px;

  & > a:not(:last-child) {
    margin-right: 40px;
  }
`;

const AboutLink = styled(NavLink)`
  font-size: 14px;
  color: #888888;

  &.active {
    color: #baa085;
  }
`;

const Title = styled.h1`
  color: #111111;
  font-weight: bold;
  font-size: 36px;
  margin: 160px 0 160px 370px;
`;

const IntroWrapper = styled.div`
  height: 400px;
  background-color: #f5f5f5;
  position: relative;
  min-width: 990px;
`;

const Img = styled.img`
  width: 679px;
  height: 400px;
  position: absolute;
  bottom: 60px;
  right: -59px;
`;

const Intro = styled.div`
  margin-right: 370px;
  margin-left: 160px;
`;

const LeftIntro = styled.div`
  margin-left: 370px;
  margin-right: 145px;
`;

const Section = styled.div`
  display: flex;
  margin-bottom: 240px;
  justify-content: space-between;
  max-width: 1920px;
`;

const IntroTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 31px;
`;

const IntroDescription = styled.p`
  font-size: 16px;
  color: #888888;
  min-width: 396px;
  line-height: 1.5;
  margin-bottom: 53px;
`;

const DiningDescription = styled(IntroDescription)`
  font-size: 14px;
`;

const DiningImg = styled(Img)`
  left: -59px;
`;

const MembershipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1180px;
  margin: 0 auto;
  align-items: center;
`;

const MembershipTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 56px;
`;

const MerbershipImg = styled.img`
  margin-bottom: 50px;
`;

const About = () => {
  return (
    <>
      <Header backgroundColor="#21201E" />
      <AboutHeader>
        <AboutHeaderTitle>구름호텔 소개</AboutHeaderTitle>
        <LinkWrapper>
          <AboutLink to="/about" activeClassName="active">
            호텔소개
          </AboutLink>
          <AboutLink to="/map" activeClassName="active">
            오시는길
          </AboutLink>
        </LinkWrapper>
      </AboutHeader>
      <Title>호텔소개</Title>
      <Section>
        <IntroWrapper>
          <Img src={roomImg} alt="room" />
        </IntroWrapper>
        <Intro>
          <IntroTitle>객실</IntroTitle>
          <IntroDescription>
            전 객실 서울의 환상적인 파노라믹뷰
            <br /> 예술적 품격을 갖춘 모던한 디럭스 객실부터 우아한 감성의
            <br /> 스위트 객실과 최고급 풀빌라까지,
            <br /> 다양한 객실에서 격이 다른 휴식과 여유를 경험해 보세요
          </IntroDescription>
          <Link to="/rooms">
            <DetailBtn>
              <p>자세히보기</p>
              <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </g>
              </DetailSvg>
            </DetailBtn>
          </Link>
        </Intro>
      </Section>
      <Section>
        <LeftIntro>
          <IntroTitle>다이닝</IntroTitle>
          <DiningDescription>
            최상급 식자재를 사용한 미슐랭 스타 레스토랑부터 프리미엄 뷔페까지
            <br /> 호텔 다이닝을 만나보세요.
          </DiningDescription>
          <Link to="/dining">
            <DetailBtn>
              <p>자세히보기</p>
              <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </g>
              </DetailSvg>
            </DetailBtn>
          </Link>
        </LeftIntro>
        <IntroWrapper>
          <DiningImg src={diningImg} alt="room" />
        </IntroWrapper>
      </Section>
      <Section>
        <IntroWrapper>
          <Img src={facilitiesImg} alt="room" />
        </IntroWrapper>
        <Intro>
          <IntroTitle>부대시설</IntroTitle>
          <IntroDescription>
            자연이 주는 낭만 속의 이국적인 수영장과 다채로운 액티비티를 즐길 수
            있는 엔터테인먼트 공간까지, 도심 속에서 여유로운 시간을 느껴보세요
          </IntroDescription>
          <DetailBtn>
            <p>자세히보기</p>
            <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
              </g>
            </DetailSvg>
          </DetailBtn>
        </Intro>
      </Section>
      <MembershipWrapper>
        <MembershipTitle>멤버십</MembershipTitle>
        <MerbershipImg src={membershipImg} alt="membership" />
        <DetailBtn>
          <p>자세히보기</p>
          <DetailSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <title />
            <g data-name="Layer 2" id="Layer_2">
              <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
            </g>
          </DetailSvg>
        </DetailBtn>
      </MembershipWrapper>
    </>
  );
};

export default About;
