import * as S from './Style';
import { Link } from 'react-router-dom';
import AdminHeader from '../common/AdminHeader';
import { PageTitle } from '../../Style/commonStyles';
import { useEffect, useState } from 'react';
import Instance from '../../utils/api/axiosInstance';
import { BoardData } from '../board/AdminBoard';

const AdminIndex = () => {
  const [notice, setNotice] = useState<BoardData[]>([]);

  useEffect(() => {
    Instance.get('/boards/find/boardTitle/공지사항')
      .then((response) => {
        setNotice(response.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [review, setReview] = useState<BoardData[]>([]);

  useEffect(() => {
    Instance.get('/boards/find/boardTitle/이용후기')
      .then((response) => {
        setReview(response.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [qna, setQna] = useState<BoardData[]>([]);

  useEffect(() => {
    Instance.get('/boards/find/boardTitle/문의하기')
      .then((response) => {
        setQna(response.data || []);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
//http://localhost:3000/admin/board/qna/detail/1
  return (
    <div>
      <AdminHeader />
      <S.AdminContainer>
        <PageTitle>관리자 홈</PageTitle>
        <S.Container>
          <h3>최근 소식</h3>
          <S.Latest>
            <li>
              <h4>
                공지사항<Link to={'/admin/board/1'}>자세히보기</Link>
              </h4>
              <S.LatestList>
                {notice.slice(0, 3).map(
                  (item, index) =>
                    item && (
                      <li key={index}>
                        <p>
                          <Link to={`/admin/board/notice/detail/${item.boardId}`}>{item.title}</Link>
                        </p>
                        <span>{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${item.boardWriteDate[1]}.${
                          item.boardWriteDate[2] < 10 ? '0' : ''
                        }${item.boardWriteDate[2]}`}</span>
                      </li>
                    )
                )}
              </S.LatestList>
            </li>
            <li>
              <h4>
                문의하기<Link to={'/admin/board/1'}>자세히보기</Link>
              </h4>
              <S.LatestList>
                {qna.slice(0, 3).map(
                  (item, index) =>
                    item && (
                      <li key={index}>
                        <p>
                        <Link to={`/admin/board/qna/detail/${item.boardId}`}>{item.title}</Link>
                        </p>
                        <span>{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${item.boardWriteDate[1]}.${
                          item.boardWriteDate[2] < 10 ? '0' : ''
                        }${item.boardWriteDate[2]}`}</span>
                      </li>
                    )
                )}
              </S.LatestList>
            </li>
            <li>
              <h4>
                이용후기<Link to={'/admin/board/1'}>자세히보기</Link>
              </h4>
              <S.LatestList>
                {review.slice(0, 3).map(
                  (item, index) =>
                    item && (
                      <li key={index}>
                        <p>
                        <Link to={`/admin/board/review/detail/${item.boardId}`}>{item.title}</Link>
                        </p>
                        <span>{`${item.boardWriteDate[0]}.${item.boardWriteDate[1] < 10 ? '0' : ''}${item.boardWriteDate[1]}.${
                          item.boardWriteDate[2] < 10 ? '0' : ''
                        }${item.boardWriteDate[2]}`}</span>
                      </li>
                    )
                )}
              </S.LatestList>
            </li>
          </S.Latest>
          <h3>사이트맵</h3>
          <S.Sitemap>
            <li>
              <h4>
                <Link to={'/admin/member/1'}>회원 관리</Link>
              </h4>
              <S.MenuWrap>
                <li>
                  <Link to={'/admin/member/1'}>전체 회원 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/managers/1'}>부운영자 관리</Link>
                </li>
              </S.MenuWrap>
            </li>

            <li>
              <h4>
                <Link to={'/admin/item/1'}>상품 관리</Link>
              </h4>
              <S.MenuWrap>
                <li>
                  <Link to={'/admin/item/1'}>판매 상품 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/giftcard/1'}>상품권 관리</Link>
                </li>
              </S.MenuWrap>
            </li>

            <li>
              <h4>
                <Link to={'/admin/reservation/1'}>예약 관리</Link>
              </h4>
              <S.MenuWrap>
                <li>
                  <Link to={'/admin/reservation/1'}>예약 관리</Link>
                </li>
              </S.MenuWrap>
            </li>

            <li>
              <h4>
                <Link to={'/admin/board/1'}>게시판 관리</Link>
              </h4>
              <S.MenuWrap>
                <li>
                  <Link to={'/admin/board/1'}>게시글 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/comments/1'}>댓글 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/deletepost/1'}>삭제된 글 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/report/1'}>신고 관리</Link>
                </li>
              </S.MenuWrap>
            </li>

            <li>
              <h4>
                <Link to={'/admin/chat/1'}>채팅/메일 관리</Link>
              </h4>
              <S.MenuWrap>
                <li>
                  <Link to={'/admin/chat/1'}>채팅 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/mail'}>메일 작성</Link>
                </li>
                <li>
                  <Link to={'/admin/subscriber/1'}>구독자 관리</Link>
                </li>
              </S.MenuWrap>
            </li>
          </S.Sitemap>
        </S.Container>
      </S.AdminContainer>
    </div>
  );
};

export default AdminIndex;
