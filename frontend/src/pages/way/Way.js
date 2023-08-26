import React from 'react'
import Header from '../../components/Header'
import { styled } from 'styled-components';
import KakaoMap from '../../utils/KakaoMap';
import ico_bus from '../../images/icon/ico_bus.png'
import ico_train from '../../images/icon/ico_train.png'

const FirstArticle = styled.article`
  position : fixed;
  position: relative;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondArticle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThirdArticle = styled.div`
  margin-top : 3em;
  display: flex;
  flex-direction: column;
  align-item : center;
  width : 100%;
  margin-left : 15%;
`;

const MapContainer = styled.div`
  display : flex;
  width : 100%;
  justify-content: center;
  align-items : center;
`;

const Table_DL = styled.dl`
  display: table;
  width: 100%;
`

const TableDL_DD = styled.dd`
  display: table-cell;
  height: 100px;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
  text-align: center;
  width : 75%;
`

const TableDL_DT = styled.dt`
  display: table-cell;
  height: 40px; 
  vertical-align: top;
  border-bottom: 1px solid #ccc;
  border-right : 1px solid #ccc;
  text-align: center;
  width : 25%;
`

const Way = () => {
  return (
    <>
      <Header />
      <FirstArticle>
        
      </FirstArticle>
      <SecondArticle>
          <h1 style={{
            fontWeight: 'bold',
            fontSize : "2em",
            marginLeft : "15%",
            marginBottom : "3em",
          }}>오시는 길</h1>
          <MapContainer>
            <KakaoMap width="1180px" height="480px"/>
          </MapContainer>
      </SecondArticle>
      <ThirdArticle>
        <h2 style={{
          fontSize : "16px",
          marginBottom : "1em",
        }}>대중교통 이용</h2>
        <div style={{
          display : "table",
          width : "1200px"
        }}>
          <div style={{
            borderTop : "1px solid"
          }}>
          <Table_DL>
            <TableDL_DT>
              <div style={{
                padding : "10px",
                display : "block",
                textAlign : "center",
                margin : "0 auto",
                width : "80px",
                height : "80px",
                borderRadius : "100%",
                backgroundColor : "gray",
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                top : "50%",
                left : "50%"
              }}>
                <img src={ico_train}
                style={{
                  height : "40px",
                  filter: "invert(1)"
              }}
              ></img>
              </div>
              <p>지하철 이용시</p>
              </TableDL_DT>
            <TableDL_DD>
              신분당선, 경강선 판교역 4번 출구 하차 후 도보 30분 이내
              </TableDL_DD>

          </Table_DL>
          <Table_DL>
          <TableDL_DT>
          <div style={{
                display : "block",
                textAlign : "center",
                margin : "0 auto",
                width : "80px",
                height : "80px",
                borderRadius : "100%",
                backgroundColor : "gray",
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                top : "50%",
                left : "50%"
              }}>
                <img src={ico_bus}
                style={{
                  height : "40px",
                  filter: "invert(1)"
              }}></img>
                </div>
                <p>버스 이용시</p>
            </TableDL_DT>
            <TableDL_DD>
              <div style={{
                width : "100%",
              }}>
              <ol>
                <li>삼평교 하차 : 5600, 1007-1, 1009, 55, P9302, P9301</li>
                <li>판교PDCC, NS홈쇼핑 하차 : 315. 602-1A</li>
                <li>이노밸리, 포스코DX 하차 : 75, 9007, 73</li>
                <li>판교세븐번처밸리 하차 : 380</li>
                <li>SK플래닛, 판교디지털센터 하차 : 602-2B</li>
              </ol>
              </div>
            </TableDL_DD>
          </Table_DL>
          </div>
        </div>
      </ThirdArticle>
    </>
  )
}

export default Way;