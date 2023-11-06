import React, { useEffect, useState } from 'react';
import * as S from './Style';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import { PageTitle, BtnWrapper } from '../../Style/commonStyles';
import AdminLayout from '../common/AdminLayout';
import { Container } from '../member/Style';
import { NormalBtn } from '../../Style/commonStyles';
import Instance from '../../utils/api/axiosInstance';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const AdminBoardDetail = () => {
  const loc = useLocation();
  const [imageUrl, setImageUrl] = useState<any>('');
  const { board, id } = useParams();
  const [boardData, setBoardData] = useState<any>(null);
  const [listLink, setListLink] = useState('');
  const [title, setTitle] = useState<any>();
  const [file, setFile] = useState('');
  const [reply, setReply] = useState<any[]>([]);
  const [replyWriter, setReplyWriter] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyWriterModify, setReplyWriterModify] = useState('');
  const [replyPassword, setReplyPassword] = useState('');
  const [replyContentModify, setReplyContentModify] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedReplyContent, setEditedReplyContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState(0); // 수정 중인 댓글 ID를 추적
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(0);

  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (adminId) {
      setReplyWriter(adminId);
    }
  }, [adminId]);

  const isComment = () => {
    if (board === 'qna' && boardData) {
      return (
          <>
            <NormalBtn onClick={() => { window.location.href = `/admin/board/write?parentBoardId=${boardData.boardId}` }}>답글 작성</NormalBtn>
          </>
      )
    }
  }


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
      .get(`/boards/${id}`)
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
  }, []);

  useEffect(() => {
    let pageTitle;
    switch (board) {
      case 'notice':
        pageTitle = <PageTitle>공지사항 상세</PageTitle>;
        break;
      case 'qna':
        pageTitle = <PageTitle>문의하기 상세</PageTitle>;
        break;
      case 'review':
        pageTitle = <PageTitle>이용후기 상세</PageTitle>;
        break;
      default:
        break;
    }
    setTitle(pageTitle ? pageTitle : undefined);

    if (boardData) {
      let link = '';
      switch (boardData.boardTitle) {
        case '문의하기':
          link = '/admin/board/1';
          break;
        case '공지사항':
          link = '/admin/board/1';
          break;
        case '이용후기':
          link = '/admin/board/1';
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
        const response = await Instance.get(`/boards/image/${id}`, {
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
  }, [id]);

  const handleDownLoad = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = await Instance.get(`/boards/download/${id}`, { responseType: 'blob' });
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

  const handleDelete = (replyId: number) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
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
  };

  const scrollToPosition = (number: number) => {
    window.scrollTo({
      top: number,
      behavior: 'smooth',
    });
  };

  const handleUpdate = async (replyId: any) => {
    const response = await Instance.get(`/reply/replyId/${replyId}`);
    if (adminId === null && response.data.replyPassword === null) {
      alert('해당 글을 수정할 수 없습니다.');
      return;
    } else if (adminId !== null && (adminId !== response.data.replyWriter || response.data.replyPassword !== null)) {
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

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  const handleSaveUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (adminId !== null) {
      const response = await Instance.get(`/reply/replyId/${editingReplyId}`);
      const id = response.data.replyWriter;
      if (replyWriterModify === id) {
        const data = {
          replyWriter: replyWriterModify,
          replyContent: replyContent,
        };
        Instance.put(`/reply/${editingReplyId}`, data)
            .then((response) => {
              alert('수정되었습니다.');
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
              alert('수정되었습니다.');
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

    try {
      const response = await Instance.post('/reply/writeform', {
        boardId: id,
        replyContent: replyContent,
        replyWriter: replyWriter,
      });

      setReplyContent('');
      fetchReply(parseInt(id ? id : '', 10));
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };


  const boardReport = () => {
    if (!boardData) {
      return alert('boardData is null!');
    }

    const boardId = boardData.boardId;
    console.log(boardId);
    const isConfirm = window.confirm('신고하시겠습니까?');

    if (isConfirm) {
      const data = {
        boardId: boardId,
        reportWriter: '관리자',
        reportReason: '관리자 임의 배정',
      };
      Instance
          .post(`/report/writeform`, data)
          .then(() => {
            alert('신고처리되었습니다.');
            navigate(`/admin/report/1`);
          })
          .catch((error) => {
            console.error(error.message);
          });
    }
  }

  const handleDeleteBoard = () => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if(isConfirm){
      Instance.put(`/boards/softdelete/${boardData.boardId}`)
          .then(() => {
            alert('삭제되었습니다.');
            navigate(-1);
          })
          .catch((error) => {
            console.error(error.message);
          })
    }
  }


  return (
    <>
      <AdminLayout subMenus="board">
        <Container>
          {title}
          <S.WriteBtnWrapper className='right double'>
            <NormalBtn className='red' onClick={boardReport}>신고하기</NormalBtn>
            <NormalBtn className='red' onClick={handleDeleteBoard}>삭제</NormalBtn>
          </S.WriteBtnWrapper>
          <div>
            <S.TableRead>
              <tbody>
                <tr>
                  <td className="titlew">
                    <p className="title">
                      <span>{`[${boardData ? boardData.category : ''}]`}</span>
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
                  <tr>
                    <td>
                      <button className="fileb" type="button" onClick={handleDownLoad}>
                        첨부파일 : {file}
                      </button>
                    </td>
                  </tr>
                )}
                {board === 'review' && (
                  <tr>
                    <td>
                      <img className="reviewImg" src={imageUrl} alt="이미지" />
                    </td>
                  </tr>
                )}
                <tr className="contents">
                  <td>{boardContent}</td>
                </tr>
                {board !== 'notice' && (
                  <tr className="commentwrite">
                    <td>
                      <div>
                        {!isEditing ? (
                            <form onSubmit={handleSubmit}>
                              <div>
                                {adminId === null && (
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
                                {adminId === null ? (
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
                            <p className='empty'>작성된 댓글이 없습니다.</p>
                          </li>
                        )}
                        {reply.length > 0 &&
                          reply.map((replyItem, index) => (
                            <li key={index}>
                              <div className="cwinfo">
                                <strong>{replyItem.replyWriter}</strong>
                                <span className="date">{`${replyItem.replyWriteDate[0]}.${replyItem.replyWriteDate[1] < 10 ? '0' : ''}${
                                    replyItem.replyWriteDate[1]
                                }.${replyItem.replyWriteDate[2] < 10 ? '0' : ''}${replyItem.replyWriteDate[2]}`}</span>
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
            <BtnWrapper className="center mt40">
              <NormalBtn onClick={() => navigate(-1)}>목록</NormalBtn>
              {isComment()}
            </BtnWrapper>
          </div>
        </Container>
      </AdminLayout>
    </>
  );
};

export default AdminBoardDetail;
