import React from 'react';
import { styled } from 'styled-components';
import { NavLink, useLocation, useParams } from 'react-router-dom';
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
                <p className="title">제목입니다.</p>
                {(() => {
                  if (board != 'notice') {
                    return (
                      <p>
                        <span>작성자명</span>
                        <span>2023-09-13</span>
                      </p>
                    );
                  }
                })()}
              </td>
            </tr>
            <tr className="contents">
              <td>내용입니다.</td>
            </tr>
          </TableRead>
          <BtnWrapper className="center mt40">
            <LinkBtn to={`/board/` + board}>목록</LinkBtn>
          </BtnWrapper>
        </div>
      </Container>
    </>
  );
};

export default BoardRead;
