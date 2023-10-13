import React, { useEffect, useState } from 'react';
import * as S from './Style';
import { useLocation, useParams } from 'react-router-dom';
import { PageTitle, BtnWrapper, LinkBtn } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import axios from 'axios';
import queryString from "query-string";
import e from 'express';
import {Cookies} from "react-cookie";
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
  const [replyPassword, setReplyPassword] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyWriterModify, setReplyWriterModify] = useState('');
  const [replyContentModify, setReplyContentModify] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedReplyContent, setEditedReplyContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState(0); // 수정 중인 댓글 ID를 추적

  const isLogin = localStorage.getItem("memberId");

  const cookies = new Cookies();
  const getCookie = (name: string) => {
    return cookies.get(name);
  }
  const cookie = getCookie("JSESSIONID");
  console.log(cookie);

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
        fetchReply(response.data.boardId);
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

  const findReply = async (replyId : number) => {
    try{
      const response = await Instance.get(`/reply/replyId/${replyId}`);
      if(!response){
        return ;
      }
      return response.data.replyPassword;
    }
    catch (e) {
      console.error(e);
    }
  }

  const handleDelete = (replyId: number, replyWriter: string, replyPassword: string) => {

    if( (isLogin === replyWriter) && !replyPassword){                   // 쿠키 아이디와 작성자 이름이 같고 댓글 비밀번호가 없을 때
      const isConfirm = window.confirm('삭제하시겠습니까?');
      if(isConfirm){
        Instance
          .put(`/reply/softdelete/${replyId}`)
          .then((response) => {
            alert('삭제되었습니다.');
            fetchReply(boardData.boardId);
          })
          .catch((error) => {
            console.error('댓글 삭제에 실패했습니다.', error);
          });
      }
    }

    if(!isLogin){                                                                      //쿠키 아이디가 없을 때
      if(!replyPassword){                                                             //replyPassword(회원이 작성한 댓글이라면)가 없다면
        alert("삭제가 불가능한 댓글입니다.");                                             //삭제 불가능
        return;
      }

      const inputPassword = prompt("비밀번호를 입력하세요.");
      if(replyPassword != inputPassword){                                             //입력받은 비밀번호와 replyPassword가 다르면
        alert("비밀번호가 틀렸습니다.");                                                 //댓글 삭제 실패
        return;
      }

      if(replyPassword === inputPassword){                                           //입력받은 비밀번호와 replyPassword가 일치하다면
        return (                                                                     //댓글 삭제
          axios
            .put(`/reply/softdelete/${replyId}`)
            .then((response) => {
              alert('삭제되었습니다.');
              fetchReply(boardData.boardId);
            })
            .catch((error) => {
              console.error('댓글 삭제에 실패했습니다.', error);
            })
        )
      }
    }

    // const isConfirm = window.confirm('삭제하시겠습니까?');
    // if(isConfirm){
    //   axios
    //   .put(`/reply/softdelete/${replyId}`)
    //   .then((response) => {
    //     alert('삭제되었습니다.');
    //     fetchReply(boardData.boardId);
    //   })
    //   .catch((error) => {
    //     console.error('댓글 삭제에 실패했습니다.', error);
    //   });
    // }
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
    };
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
        replyWriter: isLogin ? isLogin : replyWriter,
        replyPassword: replyPassword,
      });
      setReplyWriter('');
      setReplyPassword('');
      setReplyContent('');
      fetchReply(parseInt(boardId ? boardId : '', 10));
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  const replyWriteOption = () => {
    if(!isLogin){
      return(
        <>
          <div>
            <input
              type="text"
              placeholder="작성자명"
              name="replyWriter"
              value={replyWriter}
              onChange={(e) => setReplyWriter(e.target.value)}
            />
            <input
              type="text"
              placeholder="비밀번호"
              name="replyPassword"
              value={replyPassword}
              onChange={(e) => setReplyPassword(e.target.value)}
            />
            {/*<input type="password" placeholder="식별 비밀번호?" />*/}
          </div>
        </>
      )
    }
    return (
      <div>
        <input
          type="text"
          placeholder="작성자명"
          name="replyWriter"
          value={isLogin}
          onChange={(e) => setReplyWriter(e.target.value)}
          readOnly
        />
      </div>
    );
  }

  const replyUpdateOption = () => {

  }

  // 유저 정보 불러오기 지우지 마세요!! (회원 여부 확인)
  // useEffect(() => {
  //   const handleUserInfo = async () => {
  //     try{
  //       await axios.get('/')
  //       .then((response) => {
  //         setUserId(response.data.userId);
  //       })
  //       .catch((error) => {
  //         console.error(error.message);
  //       })
  //     }
  //   }
  //   handleUserInfo();
  // }, [])

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
                          <span>{`${boardData.boardWriteDate[0]}.${boardData.boardWriteDate[1] < 10 ? '0' : ''}${boardData.boardWriteDate[1]}.${
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
                <td>{boardContent}</td>
              </tr>
              {board !== 'notice' &&
              <tr className="commentwrite">
                <td>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div>
                        {replyWriteOption()}
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
                        <div>
                          <p className="empty">작성된 댓글이 없습니다.</p>                        </div>
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
                            <button type="button" className="delete" onClick={() => handleDelete(replyItem.replyId, replyItem.replyWriter, replyItem.replyPassword)}>
                              삭제
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
          <BtnWrapper className="center mt40">
            <LinkBtn to={listLink}>목록</LinkBtn>
          </BtnWrapper>
        </div>
      </S.Container>
    </>
  );
};

export default BoardRead;
