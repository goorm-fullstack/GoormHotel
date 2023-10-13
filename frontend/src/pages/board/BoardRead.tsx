import React, { useEffect, useRef, useState } from 'react';
import * as S from './Style';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageTitle, BtnWrapper, LinkBtn, commonButton, SubmitBtn } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import axios from 'axios';
import queryString from "query-string";
import { response } from 'express';
import Instance from '../../utils/api/axiosInstance';

const BoardRead = () => {
  const loc = useLocation();
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
  const [replyContent, setReplyContent] = useState('');
  const [replyPassword, setReplyPassword] = useState('');
  const [replyWriterModify, setReplyWriterModify] = useState('');
  const [replyContentModify, setReplyContentModify] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedReplyContent, setEditedReplyContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState(0); // 수정 중인 댓글 ID를 추적
  const [user, setUser] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const parseBoardContent = (content: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p'));

    return paragraphs.map((p) => p.textContent);
  };

  const boardContent =
    boardData && boardData.boardContent ? parseBoardContent(boardData.boardContent).map((paragraph, index) => <p key={index}>{paragraph}</p>) : '';

  useEffect(() => {
    Instance
        .get(`/boards/${boardId}`)
        .then((response) => {
          if (response.headers['filename']) {
            const fileName = response.headers['filename'];
            setFile(fileName);
          }
          setBoardData(response.data);
          console.log(response.data.boardWriter);
          fetchReply(response.data.boardId);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });

    const user = localStorage.getItem('memberId');
    setUser(user as string);
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
  }, [board, boardData]);

  useEffect(() => {
    // 단일 항목에 대한 이미지 URL을 가져옵니다
    const fetchImageUrl = async () => {
      try {
        const response = await Instance.get(`/boards/image/${boardId}`, {
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl); // 이미지 URL을 상태에 설정
      } catch (error) {
        console.error('이미지 URL을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchImageUrl();
  }, [boardId]);

  const handleDownLoad = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = await Instance.get(`/boards/download/${boardId}`, { responseType: 'blob' });
    let blob = new Blob([result.data], { type: result.headers['content-type'] });

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
    if(isConfirm){
      if(user === ''){
        const response = await Instance.get(`reply/replyId/${replyId}`);
        const password = response.data.password;
        if(replyPassword === password){
          axios
          .put(`/reply/softdelete/${replyId}`)
          .then((response) => {
            alert('삭제되었습니다.');
            fetchReply(boardData.boardId);
          })
          .catch((error) => {
            console.error('댓글 삭제에 실패했습니다.', error);
          });
        }else{
          alert('해당 글을 삭제할 권한이 없습니다.');
        }
      }else{
        const response = await Instance.get(`reply/replyId/${replyId}`);
        const id = response.data.replyWriter;
        console.log(id);
        if(id === user){
          axios
          .put(`/reply/softdelete/${replyId}`)
          .then((response) => {
            alert('삭제되었습니다.');
            fetchReply(boardData.boardId);
          })
          .catch((error) => {
            console.error('댓글 삭제에 실패했습니다.', error);
          });
        }else{
          alert('해당 글을 삭제할 권한이 없습니다.');
        }
      }
    }
  };

  const handleUpdate = (replyId: any) => {
    setIsEditing(true);
    setEditingReplyId(replyId);
    const replyToEdit = reply.find((replyItem) => replyItem.replyId === replyId);
    if (replyToEdit) {
      setReplyContentModify(replyToEdit.replyContent);
      setReplyWriterModify(replyToEdit.replyWriter);
    }
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  const handleSaveUpdate = (replyId: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      replyWriter: replyWriterModify,
      replyContent: replyContentModify,
    }
    Instance
        .put(`/reply/${replyId}`, data)
        .then((response) => {
          alert('수정되었습니다.');
          setIsEditing(false);
          setEditedReplyContent('');
          fetchReply(boardData.boardId);
        })
        .catch((error) => {
          console.error('댓글 수정에 실패했습니다.', error);
        });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await Instance.post('/reply/writeform', {
        boardId: boardId,
        replyContent: replyContent,
        replyWriter: inputRef && inputRef.current ? inputRef.current.value : '',
      });
      setReplyWriter('');
      setReplyContent('');
      fetchReply(parseInt(boardId ? boardId : '', 10));
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  const handleDelteBoard = () => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if(isConfirm){
      Instance
        .put(`/boards/softdelete/${boardId}`)
        .then(() => {
          alert('삭제되었습니다.');
          navigate(-1);
        })
        .catch((error) => {
          console.error(error.message);
        });
    };
  }

  return (
    <>
      <SubHeader kind="board" />
      <S.Container>
        {title}
        <LinkBtn to={`/board/report/write?boardId=${boardId}`}>신고하기</LinkBtn>
        <div>
          <S.TableRead>
            <tbody>
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
              {board !== 'review' && file &&
              <tr>
                <td>
                  <button className='fileb' type="button" onClick={handleDownLoad}>
                    첨부파일 : {file}
                  </button>
                </td>
              </tr>
              }
              {board === 'review' && 
              <tr>
                <td>
                  <img className='reviewImg' src={imageUrl} alt='이미지'/>
                </td>
              </tr>
              }
              <tr className="contents">
                <td>{boardContent}</td>
              </tr>
              {board !== 'notice' &&
              <tr className="commentwrite">
                <td>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div>
                        {user === '' ?
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
                          <input name='password' type="password" placeholder="비밀번호" value={replyPassword} onChange={(e) => setReplyPassword(e.target.value)} required />
                        </> :
                        <input
                          type="text"
                          name="replyWriter"
                          value={user}
                          readOnly
                          required
                          ref={inputRef}
                        />
                        }
                      </div>
                      <div className="tawrap">
                        <textarea name="replyContent" value={replyContent} onChange={(e) => setReplyContent(e.target.value)}></textarea>
                        <button type="submit">작성하기</button>
                      </div>
                    </form>
                  </div>
                </td>
              </tr>
              }
              {board !== 'notice' &&
              <tr className="commentslist">
                <td>
                  <ul>
                    {reply.length === 0 && (
                      <li>
                        <div className="cwinfo">
                          <strong>작성된 댓글이 없습니다.</strong>
                        </div>
                      </li>
                    )}
                    {reply.length > 0 &&
                      reply.map((replyItem, index) => (
                        <li key={index}>
                          <div className="cwinfo">
                            <strong>{replyItem.replyWriter}</strong>
                            <span className="date">{`${replyItem.replyWriteDate[0]}.${replyItem.replyWriteDate[1] < 10 ? '0' : ''}${
                              replyItem.replyWriteDate[1]
                            }.${
                              replyItem.replyWriteDate[2] < 10 ? '0' : ''
                            }${replyItem.replyWriteDate[2]}`}</span>
                            <button type="button" className="modify" onClick={() => handleUpdate(replyItem.replyId)}>
                              수정
                            </button>
                            <button type="button" className="delete" onClick={() => handleDelete(replyItem.replyId)}>
                              삭제
                            </button>
                            <button type="button" className="delete" onClick={() => navigate(`/board/report/write?replyId=${replyItem.replyId}`)}>
                              신고
                            </button>
                          </div>
                          {editingReplyId === replyItem.replyId && isEditing ? (
                            <form onSubmit={(e) => handleSaveUpdate(replyItem.replyId, e)}>
                              <input
                                className="modify-input"
                                type="text"
                                defaultValue={'수정할 작성자를 입력하세요'}
                                onChange={(e) => setReplyWriterModify(e.target.value)}
                              />
                              <input
                                className="modify-input"
                                defaultValue={'수정할 내용을 입력하세요'}
                                onChange={(e) => setReplyContentModify(e.target.value)}
                              />
                              <button type="submit" className="modify">
                                저장
                              </button>
                              <button type="button" className="delete" onClick={handleCancelUpdate}>
                                취소
                              </button>
                            </form>
                          ) : (
                            <p>{replyItem.replyContent}</p>
                          )}
                        </li>
                      ))}
                  </ul>
                </td>
              </tr>
              }
            </tbody>
          </S.TableRead>
          {boardData && boardData.boardWriter === localStorage.getItem('memberId') ?
          (<>
            <BtnWrapper className='center mt40'>
              <SubmitBtn className='center' onClick={handleDelteBoard}>삭제</SubmitBtn>
            </BtnWrapper>
            <BtnWrapper className="center mt40">
              <LinkBtn to={listLink}>목록</LinkBtn>
            </BtnWrapper>
          </>) :
          (<BtnWrapper className="center mt40">
            <LinkBtn to={listLink}>목록</LinkBtn>
          </BtnWrapper>)
          }
        </div>
      </S.Container>
    </>
  );
};

export default BoardRead;
