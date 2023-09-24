import React, {useEffect, useState} from 'react';
import { styled } from 'styled-components';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { commonContainerStyle } from '../../components/common/commonStyles';
import queryStirng from 'query-string';
import axios from "axios";

const Title = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: rgb(17, 17, 17);
  margin-bottom: 100px;
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
import { commonContainerStyle, PageTitle, BtnWrapper, LinkBtn } from '../../components/common/commonStyles';
import SubHeader from '../../components/layout/SubHeader';

export const Container = styled(commonContainerStyle)``;

const TableRead = styled.table`
  border-bottom: 1px solid ${(props) => props.theme.colors.charcoal};
  width: 100%;

  th {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    font-weight: 500;
    background: ${(props) => props.theme.colors.graybg};
    color: ${(props) => props.theme.colors.charcoal};
    vertical-align: top;
  }
  th,
  td {
    padding: 40px;
  }
  td {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    color: ${(props) => props.theme.colors.graydark};
  }
  .contents textarea {
    width: 100%;
    min-height: 300px;
    resize: none;
    border: 0;
  }
  tr:first-child th,
  tr:first-child td {
    border-top-color: ${(props) => props.theme.colors.charcoal};
  }
  input {
    height: 36px;
  }
  input[type='file'] {
    padding: 0;
    border: 0;
  }
  input.title {
    width: 80%;
  }
  td.titlew p {
    font-size: ${(props) => props.theme.font.sizes};
  }
  td.titlew p span {
    margin-right: 8px;
    color: ${(props) => props.theme.colors.graylight};
  }
  td.titlew .title {
    font-size: ${(props) => props.theme.font.sizesl};
    color: ${(props) => props.theme.colors.charcoal};
    margin-bottom: 14px;
  }
  td.titlew {
    background: ${(props) => props.theme.colors.graybg};
  }
`;

const BoardRead = () => {
  const board = useParams().board;
  return (
    <>
      <SubHeader kind="board" />
      <Container>
        {(() => {
          switch (board) {
            case 'notice':
              return <PageTitle>공지사항</PageTitle>;
            case 'qna':
              return <PageTitle>문의하기</PageTitle>;
            case 'review':
              return <PageTitle>이용후기</PageTitle>;
            default:
              return <PageTitle>고객지원</PageTitle>;
          }
        })()}
        <div>
          <TableRead>
            <tr>
              <td className="titlew">
                {/* 수정된 부분: boardData가 null인 경우에 대비하여 조건부 렌더링 */}
                <p className="title">{boardData ? boardData.title : ''}</p>
                {(() => {
                  // board가 'notice'가 아니고 boardData가 존재하는 경우에만 렌더링
                  if (board !== 'notice' && boardData) {
                    return (
                        <p>
                          <span>{boardData.boardWriter}</span>
                          <span>{`${boardData.boardWriteDate[0]}-${(boardData.boardWriteDate[1] < 10 ? '0' : '')}${boardData.boardWriteDate[1]}-${(boardData.boardWriteDate[2] < 10 ? '0' : '')}${boardData.boardWriteDate[2]}`}</span>
                        </p>
                    );
                  }
                })()}
              </td>
            </tr>
            <tr className="contents">
              <td>{boardData && boardData.boardContent ? boardData.boardContent : ''}</td>
            </tr>
          </TableRead>
          <BtnWrapper className="center mt40">
            <LinkBtn to={listlink}>목록</LinkBtn>
          </BtnWrapper>
        </div>
      </Container>
    </>
  );
};

export default BoardRead;
