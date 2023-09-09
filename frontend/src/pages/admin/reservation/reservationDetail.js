import React from "react";
import { styled } from "styled-components";
import { commonContainerStyle} from '../../../components/common/commonStyles';
import AdminHeader from "../../../components/admin/AdminHeader";
import { Left } from "../../ReservationPage";

const Container = styled.div`
  ${commonContainerStyle}
  margin: 0;
  height : 100vh;
  margin-bottom : -220px;
`;

const FirstArticle = styled.div`
  flex-direction: column;
  width : 20%;
  height : 100%;
  border-right : solid 1px;
  padding-top : 3em;
  padding-left : 2em;
  float : left;
`;

const SecondArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left : 5em;
`;

const ThirdArticle = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  padding-left : 5em;
`;

const TableHeaderInfo = styled.div`
  display: flex;
  width: 1180px;
  padding-bottom : 1em;
  justify-content : space-between;
`

const TableDL = styled.dl`
  display: table;
  display: flex;
  flex-direction : row;
  width : 100%;
  border : 1px solid;
`;

const TableDLDD = styled.dd`
  display: table-cell;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
  text-align: center;
  padding : 1em;
`;

const TableDLDT = styled.dt`
  display: table-cell;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  text-align: center;
  background-color : gray;
  width : 200px;
  padding : 1em;
`;

const ReservationDetail = () => {
  return (
    <>
      <AdminHeader />
      <Container>
      <FirstArticle>
        <h2
          style={{
            fontSize: "1.5em",
            fontStyle:"bold",
          }}
        >에약 관리</h2>
        <p
          style={{
            marginTop : "1em",
            color: "#baa085",
          }}
        >예약 관리</p>
      </FirstArticle>
      
      <SecondArticle>
      <h1
        style={{
          fontSize : "2em",
          fontStyle : "bold",
          paddingTop : "2em",
        }}
      >예약 상세</h1>
      </SecondArticle>
      <ThirdArticle>
        <TableHeaderInfo>
          <span
            style={{
            }}
          >전체 0건</span>
        </TableHeaderInfo>
          <div style={{
            display:"flex",
            width : "1180px",
            flexDirection : "column",
          }}>
          <TableDL>
            <TableDLDT>
              예약 번호
            </TableDLDT>
            <TableDLDD>
              1
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              에약일
            </TableDLDT>
            <TableDLDD>
                2
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              체크인
            </TableDLDT>
            <TableDLDD>
                3
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              체크아웃
            </TableDLDT>
            <TableDLDD>
              4
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              예약 상품
            </TableDLDT>
            <TableDLDD>
                5
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              예약자 명
            </TableDLDT>
            <TableDLDD>
                6
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
               연락처
            </TableDLDT>
            <TableDLDD>
                7
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              이메일
            </TableDLDT>
            <TableDLDD>
                8
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              요청사항
            </TableDLDT>
            <TableDLDD>
                9
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              적용 쿠폰
            </TableDLDT>
            <TableDLDD>
                10
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              적용 상품권
            </TableDLDT>
            <TableDLDD>
                11
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              결제 금액
            </TableDLDT>
            <TableDLDD>
                12
            </TableDLDD>
          </TableDL>
          <div style={{
            margin : "2em",
            marginLeft : '600px'
          }}>
            <button 
              style={{
              width : "100px",
              height : "40px",
              backgroundColor : "white",
              border : "solid 1px black",
              marginRight : "16px",
            }}
            >수정</button>
            <button
            style={{
              width : "100px",
              height : "40px",
              color : "red",
              backgroundColor : "white",
              border : "solid 1px red",
            }}>예약취소</button>
          </div>
        </div>
      </ThirdArticle>
      </Container>
    </>
  );
};

export default ReservationDetail;
