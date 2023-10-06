import React from 'react';
import { PageTitle } from '../../../Style/commonStyles';
import * as S from './Style';
import Bakery from '../../../images/dining/Bakery.jpg';
import Bar from '../../../images/dining/Bar.jpg';
import Restaurant from '../../../images/dining/Restaurant.jpg';
import RoomService from '../../../images/dining/RoomService.jpg';
import SubHeader from '../../../components/layout/SubHeader/SubHeader';

const Dining = () => {
  return (
    <>
      <SubHeader kind="facilities" />
      <S.Container>
        <PageTitle>다이닝</PageTitle>
        <S.Item>
          <li>
            <S.ImgWrapper style={{ backgroundImage: `url(${Restaurant})` }}></S.ImgWrapper>
            <S.Info>
              <S.Name>레스토랑</S.Name>
              <S.Description>
                팔도 제철 식재료를 활용한 건강한 한식을 시작으로 친환경 인증 채소를 활용한 샐러드, 다양한 디저트를 제공하는 레스토랑입니다.
              </S.Description>
              <S.Detail>
                <tbody>
                  <tr>
                    <th>운영시간</th>
                    <td>조식, 중식, 석식</td>
                  </tr>
                  <tr>
                    <th>좌석수</th>
                    <td>160석</td>
                  </tr>
                </tbody>
              </S.Detail>
              <S.Location>•&nbsp;&nbsp;위치 : 본관</S.Location>
            </S.Info>
          </li>
          <li>
            <S.ImgWrapper style={{ backgroundImage: `url(${RoomService})` }}></S.ImgWrapper>
            <S.Info>
              <S.Name>룸 서비스</S.Name>
              <S.Description>초고층 객실에서 프라이빗하게 즐길 수 있는 다이닝 서비스입니다.</S.Description>
              <S.Detail>
                <tbody>
                  <tr>
                    <th>운영시간</th>
                    <td>조식, 중식, 석식</td>
                  </tr>
                  <tr>
                    <th>좌석수</th>
                    <td>해당없음</td>
                  </tr>
                </tbody>
              </S.Detail>
              <S.Location>•&nbsp;&nbsp;위치 : 객실</S.Location>
            </S.Info>
          </li>
          <li>
            <S.ImgWrapper style={{ backgroundImage: `url(${Bar})` }}></S.ImgWrapper>
            <S.Info>
              <S.Name>바&라운지</S.Name>
              <S.Description>초고층 업스케일 샴페인바에서 서울 시내의 파노라믹 스카이뷰와 함께 술과 음악을 즐겨보시기 바랍니다.</S.Description>
              <S.Detail>
                <tbody>
                  <tr>
                    <th>운영시간</th>
                    <td>야간</td>
                  </tr>
                  <tr>
                    <th>좌석수</th>
                    <td>78석</td>
                  </tr>
                </tbody>
              </S.Detail>
              <S.Location>•&nbsp;&nbsp;위치 : 본관</S.Location>
            </S.Info>
          </li>
          <li>
            <S.ImgWrapper style={{ backgroundImage: `url(${Bakery})` }}></S.ImgWrapper>
            <S.Info>
              <S.Name>베이커리</S.Name>
              <S.Description>서울의 환상적인 뷰와 함께 미쉐린 스타 셰프의 시즌별 케이크, 타르트 등 최고급 디저트를 선보입니다.</S.Description>
              <S.Detail>
                <tbody>
                  <tr>
                    <th>운영시간</th>
                    <td>중식, 석식</td>
                  </tr>
                  <tr>
                    <th>좌석수</th>
                    <td>102석</td>
                  </tr>
                </tbody>
              </S.Detail>
              <S.Location>•&nbsp;&nbsp;위치 : 별채</S.Location>
            </S.Info>
          </li>
        </S.Item>
      </S.Container>
    </>
  );
};

export default Dining;
