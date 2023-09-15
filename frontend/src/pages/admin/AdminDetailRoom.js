import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Container } from './AdminGiftCard';
import { Title, SubmitButton } from './AdminGiftCard';
import { Form, BoldTd, Input, TableTr, Table, TableTd } from './AdminDetailGiftCard';
import { Image } from '../../components/WriteFormRoom';
import { Select } from './AdminItemList';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const AdminDetailRoom = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const { type, name } = useParams();
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    axios.get(`/rooms/${type}/${encodeURIComponent(name)}`).then((response) => {
      setResponseData(response.data);
    });
  }, []);

  console.log(responseData);

  // 이미지 업로드 input의 onChange(이미지 미리보기)
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    imgRef.current.src = imgFile;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setResponseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('img', imgRef.current.files[0]);

    Object.keys(responseData).forEach((key) => {
      form.append(key, responseData[key]);
      console.log('formdata = ', responseData[key]);
    });

    try {
      await axios.put(`/rooms/${type}/${encodeURIComponent(name)}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('성공');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <Container>
        <Title>객실 상세</Title>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          {responseData && (
            <WriteFormTable>
              <WriteFormTr>
                <BoldTd>썸네일</BoldTd>
                <TableTd>
                  <ImageInput type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
                  {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image src={responseData.thumnailPath} alt="프로필 이미지"></Image>}
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>상품명</BoldTd>
                <TableTd>
                  <Input type="text" name="name" defaultValue={responseData.name} onChange={handleChange} required />
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>상품가격</BoldTd>
                <TableTd>
                  <Input type="text" name="price" defaultValue={responseData.price} onChange={handleChange} required />
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>어른 추가 비용</BoldTd>
                <TableTd>
                  <Input type="text" name="priceAdult" defaultValue={responseData.priceAdult} onChange={handleChange} required />
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>어린이 추가 비용</BoldTd>
                <TableTd>
                  <Input type="text" name="priceChildren" defaultValue={responseData.priceChildren} onChange={handleChange} required />
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>잔여 객실 수</BoldTd>
                <TableTd>
                  <Input type="text" name="spare" defaultValue={responseData.spare} onChange={handleChange} required />
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>최대 숙박 가능 인원 수(어른)</BoldTd>
                <TableTd>
                  <Input type="text" name="spareAdult" defaultValue={responseData.spareAdult} onChange={handleChange} required />
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>최대 숙박 가능 인원 수(어린이)</BoldTd>
                <TableTd>
                  <Input type="text" name="spareChildren" defaultValue={responseData.spareChildren} onChange={handleChange} required />
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>상품 타입</BoldTd>
                <TableTd>
                  <Input type="text" name="type" defaultValue={responseData.type} readOnly />
                </TableTd>
              </WriteFormTr>
              <WriteFormTr>
                <BoldTd>세부 타입</BoldTd>
                <TableTd>
                  <WriteFormSelect name="typeDetail" defaultValue={responseData.typeDetail} onChange={handleChange}>
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
                  <WriteFormSelect name="bed" defaultValue={responseData.bed} onChange={handleChange}>
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
                  <Input type="text" name="capacity" defaultValue={responseData.capacity} onChange={handleChange} required />
                </TableTd>
              </WriteFormTr>
            </WriteFormTable>
          )}
          <WriteFormButton type="submit">수정</WriteFormButton>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default AdminDetailRoom;
