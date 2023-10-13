import React, { useState, useEffect } from 'react';
import * as S from './Style';
import { PageTitle } from '../../Style/commonStyles';
import Paging from '../../components/common/Paging/Paging';
import Instance from '../../utils/api/axiosInstance';

const MyBoardList = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [totaData, setTotalData] = useState(0);
  const [replyData, setReplyData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [sortData, setSortData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const reply = await Instance.get('/reply/list');
      const board = await Instance.get('/boards/list');
      const totalPage = parseInt(reply.headers['totalpages'], 10) + parseInt(board.headers['totalpages'], 10);
      const totalData = parseInt(reply.headers['totaldata'], 10) + parseInt(board.headers['totalData'], 10);
      setReplyData(reply.data);
      setBoardData(board.data);
      setTotalPages(totalData % 10 === 0 ? totalData / 10 : totalData / 10 + 1);
      setTotalData(totalData);
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
      setSortData(sortedData);
    }
    sortByDateTime();
  }, [replyData, boardData])

  return (
    <>
      <S.Container>
        <PageTitle>활동 내용</PageTitle>
        <S.Table className="userpage">
          <thead>
            <tr>
              <th style={{ width: '110px' }}>번호</th>
              <th style={{ width: '220px' }}>게시판</th>
              <th style={{ width: '280px' }}>카테고리</th>
              <th style={{ width: '140px' }}>제목</th>
              <th style={{ width: '140px' }}>작성자명(회원 ID)</th>
              <th style={{ width: '140px' }}>작성일</th>
            </tr>
          </thead>
          <tbody>
            {sortData.length === 0 ? (
              <tr>
                <td colSpan={7} className="center empty">
                  활동 정보가 없습니다.
                </td>
              </tr>
            ) : (
              sortData.map((data: any, index) => (
                <tr key={index}>
                  <td className="center">{index + 1}</td>
                  <td className="center">
                    {data.boardTitle ? data.boardTitle : '댓글'}
                  </td>
                  <td className="center">
                    <p className="textover">{data.category ? data.category : '댓글'}</p>
                  </td>
                  <td className="center">{data.title}</td>
                  <td className="center">{data.checkOutDate}</td>
                  <td className="center">{data.reservationDate}</td>
                  <td className="center">{data.paymentAmount}</td>
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
