import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { commonContainerStyle, PageTitle, BtnWrapper, LinkBtn } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import axios from 'axios';

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
  const { board } = useParams(); // Use object destructuring to extract `board` from `useParams`
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const boardId = parseInt(searchParams.get('boardId') || '', 10);
  const [imageUrl, setImageUrl] = useState<any[]>([]);
  const [boardData, setBoardData] = useState<any>(null);
  const [listLink, setListLink] = useState('');

  const parseBoardContent = (content: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p')); // 모든 <p> 태그 선택

    return paragraphs.map((p) => p.textContent); // 각 <p> 태그의 텍스트 내용 추출
  };

  const boardContent = boardData && boardData.boardContent ? (
      parseBoardContent(boardData.boardContent).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
      ))
  ) : (
      ''
  );

  useEffect(() => {
    axios.get(`/boards/${boardId}`)
        .then((response) => {
          setBoardData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    // setImageUrl([]);
  }, []);

  // useEffect(() => {
  //   GetImageUrl(boardData.boardId);
  // }, [boardData]);
  // const GetImageUrl = (boardId: number) => {
  //   if (!boardData) {
  //     return;
  //   }
  //
  //   Instance.get(`/boards/image/${boardId}`, {
  //     responseType: 'arraybuffer',
  //   })
  //       .then((response) => {
  //         if (response.data) {
  //           const blob = new Blob([response.data], {
  //             type: response.headers['content-type'],
  //           });
  //           let image = { boardId: boardId, imageUrl: URL.createObjectURL(blob) };
  //           setImageUrl((prevImages) => [...prevImages, image]);
  //         } else {
  //           console.error('API 응답이 null 또는 데이터가 없습니다.');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  // };

  useEffect(() => {
    if (boardData) {
      switch (boardData.boardTitle) {
        case '문의하기':
          setListLink('/board/qna/1');
          break;
        case '공지사항':
          setListLink('/board/notice/1');
          break;
        case '이용후기':
          setListLink('/board/review/1');
          break;
        default:
          setListLink('/board/default');
      }
    }
  }, [boardData]);

  const [comments, setComments] = useState([]); // 댓글 목록을 저장할 상태
  const [newComment, setNewComment] = useState(''); // 새로운 댓글 내용을 저장할 상태
  const [replyWriter, setReplyWriter] = useState('');
  const [replyContent, setReplyContent] = useState('');

  // 댓글 불러오기
  const fetchComments = async (boardId:number) => {
    try {
      const response = await axios.get(`/reply/boardId/${boardId}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments(boardId);
  }, [boardId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 새로운 댓글을 서버에 제출
    try {
      const response = await axios.post('/reply/writeform', {
        boardId: boardId,
        replyContent: replyContent,
        replyWriter: replyWriter
      });
      fetchComments(boardId);
      setReplyWriter('');
      setReplyContent('');
    } catch (error) {
      console.error(error);
    }
  };

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
                  <p className="title">
                    <span>{boardData ? boardData.category : ''}</span>
                    {boardData ? boardData.title : ''}
                  </p>
                  {(() => {
                    if (board !== 'notice' && boardData) {
                      return (
                          <p>
                            <span>{boardData.boardWriter}</span>
                            <span>{`${boardData.boardWriteDate[0]}.${boardData.boardWriteDate[1] < 10 ? '0' : ''}${boardData.boardWriteDate[1]}.${
                                boardData.boardWriteDate[2] < 10 ? '0' : ''
                            }${boardData.boardWriteDate[2]}`}</span>
                          </p>
                      );
                    }
                  })()}
                </td>
              </tr>
              <tr className="contents">
                <td>{boardContent}</td>
              </tr>
              <tr className="commentwrite">
                <td>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <input
                            type="text"
                            placeholder="작성자명"
                            name="replyWriter"
                            value={replyWriter} // 상태에서 작성자명 가져오기
                            onChange={(e) => setReplyWriter(e.target.value)} // 입력 값이 변경될 때 상태 업데이트
                        />
                        {/*<input type="password" placeholder="식별 비밀번호?" />*/}
                      </div>
                      <textarea
                          name="replyContent"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                      ></textarea>
                      <button type="submit">등록</button>
                    </form>
                  </div>
                </td>
              </tr>
              <tr className="commentslist">
                <td>
                  <ul>
                    <li>
                      <p>
                        이름이름
                        <span className="date">2023.09.01</span>
                        <button type="button">수정</button>
                        <button type="button">삭제</button>
                      </p>
                      <p>댓글 내용내용</p>
                    </li>
                    <li>
                      <p>
                        이름이름
                        <span className="date">2023.09.01</span>
                        <button type="button">수정</button>
                        <button type="button">삭제</button>
                      </p>
                      <p>댓글 내용내용</p>
                    </li>
                    <li>
                      <p>
                        이름이름
                        <span className="date">2023.09.01</span>
                        <button type="button">수정</button>
                        <button type="button">삭제</button>
                      </p>
                      <p>댓글 내용내용</p>
                    </li>
                  </ul>
                </td>
              </tr>
            </TableRead>
            <BtnWrapper className="center mt40">
              <LinkBtn to={listLink}>목록</LinkBtn>
            </BtnWrapper>
          </div>
        </Container>
      </>
  );
};

export default BoardRead;
