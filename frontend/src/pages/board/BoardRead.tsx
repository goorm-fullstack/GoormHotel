import React, { useEffect, useState } from 'react';
import * as S from './Style';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { PageTitle, BtnWrapper, LinkBtn, NormalBtn } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import queryString from 'query-string';
import Instance from '../../utils/api/axiosInstance';

const BoardRead = () => {
  const [imageUrl, setImageUrl] = useState<any>('');
  const { board } = useParams();
  const location = useLocation();
  const queryParam = queryString.parse(location.search);
  const boardId = String(queryParam.boardId);
  const [boardData, setBoardData] = useState<any>(null);
  const [listLink, setListLink] = useState('');
  const [title, setTitle] = useState<any>();
  const [file, setFile] = useState('');
  const [reply, setReply] = useState<any[]>([]);
  const [replyWriter, setReplyWriter] = useState('');
  const [replyPassword, setReplyPassword] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyWriterModify, setReplyWriterModify] = useState('');
  const [replyContentModify, setReplyContentModify] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedReplyContent, setEditedReplyContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState(0); // 수정 중인 댓글 ID를 추적
  const [user, setUser] = useState('');
  const [scroll, setScroll] = useState(0);
  const navigate = useNavigate();

  const isLogin = localStorage.getItem('memberId');

  useEffect(() => {
    Instance.get(`/boards/${boardId}`)
      .then((response) => {
        if (response.headers['filename']) {
          const fileName = response.headers['filename'];
          const decodedFileName = decodeURI(fileName).replaceAll('+', ' ');
          setFile(decodedFileName);
        }
        setBoardData(response.data);
        fetchReply(response.data.boardId);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });

    const user = localStorage.getItem('memberId');
    setUser(user as string);
  }, [boardId]);

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
  }, [board, boardData]);

  useEffect(() => {
    // 단일 항목에 대한 이미지 URL을 가져옵니다
    const fetchImageUrl = async () => {
      try {
        const response = await Instance.get(`/boards/image/${boardId}`, {
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl); // 이미지 URL을 상태에 설정
      } catch (error) {
        console.error('이미지 URL을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    if (board === 'review') {
      fetchImageUrl();
    }
  }, [boardId]);


  const handleDownLoad = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = await Instance.get(`/boards/download/${boardId}`, {
      responseType: 'blob',
    });
    let blob = new Blob([result.data], {
      type: result.headers['content-type'],
    });

    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.target = '_self';
    link.setAttribute('download', file);
    link.click();
  };

  const fetchReply = async (boardId: number) => {
    try {
      const response = await Instance.get(`/reply/boardId/${boardId}`);
      setReply(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 회원 비회원 구분 삭제
  const handleDelete = async (replyId: number) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      if (user === null) {
        const response = await Instance.get(`reply/replyId/${replyId}`);
        const replyPassword = response.data.replyPassword;
        if (replyPassword === null) {
          alert('해당 글을 삭제할 수 없습니다.');
          return;
        }
        const password = window.prompt('비밀번호를 입력하세요.');
        if (replyPassword === password) {
          Instance.put(`/reply/softdelete/${replyId}`)
            .then((response) => {
              fetchReply(boardData.boardId);
            })
            .catch((error) => {
              console.error('댓글 삭제에 실패했습니다.', error);
            });
        } else {
          alert('해당 글을 삭제할 수 없습니다.');
        }
      } else {
        const response = await Instance.get(`reply/replyId/${replyId}`);
        if (response.data.replyPassword !== null) {
          alert('해당 글을 삭제할 수 없습니다.');
          return;
        }
        const id = response.data.replyWriter;
        if (id === user) {
          Instance.put(`/reply/softdelete/${replyId}`)
            .then((response) => {
              fetchReply(boardData.boardId);
            })
            .catch((error) => {
              console.error('댓글 삭제에 실패했습니다.', error);
            });
        } else {
          alert('해당 글을 삭제할 수 없습니다.');
        }
      }
    }
  };

  const scrollToPosition = (number: number) => {
    window.scrollTo({
      top: number,
      behavior: 'smooth',
    });
  };

  const handleUpdate = async (replyId: any) => {
    const response = await Instance.get(`/reply/replyId/${replyId}`);
    if (user === null && response.data.replyPassword === null) {
      alert('해당 글을 수정할 수 없습니다.');
      return;
    } else if (user !== null && (user !== response.data.replyWriter || response.data.replyPassword !== null)) {
      alert('해당 글을 수정할 수 없습니다.');
      return;
    }
    const writer = response.data.replyWriter;
    const content = response.data.replyContent;
    setIsEditing(true);
    setEditingReplyId(replyId);
    setReplyWriterModify(writer);
    setReplyContentModify(content);
    setScroll(window.scrollY);
    scrollToPosition(300);
  };

  const handleSaveUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user !== null) {
      const response = await Instance.get(`/reply/replyId/${editingReplyId}`);
      const id = response.data.replyWriter;
      if (replyWriterModify === id) {
        const data = {
          replyWriter: replyWriterModify,
          replyContent: replyContent,
        };
        Instance.put(`/reply/${editingReplyId}`, data)
          .then((response) => {
            setEditedReplyContent('');
            setReplyContentModify('');
            setReplyContent('');
            scrollToPosition(scroll);
            setIsEditing(false);
            fetchReply(boardData.boardId);
          })
          .catch((error) => {
            console.error('댓글 수정에 실패했습니다.', error);
          });
      }
    } else {
      const response = await Instance.get(`/reply/replyId/${editingReplyId}`);
      const password = response.data.replyPassword;
      if (password === replyPassword) {
        const data = {
          replyWriter: replyWriterModify,
          replyContent: replyContentModify,
        };
        Instance.put(`/reply/${editingReplyId}`, data)
          .then((response) => {
            setEditedReplyContent('');
            setReplyContentModify('');
            setReplyContent('');
            scrollToPosition(scroll);
            setIsEditing(false);
            fetchReply(boardData.boardId);
          })
          .catch((error) => {
            console.error('댓글 수정에 실패했습니다.', error);
          });
      } else {
        alert('해당 글의 수정 권한이 없습니다.');
        window.location.reload();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user !== null) {
      Instance.post('/reply/writeform', {
        boardId: boardId,
        replyContent: replyContent,
        replyWriter: user ? user : '',
      })
        .then(() => {
          setReplyWriter('');
          setReplyPassword('');
          setReplyContent('');
          fetchReply(parseInt(boardId ? boardId : '', 10));
        })
        .catch((error) => {
          console.error('댓글 작성에 실패했습니다.', error);
        });
    } else {
      Instance.post('/reply/writeform', {
        boardId: boardId,
        replyContent: replyContent,
        replyWriter: replyWriter,
        replyPassword: replyPassword,
      })
        .then(() => {
          setReplyWriter('');
          setReplyPassword('');
          setReplyContent('');
          fetchReply(parseInt(boardId ? boardId : '', 10));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDelteBoard = async () => {
    if (user !== null) {
      const response = await Instance.get(`/boards/${boardId}`);
      if (response.data.boardPassword !== '') {
        alert('해당 글을 삭제할 수 없습니다.');
        return;
      }
      const id = response.data.boardWriter;
      if (user === id) {
        const isConfirm = window.confirm('삭제하시겠습니까?');
        if (isConfirm) {
          Instance.put(`/boards/softdelete/${boardId}`)
            .then(() => {
              navigate(-1);
            })
            .catch((error) => {
              console.error(error.message);
            });
        }
      } else {
        alert('해당 글을 삭제할 수 없습니다.');
      }
    } else {
      const response = await Instance.get(`/boards/${boardId}`);
      const password = response.data.boardPassword;
      if (password === '') {
        alert('해당 글을 삭제할 수 없습니다.');
        return;
      }
      const prom = window.prompt('비밀번호를 입력하세요.');
      if (prom === password) {
        const isConfirm = window.confirm('삭제하시겠습니까?');
        if (isConfirm) {
          Instance.put(`/boards/softdelete/${boardId}`)
            .then(() => {
              navigate(-1);
            })
            .catch((error) => {
              console.error(error.message);
            });
        }
      } else {
        alert('해당 글을 삭제할 수 없습니다.');
      }
    }
  };

  const boardReport = () => {
    if (boardData.report.length !== 0) {
      alert('신고된 글입니다.');
      return;
    }
    navigate(`/board/report/write?boardId=${boardId}`);
  };

  const boardUpdate = () => {
    if(isLogin){
      if(boardData.boardPassword){
        alert("수정 불가능합니다.");
      }
      else{
        if(boardData.boardWriter == isLogin){
          navigate(`/board/update/${board}/${boardId}`);
        }
        else{
          alert("수정 불가능합니다.");
        }
      }
    }
    else{
      if(!boardData.boardPassword){
        alert("수정 불가능합니다.");
      }
      else{
        const input = prompt("게시글 비밀번호를 입력하세요.");
        if(boardData.boardPassword == input){
          navigate(`/board/update/${board}/${boardId}`);
        }
        else{
          alert("비밀번호를 틀렸습니다. 다시 시도해주세요.");
        }
      }
    }
  }

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
                    <span>[{boardData ? boardData.category : ''}]</span>
                    {boardData ? boardData.title : ''}
                  </p>
                  {(() => {
                    if (board !== 'notice' && boardData) {
                      return (
                        <p>
                          <span>{boardData.boardWriter}</span>
                          <span>{`${boardData.boardWriteDate[0]}/${boardData.boardWriteDate[1] < 10 ? '0' : ''}${boardData.boardWriteDate[1]}/${
                            boardData.boardWriteDate[2] < 10 ? '0' : ''
                          }${boardData.boardWriteDate[2]}`}</span>
                        </p>
                      );
                    }
                  })()}
                </td>
              </tr>
              {board !== 'review' && file && (
                <tr className="attachment">
                  <td>
                    <button className="fileb" type="button" onClick={handleDownLoad}>
                      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 0C16.7614 0 19 2.23858 19 5V17C19 20.866 15.866 24 12 24C8.13401 24 5 20.866 5 17V9H7V17C7 19.7614 9.23858 22 12 22C14.7614 22 17 19.7614 17 17V5C17 3.34315 15.6569 2 14 2C12.3431 2 11 3.34315 11 5V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V6H15V17C15 18.6569 13.6569 20 12 20C10.3431 20 9 18.6569 9 17V5C9 2.23858 11.2386 0 14 0Z"
                          fill="currentColor"
                        />
                      </svg>
                      {file}
                    </button>
                  </td>
                </tr>
              )}
              {board === 'review' && (
                <tr className="attachment">
                  <td>
                    <img className="reviewImg" src={imageUrl} alt="이미지" />
                  </td>
                </tr>
              )}
              <tr className="contents">
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: boardData && boardData.boardContent,
                    }}
                  />
                  <BtnWrapper className="right flexgap">
                    <NormalBtn className="mini" onClick={boardUpdate}>수정</NormalBtn>
                    <NormalBtn className="mini" onClick={handleDelteBoard}>삭제</NormalBtn>
                    <NormalBtn className="mini" onClick={boardReport}>신고</NormalBtn>
                  </BtnWrapper>
                </td>
              </tr>
              {board !== 'notice' && (
                <tr className="commentwrite">
                  <td>
                    <div>
                      {!isEditing ? (
                        <form onSubmit={handleSubmit}>
                          <div>
                            {user === null && (
                              <>
                                <input
                                  type="text"
                                  placeholder="작성자명"
                                  name="replyWriter"
                                  value={replyWriter}
                                  onChange={(e) => setReplyWriter(e.target.value)}
                                  required
                                />
                                {/* 비회원일시 */}
                                <input
                                  name="replyPassword"
                                  type="password"
                                  placeholder="비밀번호"
                                  value={replyPassword}
                                  onChange={(e) => setReplyPassword(e.target.value)}
                                  required
                                />
                              </>
                            )}
                          </div>
                          <div className="tawrap">
                            <textarea name="replyContent" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} required></textarea>
                            <button type="submit">작성하기</button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleSaveUpdate}>
                          <div>
                            {user === null ? (
                              <>
                                <input
                                  type="text"
                                  defaultValue={replyWriterModify}
                                  name="replyWriter"
                                  value={replyWriterModify}
                                  onChange={(e) => setReplyWriterModify(e.target.value)}
                                  required
                                />
                                {/* 비회원일시 */}
                                <input
                                  name="password"
                                  type="password"
                                  placeholder="작성 시 입력한 비밀번호"
                                  value={replyPassword}
                                  onChange={(e) => setReplyPassword(e.target.value)}
                                  required
                                />
                                <div className="tawrap">
                                  <textarea
                                    name="replyContent"
                                    defaultValue={replyContentModify}
                                    value={replyContentModify}
                                    onChange={(e) => setReplyContentModify(e.target.value)}
                                    required></textarea>
                                  <button type="submit">수정하기</button>
                                </div>
                              </>
                            ) : (
                              <div className="tawrap">
                                <textarea
                                  name="replyContent"
                                  defaultValue={replyContentModify}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  required></textarea>
                                <button type="submit">수정하기</button>
                              </div>
                            )}
                          </div>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              )}
              {board !== 'notice' && (
                <tr className="commentslist">
                  <td>
                    <ul>
                      {reply.length === 0 && (
                        <li>
                          <div className="cwinfo">
                            <p className="empty">작성된 댓글이 없습니다.</p>
                          </div>
                        </li>
                      )}
                      {reply.length > 0 &&
                        reply.map((replyItem, index) => (
                          <li key={index}>
                            <div className="cwinfo">
                              <strong>{replyItem.replyWriter}</strong>
                              <span className="date">{`${replyItem.replyWriteDate[0]}/${replyItem.replyWriteDate[1] < 10 ? '0' : ''}${
                                replyItem.replyWriteDate[1]
                              }/${replyItem.replyWriteDate[2] < 10 ? '0' : ''}${replyItem.replyWriteDate[2]}`}</span>
                              <button type="button" className="modify" onClick={() => handleUpdate(replyItem.replyId)}>
                                수정
                              </button>
                              <button type="button" className="delete" onClick={() => handleDelete(replyItem.replyId)}>
                                삭제
                              </button>
                              <button
                                type="button"
                                className="delete"
                                onClick={() => {
                                  if (replyItem.report.length !== 0) {
                                    alert('신고된 글입니다.');
                                    return;
                                  }
                                  navigate(`/board/report/write?replyId=${replyItem.replyId}`);
                                }}>
                                신고
                              </button>
                            </div>
                            <p>{replyItem.replyContent}</p>
                          </li>
                        ))}
                    </ul>
                  </td>
                </tr>
              )}
            </tbody>
          </S.TableRead>
          {board !== 'notice' && (
            <BtnWrapper className="center mt40">
              <LinkBtn to={listLink}>목록</LinkBtn>
            </BtnWrapper>
          )}
        </div>
      </S.Container>
    </>
  );
};

export default BoardRead;
