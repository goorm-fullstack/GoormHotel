import React from 'react';
import { styled } from 'styled-components';
import { BtnWrapper, MoreLink, PageTitle, ContentsTitle, commonContainerStyle } from '../../components/common/commonStyles';
import SubHeader from '../../components/layout/SubHeader';
import diningImg from '../../images/about/dining.jpg';
import facilitiesImg from '../../images/about/facilities.jpg';
import membershipImg from '../../images/about/membership.jpg';
import roomImg from '../../images/about/room.jpg';

const ImgWrapper = styled.div`
  width: 680px;
  height: 400px;
  background-size: cover;
`;

const Section = styled.div`
  display: flex;
  gap: 0 100px;
  margin-bottom: 200px;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    dislay: block;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 80px;
    left: 50%;
    transform: translate(-100%, 0);
    background: ${(props) => props.theme.colors.graybg};
  }

  &.right::before {
    transform: translate(0, 0);
  }
`;

const ContentsDesc = styled.p`
  width: 400px;
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.5;
  margin-bottom: 40px;
  word-break: keep-all;
`;

const MerbershipImg = styled.img`
  margin-bottom: 40px;
`;

const Container = styled(commonContainerStyle)``;

const ContainerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const About = () => {
  return (
    <>
      <SubHeader kind="about" />
      <ContainerWrapper>
        <Container>
          <PageTitle>호텔 소개</PageTitle>
          <Section>
            <ImgWrapper style={{ backgroundImage: `url(${roomImg})` }}></ImgWrapper>
            <div>
              <ContentsTitle>객실</ContentsTitle>
              <ContentsDesc>
                전 객실 서울의 환상적인 파노라믹뷰
                <br /> 예술적 품격을 갖춘 모던한 디럭스 객실부터 우아한 감성의 스위트 객실과 최고급 풀빌라까지, <br />
                다양한 객실에서 격이 다른 휴식과 여유를 경험해 보세요.
              </ContentsDesc>
              <MoreLink to="/rooms">자세히보기</MoreLink>
            </div>
          </Section>
          <Section className="right">
            <div>
              <ContentsTitle>다이닝</ContentsTitle>
              <ContentsDesc>최상급 식자재를 사용한 미슐랭 스타 레스토랑부터 프리미엄 뷔페까지 호텔 다이닝을 만나보세요.</ContentsDesc>
              <MoreLink to="/dining">자세히보기</MoreLink>
            </div>
            <ImgWrapper style={{ backgroundImage: `url(${diningImg})` }}></ImgWrapper>
          </Section>
          <Section>
            <ImgWrapper style={{ backgroundImage: `url(${facilitiesImg})` }}></ImgWrapper>
            <div>
              <ContentsTitle>부대시설</ContentsTitle>
              <ContentsDesc>
                자연이 주는 낭만 속의 이국적인 수영장과 다채로운 액티비티를 즐길 수 있는 엔터테인먼트 공간까지, <br />
                도심 속에서 여유로운 시간을 느껴보세요
              </ContentsDesc>
              <MoreLink to="/facilities">자세히보기</MoreLink>
            </div>
          </Section>
          <div>
            <ContentsTitle className="center">멤버십</ContentsTitle>
            <MerbershipImg src={membershipImg} alt="membership" />
            <BtnWrapper className="center">
              <MoreLink to="/membership">자세히보기</MoreLink>
            </BtnWrapper>
          </div>
        </Container>
      </ContainerWrapper>
    </>
  );
};

export default About;
