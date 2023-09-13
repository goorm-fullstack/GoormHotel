import React, { useState, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { Container } from './AdminGiftCard';
import { Title, SubmitButton } from './AdminGiftCard';
import { Form, BoldTd, Input, TableTr, Table, TableTd } from './AdminDetailGiftCard';
import { Image } from '../../components/WriteFormRoom';
import { Select } from './AdminItemList';
import styled from 'styled-components';
import Item from '../../images/item/item1.jpg';

const WriteFormSelect = styled(Select)`
  width: 200px;
  margin: 0;
`;

const WriteFormTr = styled(TableTr)`
  height: 100px;
`;

const WriteFormTable = styled(Table)`
  line-height: 100px;
`;

const ImageInput = styled(Input)`
  height: 100px;
  border: none;
`;

const WriteFormButton = styled(SubmitButton)`
  margin-bottom: 60px;
`;

const subMenus = [
  { name: '판매 상품 관리', link: '/admin/item/list' },
  { name: '상품권 관리', link: '/admin/item/giftCard' },
];

const dining = [
  {
    thumnail: Item,
    name: '다이닝상품',
    price: '100,000',
    priceAdult: '100,000',
    priceChildren: '50,000',
    spareAdult: '3',
    spareChildren: '2',
    type: '다이닝',
    detailType: '레스토랑',
    spare: '3',
    useTime: '08:00 ~ 12:00',
  },
];

const AdminDetailDining = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();

  // 이미지 업로드 input의 onChange(이미지 미리보기)
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <Container>
        <Title>다이닝 상세</Title>
        <Form action="#" method="post">
          {dining.map((Item) => {
            return (
              <WriteFormTable>
                <WriteFormTr>
                  <BoldTd>썸네일</BoldTd>
                  <TableTd>
                    <ImageInput type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
                    {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image src={Item.thumnail} alt="프로필 이미지" />}
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>상품명</BoldTd>
                  <TableTd>
                    <Input type="text" value={Item.name} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>상품가격</BoldTd>
                  <TableTd>
                    <Input type="text" value={Item.price} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>어른 추가 비용</BoldTd>
                  <TableTd>
                    <Input type="text" value={Item.priceAdult} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>어린이 추가 비용</BoldTd>
                  <TableTd>
                    <Input type="text" value={Item.priceChildren} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>잔여 객실 수</BoldTd>
                  <TableTd>
                    <Input type="text" value={Item.spare} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>최대 숙박 가능 인원 수(어른)</BoldTd>
                  <TableTd>
                    <Input type="text" value={Item.spareAdult} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>최대 숙박 가능 인원 수(어린이)</BoldTd>
                  <TableTd>
                    <Input type="text" value={Item.spareChildren} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>상품 타입</BoldTd>
                  <TableTd>
                    <Input type="text" value="다이닝" readOnly />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>세부 타입</BoldTd>
                  <TableTd>
                    <WriteFormSelect
                      defaultValue={
                        Item.detailType === '레스토랑'
                          ? 'restaurant'
                          : Item.detailType === '룸서비스'
                          ? 'roomService'
                          : Item.detailType === '바&라운지'
                          ? 'barRounge'
                          : 'bakery'
                      }>
                      <option value="">선택</option>
                      <option value="restaurant">레스토랑</option>
                      <option value="roomService">룸서비스</option>
                      <option value="barRounge">바&라운지</option>
                      <option value="bakery">베이커리</option>
                    </WriteFormSelect>
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>이용 가능 시간</BoldTd>
                  <TableTd>
                    <Input type="text" value={Item.useTime} required />
                  </TableTd>
                </WriteFormTr>
              </WriteFormTable>
            );
          })}
          <WriteFormButton type="submit">수정</WriteFormButton>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default AdminDetailDining;
