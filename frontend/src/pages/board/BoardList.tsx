import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom'; // Remove duplicate import
import { commonContainerStyle, PageTitle, BtnWrapper, LinkBtn, commonTable } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import Paging from '../../components/common/Paging/Paging';
import axios from 'axios';
import Instance from '../../utils/api/axiosInstance';
import Search from '../../components/common/Search/Search';

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
    height: 240px;
    margin-bottom: 16px;

    img {
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      object-fit: cover;
    }
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

const Table = styled(commonTable)``;

const CustomerSupport = () => {
  const board = useParams().board;
  const [boards, setBoard] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);

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
      axios
        .get(`/boards/find/boardTitle/${boardTitle}`)
        .then((response) => {
          setBoard(response.data || []);
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
    });
  }, [boards]);

  const GetImageUrl = (boardId: number) => {
    Instance.get(`/boards/image/${boardId}`, {
      responseType: 'arraybuffer',
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      let image = { boardId: boardId, imageUrl: URL.createObjectURL(blob) };
      setImageUrl((prevImages) => [...prevImages, image]);
    });
  };

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
            if (board !== 'notice') {
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
                  {boards.length === 0 && (
                    <li className="empty">
                      <p>작성된 게시글이 없습니다.</p>
                    </li>
                  )}
                  {boards.map((item) => (
                    <li key={item.boardId}>
                      <div className="thumbnail">
                        <a href={`/board/${board}/detail/${item.title}?boardId=${item.boardId}`}>
                          {imageUrl.find((image) => image.boardId === item.boardId) && (
                            <img src={imageUrl.find((image) => image.boardId === item.boardId).imageUrl} alt={`Image for ${item.title}`} />
                          )}
                        </a>
                      </div>
                      <p className="title">
                        <a href={`/board/${board}/detail/${item.title}?boardId=${item.boardId}`}>{item.title}</a>
                      </p>
                      <p className="writer">{item.boardWriter}</p>
                      <p className="date">{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${item.boardWriteDate[1]}.${
                        item.boardWriteDate[2] < 10 ? '0' : ''
                      }${item.boardWriteDate[2]}`}</p>
                    </li>
                  ))}
                  {/** // loop */}
                </BoardGallery>
              );
            } else {
              return (
                <Table className="userpage">
                  <colgroup>
                    <col width="110px" />
                    <col width="180px" />
                    <col width="auto" />
                    <col width="180px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>카테고리</th>
                      <th>제목</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boards.length === 0 && (
                      <td colSpan={7} className="center">
                        작성된 게시글이 없습니다.
                      </td>
                    )}
                    {/** loop */}
                    {boards.map((item, index) => (
                      <tr key={item.boardId}>
                        <td className="center">{index + 1}</td>
                        <td className="center">{item.category}</td>
                        <td>
                          {/* <IsReply>답글</IsReply> */}
                          {/** 답글 여부에 따라 보이거나 안 보이게 처리 */}
                          <a href={`/board/${board}/detail/${item.title}?boardId=${item.boardId}`}>{item.title}</a>
                        </td>
                        <td className="center">{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${item.boardWriteDate[1]}.${
                          item.boardWriteDate[2] < 10 ? '0' : ''
                        }${item.boardWriteDate[2]}`}</td>
                      </tr>
                    ))}
                    {/** // loop */}
                  </tbody>
                </Table>
              );
            }
          })()}
        </div>
        <Paging totalPage={totalPages} />
      </Container>
    </>
  );
};

export default CustomerSupport;