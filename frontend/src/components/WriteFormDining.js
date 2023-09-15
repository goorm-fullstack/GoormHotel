import React, { useRef, useState } from 'react';
import { Title, SubmitButton } from '../pages/admin/AdminGiftCard';
import { TableTd, TableTr, Table, Form, BoldTd, Input } from '../pages/admin/AdminDetailGiftCard';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Select } from '../pages/admin/AdminItemList';
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

const Image = styled.img`
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

const WriteFormDining = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceAdult: '',
    priceChildren: '',
    type: '다이닝',
    typeDetail: '',
    useTime: '',
    spare: '',
    spareAdult: '',
    spareChildren: '',
  });

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
    form.append('img', imgFile);

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:8080/dinings/dining', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

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
    <>
      <TopOfTable>
        <Title>다이닝 등록</Title>
        <div>
          <TypeLink to="/admin/item/list/writeForm/room">
            <TypeButton type="button">객실 등록</TypeButton>
          </TypeLink>
          <TypeLink to="/admin/item/list/writeForm/dining">
            <TypeButton type="button">다이닝 등록</TypeButton>
          </TypeLink>
        </div>
      </TopOfTable>
      <Form action="#" method="post">
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
              <Input type="text" value="dining" name="type" onChange={handleChange} readOnly />
            </TableTd>
          </WriteFormTr>
          <WriteFormTr>
            <BoldTd>세부 타입</BoldTd>
            <TableTd>
              <WriteFormSelect name="typeDetail" value={formData.typeDetail} onChange={handleChange}>
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
              <Input type="text" name="useTime" value={formData.useTime} onChange={handleChange} required />
            </TableTd>
          </WriteFormTr>
        </WriteFormTable>
        <WriteFormButton type="submit" onSubmit={handleSubmit}>
          등록
        </WriteFormButton>
      </Form>
    </>
  );
};

export default WriteFormDining;
