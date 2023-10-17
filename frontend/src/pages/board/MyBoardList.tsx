import React, { useState, useEffect } from 'react';
import * as S from './Style';
import { PageTitle } from '../../Style/commonStyles';
import Paging from '../../components/common/Paging/Paging';
import Instance from '../../utils/api/axiosInstance';
import { Link } from 'react-router-dom';

const MyBoardList = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [replyData, setReplyData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [sortData, setSortData] = useState<any[]>([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('memberId');
    setUser(user as string);

    const fetchData = async () => {
      const reply = await Instance.get('/reply/list');
      const board = await Instance.get('/boards/list');
      const allData = await Instance.get(`/boards/mypage/${user}`);
      const totalData = parseInt(allData.headers['totaldata'], 10);
      const totalPage = parseInt(allData.headers['totalpages'], 10);
      setTotalData(totalData);
      setTotalPages(totalPage);
      setReplyData(reply.data);
      setBoardData(board.data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    const sortByDateTime = () => {
      // LocalDateTime을 기준으로 정렬
      const sortedData = [...replyData, ...boardData].sort((a: any, b: any) => {
        const dateA = new Date(a.boardWriteDate ? a.boardWriteDate : a.replyWriteDate); // a의 LocalDateTime
        const dateB = new Date(b.boardWriteDate ? b.boardWriteDate : b.replyWriteDate); // b의 LocalDateTime
        return (dateA as any) - (dateB as any); // 오름차순 정렬
      });
      const filteredData = sortedData.filter((item: any) => (item.boardWriter === user || item.replyWriter === user) && (item.boardPassword === '' || item.replyPassword === null));
      setSortData(filteredData);
    }
    sortByDateTime();
  }, [replyData, boardData])

  const findBoardEnglish = (korean: any) => {
    if(korean === '이용후기') return 'review';
    if(korean === '문의하기') return 'qna';
    else return 'notice';
  }

  return (
    <>
      <S.Container>
        <PageTitle>활동 내용</PageTitle>
        <S.Table className="userpage">
          <thead>
            <tr>
              <th style={{ width: '110px' }}>번호</th>
              <th style={{ width: '110px' }}>게시판</th>
              <th style={{ width: '110px' }}>카테고리</th>
              <th style={{ width: '220px' }}>글 제목 또는 내용</th>
              <th style={{ width: '140px' }}>작성일</th>
            </tr>
          </thead>
          <tbody>
            {sortData.length === 0 ? (
              <tr>
                <td colSpan={5} className="center empty">
                  활동 정보가 없습니다.
                </td>
              </tr>
            ) : (
              sortData.map((data: any, index) => (
                <tr key={index}>
                  <td className="center">{totalData - index}</td>
                  <td className="center">
                    {data.boardTitle ? data.boardTitle : '댓글'}
                  </td>
                  <td className="center">
                    <p className="textover">{data.category ? data.category : '댓글'}</p>
                  </td>
                  <td className="center"><Link to={data.title ? `/board/${findBoardEnglish(data.boardTitle)}/detail/${data.title}?boardId=${data.boardId}` : `/board/${findBoardEnglish(data.responseBoardDto.boardTitle)}/detail/${data.responseBoardDto.title}?boardId=${data.responseBoardDto.boardId}`}>{data.title ? data.title : data.replyContent}</Link></td>
                  <td className="center">{data.boardWriteDate ? `${data.boardWriteDate[0]}-${data.boardWriteDate[1] < 10 ? '0' : ''}${data.boardWriteDate[1]}-${
                      data.boardWriteDate[2] < 10 ? '0' : ''
                    }${data.boardWriteDate[2]}` : `${data.replyWriteDate[0]}-${data.replyWriteDate[1] < 10 ? '0' : ''}${data.replyWriteDate[1]}-${
                      data.replyWriteDate[2] < 10 ? '0' : ''
                    }${data.replyWriteDate[2]}`}</td>
                </tr>
              ))
            )}
          </tbody>
        </S.Table>
        <Paging totalPage={totalPages} />
      </S.Container>
    </>
  );
};

export default MyBoardList;
