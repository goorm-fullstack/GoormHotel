import React, { useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import * as S from './Style';

const Paging = ({ url }) => {
  const location = useLocation();
  console.log(location.pathname);

  const { page } = useParams(); // url 파라미터
  console.log(page);
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 상태관리

  const currentPage = parseInt(page, 10); // 현재페이지
  const navigation = useNavigate();

  const navigateToChatList = (url) => {
    navigation(url);
  };

  // 이전 페이지 이동
  const previousPageChange = () => {
    let route = '';
    if (currentPage === 1) {
      route = `${url}/1`;
    } else {
      route = `${url}/${currentPage - 1}`;
    }
    return route;
  };

  // 다음 페이지 이동
  const nextPageChange = () => {
    let route = '';
    if (currentPage === totalPages) {
      route = `${url}/${currentPage}`;
    } else {
      route = `${url}/${currentPage + 1}`;
    }
    return route;
  };

  // 첫 페이지에서 이전 페이지로 이동 시 발생 이벤트
  const onClickFirstPage = () => {
    if (currentPage === 1) {
      alert('첫 번째 페이지입니다.');
    }
  };

  // 마지막 페이지에서 다음 페이지로 이동 시 발생 이벤트
  const onClickLastPage = () => {
    if (currentPage === totalPages) {
      alert('마지막 페이지입니다.');
    }
  };

  // 총 페이지 수에 맞게 페이지 태그 생성
  const listElements = [];
  for (let i = 1; i <= totalPages; i++) {
    listElements.push(
      <li key={i}>
        <Link to={`${url}/${i}`}>{i}</Link>
      </li>
    );
  }

  return (
    <S.PageParam>
      <li className="sideParam">
        <Link to={previousPageChange()} onClick={onClickFirstPage}>
          «
        </Link>
      </li>
      {listElements}
      <li className="sideParam">
        <Link to={nextPageChange()} onClick={onClickLastPage}>
          »
        </Link>
      </li>
    </S.PageParam>
  );
};

export default Paging;
