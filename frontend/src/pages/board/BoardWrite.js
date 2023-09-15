import React from 'react';
import Header from '../../components/Header';
import { styled } from 'styled-components';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { commonContainerStyle } from '../../components/common/commonStyles';
import queryStirng from 'query-string';

export const Container = styled.div`
  ${commonContainerStyle}
`;

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

const AboutHeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  width: 235px;
`;

const LinkWrapper = styled.div`
  & > a:not(:last-child) {
    margin-right: 40px;
  }
`;

const AboutLink = styled(NavLink)`
  font-size: 15px;
  color: #666;

  &:hover {
    color: #baa085;
  }

  &.active {
    color: #baa085;
  }
`;

const TableWrite = styled.table`
  border-bottom: 1px solid #21201e;
  width: 100%;

  th {
    border-top: 1px solid #eee;
    font-weight: 500;
    background: #f7f7f7;
    color: #21201e;
    vertical-align: top;
  }
  th,
  td {
    padding: 20px 12px;
  }
  td {
    border-top: 1px solid #eee;
    color: #666;
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
    border-top-color: #21201e;
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

const ButtonWrap = styled.div`
  margin: 40px 0 0;
  text-align: center;

  button[type='submit'] {
    background: #baa085;
    color: white;
    display: inline-block;
    width: 160px;
    height: 45px;
    margin: 0 5px;
    vertical-align: middle;
  }
  button[type='submit']:hover {
    background: #8a7057;
  }
  a {
    border: 1px solid #baa085;
    color: #baa085;
    display: inline-block;
    width: 160px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    vertical-align: middle;
    margin: 0 5px;
  }
  a:hover {
    background: #baa085;
    color: white;
  }
`;

const BoardWrite = () => {
  const board = useParams().board;
  return (
    <>
      <Header />
      <AboutHeader>
        <AboutHeaderTitle>고객지원</AboutHeaderTitle>
        <LinkWrapper>
          <AboutLink to="/board/notice" activeClassName="active">
            공지사항
          </AboutLink>
          <AboutLink to="/board/qna" activeClassName="active">
            문의하기
          </AboutLink>
          <AboutLink to="/board/review" activeClassName="active">
            이용후기
          </AboutLink>
        </LinkWrapper>
      </AboutHeader>
      <Container>
        {(() => {
          switch (board) {
            case 'notice':
              return <Title>공지사항</Title>;
            case 'qna':
              return <Title>문의하기</Title>;
            case 'review':
              return <Title>이용후기</Title>;
            default:
              return <Title>고객지원</Title>;
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
              <td colSpan="2">
                <textarea>에디터 연결? 일단은 textarea입니다.</textarea>
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
          <ButtonWrap>
            <button type="submit">등록하기</button>
            <a href={`/board/` + board}>취소</a>
          </ButtonWrap>
        </div>
      </Container>
    </>
  );
};

export default BoardWrite;
