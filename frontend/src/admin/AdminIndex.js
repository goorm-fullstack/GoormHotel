import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AdminHeader from './common/AdminHeader';
import { commonAdminContainer, commonContentsStyle, PageTitle } from '../components/common/commonStyles';
import {useEffect, useState} from "react";
import axios from "axios";
import item from "../components/Item";

export const AdminContainer = styled(commonAdminContainer)``;

export const Container = styled(commonContentsStyle)`
  & > h3 {
    border-bottom: 1px solid ${(props) => props.theme.colors.graylightborder};
    padding-bottom: 20px;
    margin-bottom: 32px;
    font-size: ${(props) => props.theme.font.sizem};
    font-weight: bold;
    color: ${(props) => props.theme.colors.goldhover};
    margin-top: 80px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const MenuWrap = styled.ul`
  li {
    line-height: 1.8;
  }

  a {
    color: ${(props) => props.theme.colors.graydark};

    &:hover {
      color: ${(props) => props.theme.colors.charcoal};
    }
  }
`;

const Sitemap = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 100px 32px;

  & > li {
    width: calc((1180px - (32px * 4)) / 5);

    h4 {
      font-weight: 500;
      color: ${(props) => props.theme.colors.charcoal};
      padding-top: 14px;
      margin-bottom: 20px;
    }
  }
`;

const Latest = styled.ul`
  display: flex;
  column-gap: 28px;
  justify-content: space-between;

  & > li {
    width: calc((1180px - (28px * 2)) / 3);
    padding: 28px 22px;
    background-color: ${(props) => props.theme.colors.graybg};
    border-radius: 5px;

    h4 {
      font-weight: 500;
      color: ${(props) => props.theme.colors.charcoal};
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;

      a {
        font-size: ${(props) => props.theme.font.sizexxs};
        letter-spacing: -0.02em;
        color: ${(props) => props.theme.colors.graylight};
        text-decoration: underline;
      }
    }
  }
`;

const LatestList = styled.ul`
  li {
    width: 100%;
    overflow: hidden;
    line-height: 1.8;
    font-size: ${(props) => props.theme.font.sizes};
    letter-spacing: -0.01em;
    position: relative;
    padding-left: 12px;
    display: flex;
    justify-content: space-between;

    &::before {
      content: '';
      display: block;
      width: 3px;
      height: 3px;
      background-color: ${(props) => props.theme.colors.goldhover};
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      border-radius: 50%;
    }

    span {
      font-size: ${(props) => props.theme.font.sizexs};
      color: ${(props) => props.theme.colors.graylight};
    }

    p {
      width: 70%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      a:hover {
        text-decoration: underline;
      }
    }
  }
`;

const AdminIndex = () => {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    axios.get('/boards/find/boardTitle/공지사항').then((response) => {
      setNotice(response.data || []);
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);
  const [review, setReview] = useState([]);
  useEffect(() => {
    axios.get('/boards/find/boardTitle/이용후기').then((response) => {
      setReview(response.data || []);
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);
  const [qna, setQna] = useState([]);
  useEffect(() => {
    axios.get('/boards/find/boardTitle/문의하기').then((response) => {
      setQna(response.data || []);
    })
    .catch((e) => {
      console.error(e);
    })
  }, []);

  console.log(notice);
  console.log(review);
  console.log(qna);

  return (
    <div>
      <AdminHeader />
      <AdminContainer>
        <PageTitle>관리자 홈</PageTitle>
        <Container>
          <h3>최근 소식</h3>
          <Latest>
            <li>
              <h4>
                공지사항<Link to={'/admin/board/1'}>자세히보기</Link>
              </h4>
              <LatestList>
                {notice.slice(0, 3).map((item, index) => (
                    item && (
                        <li key={index}>
                          <p>
                            <Link to={`/board/notice/detail/${item.title}`}>{item.title}</Link>
                          </p>
                          <span>{`${item.boardWriteDate[0]}.${(item.boardWriteDate[1] < 10 ? '0' : '')}${item.boardWriteDate[1]}.${(item.boardWriteDate[2] < 10 ? '0' : '')}${item.boardWriteDate[2]}`}</span>
                        </li>
                    )
                ))}
              </LatestList>
            </li>
            <li>
              <h4>
                문의하기<Link to={'/admin/board/1'}>자세히보기</Link>
              </h4>
              <LatestList>
                {qna.slice(0, 3).map((item, index) => (
                    item && (
                        <li key={index}>
                          <p>
                            <Link to="#">{item.title}</Link>
                          </p>
                          <span>{`${item.boardWriteDate[0]}.${(item.boardWriteDate[1] < 10 ? '0' : '')}${item.boardWriteDate[1]}.${(item.boardWriteDate[2] < 10 ? '0' : '')}${item.boardWriteDate[2]}`}</span>
                        </li>
                    )
                ))}
              </LatestList>
            </li>
            <li>
              <h4>
                이용후기<Link to={'/admin/board/1'}>자세히보기</Link>
              </h4>
              <LatestList>
                {review.slice(0, 3).map((item, index) => (
                    item && (
                        <li key={index}>
                          <p>
                            <Link to="#">{item.title}</Link>
                          </p>
                          <span>{`${item.boardWriteDate[0]}.${(item.boardWriteDate[1] < 10 ? '0' : '')}${item.boardWriteDate[1]}.${(item.boardWriteDate[2] < 10 ? '0' : '')}${item.boardWriteDate[2]}`}</span>
                        </li>
                    )
                ))}
              </LatestList>
            </li>
          </Latest>
          <h3>사이트맵</h3>
          <Sitemap>
            <li>
              <h4>
                <Link to={'/admin/member/1'}>회원 관리</Link>
              </h4>
              <MenuWrap>
                <li>
                  <Link to={'/admin/member/1'}>전체 회원 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/managers/1'}>부운영자 관리</Link>
                </li>
              </MenuWrap>
            </li>

            <li>
              <h4>
                <Link to={'/admin/item/1'}>상품 관리</Link>
              </h4>
              <MenuWrap>
                <li>
                  <Link to={'/admin/item/1'}>판매 상품 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/giftcard/1'}>상품권 관리</Link>
                </li>
              </MenuWrap>
            </li>

            <li>
              <h4>
                <Link to={'/admin/reservation/1'}>예약 관리</Link>
              </h4>
              <MenuWrap>
                <li>
                  <Link to={'/admin/reservation/1'}>예약 관리</Link>
                </li>
              </MenuWrap>
            </li>

            <li>
              <h4>
                <Link to={'/admin/board/1'}>게시판 관리</Link>
              </h4>
              <MenuWrap>
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
              </MenuWrap>
            </li>

            <li>
              <h4>
                <Link to={'/admin/chat/1'}>채팅/메일 관리</Link>
              </h4>
              <MenuWrap>
                <li>
                  <Link to={'/admin/chat/1'}>채팅 관리</Link>
                </li>
                <li>
                  <Link to={'/admin/mail'}>메일 작성</Link>
                </li>
                <li>
                  <Link to={'/admin/subscriber/1'}>구독자 관리</Link>
                </li>
              </MenuWrap>
            </li>
          </Sitemap>
        </Container>
      </AdminContainer>
    </div>
  );
};

export default AdminIndex;
