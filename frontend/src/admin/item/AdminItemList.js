import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { Title, GiftCardTable, TableTr, TableTh, TableListTr, TableTd, DetailLink, TopMenuOfTable } from './AdminGiftCard';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { TableCheckbox } from '../member/AdminMember';
import { PageParam } from '../board/AdminReport';
import { NavLink } from 'react-router-dom';

// 전체 데이터 갯수 표시 태그
const TotalItem = styled.p`
  display: inline-block;
  margin-right: 100px;
`;

// 카테고리 셀렉트
export const Select = styled.select`
  margin-left: 30px;
  border: 1px solid #dddddd; // theme.colors.grayborder
`;

// 썸네일 표시
const Image = styled.img`
  width: 60px;
  height: 60px;
  vertical-align: middle;
`;

// 상품 등록 버튼
const InitButton = styled.button`
  &:hover {
    background-color: #95846e; // theme.colors.
    color: #ffffff;
  }
`;

// 상품 삭제 버튼
const DeleteButton = styled.button`
  &:hover {
    border: 1px solid #d30a0a; // theme.colors.red
    color: #d30a0a; // theme.colors.red
  }
`;

// 체크박스
const CheckBox = styled(TableCheckbox)`
  margin: 0;
  vertical-align: middle;
`;

const CheckBoxTh = styled.th`
  width: 30px;
`;

const CheckBoxTd = styled.td`
  width: 30px;
`;

// 최하단 페이징 링크
const PageLink = styled(NavLink)`
  &.active {
    color: #baa085; // theme.colors.gold
    text-decoration: underline;
  }
`;

// 상단 검색 input
const SearchInput = styled.input`
  height: 40px;
  margin-left: 20px;
`;

const AdminItemList = () => {
  const { page } = useParams(); // url 파라미터

  const subMenus = [
    { name: '판매 상품 관리', link: `/admin/item/list/${page}` },
    { name: '상품권 관리', link: '/admin/item/giftCard' },
  ];
  const [type, setType] = useState('all'); // 타입 상태관리
  const [items, setItems] = useState([]); // get 요청으로 받아온 전체 데이터 상태관리
  const [typeDetail, setTypeDetail] = useState('all'); // 세부 타입 상태관리
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 상품 상태관리
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 상태관리
  const [totalData, setTotalData] = useState(0); // 전체 데이터 수 상태관리

  let itemsToDelete = [];

  // 체크박스 전체 선택 or 해체 기능
  const inputRef = useRef([]);

  const handleAllChecked = (e) => {
    inputRef.current.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  // 삭제 버튼 클릭 이벤트
  const deleteButton = () => {
    itemsToDelete = [];

    inputRef.current.forEach((checkbox) => {
      if (checkbox.checked) {
        const itemName = checkbox.parentNode.nextSibling.nextSibling.nextSibling.innerText;
        itemsToDelete.push(itemName);
      }
    });

    //삭제 확인
    let isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      // 삭제
      handleDeleteItems(itemsToDelete);
    } else {
      return;
    }
  };

  const searchKeyword = useRef(); // 검색어 입력 input
  let keyword = ''; // 검색어
  let url = ''; // 상품 get 요청 url

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

    try {
      const response = await axios.get(url);
      const data = response.data;
      const totalPages = parseInt(response.headers['totalpages'], 10);
      const totalData = parseInt(response.headers['totaldata'], 10);
      setItems(data);
      setTotalPages(totalPages);
      setTotalData(totalData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // 총 페이지 수에 맞게 페이지 태그 생성
  const listElements = [];
  for (let i = 1; i <= totalPages; i++) {
    listElements.push(
      <li key={i}>
        <PageLink to={`/admin/item/list/${i}`}>{i}</PageLink>
      </li>
    );
  }

  //체크한 아이템 selectedItems 배열에 추가,해제하는 로직
  const handleCheckboxClick = (idx, itemName, type) => {
    const isSelected = selectedItems.some((item) => item.id === idx);

    if (isSelected) {
      // 이미 선택된 경우, 해당 아이템을 제거
      setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== idx));
    } else {
      // 선택되지 않은 경우, 아이템을 추가
      setSelectedItems((prevItems) => [...prevItems, { id: idx, name: itemName, type: type }]);
    }
  };
  // type에 따라서 삭제요청
  const handleDeleteItems = () => {
    const deletions = selectedItems.map((item) => {
      const url = item.type === 'room' ? `/rooms/room/${encodeURIComponent(item.name)}` : `/dinings/dining/${encodeURIComponent(item.name)}`;

      return axios.delete(url);
    });

    Promise.all(deletions)
      .then((responses) => {
        const successfulDeletions = responses.filter((response) => response.status === 200);
        if (successfulDeletions.length === deletions.length) {
          setSelectedItems([]); // 모든 항목이 성공적으로 삭제된 경우 selectedItems를 초기화합니다.
        } else {
          throw new Error('모든 항목을 삭제하지 못했습니다.');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  useEffect(() => {
    handleLoadItems();
  }, [page, type, typeDetail]);

  const [imageUrls, setImageUrls] = useState([]);

  // 서버에 저장된 이미지 요청
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        items.map(async (item) => {
          const response = await axios.get(`/image/${item.name}`, { responseType: 'arraybuffer' });
          console.log(response);
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          console.log('blob = ', blob);
          return URL.createObjectURL(blob);
        })
      );
      setImageUrls(urls);
      console.log(urls);
    };

    fetchImageUrls();
  }, [items]);

  const currentPage = parseInt(page, 10); // 현재페이지

  // 이전 페이지 이동
  const previousPageChange = () => {
    let route = '';
    if (currentPage === 1) {
      route = '/admin/item/list/1';
    } else {
      route = `/admin/item/list/${currentPage - 1}`;
    }
    return route;
  };

  // 다음 페이지 이동
  const nextPageChange = () => {
    let route = '';
    if (currentPage === totalPages) {
      route = `/admin/item/list/${currentPage}`;
    } else {
      route = `/admin/item/list/${currentPage + 1}`;
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

  // 숫자 포맷
  const addComma = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 타입 선택에 따른 세부타입 변경
  let detailTypeForType = [];
  type === 'all'
    ? detailTypeForType.push(
        <>
          <option value="all">전체</option>
          <option value="deluxe">디럭스</option>
          <option value="sweet">스위트</option>
          <option value="family">패밀리</option>
          <option value="poolVilla">풀 빌라</option>
          <option value="restaurant">레스토랑</option>
          <option value="roomService">룸서비스</option>
          <option value="barRounge">바&라운지</option>
          <option value="bakery">베이커리</option>
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
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <section>
        <Title>판매 상품 관리</Title>
        <TopMenuOfTable>
          <div>
            <TotalItem className="number-of-list">전체{totalData}건</TotalItem>
            <Select name="type" value={type} onChange={handleTypeChange}>
              <option value="all">전체</option>
              <option value="room">객실</option>
              <option value="dining">다이닝</option>
            </Select>
            <Select name="typeDetail" value={typeDetail} onChange={handleTypeDetailChange}>
              {detailTypeForType}
            </Select>
          </div>
          <div>
            <label htmlFor="search">상품 검색 :</label>
            <SearchInput type="text" id="search" ref={searchKeyword} />
            <InitButton type="button" onClick={handleSearch}>
              검색
            </InitButton>
          </div>
          <div>
            <Link to="/admin/item/list/writeForm/room">
              <InitButton type="button">상품등록</InitButton>
            </Link>
            <DeleteButton type="button" onClick={deleteButton}>
              선택삭제
            </DeleteButton>
          </div>
        </TopMenuOfTable>
        <GiftCardTable>
          <thead>
            <TableTr>
              <CheckBoxTh>
                <CheckBox type="checkbox" id="all-select-label" onClick={handleAllChecked} />
              </CheckBoxTh>
              <TableTh>No.</TableTh>
              <TableTh>썸네일</TableTh>
              <TableTh>상품명</TableTh>
              <TableTh>상품가격</TableTh>
              <TableTh>상품타입</TableTh>
              <TableTh>세부타입</TableTh>
              <TableTh>남은 상품 수</TableTh>
            </TableTr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const id = 'checkbox' + idx;
              return (
                <TableListTr key={idx}>
                  <CheckBoxTd>
                    <CheckBox
                      type="checkbox"
                      id={id}
                      ref={(el) => (inputRef.current[idx] = el)}
                      onClick={() => handleCheckboxClick(idx, item.name, item.type)}
                    />
                  </CheckBoxTd>
                  <TableTd>{idx + 1}</TableTd>
                  <TableTd>
                    <Image src={imageUrls[idx] || ''} className="image" />
                  </TableTd>
                  <TableTd>
                    {item.type === 'dining' ? (
                      <DetailLink to={`/admin/item/list/view/dining/${item.type}/${item.name}`}>{item.name}</DetailLink>
                    ) : (
                      <DetailLink to={`/admin/item/list/view/room/${item.type}/${item.name}`}>{item.name}</DetailLink>
                    )}
                  </TableTd>
                  <TableTd>{addComma(item.price)}</TableTd>
                  <TableTd>{item.type}</TableTd>
                  <TableTd>{item.typeDetail}</TableTd>
                  <TableTd>{item.spare}</TableTd>
                </TableListTr>
              );
            })}
          </tbody>
        </GiftCardTable>
        <PageParam>
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
        </PageParam>
      </section>
    </AdminLayout>
  );
};

export default AdminItemList;
