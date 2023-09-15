import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from './AdminLayout';
import { Title, GiftCardTable, TableTr, TableTh, CheckBoxInput, InputLabel, TableListTr, TableTd, DetailLink, TopMenuOfTable } from './AdminGiftCard';
import Item from '../../images/item/item1.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TotalItem = styled.p`
  display: inline-block;
  margin-right: 100px;
`;

export const Select = styled.select`
  margin-left: 30px;
  border: 1px solid #dddddd;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  vertical-align: middle;
`;

const InitButton = styled.button`
  &:hover {
    background-color: #95846e;
    color: #ffffff;
  }
`;

const DeleteButton = styled.button`
  &:hover {
    border: 1px solid #d30a0a;
    color: #d30a0a;
  }
`;

const subMenus = [
  { name: '판매 상품 관리', link: '/admin/item/list' },
  { name: '상품권 관리', link: '/admin/item/giftCard' },
];

const checkboxList = [
  {
    thumnail: Item,
    name: '다이닝상품',
    price: '100,000',
    type: '다이닝',
    detailType: '레스토랑',
    spare: '3',
  },
  {
    thumnail: Item,
    name: '객실 상품',
    price: '100,000',
    type: '객실',
    detailType: '디럭스',
    spare: '3',
  },
];

const AdminItemList = () => {
  const [type, setType] = useState('');
  const [items, setItems] = useState([]);
  const [typeDetail, setTypeDetail] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  console.log(selectedItems);
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

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  //전체, 객실, 다이닝 상품 가져오는 로직
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleLoadItems = async () => {
    let url = '';
    switch (type) {
      case 'room':
        url = `${apiUrl}/rooms`;
        break;
      case 'dining':
        url = `${apiUrl}/dinings`;
        break;
      case 'all':
        url = `${apiUrl}/items`;
        break;
      default:
        url = `${apiUrl}/items`;
        break;
    }

    try {
      const response = await axios.get(url);
      const data = response.data;
      setItems(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    handleLoadItems();
  }, [type]);

  const handleTypeDetailChange = (e) => {
    setTypeDetail(e.target.value);
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
      const url =
        item.type === 'room' ? `${apiUrl}/rooms/room/${encodeURIComponent(item.name)}` : `${apiUrl}/dinings/dining/${encodeURIComponent(item.name)}`;

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

  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <section>
        <Title>판매 상품 관리</Title>
        <TopMenuOfTable>
          <div>
            <TotalItem className="number-of-list">전체{items.length}건</TotalItem>
            <Select name="type" value={type} onChange={handleTypeChange}>
              <option value="all">전체</option>
              <option value="room">객실</option>
              <option value="dining">다이닝</option>
            </Select>
            <Select name="typeDetail" value={typeDetail} onChange={handleTypeDetailChange}>
              <option value="">전체</option>
              <option value="deluxe">디럭스</option>
              <option value="sweet">스위트</option>
              <option value="family">패밀리</option>
              <option value="poolVilla">풀 빌라</option>
              <option value="restaurant">레스토랑</option>
              <option value="roomService">룸서비스</option>
              <option value="barRounge">바&라운지</option>
              <option value="bakery">베이커리</option>
            </Select>
          </div>
          <div>
            <Link to="writeForm/room">
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
              <TableTh>
                <CheckBoxInput type="checkbox" id="all-select-label" onClick={handleAllChecked} />
                <InputLabel htmlFor="all-select-label"></InputLabel>
              </TableTh>
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
            {items
              .filter((item) => typeDetail === '' || item.typeDetail === typeDetail)
              .map((item, idx) => {
                const id = 'checkbox' + idx;
                return (
                  <TableListTr key={idx}>
                    <TableTd>
                      <CheckBoxInput
                        type="checkbox"
                        id={id}
                        ref={(el) => (inputRef.current[idx] = el)}
                        onClick={() => handleCheckboxClick(idx, item.name, item.type)}
                      />
                      <InputLabel htmlFor={id}></InputLabel>
                    </TableTd>
                    <TableTd>{idx + 1}</TableTd>
                    <TableTd>
                      <Image src={item.thumbnailPath} />
                    </TableTd>
                    <TableTd>
                      {item.type === '다이닝' ? (
                        <DetailLink to={`view/dining/${item.type}/${item.name}`}>{item.name}</DetailLink>
                      ) : (
                        <DetailLink to={`view/room/${item.type}/${item.name}`}>{item.name}</DetailLink>
                      )}
                    </TableTd>
                    <TableTd>{item.price}</TableTd>
                    <TableTd>{item.type}</TableTd>
                    <TableTd>{item.typeDetail}</TableTd>
                    <TableTd>{item.spare}</TableTd>
                  </TableListTr>
                );
              })}
          </tbody>
        </GiftCardTable>
      </section>
    </AdminLayout>
  );
};

export default AdminItemList;
