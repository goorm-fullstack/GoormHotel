import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'; // Remove duplicate import
import { PageTitle, BtnWrapper, LinkBtn, SubmitBtn } from '../../Style/commonStyles';
import * as S from './Style';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import Paging from '../../components/common/Paging/Paging';
import Instance from '../../utils/api/axiosInstance';
import { Link } from 'react-router-dom';
import { Type, TypeDetail } from '../../components/common/Search/Search';
import {IsReply} from "./Style";

const CustomerSupport = () => {
  // 대분류, 소분류 지정 배열
  const typeDetailArray: TypeDetail[][] = [
    [{ type: 'all', typeDetail: '카테고리', value: 'all' }],
    [
      { type: 'qna', typeDetail: '전체', value: 'all' },
      { type: 'qna', typeDetail: '문의1', value: '문의1' },
      { type: 'qna', typeDetail: '문의2', value: '문의2' },
    ],
    [
      { type: 'review', typeDetail: '전체', value: 'all' },
      { type: 'review', typeDetail: '객실', value: '객실' },
      { type: 'review', typeDetail: '다이닝', value: '다이닝' },
    ],
    [
      {type: 'notice', typeDetail: '전체', value: 'all'},
      {type: 'notice', typeDetail: '공지사항', value: '공지사항'},
      {type: 'notice', typeDetail: '이벤트', value: '이벤트'}
    ]
  ];
  const typeArray: Type[][] = [[{ type: '전체', value: 'all' }], [{ type: '공지사항', value: '공지사항' }], [{ type: '문의하기', value: '문의하기' }], [{type: '이용후기', value: '이용후기'}]];

  const board = useParams().board;
  const [boards, setBoard] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [typeDetail, setTypeDetail] = useState<any>('all');
  const [word, setWord] = useState('');
  const [keyword, setKeyword] = useState('');
  const searchKeyword = useRef<HTMLInputElement>(null); // 검색어 입력 input
  const [detailTypeForType, setDetailTypeForType] = useState<JSX.Element[]>([]); // 대분류에 따라 소분류 상태관리

  useEffect(() => {
    // board 값이 변경될 때마다 데이터를 다시 불러옴
    const handleLoadBoard = () => {
      let boardTitle = '';
      if (board === 'notice') {
        boardTitle = '공지사항';
      } else if (board === 'qna') {
        boardTitle = '문의하기';
      } else if (board === 'review') {
        boardTitle = '이용후기';
      }
      if (boardTitle !== '') {
        if(typeDetail === 'all' && keyword === ''){
          Instance
          .get(`/boards/find/category?boardTitle=${boardTitle}`)
          .then((response) => {
            const totalPages = parseInt(response.headers['totalpages'], 10);
            const totalData = parseInt(response.headers['totaldata'], 10);
            setBoard(response.data || []);
            console.log(response.data);
            setTotalData(totalData);
            setTotalPages(totalPages);
          })
          .catch((error) => {
            console.error(error);
          });
        }else if(typeDetail !== 'all' && keyword === ''){
          Instance
          .get(`/boards/find/category?boardTitle=${boardTitle}&category=${typeDetail}`)
          .then((response) => {
            const totalPages = parseInt(response.headers['totalpages'], 10);
            const totalData = parseInt(response.headers['totaldata'], 10);
            setBoard(response.data || []);
            setTotalData(totalData);
            setTotalPages(totalPages);
          })
          .catch((error) => {
            console.error(error);
          });
        }else if(typeDetail === 'all' && keyword !== ''){
          Instance
          .get(`/boards/find/category?boardTitle=${boardTitle}&keyword=${keyword}`)
          .then((response) => {
            const totalPages = parseInt(response.headers['totalpages'], 10);
            const totalData = parseInt(response.headers['totaldata'], 10);
            setBoard(response.data || []);
            setTotalData(totalData);
            setTotalPages(totalPages);
          })
          .catch((error) => {
            console.error(error);
          });
        }else{
          Instance
          .get(`/boards/find/category?boardTitle=${boardTitle}&category=${typeDetail}&keyword=${keyword}`)
          .then((response) => {
            const totalPages = parseInt(response.headers['totalpages'], 10);
            const totalData = parseInt(response.headers['totaldata'], 10);
            setBoard(response.data || []);
            setTotalData(totalData);
            setTotalPages(totalPages);
          })
          .catch((error) => {
            console.error(error);
          });
        }
      }
    }

      setImageUrl([]);
      handleLoadBoard();
  }, [board, typeDetail, keyword]);

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
        .catch((error) => {
          console.error(error.message);
        });
  };


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

  // typeDetail 변경
  const handleTypeDetailChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(searchKeyword.current){
      searchKeyword.current.value = '';
    }
    setKeyword('');
    const selectedTypeDetail = e.target.value;
    setTypeDetail(selectedTypeDetail);
  };

  const generateOptions = (item: TypeDetail, selectedType: string) => {
    if (item.type === selectedType) {
      return (
        <option key={item.value} value={item.value}>
          {item.typeDetail}
        </option>
      );
    }
  };

  // 타입 선택에 따른 세부타입 변경
  useEffect(() => {
    const updatedDetailTypeForType: any[] = [];
    const selectedType: string = board ? board : '공지사항';
    typeDetailArray.forEach((array) => array.forEach((item) => updatedDetailTypeForType.push(generateOptions(item, selectedType))));
    setDetailTypeForType(updatedDetailTypeForType);
  }, [board]);

  // 검색어 입력
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(searchKeyword.current){
      setWord(searchKeyword.current.value);
    }
  }

  // 검색 버튼 클릭 이벤트
  const handleSearch = () => {
    if (!word.trim()) {
      alert('검색어를 입력해주세요.');
    } else {
      setKeyword(word);
    }
  };

  // todo: 회원 여부 확인 필요

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
                      {boards.length > 0 && boards.map((item) => (
                          <li key={item.boardId}>
                            <div className="thumbnail">
                              <Link to={`/board/${board}/detail/${item.title}?boardId=${item.boardId}`}>
                                {imageUrl.find((image) => image.boardId === item.boardId) && (
                                    <img
                                        src={imageUrl.find((image: any) => image.boardId === item.boardId).imageUrl}
                                        alt={`Image for ${item.title}`}
                                    />
                                )}
                              </Link>
                            </div>
                            <p className="title">
                                <Link to={`/board/${board}/detail/${item.title}?boardId=${item.boardId}`}>{item.title}</Link>
                                </p>
                            <p className="writer">{item.boardWriter}</p>
                            <p className="date">{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${
                                item.boardWriteDate[1]
                            }.${
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
                      {boards.length > 0 && boards.map((item, index) => (
                          <tr key={item.boardId}>
                            <td className="center">{totalData - index}</td>
                            <td className="center">{item.category}</td>
                            <td>
                              {item.isComment==="true" ? <IsReply>답글</IsReply> : null}
                              {/** 답글 여부에 따라 보이거나 안 보이게 처리 */}
                                <Link to={{pathname: `/board/${board}/detail/${item.title}`,search: `boardId=${item.boardId}`}}>{item.title}</Link>
                            </td>
                            <td className="center">{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${
                                item.boardWriteDate[1]
                            }.${
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
          <S.SearchHeader>
            <select name="typeDetail" value={typeDetail} onChange={handleTypeDetailChange}>
              {detailTypeForType}
            </select>
            <BtnWrapper className="flexgap right">
              <input type="text" id="search" ref={searchKeyword} placeholder="제목+내용" onChange={handleKeywordChange} />
              <SubmitBtn type="button" className="header search" onClick={handleSearch}>
                검색
              </SubmitBtn>
            </BtnWrapper>
          </S.SearchHeader>
        </S.Container>
      </>
  );
};

export default CustomerSupport;
