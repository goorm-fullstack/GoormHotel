import React from 'react';
import Header from '../../components/Header';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import KakaoMap from '../../utils/KakaoMap';
import ico_bus from '../../images/icon/ico_bus.png';
import ico_train from '../../images/icon/ico_train.png';
import { commonContainerStyle } from '../../components/common/commonStyles';

const Container = styled.div`
  ${commonContainerStyle}
`;

const AboutHeader = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 99;
  padding: 0 40px;
  top: 120px;
  min-width: 1260px;
`;

const AboutHeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const LinkWrapper = styled.div`
  margin-left: 130px;
  
  & > a:not(:last-child) {
    margin-right: 40px;
  }
`;

const AboutLink = styled(NavLink)`
  font-size: 14px;
  color: #666;

  &:hover {
    color: #baa085;
  }

  &.active {
    color: #baa085;
  }
`;

const SecondArticle = styled.div`
  width: 100%;
`;

const ThirdArticle = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MapContainer = styled.div``;

const TableDL = styled.dl`
  display: table;
  width: 1180px;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
`;

const TableDLDD = styled.dd`
  display: table-cell;
  vertical-align: middle;
  border-bottom: 1px solid #ddd;
  text-align: left;
  width: 75%;
  padding: 40px;
  color: #666;
  line-height: 1.8;
`;

const TableDLDT = styled.dt`
  display: table-cell;
  height: 40px;
  vertical-align: top;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  width: 25%;
  padding: 40px;
`;

const Way = () => {
  return (
    <>
      <Header />
      <AboutHeader>
        <AboutHeaderTitle>구름호텔 소개</AboutHeaderTitle>
        <LinkWrapper>
          <AboutLink to="/about" $activeClassName="active">
            호텔소개
          </AboutLink>
          <AboutLink to="/location" $activeClassName="active">
            오시는길
          </AboutLink>
        </LinkWrapper>
      </AboutHeader>
      <Container>
        <SecondArticle>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: '2.25rem',
              marginBottom: '100px',
            }}>
            오시는 길
          </h2>
          <MapContainer>
            <KakaoMap width="1180px" height="480px" />
          </MapContainer>
        </SecondArticle>
        <ThirdArticle>
          <h3
            style={{
              fontSize: '1.375rem',
              marginBottom: '2em',
              fontWeight: 'normal',
            }}>
            대중교통 이용시 오시는 길
          </h3>
          <div
            style={{
              display: 'table',
              width: '1180px',
            }}>
            <div
              style={{
                borderTop: '1px solid #21201e',
              }}>
              <TableDL>
                <TableDLDT>
                  <div
                    style={{
                      // display : "block",
                      padding: '10px',
                      textAlign: 'center',
                      margin: '0 auto',
                      width: '100px',
                      height: '100px',
                      borderRadius: '100%',
                      backgroundColor: '#ccc',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <img
                      src={ico_train}
                      alt="기차"
                      style={{
                        height: '60px',
                        filter: 'invert(1)',
                      }}></img>
                  </div>
                  <p
                    style={{
                      paddingTop: '20px',
                      fontSize: '1.125rem',
                    }}>
                    지하철 이용시
                  </p>
                </TableDLDT>
                <TableDLDD>신분당선, 경강선 판교역 4번 출구 하차 후 도보 30분 이내</TableDLDD>
              </TableDL>
              <TableDL>
                <TableDLDT>
                  <div
                    style={{
                      // display : "block",
                      textAlign: 'center',
                      margin: '0 auto',
                      width: '100px',
                      height: '100px',
                      borderRadius: '100%',
                      backgroundColor: '#ccc',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <img
                      src={ico_bus}
                      alt="버스"
                      style={{
                        height: '60px',
                        filter: 'invert(1)',
                      }}></img>
                  </div>
                  <p
                    style={{
                      paddingTop: '20px',
                      fontSize: '1.125rem',
                    }}>
                    버스 이용시
                  </p>
                </TableDLDT>
                <TableDLDD>
                  <div
                    style={{
                      width: '100%',
                    }}>
                    <ul>
                      <li>•&nbsp;&nbsp;삼평교 하차 : 5600, 1007-1, 1009, 55, P9302, P9301 등</li>
                      <li>•&nbsp;&nbsp;판교PDCC, NS홈쇼핑 하차 : 315. 602-1A</li>
                      <li>•&nbsp;&nbsp;이노밸리, 포스코DX 하차 : 75, 9007, 73</li>
                      <li>•&nbsp;&nbsp;판교세븐번처밸리 하차 : 380</li>
                      <li>•&nbsp;&nbsp;SK플래닛, 판교디지털센터 하차 : 602-2B</li>
                    </ul>
                  </div>
                </TableDLDD>
              </TableDL>
            </div>
          </div>
        </ThirdArticle>
      </Container>
    </>
  );
};

export default Way;
