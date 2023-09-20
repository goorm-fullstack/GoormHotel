import React from 'react';
import { styled } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { MoreLink, SubHeader, PageTitle, commonContainerStyle } from '../../components/common/commonStyles';
import diningImg from '../../images/about/dining.jpg';
import facilitiesImg from '../../images/about/facilities.jpg';
import membershipImg from '../../images/about/membership.jpg';
import roomImg from '../../images/about/room.jpg';

const ImgWrapper = styled.div`
  width: 680px;
  height: 400px;
  background-size: cover;
`;

const Intro = styled.div``;

const LeftIntro = styled.div`
  margin-right: 165px;
  padding-left: 59px;
`;

const Section = styled.div`
  display: flex;
  gap: 0 100px;
  margin-bottom: 240px;
  align-items: center;
`;

const RightSection = styled(Section)`
  background: linear-gradient(to left, ${(props) => props.theme.colors.lightGray} 50%, transparent 50%);
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
  font-size: 16px;
`;

const DiningImg = styled.img`
  left: -59px;
`;

const MembershipWrapper = styled.div`
  text-align: center;
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

const Container = styled(commonContainerStyle)``;

const Images = [roomImg, diningImg, facilitiesImg];

const About = () => {
  return (
    <>
      <SubHeader>
        <h2>구름호텔 소개</h2>
        <ul>
          <li>
            <NavLink to="/about" $activeClassName="active">
              호텔 소개
            </NavLink>
          </li>
          <li>
            <NavLink to="/location" $activeClassName="active">
              오시는 길
            </NavLink>
          </li>
        </ul>
      </SubHeader>
      <Container>
        <PageTitle>호텔 소개</PageTitle>
        <Section>
          <ImgWrapper style={{ backgroundImage: `url(${Images[0]})` }}></ImgWrapper>
          <Intro>
            <IntroTitle>객실</IntroTitle>
            <IntroDescription>
              전 객실 서울의 환상적인 파노라믹뷰
              <br /> 예술적 품격을 갖춘 모던한 디럭스 객실부터 우아한 감성의
              <br /> 스위트 객실과 최고급 풀빌라까지,
              <br /> 다양한 객실에서 격이 다른 휴식과 여유를 경험해 보세요
            </IntroDescription>
            <MoreLink to="/rooms">자세히보기</MoreLink>
          </Intro>
        </Section>
        <Section className="right">
          <LeftIntro>
            <IntroTitle>다이닝</IntroTitle>
            <DiningDescription>최상급 식자재를 사용한 미슐랭 스타 레스토랑부터 프리미엄 뷔페까지 호텔 다이닝을 만나보세요.</DiningDescription>
            <MoreLink to="/dining">자세히보기</MoreLink>
          </LeftIntro>
          <ImgWrapper style={{ backgroundImage: `url(${Images[1]})` }}></ImgWrapper>
        </Section>
        <Section>
          <ImgWrapper style={{ backgroundImage: `url(${Images[2]})` }}></ImgWrapper>
          <Intro>
            <IntroTitle>부대시설</IntroTitle>
            <IntroDescription>
              자연이 주는 낭만 속의 이국적인 수영장과 다채로운 액티비티를 즐길 수 있는 엔터테인먼트 공간까지, 도심 속에서 여유로운 시간을 느껴보세요
            </IntroDescription>
            <MoreLink to="/facilities">자세히보기</MoreLink>
          </Intro>
        </Section>
        <MembershipWrapper>
          <MembershipTitle>멤버십</MembershipTitle>
          <MerbershipImg src={membershipImg} alt="membership" />
          <MoreLink to="/membership">자세히보기</MoreLink>
        </MembershipWrapper>
      </Container>
    </>
  );
};

export default About;
