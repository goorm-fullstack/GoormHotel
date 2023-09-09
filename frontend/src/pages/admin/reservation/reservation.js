import React from "react";
import { styled } from "styled-components";
import { commonContainerStyle} from '../../../components/common/commonStyles';
import AdminHeader from "../../../components/admin/AdminHeader";

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
  flex-direction : column;
  width : 20%;
`;

const TableDLDD = styled.dd`
  display: table-cell;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
  text-align: center;
  padding : 2em;
`;

const TableDLDT = styled.dt`
  display: table-cell;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  text-align: center;
  padding: 2em;
  background-color : gray;
`;

const Reservation = () => {
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
      >예약 목록</h1>
      </SecondArticle>
      <ThirdArticle>
        <TableHeaderInfo>
          <span
            style={{
            }}
          >전체 0건</span>
          <div>
          <button 
            style={{
              width : "100px",
              height : "40px",
              backgroundColor : "white",
              border : "solid 1px black",
              marginRight : "16px",
            }}
          >재예약</button>
          <button
          style={{
            width : "100px",
            height : "40px",
            color : "red",
            backgroundColor : "white",
            border : "solid 1px red",
          }}>예약취소</button>
          </div>
        </TableHeaderInfo>
          <div style={{
            display:"flex",
            width : "1180px",
            flexDirection : "row",
          }}>
          <TableDL>
            <TableDLDT>
              No.
            </TableDLDT>
            <TableDLDD>
              1
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              예약 번호
            </TableDLDT>
            <TableDLDD>
                2
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              예약자명(회원 ID)
            </TableDLDT>
            <TableDLDD>
                3
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              체크인
            </TableDLDT>
            <TableDLDD>
              4
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              체크아웃
            </TableDLDT>
            <TableDLDD>
                5
            </TableDLDD>
          </TableDL>
          <TableDL>
            <TableDLDT>
              예약 상태
            </TableDLDT>
            <TableDLDD>
                6
            </TableDLDD>
          </TableDL>
          </div>
      </ThirdArticle>
      </Container>
    </>
  );
};

export default Reservation;
