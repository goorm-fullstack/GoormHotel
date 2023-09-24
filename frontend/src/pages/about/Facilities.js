import React from 'react';
import { styled } from 'styled-components';
import imgGym from '../../images/facilities/gym.jpg';
import imgMeeting from '../../images/facilities/meeting.jpg';
import imgPool from '../../images/facilities/pool.jpg';
import imgSalon from '../../images/facilities/salon.jpg';
import imgSauna from '../../images/facilities/sauna.jpg';
import imgSpa from '../../images/facilities/spa.jpg';
import { commonContainerStyle, PageTitle } from '../../components/common/commonStyles';

export const Container = styled(commonContainerStyle)``;

const Type = styled.p`
  color: #baa085;
  font-size: 0.875rem;
  margin-top: 24px;
`;

const ServiceName = styled.p`
  font-size: 1.375rem;
  font-weight: 500;
  margin: 10px 0 16px;
`;

const ServiceDesc = styled.p`
  color: #666;
  line-height: 1.5;
  word-break: keep-all;
  font-size: 0.9375rem;
`;

const WrapHalf = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 60px 30px;
`;

const Halfli = styled.li`
  width: 575px;
`;

const Facilities = () => {
  return (
    <>
      <Container>
        <PageTitle>부대시설</PageTitle>
        <WrapHalf>
          <Halfli>
            <div>
              <img src={imgSpa} />
            </div>
            <Type>스파 & 피트니스</Type>
            <ServiceName>리트릿 구름 스파</ServiceName>
            <ServiceDesc>한국 본연의 철학과 고차원적 감성을 더하여 일상 속 건강한 아름다움을 경험할 수 있는 휴식 공간입니다.</ServiceDesc>
          </Halfli>
          <Halfli>
            <div>
              <img src={imgSalon} />
            </div>
            <Type>서비스</Type>
            <ServiceName>살롱 드 구름</ServiceName>
            <ServiceDesc>유럽풍 라이브러리 컨셉의 투숙객 전용 라운지로 한강 전망을 바라보며 차와 커피를 즐길 수 있습니다.</ServiceDesc>
          </Halfli>
          <Halfli>
            <div>
              <img src={imgSauna} />
            </div>
            <Type>스파 & 피트니스</Type>
            <ServiceName>호텔 사우나</ServiceName>
            <ServiceDesc>심신의 여유로움과 피부미용에 효과적인 만족감을 드립니다.</ServiceDesc>
          </Halfli>
          <Halfli>
            <div>
              <img src={imgGym} />
            </div>
            <Type>스파 & 피트니스</Type>
            <ServiceName>피트니스센터</ServiceName>
            <ServiceDesc>테크노짐의 60여대 최첨단 ARTIS 장비와 4가지 Zone을 통해 트레이닝에 즐거움을 더해 드립니다.</ServiceDesc>
          </Halfli>
          <Halfli>
            <div>
              <img src={imgPool} />
            </div>
            <Type>스파 & 피트니스</Type>
            <ServiceName>호텔 수영장</ServiceName>
            <ServiceDesc>
              실내 수영장은 자동 필터링 시스템으로 최상의 수질을 관리하며, 풀사이드 베드와 버블제트 수중 마사지로 편안하고 여유로운 시간을 즐기실 수
              있습니다.
            </ServiceDesc>
          </Halfli>
          <Halfli>
            <div>
              <img src={imgMeeting} />
            </div>
            <Type>비즈니스</Type>
            <ServiceName>미팅룸</ServiceName>
            <ServiceDesc>8인실, 10인실의 회의실은 성공적인 비즈니스에 최적의 공간입니다.</ServiceDesc>
          </Halfli>
        </WrapHalf>
      </Container>
    </>
  );
};

export default Facilities;
