import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import * as S from './Style';

// props로 사용할 전체 페이지 수
interface TotalPage {
  totalPage: number;
}

// 전체 페이지 배열 만드는 함수
const createPageArray = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
};

// 전체 페이지 배열을 원하는 페이지 단위로 자르는 함수
const chunkArray = (arr: number[], chunkSize: number): number[][] => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

const Paging: React.FC<TotalPage> = (props) => {
  const { page } = useParams<{ page: string }>(); // url 파라미터
  const location = useLocation();
  const afterUrl = location.pathname.replace(page ?? '1', '');
  const totalPages = props.totalPage === 0 ? 1 : props.totalPage; // 전체 페이지 상태관리
  const totalPageArray = createPageArray(totalPages); // 전체 페이지 배열 (예: 총 5 페이지 -> [1, 2, 3, 4, 5])
  const pageArray = chunkArray(totalPageArray, 10); // 페이지 10페이지 단위로 자름(예:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [11, 12, ...])
  const currentPage = page ? parseInt(page, 10) : 1; // 현재페이지
  const [pages, setPages] = useState<number[]>(pageArray.length > 0 ? pageArray[0] : [1]); // 하단 페이지 처리할 배열 상태 관리
  const [pageNumbers, setPageNumbers] = useState<any[]>([]);
  const navigate = useNavigate();

  // 이전 페이지 이동
  const previousPageChange = () => {
    if (currentPage === 1) {
      return `${afterUrl}1`;
    } else {
      // navigate(`${afterUrl}${pages[0]}`);
      return `${afterUrl}${pages[0]}`;
    }
  };

  // 다음 페이지 이동
  const nextPageChange = () => {
    if (currentPage === totalPages) {
      return `${afterUrl}${currentPage}`;
    } else {
      // navigate(`${afterUrl}${pages[0]}`);
      return `${afterUrl}${pages[0]}`;
    }
  };

  // 첫 페이지에서 이전 페이지로 이동 시 발생 이벤트
  const onClickPreviousPage = () => {
    if (currentPage === 1) {
      alert('첫 번째 페이지입니다.');
    } else {
      const currentIndex = pageArray.findIndex((pageArr) => {
        return JSON.stringify(pageArr) === JSON.stringify(pages);
      });
      if (currentIndex > 0) {
        setPages(pageArray[currentIndex - 1]);
      }
    }
  };

  // 마지막 페이지에서 다음 페이지로 이동 시 발생 이벤트
  const onClickNextPage = () => {
    if (currentPage === totalPages) {
      alert('마지막 페이지입니다.');
    } else {
      const currentIndex = pageArray.findIndex((pageArr) => {
        return JSON.stringify(pageArr) === JSON.stringify(pages);
      });
      if (currentIndex < pageArray.length - 1) {
        setPages(pageArray[currentIndex + 1]);
      }
    }
  };

  // 총 페이지 수에 맞게 페이지 태그 생성
  useEffect(() => {
    const pageNumbers = [];
    for (let i = 0; i < pages.length; i++) {
      pageNumbers.push(
        <li key={pages[i]}>
          {pages[i] === currentPage ? (
            <span>{pages[i]}</span> // 현재 페이지는 링크 없이 표시
          ) : (
            <Link to={`${afterUrl}${pages[i]}`}>{pages[i]}</Link>
          )}
        </li>
      );
    }
    setPageNumbers(pageNumbers);
  }, [currentPage]);

  return (
    <S.PageParam>
      <li className="sideParam">
        <Link to={previousPageChange()} onClick={onClickPreviousPage}>
          «
        </Link>
      </li>
      {pageNumbers}
      <li className="sideParam">
        <Link to={nextPageChange()} onClick={onClickNextPage}>
          »
        </Link>
      </li>
    </S.PageParam>
  );
};

export default Paging;
