import React from 'react';
import { styled } from 'styled-components';
import { commonContainerStyle, PageTitle } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import Deluxe from '../../images/room/Deluxe.jpg';
import Family from '../../images/room/Family.jpg';
import Suite from '../../images/room/Suite.jpg';
import Villa from '../../images/room/Villa.jpg';

export const Container = styled(commonContainerStyle)``;

export const Item = styled.ul`
  li {
    width: 100%;
    height: 400px;
    margin-bottom: 58px;
    display: flex;
    border: 1px solid ${(props) => props.theme.colors.grayborder};
  }
`;

export const ImgWrapper = styled.div`
  width: 680px;
  height: 398px;
  background-size: cover;
`;

export const Info = styled.div`
  width: 500px;
  padding: 60px;
`;

export const Name = styled.h3`
  font-size: ${(props) => props.theme.font.sizexl};
  color: ${(props) => props.theme.colors.charcoal};
  margin-bottom: 30px;
`;

export const Description = styled.p`
  font-size: ${(props) => props.theme.font.sizes};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.6;
  word-break: keep-all;
`;

export const Detail = styled.table`
  width: 100%;
  line-height: 1.8;
  margin: 25px 0;
  font-size: ${(props) => props.theme.font.sizexs};

  th {
    font-weight: 500;
    width: 40%;
    color: ${(props) => props.theme.colors.charcoal};
  }
  td {
    color: ${(props) => props.theme.colors.graylight};
  }
`;

export const Location = styled.p`
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.goldhover};
`;

const Room = () => {

  return (
    <>
      <SubHeader kind="facilities" />
      <Container>
      <PageTitle>객실</PageTitle>
        <Item>
          <li>
            <ImgWrapper style={{ backgroundImage: `url(${Deluxe})` }}></ImgWrapper>
            <Info>
              <Name>디럭스</Name>
              <Description>
                우아한 인테리어와 현대적 세련미가 조화롭게 어우러진 디럭스 룸은 초고층 객실에서 바라보는 서울 도심의 파노라믹뷰와 최상의 휴식을
                제공합니다.
              </Description>
              <Detail>
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
              </Detail>
              <Location>•&nbsp;&nbsp;위치 : 본관</Location>
            </Info>
          </li>
          <li>
            <ImgWrapper style={{ backgroundImage: `url(${Suite})` }}></ImgWrapper>
            <Info>
              <Name>스위트</Name>
              <Description>
                스위트 룸은 넓은 공간과 세련된 디자인의 응접실 및 다이닝 룸을 갖춘 객실입니다. 대형 창문을 통해 펼쳐지는 아름다운 서울의 전망과 함께
                세심한 서비스를 느껴보세요.
              </Description>
              <Detail>
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
              </Detail>
              <Location>•&nbsp;&nbsp;위치 : 본관</Location>
            </Info>
          </li>
          <li>
            <ImgWrapper style={{ backgroundImage: `url(${Family})` }}></ImgWrapper>
            <Info>
              <Name>패밀리</Name>
              <Description>
                패밀리 룸은 일반 객실보다 더욱 넓고 쾌적한 공간을 제공하는 객실입니다. 침실과 응접실이 분리되어 있어 편안함과 안정된 휴식을 누리실 수
                있습니다.
              </Description>
              <Detail>
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
              </Detail>
              <Location>•&nbsp;&nbsp;위치 : 본관</Location>
            </Info>
          </li>
          <li>
            <ImgWrapper style={{ backgroundImage: `url(${Villa})` }}></ImgWrapper>
            <Info>
              <Name>풀 빌라</Name>
              <Description>
                숲 속의 별장에서 내려다 보이는 한강 전망이 이국적인 분위기를 물씬 자아내며, 독립된 공간에서 편안한 휴식을 원하는 분들께 사랑 받는
                장소입니다.
              </Description>
              <Detail>
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
              </Detail>
              <Location>•&nbsp;&nbsp;위치 : 별채</Location>
            </Info>
          </li>
        </Item>
      </Container>
    </>
  );
};

export default Room;
