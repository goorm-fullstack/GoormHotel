import React, { useEffect, useState } from 'react';
import * as S from './Style';
import { useParams } from 'react-router-dom'; // Remove duplicate import
import { PageTitle, LinkBtn } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import Paging from '../../components/common/Paging/Paging';
import axios from 'axios';
import Instance from '../../utils/api/axiosInstance';
import Search from '../../components/common/Search/Search';
import { Link } from 'react-router-dom';
import {IsReply} from "./Style";

const CustomerSupport = () => {
  const board = useParams().board;
  const [boards, setBoard] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);

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
          const totalPages = parseInt(response.headers['totalpages'], 10);
          const totalData = parseInt(response.headers['totaldata'], 10);
            setBoard(response.data);
            setTotalData(totalData);
          setTotalPages(totalPages);
        })
        .catch((error) => {
          console.error(error);
        });

      setImageUrl([]);
    }
  }, [board]);

  useEffect(() => {
    if (board === 'review') {
      boards.map((board) => {
        GetImageUrl(board.boardId);
      });
    }
  }, [boards]);

  const GetImageUrl = (boardId: number) => {
    Instance.get(`/boards/image/${boardId}`, {
      responseType: 'arraybuffer',
    })
      .then((response) => {
        if (response.status === 200) {
          const blob = new Blob([response.data], {
            type: response.headers['content-type'],
          });
          let image = { boardId: boardId, imageUrl: URL.createObjectURL(blob) };
          setImageUrl((prevImages) => [...prevImages, image]);
        } else if (response.status === 204) {
          console.log('해당 boardId가 없음 : ', boardId);
        } else {
          console.error('요청 에러 : ', response.status);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <SubHeader kind="board" />
      <S.Container>
        {(() => {
          switch (board) {
            case 'notice':
              return <PageTitle key="notice">공지사항</PageTitle>;
            case 'qna':
              return <PageTitle key="qna">문의하기</PageTitle>;
            case 'review':
              return <PageTitle key="review">이용후기</PageTitle>;
            default:
              return <PageTitle key="default">고객지원</PageTitle>;
          }
        })()}
        <div>
          {(() => {
            if (board !== 'notice') {
              return (
                <S.WriteBtnWrapper className="right">
                  <LinkBtn to={`/board/` + board + `/write`}>작성하기</LinkBtn>
                </S.WriteBtnWrapper>
              );
            }
          })()}
          {(() => {
            if (board === 'review') {
              return (
                <S.BoardGallery>
                  {/** loop */}
                  {boards.length === 0 && (
                    <li key="empty" className="empty">
                      <p>작성된 게시글이 없습니다.</p>
                    </li>
                  )}
                  {boards &&
                    boards.map((item) => (
                      <li key={item.boardId}>
                        <div className="thumbnail">
                          <Link to={`/board/${board}/detail/${item.boardId}`}>
                            {imageUrl.find((image) => image.boardId === item.boardId) && (
                              <img src={imageUrl.find((image) => image.boardId === item.boardId).imageUrl} alt={`Image for ${item.title}`} />
                            )}
                          </Link>
                        </div>
                        <p className="title">
                          <Link to={`/board/${board}/detail/${item.boardId}`}>{item.title}</Link>
                        </p>
                        <p className="writer">{item.boardWriter}</p>
                        <p className="date">{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${item.boardWriteDate[1]}.${
                          item.boardWriteDate[2] < 10 ? '0' : ''
                        }${item.boardWriteDate[2]}`}</p>
                      </li>
                    ))}
                  {/** // loop */}
                </S.BoardGallery>
              );
            } else {
              return (
                <S.Table className="userpage">
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
                      <tr key="no-data">
                        <td colSpan={7} className="center">
                          작성된 게시글이 없습니다.
                        </td>
                      </tr>
                    )}
                    {/** loop */}
                    {boards &&
                        boards.map((item, index) => (
                      <tr key={item.boardId}>
                        <td className="center">{totalData - index}</td>
                        <td className="center">{item.category}</td>
                        <td>
                          {/* <IsReply>답글</IsReply> */}
                          {/** 답글 여부에 따라 보이거나 안 보이게 처리 */}
                          <Link to={`/board/${board}/detail/${item.boardId}`}>{item.title}</Link>
                        </td>
                        <td className="center">{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${item.boardWriteDate[1]}.${
                          item.boardWriteDate[2] < 10 ? '0' : ''
                        }${item.boardWriteDate[2]}`}</td>
                      </tr>
                    ))}
                    {/** // loop */}
                  </tbody>
                </S.Table>
              );
            }
          })()}
        </div>
        <Paging totalPage={totalPages} />
      </S.Container>
    </>
  );
};

export default CustomerSupport;
