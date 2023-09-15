import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Container } from './AdminGiftCard';
import { Title, SubmitButton } from './AdminGiftCard';
import { Form, BoldTd, Input, TableTr, Table, TableTd } from './AdminDetailGiftCard';
import { Image } from '../../components/WriteFormRoom';
import { Select } from './AdminItemList';
import styled from 'styled-components';
import Item from '../../images/item/item1.jpg';
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

const room = [
  {
    thumnail: Item,
    name: '룸상품',
    price: '100,000',
    priceAdult: '100,000',
    priceChildren: '50,000',
    spareAdult: '3',
    spareChildren: '2',
    type: '다이닝',
    detailType: '풀 빌라',
    spare: '3',
    bed: '싱글',
    capacity: '10',
  },
];

const AdminDetailRoom = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceAdult: '',
    priceChildren: '',
    type: '',
    typeDetail: '',
    bed: '',
    spare: '',
    spareAdult: '',
    spareChildren: '',
    capacity: '',
  });
  const { type, name } = useParams();
  const [responseData, setResponseData] = useState();

  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${apiUrl}/rooms/${type}/${encodeURIComponent(name)}`);
        console.log(name)
        setResponseData(response.data);
        console.log(responseData);
      } catch (error) {
        console.error('GET 요청 실패', error.message);
        console.log(name);
      }
    };

    fetchData();
  }, [name, type, apiUrl]);


  // 이미지 업로드 input의 onChange(이미지 미리보기)
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
      [name]: value
    });
  };

  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <Container>
        <Title>객실 상세</Title>
        <Form action="#" method="post">
          {responseData &&
              <WriteFormTable>
                <WriteFormTr>
                  <BoldTd>썸네일</BoldTd>
                  <TableTd>
                    <ImageInput type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
                    {imgFile ? <Image src={responseData.thumbnailPath} alt="프로필 이미지" /> : <Image src={Item.thumnail} alt="프로필 이미지" />}
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>상품명</BoldTd>
                  <TableTd>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      defaultValue={responseData.name}
                      onChange={handleChange}
                      required
                    />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>상품가격</BoldTd>
                  <TableTd>
                    <Input type="text" value={responseData.price} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>어른 추가 비용</BoldTd>
                  <TableTd>
                    <Input type="text" value={responseData.priceAdult} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>어린이 추가 비용</BoldTd>
                  <TableTd>
                    <Input type="text" value={responseData.priceChildren} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>잔여 객실 수</BoldTd>
                  <TableTd>
                    <Input type="text" value={responseData.spare} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>최대 숙박 가능 인원 수(어른)</BoldTd>
                  <TableTd>
                    <Input type="text" value={responseData.spareAdult} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>최대 숙박 가능 인원 수(어린이)</BoldTd>
                  <TableTd>
                    <Input type="text" value={responseData.spareChildren} required />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>상품 타입</BoldTd>
                  <TableTd>
                    <Input type="text" value={responseData.type} readOnly />
                  </TableTd>
                </WriteFormTr>
                <WriteFormTr>
                  <BoldTd>세부 타입</BoldTd>
                  <TableTd>
                    <WriteFormSelect
                      defaultValue={
                        responseData.typeDetail === '디럭스'
                          ? 'deluxe'
                          : responseData.typeDetail === '스위트'
                          ? 'sweet'
                          : responseData.typeDetail === '패밀리'
                          ? 'family'
                          : 'poolVilla'
                      }>
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
                    <WriteFormSelect defaultValue={responseData.bed === '싱글' ? 'single' : responseData.bed === '더블/트윈' ? 'double' : 'king'}>
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
                    <Input type="text" value={responseData.capacity} required />
                  </TableTd>
                </WriteFormTr>
              </WriteFormTable>
              }
          <WriteFormButton type="submit">수정</WriteFormButton>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default AdminDetailRoom;
