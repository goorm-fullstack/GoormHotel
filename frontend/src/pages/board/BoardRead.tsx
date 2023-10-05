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
  const board = useParams().board;
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const boardId = searchParams.get('boardId');
  const [boardData, setBoardData] = useState<any>(null);
  const [listLink, setListLink] = useState('');

  useEffect(() => {
    axios.get(`/boards/${boardId}`).then((response) => {
      setBoardData(response.data);
    });
  }, []);

  console.log(boardData);

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
    }
  }

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
                {/* 수정된 부분: boardData가 null인 경우에 대비하여 조건부 렌더링 */}
                <p className="title">
                  <span>[카테고리]</span>
                  {boardData ? boardData.title : ''}
                </p>
                {(() => {
                  // board가 'notice'가 아니고 boardData가 존재하는 경우에만 렌더링
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
              <td>{boardData && boardData.boardContent ? boardData.boardContent : ''}</td>
            </tr>
            <tr className="commentwrite">
              <td>
                <div>
                  <form>
                    <div>
                      <input type="text" placeholder="작성자명" />
                      <input type="password" placeholder="식별 비밀번호?" />
                    </div>
                    <textarea></textarea>
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
                      {/** 수정 버튼 클릭하면 상단 등록 폼으로 현재 댓글 정보가 전달 -> 상단 댓글 등록 버튼 누르면 수정사항 반영 */}
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