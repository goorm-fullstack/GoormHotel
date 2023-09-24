import React, {useEffect, useState} from 'react';
import { styled } from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { commonContainerStyle } from '../../components/common/commonStyles';
import axios from "axios";

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

const BoardGallery = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 20px;

  li {
    width: 380px;
    line-height: 1.4;
  }

  li .thumbnail {
    background: #f7f7f7;
    min-height: 240px;
    margin-bottom: 16px;
  }
  li .writer {
    margin: 6px 0 2px;
  }
  li .writer,
  li .date {
    font-size: 0.875rem;
    color: #888;
  }
`;

const PageParam = styled.ul`
  text-align: center;
  margin-top: 50px;

  li {
    display: inline-block;
    margin: 0 2px;
  }
  li a {
    display: inline-block;
    padding: 0 8px;
    border-radius: 100%;
    height: 1.6rem;
    line-height: 1.3rem;
    color: #666;
  }
  li.selected a {
    color: #baa085;
    text-decoration: underline;
  }
  li a:hover {
    text-decoration: underline;
  }
  li.sideParam {
    margin: 0 8px;
  }
  li.sideParam a {
    border: 1px solid #baa085;
    color: #baa085;
  }
  li.sideParam a:hover {
    text-decoration: none;
  }
`;

const WriteBtn = styled.div`
  text-align: right;
  margin-top: -60px;
  margin-bottom: 20px;

  a {
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #95846e;
    color: #95846e;
    text-align: center;
    font-size: 0.9375rem;
  }
  a:hover {
    background: #95846e;
    color: white;
  }
`;

const CustomerSupport = () => {
  const board = useParams().board;
  const [boards, setBoard] = useState([]);
  const [boardImages, setBoardImages] = useState([]); // 추가: boardImages 상태 추가

  useEffect(() => {
    let boardTitle = '';
    if (board === 'notice') {
      boardTitle = '공지사항';
    } else if (board === 'qna') {
      boardTitle = '문의하기';
    } else if (board === 'review') {
      boardTitle = '이용후기';
    }
    if (boardTitle !== '') {
      // 게시물 정보 가져오기
      axios.get(`/boards/find/boardTitle/${boardTitle}`).then((response) => {
        setBoard(response.data);
        console.log('게시물 정보 get 성공');
      });

      // 이미지 정보 가져오기
      // axios.get('/board_image').then((response) => {
      //   setBoardImages(response.data);
      //   console.log('이미지 정보 get 성공');
      // });
    }
  }, [board]);

  console.log(boards);

  let writeDate;
  let newMonth;
  boards.map((Item) => {
    if (Item.boardWriteDate[1].length === 1) {
      newMonth = "0" + Item.boardWriteDate[1];
    } else {
      newMonth = Item.boardWriteDate[1];
    }
    writeDate = Item.boardWriteDate[0] + "-" + newMonth + "-" + Item.boardWriteDate[2];
  });

  return (
      <>
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
            {(() => {
              if (board != 'notice') {
                return (
                    <WriteBtn>
                      <a href={board + `/write`}>작성하기</a>
                    </WriteBtn>
                );
              }
            })()}
            {(() => {
              if (board === 'review') {
                return (
                    <BoardGallery>
                      {/** loop */}
                      {boards.map((board) => (
                          <li>
                            <div className="thumbnail">
                              <a href={`/board/${board.id}/detail`}>
                                <img src="#"/>
                              </a>
                            </div>
                            <p className="title">
                              <a href={`/board/` + board.boardId + `/detail`}>{board.title}</a>
                            </p>
                            <p className="writer">{board.boardWriter}</p>
                            <p className="date">{`${board.boardWriteDate[0]}-${(board.boardWriteDate[1] < 10 ? '0' : '')}${board.boardWriteDate[1]}-${(board.boardWriteDate[2] < 10 ? '0' : '')}${board.boardWriteDate[2]}`}</p>
                          </li>
                      ))}
                      {/** // loop */}
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
                      {/** loop */}
                      {boards.map((board) => (
                          <tr key={board.boardId}>
                            <td className="center">{board.boardId}</td>
                            <td>
                              <a href={`/board/${board.boardId}/detail`}>{board.title}</a>
                            </td>
                            <td className="center">{`${board.boardWriteDate[0]}-${(board.boardWriteDate[1] < 10 ? '0' : '')}${board.boardWriteDate[1]}-${(board.boardWriteDate[2] < 10 ? '0' : '')}${board.boardWriteDate[2]}`}</td>
                          </tr>
                      ))}
                      <tr>
                        <td className="center">2</td>
                        <td>
                          <a href={`/board/` + board + `/detail`}>일반 글 제목입니다.</a>
                        </td>
                        <td className="center">2023-09-13</td>
                      </tr>
                      <tr>
                        <td className="center">1</td>
                        <td>
                          <IsReply>답글</IsReply>
                          <a href={`/board/` + board + `/detail`}>답글 제목입니다.</a>
                        </td>
                        <td className="center">2023-09-13</td>
                      </tr>
                      {/** // loop */}
                      </tbody>
                    </BoardList>
                );
              }
            })()}
          </div>

          <PageParam>
            <li className="sideParam">
              <a href="#">«</a>
            </li>
            {/** loop */}
            <li>
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">4</a>
            </li>
            <li className="selected">
              <a href="#">5</a>
            </li>
            <li>
              <a href="#">6</a>
            </li>
            <li>
              <a href="#">7</a>
            </li>
            <li>
              <a href="#">8</a>
            </li>
            <li>
              <a href="#">9</a>
            </li>
            <li>
              <a href="#">10</a>
            </li>
            {/** // loop */}
            <li className="sideParam">
              <a href="#">»</a>
            </li>
          </PageParam>
        </Container>
      </>
  );
};

export default CustomerSupport;
