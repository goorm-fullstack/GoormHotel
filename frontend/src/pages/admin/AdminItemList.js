import React, { useRef } from 'react';
import styled from 'styled-components';
import AdminLayout from './AdminLayout';
import { Title, GiftCardTable, TableTr, TableTh, CheckBoxInput, InputLabel, TableListTr, TableTd, DetailLink, TopMenuOfTable } from './AdminGiftCard';
import Item from '../../images/item/item1.jpg';
import { Link } from 'react-router-dom';

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
  const length = checkboxList.length;
  let name = [];

  // 체크박스 전체 선택 or 해체 기능
  const inputRef = useRef([]);

  const handleAllChecked = (e) => {
    inputRef.current.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  // 삭제 버튼 클릭 이벤트
  const deleteButton = () => {
    inputRef.current.forEach((checkbox) => {
      if (checkbox.checked) {
        const itemName = checkbox.parentNode.nextSibling.nextSibling.nextSibling.innerText;
        name.push(itemName);
      }
    });

    //삭제 확인
    let isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      // 삭제
    } else {
      return;
    }
  };

  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <section>
        <Title>판매 상품 관리</Title>
        <TopMenuOfTable>
          <div>
            <TotalItem className="number-of-list">전체{length}건</TotalItem>
            <Select name="type">
              <option value="">전체</option>
              <option value="room">객실</option>
              <option value="dining">다이닝</option>
            </Select>
            <Select name="typeDetail">
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
            {checkboxList.map((item, idx) => {
              const id = 'checkbox' + idx;
              return (
                <TableListTr>
                  <TableTd>
                    <CheckBoxInput type="checkbox" id={id} ref={(el) => (inputRef.current[idx] = el)} />
                    <InputLabel htmlFor={id}></InputLabel>
                  </TableTd>
                  <TableTd>{idx + 1}</TableTd>
                  <TableTd>
                    <Image src={item.thumnail}></Image>
                  </TableTd>
                  <TableTd>
                    {item.type === '다이닝' ? (
                      <DetailLink to={`view/dining/${idx}`}>{item.name}</DetailLink>
                    ) : (
                      <DetailLink to={`view/room/${idx}`}>{item.name}</DetailLink>
                    )}
                  </TableTd>
                  <TableTd>{item.price}</TableTd>
                  <TableTd>{item.type}</TableTd>
                  <TableTd>{item.detailType}</TableTd>
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
