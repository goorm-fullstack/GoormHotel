import React from 'react';
import Header from '../components/Header';
import { styled } from 'styled-components';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { commonContainerStyle } from '../components/common/commonStyles';
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

const IsReply = styled.span`
  display: inline-block;
  background: #baa085;
  color: white;
  font-size: 0.75rem;
  padding: 0 7px;
  border-radius: 8px;
  height: 1.4rem;
  line-height: 1.31rem;
  margin-right: 10px;
  vertical-align: middle;
`;

const BoardList = styled.table`
  width: 100%;
  border-bottom: 1px solid #21201e;

  th {
    border-top: 1px solid #21201e;
    border-bottom: 1px solid #ddd;
    font-weight: 500;
    background: #f7f7f7;
    color: #21201e;
  }
  th,
  td {
    padding: 20px 12px;
  }
  td {
    border-top: 1px solid #eee;
    color: #666;
  }
  td.center {
    text-align: center;
  }
  td a:hover {
    color: #baa085;
  }
`;

const BoardGallery = styled.ul``;

const CustomerSupport = () => {
  const board = useParams().board;
  return (
    <>
      <Header />
      <AboutHeader>
        <AboutHeaderTitle>고객지원</AboutHeaderTitle>
        <LinkWrapper>
          <AboutLink to="/customerSupport/notice" activeClassName="active">
            공지사항
          </AboutLink>
          <AboutLink to="/customerSupport/qna" activeClassName="active">
            문의하기
          </AboutLink>
          <AboutLink to="/customerSupport/review" activeClassName="active">
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
          {(() => {
            if (board === 'review') {
              return (
                <BoardGallery>
                  <li>
                    <div></div>
                    <p></p>
                    <p></p>
                  </li>
                </BoardGallery>
              );
            } else {
              return (
                <BoardList>
                  <thead>
                    <tr>
                      <th width="110px">번호</th>
                      <th>제목</th>
                      <th width="180px">등록일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="center">2</td>
                      <td>
                        <a href="#">일반 글 제목입니다.</a>
                      </td>
                      <td className="center">2023-09-13</td>
                    </tr>
                    <tr>
                      <td className="center">1</td>
                      <td>
                        <IsReply>답글</IsReply>
                        <a href="#">답글 제목입니다.</a>
                      </td>
                      <td className="center">2023-09-13</td>
                    </tr>
                  </tbody>
                </BoardList>
              );
            }
          })()}
        </div>
      </Container>
    </>
  );
};

export default CustomerSupport;
