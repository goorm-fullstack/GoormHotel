import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, NormalLinkBtn } from '../../components/common/commonStyles';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, TableHeader } from '../member/AdminMember';
import Paging from '../../components/common/Paging';
import Search from '../../components/common/Search';
import { numberWithCommas } from '../../utils/function/comma';

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

const AdminItemList = () => {
  // 대분류, 소분류 지정 배열
  const typeDetailArray = [
    [{ type: 'all', typeDetail: '카테고리', value: 'all' }],
    [
      { type: 'room', typeDetail: '전체', value: 'all' },
      { type: 'room', typeDetail: '디럭스', value: 'deluxe' },
      { type: 'room', typeDetail: '스위트', value: 'sweet' },
      { type: 'room', typeDetail: '패밀리', value: 'family' },
      { type: 'room', typeDetail: '풀 빌라', value: 'poolvilla' },
    ],
    [
      { type: 'dining', typeDetail: '전체', value: 'all' },
      { type: 'dining', typeDetail: '레스토랑', value: 'restaurant' },
      { type: 'dining', typeDetail: '룸서비스', value: 'roomService' },
      { type: 'dining', typeDetail: '바&라운지', value: 'barRounge' },
      { type: 'dining', typeDetail: '베이커리', value: 'bakery' },
    ],
  ];

  const typeArray = [[{ type: '전체', value: 'all' }], [{ type: '객실', value: 'room' }], [{ type: '다이닝', value: 'dining' }]];

  let { searchJsx, url } = Search('/category', typeArray, typeDetailArray); // Search컴포넌트에서 값 받아와서 사용
  console.log(url);
  const { page } = useParams(); // url 파라미터

  const [items, setItems] = useState([]); // get 요청으로 받아온 전체 데이터 상태관리

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

  // 전체, 객실, 다이닝 상품 가져오는 로직
  const handleLoadItems = async () => {
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
  }, [page, url]);

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

  return (
    <AdminLayout subMenus="item">
      <Container>
        <PageTitle>판매 상품 관리</PageTitle>
        <TableHeader>
          <div>
            <p className="total number-of-list">
              전체 <strong>{totalData}</strong> 건
            </p>
          </div>
          <BtnWrapper className="flexgap right">
            <NormalLinkBtn className="header" to="/admin/item/add/room">
              객실 상품 등록
            </NormalLinkBtn>
            <NormalLinkBtn className="header" to="/admin/item/add/dining">
              다이닝 상품 등록
            </NormalLinkBtn>
            <NormalBtn className="header red" type="button" onClick={deleteButton}>
              선택삭제
            </NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <colgroup>
            <col width="80px" />
            <col width="100px" />
            <col width="180px" />
            <col width="200px" />
            <col width="200px" />
            <col width="200px" />
            <col width="200px" />
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" id="all-select-label" onClick={handleAllChecked} />
              </th>
              <th>번호</th>
              <th>이미지</th>
              <th>상품명</th>
              <th>종류</th>
              <th>카테고리</th>
              <th>상품가</th>
              <th>재고</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="8" className="center empty">
                  등록된 상품이 없습니다.
                </td>
              </tr>
            )}
            {items &&
              items.map((item, idx) => {
                const id = 'checkbox' + idx;
                return (
                  <tr key={idx}>
                    <td>
                      <InputCheckbox
                        type="checkbox"
                        id={id}
                        ref={(el) => (inputRef.current[idx] = el)}
                        onClick={() => handleCheckboxClick(idx, item.name, item.type)}
                      />
                    </td>
                    <td>{totalData - idx}</td>
                    <td>
                      <Image src={imageUrls[idx] || ''} className="image" />
                    </td>
                    <td>
                      {item.type === 'dining' ? (
                        <Link to={`/admin/item/detail/dining/${item.type}/${item.name}`}>{item.name}</Link>
                      ) : (
                        <Link to={`/admin/item/detail/room/${item.type}/${item.name}`}>{item.name}</Link>
                      )}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.typeDetail}</td>
                    <td>{numberWithCommas(item.price)}</td>
                    <td>{item.spare}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Paging />
        {searchJsx}
      </Container>
    </AdminLayout>
  );
};

export default AdminItemList;
