import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom'; // Remove duplicate import
import { commonContainerStyle, PageTitle, BtnWrapper, LinkBtn } from '../../components/common/commonStyles';
import SubHeader from '../../components/layout/SubHeader';
import Paging from '../../components/common/Paging';
import axios from "axios";

export const Container = styled(commonContainerStyle)``;

const IsReply = styled.span`
  display: inline-block;
  background: ${(props) => props.theme.colors.gold};
  color: white;
  font-size: ${(props) => props.theme.font.sizexxxs};
  padding: 0 7px;
  border-radius: 8px;
  height: 14px;
  line-height: 14px;
  margin-right: 10px;
  vertical-align: middle;
`;

export const BoardList = styled.table`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.charcoal};

  th {
    border-top: 1px solid ${(props) => props.theme.colors.charcoal};
    border-bottom: 1px solid ${(props) => props.theme.colors.grayborder};
    font-weight: 500;
    background: ${(props) => props.theme.colors.graybg};
    color: ${(props) => props.theme.colors.charcoal};
  }
  th,
  td {
    padding: 21.5px 12px;
  }
  td {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    color: ${(props) => props.theme.colors.blacklight};
  }
  td.center {
    text-align: center;
  }
  td a:hover {
    color: ${(props) => props.theme.colors.goldhover};
  }

  .textover {
    width: 100%;
    max-width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
    background: ${(props) => props.theme.colors.graybg};
    min-height: 240px;
    margin-bottom: 16px;
  }
  li .writer {
    margin: 6px 0 2px;
  }
  li .writer,
  li .date {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graylight};
  }
`;

const WriteBtnWrapper = styled(BtnWrapper)`
  margin-top: -70px;
  margin-bottom: 20px;
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
      // axios.get(`/boards/image/${board.boardId}`).then((response) => {
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
                    {(() => {
                        if (board != 'notice') {
                          return (
                              <WriteBtnWrapper className="right">
                                <LinkBtn to={`/board/` + board + `/write`}>작성하기</LinkBtn>
                              </WriteBtnWrapper>
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
                            <li>
                              <div className="thumbnail">
                                <a href={`/board/` + board + `/detail`}>
                                  <img src="#" />
                                </a>
                              </div>
                              <p className="title textover">
                                <a href={`/board/` + board + `/detail`}>제목입니다.</a>
                              </p>
                              <p className="writer">작성자명</p>
                              <p className="date">2023-09-13</p>
                            </li>
                            <li>
                              <div className="thumbnail">
                                <a href={`/board/` + board + `/detail`}>
                                  <img src="" />
                                </a>
                              </div>
                              <p className="title textover">
                                <a href={`/board/` + board + `/detail`}>제목입니다.</a>
                              </p>
                              <p className="writer">작성자명</p>
                              <p className="date">2023-09-13</p>
                            </li>
                            <li>
                              <div className="thumbnail">
                                <a href={`/board/` + board + `/detail`}>
                                  <img src="" />
                                </a>
                              </div>
                              <p className="title textover">
                                <a href={`/board/` + board + `/detail`}>제목입니다.</a>
                              </p>
                              <p className="writer">작성자명</p>
                              <p className="date">2023-09-13</p>
                            </li>
                            <li>
                              <div className="thumbnail">
                                <a href={`/board/` + board + `/detail`}>
                                  <img src="" />
                                </a>
                              </div>
                              <p className="title textover">
                                <a href={`/board/` + board + `/detail`}>제목입니다.</a>
                              </p>
                              <p className="writer">작성자명</p>
                              <p className="date">2023-09-13</p>
                            </li>
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
                <Paging />
            </Container>
        </>
    );
};

export default CustomerSupport;
