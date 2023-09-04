import React from "react";
import Header from "../../components/Header";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import KakaoMap from "../../utils/KakaoMap";
import ico_bus from "../../images/icon/ico_bus.png";
import ico_train from "../../images/icon/ico_train.png";
import { commonContainerStyle} from '../../components/common/commonStyles';

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
  z-index: 10;
`;

const AboutHeaderTitle = styled.h1`
  margin-left: 70px;
  font-size: 18px;
  font-weight: bold;
`;

const LinkWrapper = styled.div`
  float: left;
  margin-left: 107px;

  & > a:not(:last-child) {
    margin-right: 40px;
  }
`;

const AboutLink = styled(NavLink)`
  font-size: 14px;
  color: #888888;

  &.active {
    color: #baa085;
  }
`;

const Title = styled.h1`
  color: #111111;
  font-weight: bold;
  font-size: 36px;
  margin: 160px 0 160px 370px;
`;

const FirstArticle = styled.article`
  position: fixed;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondArticle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const ThirdArticle = styled.div`
  margin-top: 3em;
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
  height: 100px;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
  text-align: center;
  width: 75%;
`;

const TableDLDT = styled.dt`
  display: table-cell;
  height: 40px;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  text-align: center;
  width: 25%;
  padding: 2em;
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
      <FirstArticle></FirstArticle>
      <SecondArticle>
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "2em",
            marginBottom: "3em",
          }}
        >
          오시는 길
        </h1>
        <MapContainer>
          <KakaoMap width="1180px" height="480px" />
        </MapContainer>
      </SecondArticle>
      <ThirdArticle>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "2em",
          }}
        >
          대중교통 이용시 오시는 길
        </h2>
        <div
          style={{
            display: "table",
            width: "1180px",
          }}
        >
          <div
            style={{
              borderTop: "1px solid",
            }}
          >
            <TableDL>
              <TableDLDT>
                <div
                  style={{
                    // display : "block",
                    padding: "10px",
                    textAlign: "center",
                    margin: "0 auto",
                    width: "80px",
                    height: "80px",
                    borderRadius: "100%",
                    backgroundColor: "gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={ico_train}
                    alt="기차"
                    style={{
                      height: "40px",
                      filter: "invert(1)",
                    }}
                  ></img>
                </div>
                <p
                  style={{
                    paddingTop: "1em",
                  }}
                >
                  지하철 이용시
                </p>
              </TableDLDT>
              <TableDLDD>
                신분당선, 경강선 판교역 4번 출구 하차 후 도보 30분 이내
              </TableDLDD>
            </TableDL>
            <TableDL>
              <TableDLDT>
                <div
                  style={{
                    // display : "block",
                    textAlign: "center",
                    margin: "0 auto",
                    width: "80px",
                    height: "80px",
                    borderRadius: "100%",
                    backgroundColor: "gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={ico_bus}
                    alt="버스"
                    style={{
                      height: "40px",
                      filter: "invert(1)",
                    }}
                  ></img>
                </div>
                <p
                  style={{
                    paddingTop: "1em",
                  }}
                >
                  버스 이용시
                </p>
              </TableDLDT>
              <TableDLDD>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <ol>
                    <li>삼평교 하차 : 5600, 1007-1, 1009, 55, P9302, P9301</li>
                    <li>판교PDCC, NS홈쇼핑 하차 : 315. 602-1A</li>
                    <li>이노밸리, 포스코DX 하차 : 75, 9007, 73</li>
                    <li>판교세븐번처밸리 하차 : 380</li>
                    <li>SK플래닛, 판교디지털센터 하차 : 602-2B</li>
                  </ol>
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
