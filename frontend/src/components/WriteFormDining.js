import React, { useRef, useState } from 'react';
import { SubmitButton } from '../admin/item/AdminGiftCard';
import { TableTd, TableTr, Form, BoldTd, Input } from '../admin/item/AdminDetailGiftCard';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Select } from '../admin/item/AdminItemList';
import {
  Container,
  Title,
  ContentHeader,
  Total,
  BlackListBtn,
  Delete,
  Add,
  Table,
  TableCheckboxWrapper,
  TableHeader,
  TableCell,
  TableCheckbox,
  Num,
} from '../admin/member/AdminMember';
import axios from 'axios';

// 테이블 상단
const TopOfTable = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 객실 등록 OR 다이닝 등록 버튼
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

// 테이블
const WriteFormTable = styled(Table)``;

const WriteFormTr = styled(TableTr)`
  height: 200px;
`;

const WriteFormTd = styled(TableTd)`
  vertical-align: middle;
`;

const WriteFormBoldTd = styled(BoldTd)`
  vertical-align: middle;
`;

// 이미지 미리보기
const Image = styled.img`
  width: 300px;
  vertical-align: middle;
  margin-left: 50px;
`;

// 이미지 선택
const ImageInput = styled(Input)`
  margin-top: 60px;
  height: 100px;
  border: none;
`;

// 세부타입 선택
const WriteFormSelect = styled(Select)`
  width: 200px;
  margin: 0;
`;

// 수정 버튼
const WriteFormButton = styled(SubmitButton)`
  margin-bottom: 60px;
`;

// 중복검사버튼
const DuplicateButton = styled.button`
  vertical-align: middle;
  margin-left: 50px;
  width: 100px;
  height: 40px;
  color: #95846e;
  background-color: #ffffff;
  border: 1px solid rgb(186, 160, 133);
  &:hover {
    color: #ffffff;
    background-color: #95846e;
  }
`;

// 중복검사 경고 문구
const RedP = styled.p`
  color: #ec5353;
  display: inline-block;
  margin-left: 30px;
`;

// 중복검사 성공 문구
const GreenP = styled.p`
  color: #008000;
  display: inline-block;
  margin-left: 30px;
`;

const WriteFormDining = () => {
  const [imgFile, setImgFile] = useState(''); // 이미지 상태 관리
  const imgRef = useRef(); // 이미지 태그
  const [formData, setFormData] = useState({
    // form 데이터 상태 관리
    name: '',
    price: '',
    priceAdult: '',
    priceChildren: '',
    type: 'dining',
    typeDetail: '',
    useTime: '',
    spare: '',
    spareAdult: '',
    spareChildren: '',
  });
  const [duplicateMessage, setDuplicateMessage] = useState(''); // 중복검사 메시지 상태 관리
  const [isConfirm, setIsConfirm] = useState(false); // 중복검사 정상 실행 여부 상태 관리

  // input 값 입력 시 formData의 값 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // api 상품 등록 요청
  const handleSubmit = async (e) => {
    const confirmed = window.confirm('등록하시겠습니까?');

    // 등록 여부 확인과 중복검사 실행 여부 확인
    if (confirmed) {
      if (isConfirm) {
        e.preventDefault();

        const form = new FormData();
        form.append('img', imgRef.current.files[0]);

        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });

        // axios
        try {
          await axios.post('/dinings/dining', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          window.location.href = '/admin/item/list/1';
        } catch (error) {
          console.error('Error:', error.message);
          if (error.response.data.message.startsWith('Validation failed')) {
            const errorMessage = error.response.data.errors[0].defaultMessage;
            alert(errorMessage);
          }
        }
      } else {
        e.preventDefault();
        alert('중복확인을 다시 시도해 주세요'); // 중복확인에 실패했었다면
      }
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

  const nameRef = useRef(); // 상품 이름 입력하는 input 태그

  // 중복 확인 api 요청
  const handleDuplicate = async () => {
    try {
      const url = `/dinings/check?diningName=${nameRef.current.value}`;
      if (nameRef.current.value === '') {
        setDuplicateMessage('상품명은 공백일 수 없습니다.');
        setIsConfirm(false);
      } else {
        const response = await axios.get(url);
        const message = response.data;
        setDuplicateMessage(message);
        setIsConfirm(true);
      }
    } catch (error) {
      setDuplicateMessage(error.response.data);
      console.log(error.response.data);
      setIsConfirm(false);
    }
  };

  // 중복 확인 메시지에 따라 태그 결정
  let responseMessege;
  if (duplicateMessage === '중복된 상품명입니다.' || duplicateMessage === '상품명은 공백일 수 없습니다.') {
    responseMessege = <RedP>{duplicateMessage}</RedP>;
  } else {
    responseMessege = <GreenP>{duplicateMessage}</GreenP>;
  }

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
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <WriteFormTable>
          <WriteFormTr>
            <WriteFormBoldTd>썸네일</WriteFormBoldTd>
            <WriteFormTd>
              <ImageInput type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
              {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image style={{ display: 'none' }}></Image>}
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>상품명</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} ref={nameRef} required />
              <DuplicateButton type="button" onClick={handleDuplicate}>
                중복확인
              </DuplicateButton>
              {responseMessege}
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>상품가격</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="price" value={formData.price} onChange={handleChange} required />
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>성인 추가 비용</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="priceAdult" onChange={handleChange} value={formData.priceAdult} required />
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>어린이 추가 비용</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="priceChildren" onChange={handleChange} value={formData.priceChildren} required />
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>잔여 다이닝 수</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="spare" onChange={handleChange} value={formData.spare} required />
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>최대 숙박 가능 인원 수(성인)</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="spareAdult" onChange={handleChange} value={formData.spareAdult} required />
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>최대 숙박 가능 인원 수(어린이)</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="spareChildren" onChange={handleChange} value={formData.spareChildren} required />
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>기준 인원</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="capacity" onChange={handleChange} value={formData.capacity} required />
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>상품 타입</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" value="dining" name="type" onChange={handleChange} readOnly />
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>세부 타입</WriteFormBoldTd>
            <WriteFormTd>
              <WriteFormSelect name="typeDetail" value={formData.typeDetail} onChange={handleChange}>
                <option value="">선택</option>
                <option value="restaurant">레스토랑</option>
                <option value="roomService">룸서비스</option>
                <option value="barRounge">바&라운지</option>
                <option value="bakery">베이커리</option>
              </WriteFormSelect>
            </WriteFormTd>
          </WriteFormTr>
          <WriteFormTr>
            <WriteFormBoldTd>이용 가능 시간</WriteFormBoldTd>
            <WriteFormTd>
              <Input type="text" name="useTime" value={formData.useTime} onChange={handleChange} required />
            </WriteFormTd>
          </WriteFormTr>
        </WriteFormTable>
        <WriteFormButton type="submit">등록</WriteFormButton>
      </Form>
    </>
  );
};

export default WriteFormDining;
