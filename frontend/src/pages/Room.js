import React from 'react';
import Header from '../components/Header';
import { styled } from 'styled-components';
import Deluxe from '../images/room/Deluxe.jpg'
import Family from '../images/room/Family.jpg'
import Suite from '../images/room/Suite.jpg'
import Villa from '../images/room/Villa.jpg'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const Wrapper = styled.div`
  width: 1182px;
  margin: 0 auto;
`

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-top: 160px;
  margin-bottom: 40px;
`;

export const SubTitle = styled.p`
  font-size: 18px;
  color: #888888;
  margin-bottom: 78px;
`;

export const Item = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const List = styled.li`
  height: 402px;
  margin-bottom: 58px;
  display: flex;
  border: 1px solid #DDDDDD;
`;

export const Img = styled.img`
  width: 679px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px;
`; 

export const Name = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #21201E;
  margin-bottom: 24px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #888888;
  line-height: 1.5;
`;

export const Detail = styled.div`
  display: flex;
  height: 71px;
  margin-top: 41px;
  margin-bottom: 40px;
`;

export const DetailInfo = styled.div`
  color: #888888;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DetailTitle = styled(DetailInfo)`
  margin-right: 50px;
  font-weight: bold;
  color: #111111;
`;

export const Location = styled.p`
  font-size: 14px;
  color: #BAA085;
`;

const Room = () => {
  return (
    <>
      <Header backgroundColor="#21201E" />
      <Container>
        <Wrapper>
        <Title>객실</Title>
        <SubTitle>환상적인 서울 도심의 파노라믹뷰와 모던한 인테리어의 객실은 최상의 휴식을 제공합니다.</SubTitle>
          <Item>
            <List>
              <Img src={Deluxe}></Img>
              <Info>
                <Name>디럭스</Name>
                <Description>우아한 인테리어와 현대적 세련미가 조화롭게 어우러진 디럭스 룸은 초고층 객실에서 바라보는 서울 도심의 파노라믹뷰와 최상의 휴식을 제공합니다.</Description>
                <Detail>
                  <DetailTitle>
                    <div>침대타입</div>
                    <div>투숙인원</div>
                    <div>체크인/체크아웃</div>
                  </DetailTitle>
                  <DetailInfo>
                    <div>더블/트윈</div>
                    <div>2명</div>
                    <div>15:00/11:00</div>
                  </DetailInfo>
                </Detail>
                <Location>• 위치 : 본관</Location>
              </Info>
            </List>
            <List>
              <Img src={Suite}></Img>
              <Info>
                <Name>스위트</Name>
                <Description>스위트 룸은 넓은 공간과 세련된 디자인의 응접실 및 다이닝룸을 갖춘 객실입니다. 대형 창문을 통해 펼쳐지는 아름다운 서울의 전망과 함께 세심한 서비스를 느껴보세요.</Description>
                <Detail>
                  <DetailTitle>
                    <div>침대타입</div>
                    <div>투숙인원</div>
                    <div>체크인/체크아웃</div>
                  </DetailTitle>
                  <DetailInfo>
                    <div>더블/트윈</div>
                    <div>2명</div>
                    <div>15:00/11:00</div>
                  </DetailInfo>
                </Detail>
                <Location>• 위치 : 본관</Location>
              </Info>
            </List>
            <List>
            <Img src={Family}></Img>
              <Info>
                <Name>패밀리</Name>
                <Description>패밀리 룸은 일반 객실보다 더욱 넓고 쾌적한 공간을 제공하는 객실입니다. 침실과 응접실이 분리되어 있어 편안함과 안정된 휴식을 누리실 수 있습니다.</Description>
                <Detail>
                  <DetailTitle>
                    <div>침대타입</div>
                    <div>투숙인원</div>
                    <div>체크인/체크아웃</div>
                  </DetailTitle>
                  <DetailInfo>
                    <div>더블/트윈</div>
                    <div>2명</div>
                    <div>15:00/11:00</div>
                  </DetailInfo>
                </Detail>
                <Location>• 위치 : 본관</Location>
              </Info>
            </List>
            <List>
            <Img src={Villa}></Img>
              <Info>
                <Name>풀 빌라</Name>
                <Description>숲 속의 별장에서 내려다 보이는 한강 전망이 이국적인 분위기를 물씬 자아내며, 독립된 공간에서 편안한 휴식을 원하는 분들께 사랑 받는 장소입니다.</Description>
                <Detail>
                  <DetailTitle>
                    <div>침대타입</div>
                    <div>투숙인원</div>
                    <div>체크인/체크아웃</div>
                  </DetailTitle>
                  <DetailInfo>
                    <div>더블/트윈</div>
                    <div>2명</div>
                    <div>15:00/11:00</div>
                  </DetailInfo>
                </Detail>
                <Location>• 위치 : 별채</Location>
              </Info>
            </List>
          </Item>
        </Wrapper>
      </Container>
    </>
  );
};

export default Room;