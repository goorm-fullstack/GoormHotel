import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
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
  const { board, boardId } = useParams();
  const [boardData, setBoardData] = useState<any>(null);
  const [listLink, setListLink] = useState('');
  const [title, setTitle] = useState<any>();
  const [file, setFile] = useState('');
  const [reply, setReply] = useState<any[]>([]);
  const [replyWriter, setReplyWriter] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedReplyContent, setEditedReplyContent] = useState('');

  const parseBoardContent = (content: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p'));

    return paragraphs.map((p) => p.textContent);
  };

  const boardContent = boardData && boardData.boardContent ? (
      parseBoardContent(boardData.boardContent).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
      ))
  ) : (
      ''
  );

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
  }, [board, boardData]);

  const handleDownLoad = async () => {
    const result = await axios.get(`/boards/download/${boardId}`, {
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
      const response = await axios.get(`/reply/boardId/${boardId}`);
      setReply(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (replyId: number) => {
    axios
        .put(`/reply/softdelete/${replyId}`)
        .then((response) => {
          console.log('댓글이 삭제되었습니다.');
          fetchReply(boardData.boardId);
        })
        .catch((error) => {
          console.error('댓글 삭제에 실패했습니다.', error);
        });
  };

  const handleUpdate = (replyId: number) => {
    setIsEditing(true);
    const replyToEdit = reply.find((r) => r.replyId === replyId);
    if (replyToEdit) {
      setEditedReplyContent(replyToEdit.replyContent);
    }
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
    setEditedReplyContent('');
  };

  const handleSaveUpdate = (replyId: number) => {
    axios
        .put(`/reply/${replyId}`, { replyContent: editedReplyContent })
        .then((response) => {
          console.log('댓글이 수정되었습니다.');
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
      const response = await axios.post('/reply/writeform', {
        boardId: boardId,
        replyContent: replyContent,
        replyWriter: replyWriter,
      });
      setReplyWriter('');
      setReplyContent('');
      fetchReply(parseInt(boardId ? boardId : '', 10));
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  const Editing = ({ replyId }: { replyId: number }) => {
    return (
        <div>
          {isEditing ? (
              <>
                <button
                    type="button"
                    onClick={() => handleSaveUpdate(replyId)}
                >
                  저장
                </button>
                <button
                    type="button"
                    onClick={handleCancelUpdate}
                >
                  취소
                </button>
              </>
          ) : (
              <>
                <button
                    type="button"
                    onClick={() => handleUpdate(replyId)}
                >
                  수정
                </button>
                <button
                    type="button"
                    onClick={() => handleDelete(replyId)}
                >
                  삭제
                </button>
              </>
          )}
          {isEditing ? (
              <textarea
                  value={editedReplyContent}
                  onChange={(e) => setEditedReplyContent(e.target.value)}
              ></textarea>
          ) : (
              <p>{reply.find((r) => r.replyId === replyId)?.replyContent}</p>
          )}
        </div>
    );
  };

  return (
      <>
        <SubHeader kind="board" />
        <Container>
          {title}
          <div>
            <TableRead>
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
                    {reply.map((replyItem, index) => (
                        <li key={index}>
                          <p>
                            {replyItem.replyWriter}
                            <span className="date">{replyItem.replyDate}</span>
                            <Editing replyId={replyItem.replyId} />
                          </p>
                        </li>
                    ))}
                  </ul>
                </td>
              </tr>
              </tbody>
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
