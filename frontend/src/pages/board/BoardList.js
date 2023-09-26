import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom'; // Remove duplicate import
import { commonContainerStyle, PageTitle, BtnWrapper, LinkBtn } from '../../components/common/commonStyles';
import SubHeader from '../../components/layout/SubHeader';
import Paging from '../../components/common/Paging';
import axios from 'axios';
import Instance from '../../utils/api/axiosInstance';

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
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    // board 값이 변경될 때마다 데이터를 다시 불러옴
    let boardTitle = '';
    if (board === 'notice') {
      boardTitle = '공지사항';
    } else if (board === 'qna') {
      boardTitle = '문의하기';
    } else if (board === 'review') {
      boardTitle = '이용후기';
    }
    if (boardTitle !== '') {
      axios.get(`/boards/find/boardTitle/${boardTitle}`).then((response) => {
        setBoard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      setImageUrl([]);
    }
  }, [board]);

  useEffect(() => {
    boards.map((board) => {
      GetImageUrl(board.boardId);
    })
  }, [boards])

  const GetImageUrl = (boardId) => {
    Instance.get(`/boards/image/${boardId}`, {
      responseType: 'arraybuffer'
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      });
      let image = { boardId: boardId, imageUrl: URL.createObjectURL(blob) };
      setImageUrl((prevImages) => [...prevImages, image]);
    });
  }

  console.log(imageUrl);

  let writeDate;
  let newMonth;
  boards.map((Item) => {
    if (Item.boardWriteDate[1].length === 1) {
      newMonth = '0' + Item.boardWriteDate[1];
    } else {
      newMonth = Item.boardWriteDate[1];
    }
    writeDate = Item.boardWriteDate[0] + '.' + newMonth + '.' + Item.boardWriteDate[2];
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
                              {boards.map((item) => (
                                <li key={item.boardId}>
                                  <div className="thumbnail">
                                    <a href={`/board/${item.boardTitle}/detail/${item.title}?boardId=${item.boardId}`}>
                                    {imageUrl.find((image) => image.boardId === item.boardId) && (
                                        <img
                                          src={imageUrl.find((image) => image.boardId === item.boardId).imageUrl}
                                          alt={`Image for ${item.title}`}
                                        />
                                      )}
                                    </a>
                                  </div>
                                  <p className="title">
                                    <a href={`/board/${item.boardTitle}/detail/${item.title}?boardId=${item.boardId}`}>{item.title}</a>
                                  </p>
                                  <p className="writer">{item.boardWriter}</p>
                                  <p className="date">{`${item.boardWriteDate[0]}.${(item.boardWriteDate[1] < 10 ? '0' : '')}${item.boardWriteDate[1]}.${(item.boardWriteDate[2] < 10 ? '0' : '')}${item.boardWriteDate[2]}`}</p>
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
                                    {boards.map((item, index) => (
                                        <tr key={item.boardId}>
                                          <td className="center">{index + 1}</td>
                                          <td>
                                            <a href={`/board/${item.boardTitle}/detail/${item.title}?boardId=${item.boardId}`}>{item.title}</a>
                                          </td>
                                          <td className="center">{`${item.boardWriteDate[0]}.${(item.boardWriteDate[1] < 10 ? '0' : '')}${item.boardWriteDate[1]}.${(item.boardWriteDate[2] < 10 ? '0' : '')}${item.boardWriteDate[2]}`}</td>
                                        </tr>
                                    ))}
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
