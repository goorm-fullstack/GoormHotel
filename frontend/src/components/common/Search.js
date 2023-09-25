import React, { useState, useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { BtnWrapper, SubmitBtn } from '../../components/common/commonStyles';

const SearchHeader = styled.div`
  display: flex;
  padding: 20px 0;
  margin-top: 40px;
  justify-content: center;
  column-gap: 10px;

  select {
    width: 120px;
  }
`;

const Search = () => {
  const url = useLocation();
  console.log(url.pathname);

  const { page } = useParams(); // url 파라미터
  console.log(page);

  const [type, setType] = useState('all'); // 타입 상태관리
  const [typeDetail, setTypeDetail] = useState('all'); // 세부 타입 상태관리
  const searchKeyword = useRef(); // 검색어 입력 input

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
      handleLoadItems();
    }
  };

  //전체, 객실, 다이닝 상품 가져오는 로직
  const handleLoadItems = async () => {
    const currentPage = parseInt(page, 10);
    const selectedType = type;
    const selectedTypeDetail = typeDetail;

    // 타입과 세부타입에 따라 요청 api url 변경
    if (selectedType === 'all' && selectedTypeDetail === 'all') {
      url = `/category?page=${currentPage}`;
    } else if (selectedType !== 'all' && selectedTypeDetail !== 'all') {
      url = `/category?type=${selectedType}&typeDetail=${selectedTypeDetail}&page=${currentPage}`;
    } else if (selectedType !== 'all' && selectedTypeDetail === 'all') {
      url = `/category?type=${selectedType}&page=${currentPage}`;
    } else if (selectedType === 'all' && selectedTypeDetail !== 'all') {
      url = `/category?typeDetail=${selectedTypeDetail}&page=${currentPage}`;
    } else {
      url = `/category?page=${currentPage}`;
    }

    if (keyword !== '') {
      url += `&keyword=${keyword}`;
    }
  };

  // 타입 선택에 따른 세부타입 변경
  let detailTypeForType = [];
  type === 'all'
    ? detailTypeForType.push(
        <>
          <option value="all">전체</option>
          {/* <option value="deluxe">디럭스</option>
          <option value="sweet">스위트</option>
          <option value="family">패밀리</option>
          <option value="poolVilla">풀 빌라</option>
          <option value="restaurant">레스토랑</option>
          <option value="roomService">룸서비스</option>
          <option value="barRounge">바&라운지</option>
          <option value="bakery">베이커리</option> */}
        </>
      )
    : type === 'room'
    ? detailTypeForType.push(
        <>
          <option value="all">전체</option>
          <option value="deluxe">디럭스</option>
          <option value="sweet">스위트</option>
          <option value="family">패밀리</option>
          <option value="poolVilla">풀 빌라</option>
        </>
      )
    : detailTypeForType.push(
        <>
          <option value="all">전체</option>
          <option value="restaurant">레스토랑</option>
          <option value="roomService">룸서비스</option>
          <option value="barRounge">바&라운지</option>
          <option value="bakery">베이커리</option>
        </>
      );

  return (
    <SearchHeader>
      <select name="type" value={type} onChange={handleTypeChange}>
        <option value="all">전체</option>
        <option value="room">객실</option>
        <option value="dining">다이닝</option>
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
    </SearchHeader>
  );
};

export default Search;
