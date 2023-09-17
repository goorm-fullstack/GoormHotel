import React, { useEffect, useRef, useState } from 'react';
import { Title, SubmitButton } from '../admin/item/AdminGiftCard';
import { TableTd, TableTr, Table, Form, BoldTd, Input } from '../admin/item/AdminDetailGiftCard';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Select } from '../admin/item/AdminItemList';
import axios from 'axios';

const TopOfTable = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TypeButton = styled(SubmitButton)`
  margin-left: 30px;
  &.active {
    color: #ffffff;
    background-color: #95846e;
  }
`;

const TypeLink = styled(NavLink)`
  &.active ${TypeButton} {
    color: #ffffff;
    background-color: #95846e;
  }
`;

const WriteFormTable = styled(Table)`
  line-height: 100px;
`;

const WriteFormTr = styled(TableTr)`
  height: 100px;
`;

export const Image = styled.img`
  width: 300px;
  vertical-align: middle;
  margin-left: 50px;
`;

const ImageInput = styled(Input)`
  height: 100px;
  border: none;
`;

const WriteFormSelect = styled(Select)`
  width: 200px;
  margin: 0;
`;

const WriteFormButton = styled(SubmitButton)`
  margin-bottom: 60px;
`;

const WriteFormRoom = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceAdult: '',
    priceChildren: '',
    type: 'room',
    typeDetail: '',
    bed: '',
    spare: '',
    spareAdult: '',
    spareChildren: '',
    capacity: '',
  });

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('img', imgRef.current.files[0]);

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    console.log(form);

    try {
      await axios.post('http://localhost:8080/rooms/room', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <TopOfTable>
        <Title>객실 등록</Title>
        <div>
          <TypeLink to="/admin/item/list/writeForm/room">
            <TypeButton type="button">객실 등록</TypeButton>
          </TypeLink>
          <TypeLink to="/admin/item/list/writeForm/dining">
            <TypeButton type="button">다이닝 등록</TypeButton>
          </TypeLink>
        </div>
      </TopOfTable>
      <Form action="#" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <WriteFormTable>
          <WriteFormTr>
            <BoldTd>썸네일</BoldTd>
            <TableTd>
              <ImageInput type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
              {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image style={{ display: 'none' }}></Image>}
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>상품명</BoldTd>
            <TableTd>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>상품가격</BoldTd>
            <TableTd>
              <Input type="text" name="price" value={formData.price} onChange={handleChange} required />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>어른 추가 비용</BoldTd>
            <TableTd>
              <Input type="text" name="priceAdult" onChange={handleChange} value={formData.priceAdult} required />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>어린이 추가 비용</BoldTd>
            <TableTd>
              <Input type="text" name="priceChildren" onChange={handleChange} value={formData.priceChildren} required />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>잔여 객실 수</BoldTd>
            <TableTd>
              <Input type="text" name="spare" onChange={handleChange} value={formData.spare} required />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>최대 숙박 가능 인원 수(어른)</BoldTd>
            <TableTd>
              <Input type="text" name="spareAdult" onChange={handleChange} value={formData.spareAdult} required />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>최대 숙박 가능 인원 수(어린이)</BoldTd>
            <TableTd>
              <Input type="text" name="spareChildren" onChange={handleChange} value={formData.spareChildren} required />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>상품 타입</BoldTd>
            <TableTd>
              <Input type="text" name="type" onChange={handleChange} value="room" readOnly />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>세부 타입</BoldTd>
            <TableTd>
              <WriteFormSelect name="typeDetail" value={formData.typeDetail} onChange={handleChange}>
                <option value="">선택</option>
                <option value="deluxe">디럭스</option>
                <option value="sweet">스위트</option>
                <option value="family">패밀리</option>
                <option value="poolVilla">풀 빌라</option>
              </WriteFormSelect>
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>침대 타입</BoldTd>
            <TableTd>
              <WriteFormSelect name="bed" value={formData.bed} onChange={handleChange}>
                <option value="">선택</option>
                <option value="single">싱글</option>
                <option value="double">더블/트윈</option>
                <option value="king">킹</option>
              </WriteFormSelect>
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>숙박 인원 기준</BoldTd>
            <TableTd>
              <Input type="text" name="capacity" value={formData.capacity} onChange={handleChange} required />
            </TableTd>
          </WriteFormTr>
        </WriteFormTable>
        <WriteFormButton type="submit">등록</WriteFormButton>
      </Form>
    </>
  );
};

export default WriteFormRoom;
