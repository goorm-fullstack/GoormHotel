import React from 'react';
import { styled } from 'styled-components';
import { PageTitle, ContentsTitleSmall, commonContainerStyle } from '../../components/common/commonStyles';
import SubHeader from '../../components/layout/SubHeader';
import KakaoMap from '../../utils/KakaoMap';
import ico_bus from '../../images/icon/ico_bus.png';
import ico_train from '../../images/icon/ico_train.png';

const Container = styled(commonContainerStyle)``;

const Table = styled.table`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.charcoal};

  th,
  td {
    border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
    padding: 40px 60px;
    vertical-align: middle;
  }

  th {
    width: 300px;
    font-size: ${(props) => props.theme.font.sizem};
  }

  td {
    border-left: 1px solid ${(props) => props.theme.colors.grayborder};
    color: ${(props) => props.theme.colors.graydark};
    line-height: 1.6;
  }
`;

const MapAddress = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  z-index: 10;
  font-size: ${(props) => props.theme.font.sizexs};
  padding: 20px 24px;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.blacklight};

  & > p {
    margin-bottom: 10px;
  }
`;

const MapWrapper = styled.div`
  position: relative;
  margin-bottom: 60px;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: ${(props) => props.theme.colors.goldhover};
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
`;

const IcoWrapper = styled.div`
  padding: 10px;
  text-align: center;
  margin: 0 auto 20px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 60px;
    filter: invert(1);
  }
`;

const Way = () => {
  return (
    <>
      <SubHeader kind="about" />
      <Container>
        <PageTitle>오시는 길</PageTitle>
        <MapWrapper>
          <KakaoMap width="1180px" height="480px" />
          <MapAddress>
            <p>위치 : 경기도 성남시 분당구 판교로 242 PDC A동 902호</p>
            <ContactInfo>
              <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h48v48H0z" fill="none" />
                <path d="M13.25 21.59c2.88 5.66 7.51 10.29 13.18 13.17l4.4-4.41c.55-.55 1.34-.71 2.03-.49C35.1 30.6 37.51 31 40 31c1.11 0 2 .89 2 2v7c0 1.11-.89 2-2 2C21.22 42 6 26.78 6 8c0-1.11.9-2 2-2h7c1.11 0 2 .89 2 2 0 2.49.4 4.9 1.14 7.14.22.69.06 1.48-.49 2.03l-4.4 4.42z" />
              </svg>
              <a href="tel:031-600-8586">031-600-8586</a>
            </ContactInfo>
            <ContactInfo>
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g data-name="8-Email" id="_8-Email">
                  <path d="M45,7H3a3,3,0,0,0-3,3V38a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V10A3,3,0,0,0,45,7Zm-.64,2L24,24.74,3.64,9ZM2,37.59V10.26L17.41,22.17ZM3.41,39,19,23.41l4.38,3.39a1,1,0,0,0,1.22,0L29,23.41,44.59,39ZM46,37.59,30.59,22.17,46,10.26Z" />
                </g>
              </svg>
              <a href="mailto:contact@goorm.io">contact@goorm.io</a>
            </ContactInfo>
          </MapAddress>
        </MapWrapper>
        <section>
          <ContentsTitleSmall>대중교통 이용시 오시는 길</ContentsTitleSmall>
          <Table>
            <tr>
              <th>
                <IcoWrapper>
                  <img src={ico_train} alt="기차" />
                </IcoWrapper>
                지하철 이용시
              </th>
              <td>신분당선, 경강선 판교역 4번 출구 하차 후 도보 30분 이내</td>
            </tr>
            <tr>
              <th>
                <IcoWrapper>
                  <img src={ico_bus} alt="버스" />
                </IcoWrapper>
                버스 이용시
              </th>
              <td>
                <ul>
                  <li>•&nbsp;&nbsp;삼평교 하차 : 5600, 1007-1, 1009, 55, P9302, P9301 등</li>
                  <li>•&nbsp;&nbsp;판교PDCC, NS홈쇼핑 하차 : 315. 602-1A</li>
                  <li>•&nbsp;&nbsp;이노밸리, 포스코DX 하차 : 75, 9007, 73</li>
                  <li>•&nbsp;&nbsp;판교세븐번처밸리 하차 : 380</li>
                  <li>•&nbsp;&nbsp;SK플래닛, 판교디지털센터 하차 : 602-2B</li>
                </ul>
              </td>
            </tr>
          </Table>
        </section>
      </Container>
    </>
  );
};

export default Way;
