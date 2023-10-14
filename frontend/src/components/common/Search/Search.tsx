import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './Style';
import { BtnWrapper, SubmitBtn } from '../../../Style/commonStyles';

// 대분류 배열 타입
export interface Type {
  type: string;
  value: string;
}

// 소분류 배열 타입
export interface TypeDetail {
  type: string;
  typeDetail: string;
  value: string;
}

// endPoint = api의 엔드포인트
const Search = (endPoint: string, typeArray: Type[][], typeDetailArray: TypeDetail[][]) => {
  const { page } = useParams<{ page: string }>(); // url 파라미터
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [type, setType] = useState<string>('all'); // 타입 상태관리
  const [typeDetail, setTypeDetail] = useState<string>('all'); // 세부 타입 상태관리
  const searchKeyword = useRef<HTMLInputElement>(null); // 검색어 입력 input
  const [detailTypeForType, setDetailTypeForType] = useState<JSX.Element[]>([]); // 대분류에 따라 소분류 상태관리
  const [keyword, setKeyword] = useState<string>(''); // 검색어 상태관리

  // type 변경
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (searchKeyword.current) {
      searchKeyword.current.value = '';
    }
    setKeyword('');
    const selectedType = e.target.value;
    setType(selectedType);
  };

  // typeDetail 변경
  const handleTypeDetailChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (searchKeyword.current) {
      searchKeyword.current.value = '';
    }
    setKeyword('');
    const selectedTypeDetail = e.target.value;
    setTypeDetail(selectedTypeDetail);
  };

  // 검색어 입력
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchKeyword.current) {
      setKeyword(searchKeyword.current.value);
    }
  };

  // 검색 버튼 클릭 이벤트
  const handleSearch = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
    } else {
      handleLoadUrl();
    }
  };

  const selectedType: string = type;
  const selectedTypeDetail: string = typeDetail;
  // type, typeDetail, keyword에 따라 url 생성
  const handleLoadUrl = async () => {
    const currentPage: number = parseInt(page ? page : '1', 10);
    let url: string = '';

    // 타입과 세부타입에 따라 요청 api url 변경
    if (selectedType === 'all' && selectedTypeDetail === 'all') {
      url = `${endPoint}?page=${currentPage}`;
    } else if (selectedType !== 'all' && selectedTypeDetail !== 'all') {
      url = `${endPoint}?type=${selectedType}&typeDetail=${selectedTypeDetail}&page=${currentPage}`;
    } else if (selectedType !== 'all' && selectedTypeDetail === 'all') {
      url = `${endPoint}?type=${selectedType}&page=${currentPage}`;
    } else if (selectedType === 'all' && selectedTypeDetail !== 'all') {
      url = `${endPoint}?typeDetail=${selectedTypeDetail}&page=${currentPage}`;
    } else {
      url = `${endPoint}?page=${currentPage}`;
    }

    if (keyword !== '') {
      url += `&keyword=${keyword}`;
    }

    setCurrentUrl(url);
  };

  // page, type, typeDetail, keyword가 변할 때 마다 실행
  useEffect(() => {
    handleLoadUrl();
  }, [page, type, typeDetail]);

  const generateOptions = (item: TypeDetail, selectedType: string) => {
    if (item.type === selectedType) {
      return (
        <option key={item.value} value={item.value}>
          {item.typeDetail}
        </option>
      );
    }
  };

  // 타입 선택에 따른 세부타입 변경
  useEffect(() => {
    const updatedDetailTypeForType: any[] = [];
    const selectedType: string = type;
    typeDetailArray.forEach((array) => array.forEach((item) => updatedDetailTypeForType.push(generateOptions(item, selectedType))));
    setDetailTypeForType(updatedDetailTypeForType);
  }, [type]);

  return {
    searchJsx: (
      <S.SearchHeader>
        <select name="type" value={type} onChange={handleTypeChange}>
          {typeArray.map((item, index) => {
            return item.map((obj, idx) => (
              <option key={`${index}-${idx}`} value={obj.value}>
                {obj.type}
              </option>
            ));
          })}
        </select>
        <select name="typeDetail" value={typeDetail} onChange={handleTypeDetailChange}>
          {detailTypeForType}
        </select>
        <BtnWrapper className="flexgap right">
          <input type="text" id="search" ref={searchKeyword} placeholder="검색어를 입력하세요." onChange={handleKeywordChange} />
          <SubmitBtn type="button" className="header search" onClick={handleSearch}>
            검색
          </SubmitBtn>
        </BtnWrapper>
      </S.SearchHeader>
    ),
    url: currentUrl,
  };
};

export default Search;
