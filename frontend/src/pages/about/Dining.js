import React from 'react';
import { TitleDescription, Item, List, Img, Info, Name, Description, Detail, DetailInfo, DetailTitle, Location } from './Room';
import Header from '../../components/layout/Header';
import Bakery from '../images/dining/Bakery.jpg';
import Bar from '../images/dining/Bar.jpg';
import Restaurant from '../images/dining/Restaurant.jpg';
import RoomService from '../images/dining/RoomService.jpg';
import { styled } from 'styled-components';
import { commonContainerStyle, commonTitleStyle } from '../../components/common/commonStyles';

export const Container = styled.div`
  ${commonContainerStyle}
`;

export const Title = styled.h1`
  ${commonTitleStyle}
  margin-bottom: 40px;
`;

const DiningDetail = styled(Detail)`
  height: 41px;
  margin-bottom: 80px;
`;

const Dining = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>다이닝</Title>
        <TitleDescription>탁트인 도심의 전경을 바라보며 세계 최고 수준의 셰프들이 직접 선보이는 다양한 요리를 즐기실 수 있습니다.</TitleDescription>
        <Item>
          <List>
            <Img src={Restaurant}></Img>
            <Info>
              <Name>레스토랑</Name>
              <Description>
                팔도 제철 식재료를 활용한 건강한 한식을 시작으로 친환경 인증 채소를 활용한 샐러드, 다양한 디저트를 제공하는 레스토랑입니다.
              </Description>
              <DiningDetail>
                <DetailTitle>
                  <div>운영시간</div>
                  <div>좌석수</div>
                </DetailTitle>
                <DetailInfo>
                  <div>조식, 중식, 석식</div>
                  <div>160석</div>
                </DetailInfo>
              </DiningDetail>
              <Location>• 위치 : 본관</Location>
            </Info>
          </List>
          <List>
            <Img src={RoomService}></Img>
            <Info>
              <Name>룸 서비스</Name>
              <Description>초고층 객실에서 프라이빗하게 즐길 수 있는 다이닝 서비스입니다.</Description>
              <DiningDetail>
                <DetailTitle>
                  <div>운영시간</div>
                  <div>좌석수</div>
                </DetailTitle>
                <DetailInfo>
                  <div>조식, 중식, 석식</div>
                  <div>해당없음</div>
                </DetailInfo>
              </DiningDetail>
              <Location>• 위치 : 객실</Location>
            </Info>
          </List>
          <List>
            <Img src={Bar}></Img>
            <Info>
              <Name>바&라운지</Name>
              <Description>초고층 업스케일 샴페인바에서 서울 시내의 파노라믹 스카이뷰와 함께 술과 음악을 즐겨보시기 바랍니다.</Description>
              <DiningDetail>
                <DetailTitle>
                  <div>운영시간</div>
                  <div>좌석수</div>
                </DetailTitle>
                <DetailInfo>
                  <div>야간</div>
                  <div>78석</div>
                </DetailInfo>
              </DiningDetail>
              <Location>• 위치 : 본관</Location>
            </Info>
          </List>
          <List>
            <Img src={Bakery}></Img>
            <Info>
              <Name>베이커리</Name>
              <Description>서울의 환상적인 뷰와 함께 미쉐린 스타 셰프의 시즌별 케이크, 타르트 등 최고급 디저트를 선보입니다.</Description>
              <DiningDetail>
                <DetailTitle>
                  <div>운영시간</div>
                  <div>좌석수</div>
                </DetailTitle>
                <DetailInfo>
                  <div>중식, 석식</div>
                  <div>102석</div>
                </DetailInfo>
              </DiningDetail>
              <Location>• 위치 : 별채</Location>
            </Info>
          </List>
        </Item>
      </Container>
    </>
  );
};

export default Dining;
