import React from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { commonContainerStyle, PageTitle, BtnWrapper, LinkBtn, SubmitBtn } from '../../components/common/commonStyles';
import SubHeader from '../../components/layout/SubHeader';
import TextEditor from '../../components/common/TextEditor';

export const Container = styled(commonContainerStyle)``;

const TableWrite = styled.table`
  border-bottom: 1px solid ${(props) => props.theme.colors.charcoal};
  width: 100%;

  th {
    font-weight: 500;
    background: ${(props) => props.theme.colors.graybg};
    color: ${(props) => props.theme.colors.charcoal};
    vertical-align: top;
  }
  th,
  td {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    padding: 20px 12px;
  }
  td {
    color: ${(props) => props.theme.colors.graydark};
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .contents td {
    padding: 0;
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
`;

const BoardWrite = () => {
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
          <TableWrite>
            <tr>
              <th width="160px">제목</th>
              <td>
                <input type="text" className="title" />
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr className="contents">
              <td colSpan="2" className="writeWrapper">
                <TextEditor />
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td>
                <input type="file" />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <input type="password" />
              </td>
            </tr>
          </TableWrite>
          <BtnWrapper className="center double mt40">
            <SubmitBtn type="submit">등록하기</SubmitBtn>
            <LinkBtn to={`/board/` + board}>취소</LinkBtn>
          </BtnWrapper>
        </div>
      </Container>
    </>
  );
};

export default BoardWrite;
