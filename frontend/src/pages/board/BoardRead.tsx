import React, { useEffect, useState } from 'react';
import * as S from './Style';
import { useLocation, useParams } from 'react-router-dom';
import { PageTitle, BtnWrapper, LinkBtn } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import axios from 'axios';

const BoardRead = () => {
  const { board, boardId } = useParams();
  const loc = useLocation();
  // const searchParams = new URLSearchParams(loc.search);
  // const boardId = searchParams.get('boardId');
  const [imageUrl, setImageUrl] = useState<any[]>([]);
  const [boardData, setBoardData] = useState<any>(null);
  const [listLink, setListLink] = useState('');
  const [title, setTitle] = useState<any>();
  const [file, setFile] = useState('');

  const parseBoardContent = (content: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p')); // 모든 <p> 태그 선택

    return paragraphs.map((p) => p.textContent); // 각 <p> 태그의 텍스트 내용 추출
  };

  const boardContent =
    boardData && boardData.boardContent ? parseBoardContent(boardData.boardContent).map((paragraph, index) => <p key={index}>{paragraph}</p>) : '';

  useEffect(() => {
    axios
      .get(`/boards/${boardId}`)
      .then((response) => {
        if (response.headers['filename']) {
          const fileName = response.headers['filename'];
          setFile(fileName);
        }
        setBoardData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, []);

  useEffect(() => {
    let pageTitle;
    switch (board) {
      case 'notice':
        pageTitle = <PageTitle>공지사항</PageTitle>;
        break;
      case 'qna':
        pageTitle = <PageTitle>문의하기</PageTitle>;
        break;
      case 'review':
        pageTitle = <PageTitle>이용후기</PageTitle>;
        break;
      default:
        pageTitle = <PageTitle>고객지원</PageTitle>;
        break;
    }
    setTitle(pageTitle ? pageTitle : undefined);

    if (boardData) {
      let link = '';
      switch (boardData.boardTitle) {
        case '문의하기':
          link = '/board/qna/1';
          break;
        case '공지사항':
          link = '/board/notice/1';
          break;
        case '이용후기':
          link = '/board/review/1';
          break;
        default:
          break;
      }
      setListLink(link);
    }
  }, []);

  const handleDownLoad = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = await axios.get(`/boards/download/${boardId}`, { responseType: 'blob' });
    let blob = new Blob([result.data], { type: result.headers['content-type'] });

    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.target = '_self';
    link.setAttribute('download', file);
    link.click();
  };

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

  const [reply, setReply] = useState<any[]>([]);
  const [replyWriter, setReplyWriter] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const fetchReply = async (boardId: number) => {
    try {
      const response = await axios.get(`/reply/boardId/${boardData.boardId}`);
      setReply(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (boardData) {
      fetchReply(boardData.boardId);
    }
  }, [boardData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/reply/writeform', {
        boardId: boardId,
        replyContent: replyContent,
        replyWriter: replyWriter,
      });
      setReplyWriter('');
      setReplyContent('');
      fetchReply(parseInt(boardId ? boardId : '', 10));
    } catch (error) {
      console.error(error);
    }
  };

  console.log(boardData);

  return (
    <>
      <SubHeader kind="board" />
      <S.Container>
        {title}
        <div>
          <S.TableRead>
            <tbody>
              <tr>
                <td className="titlew">
                  <p className="title">
                    <span>{boardData ? boardData.category : ''}</span>
                    {boardData ? boardData.title : ''}
                  </p>
                  <button type="button" onClick={handleDownLoad}>
                    {file}
                  </button>
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
                          value={replyWriter}
                          onChange={(e) => setReplyWriter(e.target.value)}
                        />
                        {/*<input type="password" placeholder="식별 비밀번호?" />*/}
                      </div>
                      <div className="tawrap">
                        <textarea name="replyContent" value={replyContent} onChange={(e) => setReplyContent(e.target.value)}></textarea>
                        <button type="submit">작성하기</button>
                      </div>
                    </form>
                  </div>
                </td>
              </tr>
              <tr className="commentslist">
                <td>
                  <ul>
                    {reply.map((reply, index) => (
                      <li key={index}>
                        <div className="cwinfo">
                          <strong>{reply.replyWriter}</strong>
                          <span className="date">{reply.replyDate}</span>
                          <button type="button" className="modify">
                            수정
                          </button>
                          <button type="button" className="delete">
                            삭제
                          </button>
                        </div>
                        <p>{reply.replyContent}</p>
                      </li>
                    ))}
                    <li>
                      <div className="cwinfo">
                        <strong>이름이름</strong>
                        <span className="date">2023.09.01</span>
                        <button type="button" className="modify">
                          수정
                        </button>
                        <button type="button" className="delete">
                          삭제
                        </button>
                      </div>
                      <p>댓글 내용내용</p>
                    </li>
                    <li>
                      <div className="cwinfo">
                        <strong>이름이름</strong>
                        <span className="date">2023.09.01</span>
                        <button type="button" className="modify">
                          수정
                        </button>
                        <button type="button" className="delete">
                          삭제
                        </button>
                      </div>
                      <p>댓글 내용내용</p>
                    </li>
                    <li>
                      <div className="cwinfo">
                        <strong>이름이름</strong>
                        <span className="date">2023.09.01</span>
                        <button type="button" className="modify">
                          수정
                        </button>
                        <button type="button" className="delete">
                          삭제
                        </button>
                      </div>
                      <p>
                        댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글
                        내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글
                        내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용댓글 내용내용
                      </p>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </S.TableRead>
          <BtnWrapper className="center mt40">
            <LinkBtn to={listLink}>목록</LinkBtn>
          </BtnWrapper>
        </div>
      </S.Container>
    </>
  );
};

export default BoardRead;
