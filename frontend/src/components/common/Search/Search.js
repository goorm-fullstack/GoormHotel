import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './Style';
import { BtnWrapper, SubmitBtn } from '../../../Style/commonStyles';

// endPoint = api의 엔드포인트
const Search = (endPoint, typeArray, typeDetailArray) => {
  const { page } = useParams(); // url 파라미터
  console.log(page);
  const [currentUrl, setCurrentUrl] = useState('');
  const [type, setType] = useState('all'); // 타입 상태관리
  const [typeDetail, setTypeDetail] = useState('all'); // 세부 타입 상태관리
  const searchKeyword = useRef(); // 검색어 입력 input
  const [detailTypeForType, setDetailTypeForType] = useState([]);

  let keyword = ''; // 검색어

  // type 변경
  const handleTypeChange = (e) => {
    keyword = '';
    searchKeyword.current.value = '';
    const selectedType = e.target.value;
    setType(selectedType);
  };

  // typeDetail 변경
  const handleTypeDetailChange = (e) => {
    keyword = '';
    searchKeyword.current.value = '';
    const selectedTypeDetail = e.target.value;
    setTypeDetail(selectedTypeDetail);
  };

  // 검색 버튼 클릭 이벤트
  const handleSearch = () => {
    keyword = searchKeyword.current.value;
    if (keyword === '') {
      alert('검색어를 입력해주세요.');
    } else {
      handleLoadUrl();
    }
  };

  const selectedType = type;
  const selectedTypeDetail = typeDetail;
  // type, typeDetail, keyword에 따라 url 생성
  const handleLoadUrl = async () => {
    const currentPage = parseInt(page, 10);
    let url = '';

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
  }, [page, type, typeDetail, keyword]);

  const generateOptions = (item, selectedType) => {
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
    const updatedDetailTypeForType = [];
    let selectedType = type;
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
          <input type="text" id="search" ref={searchKeyword} placeholder="제목+내용" />
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
