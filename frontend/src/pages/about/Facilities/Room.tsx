import React from 'react';
import * as S from './Style';
import { PageTitle } from '../../../Style/commonStyles';
import SubHeader from '../../../components/layout/SubHeader/SubHeader';
import Deluxe from '../../../images/room/Deluxe.jpg';
import Family from '../../../images/room/Family.jpg';
import Suite from '../../../images/room/Suite.jpg';
import Villa from '../../../images/room/Villa.jpg';

const Room = () => {
  return (
    <>
      <SubHeader kind="facilities" />
      <S.Container>
        <PageTitle>객실</PageTitle>
        <S.Item>
          <li>
            <S.ImgWrapper style={{ backgroundImage: `url(${Deluxe})` }}></S.ImgWrapper>
            <S.Info>
              <S.Name>디럭스</S.Name>
              <S.Description>
                우아한 인테리어와 현대적 세련미가 조화롭게 어우러진 디럭스 룸은 초고층 객실에서 바라보는 서울 도심의 파노라믹뷰와 최상의 휴식을
                제공합니다.
              </S.Description>
              <S.Detail>
                <tbody>
                  <tr>
                    <th>침대타입</th>
                    <td>더블/트윈</td>
                  </tr>
                  <tr>
                    <th>투숙인원</th>
                    <td>2명</td>
                  </tr>
                  <tr>
                    <th>체크인/체크아웃</th>
                    <td>15:00/11:00</td>
                  </tr>
                </tbody>
              </S.Detail>
              <S.Location>•&nbsp;&nbsp;위치 : 본관</S.Location>
            </S.Info>
          </li>
          <li>
            <S.ImgWrapper style={{ backgroundImage: `url(${Suite})` }}></S.ImgWrapper>
            <S.Info>
              <S.Name>스위트</S.Name>
              <S.Description>
                스위트 룸은 넓은 공간과 세련된 디자인의 응접실 및 다이닝 룸을 갖춘 객실입니다. 대형 창문을 통해 펼쳐지는 아름다운 서울의 전망과 함께
                세심한 서비스를 느껴보세요.
              </S.Description>
              <S.Detail>
                <tbody>
                  <tr>
                    <th>침대타입</th>
                    <td>더블/트윈</td>
                  </tr>
                  <tr>
                    <th>투숙인원</th>
                    <td>2명</td>
                  </tr>
                  <tr>
                    <th>체크인/체크아웃</th>
                    <td>15:00/11:00</td>
                  </tr>
                </tbody>
              </S.Detail>
              <S.Location>•&nbsp;&nbsp;위치 : 본관</S.Location>
            </S.Info>
          </li>
          <li>
            <S.ImgWrapper style={{ backgroundImage: `url(${Family})` }}></S.ImgWrapper>
            <S.Info>
              <S.Name>패밀리</S.Name>
              <S.Description>
                패밀리 룸은 일반 객실보다 더욱 넓고 쾌적한 공간을 제공하는 객실입니다. 침실과 응접실이 분리되어 있어 편안함과 안정된 휴식을 누리실 수
                있습니다.
              </S.Description>
              <S.Detail>
                <tbody>
                  <tr>
                    <th>침대타입</th>
                    <td>더블/트윈</td>
                  </tr>
                  <tr>
                    <th>투숙인원</th>
                    <td>2명</td>
                  </tr>
                  <tr>
                    <th>체크인/체크아웃</th>
                    <td>15:00/11:00</td>
                  </tr>
                </tbody>
              </S.Detail>
              <S.Location>•&nbsp;&nbsp;위치 : 본관</S.Location>
            </S.Info>
          </li>
          <li>
            <S.ImgWrapper style={{ backgroundImage: `url(${Villa})` }}></S.ImgWrapper>
            <S.Info>
              <S.Name>풀 빌라</S.Name>
              <S.Description>
                숲 속의 별장에서 내려다 보이는 한강 전망이 이국적인 분위기를 물씬 자아내며, 독립된 공간에서 편안한 휴식을 원하는 분들께 사랑 받는
                장소입니다.
              </S.Description>
              <S.Detail>
                <tbody>
                  <tr>
                    <th>침대타입</th>
                    <td>더블/트윈</td>
                  </tr>
                  <tr>
                    <th>투숙인원</th>
                    <td>2명</td>
                  </tr>
                  <tr>
                    <th>체크인/체크아웃</th>
                    <td>15:00/11:00</td>
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

export default Room;
