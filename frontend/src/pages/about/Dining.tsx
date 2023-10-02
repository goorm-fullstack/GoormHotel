import React from 'react';
import { commonContainerStyle, PageTitle } from '../../Style/commonStyles';
import { Item, Info, Name, Description, Detail, Location, ImgWrapper } from './Room';
import { styled } from 'styled-components';
import Bakery from '../../images/dining/Bakery.jpg';
import Bar from '../../images/dining/Bar.jpg';
import Restaurant from '../../images/dining/Restaurant.jpg';
import RoomService from '../../images/dining/RoomService.jpg';
import SubHeader from '../../components/layout/SubHeader/SubHeader';

export const Container = styled(commonContainerStyle)``;

const Dining = () => {

  return (
    <>
      <SubHeader kind="facilities" />
      <Container>
      <PageTitle>다이닝</PageTitle>
        <Item>
          <li>
            <ImgWrapper style={{ backgroundImage: `url(${Restaurant})` }}></ImgWrapper>
            <Info>
              <Name>레스토랑</Name>
              <Description>
                팔도 제철 식재료를 활용한 건강한 한식을 시작으로 친환경 인증 채소를 활용한 샐러드, 다양한 디저트를 제공하는 레스토랑입니다.
              </Description>
              <Detail>
                <tr>
                  <th>운영시간</th>
                  <td>조식, 중식, 석식</td>
                </tr>
                <tr>
                  <th>좌석수</th>
                  <td>160석</td>
                </tr>
              </Detail>
              <Location>•&nbsp;&nbsp;위치 : 본관</Location>
            </Info>
          </li>
          <li>
            <ImgWrapper style={{ backgroundImage: `url(${RoomService})` }}></ImgWrapper>
            <Info>
              <Name>룸 서비스</Name>
              <Description>초고층 객실에서 프라이빗하게 즐길 수 있는 다이닝 서비스입니다.</Description>
              <Detail>
                <tr>
                  <th>운영시간</th>
                  <td>조식, 중식, 석식</td>
                </tr>
                <tr>
                  <th>좌석수</th>
                  <td>해당없음</td>
                </tr>
              </Detail>
              <Location>•&nbsp;&nbsp;위치 : 객실</Location>
            </Info>
          </li>
          <li>
            <ImgWrapper style={{ backgroundImage: `url(${Bar})` }}></ImgWrapper>
            <Info>
              <Name>바&라운지</Name>
              <Description>초고층 업스케일 샴페인바에서 서울 시내의 파노라믹 스카이뷰와 함께 술과 음악을 즐겨보시기 바랍니다.</Description>
              <Detail>
                <tr>
                  <th>운영시간</th>
                  <td>야간</td>
                </tr>
                <tr>
                  <th>좌석수</th>
                  <td>78석</td>
                </tr>
              </Detail>
              <Location>•&nbsp;&nbsp;위치 : 본관</Location>
            </Info>
          </li>
          <li>
            <ImgWrapper style={{ backgroundImage: `url(${Bakery})` }}></ImgWrapper>
            <Info>
              <Name>베이커리</Name>
              <Description>서울의 환상적인 뷰와 함께 미쉐린 스타 셰프의 시즌별 케이크, 타르트 등 최고급 디저트를 선보입니다.</Description>
              <Detail>
                <tr>
                  <th>운영시간</th>
                  <td>중식, 석식</td>
                </tr>
                <tr>
                  <th>좌석수</th>
                  <td>102석</td>
                </tr>
              </Detail>
              <Location>•&nbsp;&nbsp;위치 : 별채</Location>
            </Info>
          </li>
        </Item>
      </Container>
    </>
  );
};

export default Dining;
