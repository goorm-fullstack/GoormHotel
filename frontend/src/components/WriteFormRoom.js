import React, { useRef, useState } from 'react';
import { TableTd, TableTr, Form, BoldTd, input } from '../admin/item/AdminDetailGiftCard';
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
import { commonAdminContents, PageTitle, commonTable, inputCheckbox, BtnWrapper, NormalBtn, SubmitBtn } from '../Style/commonStyles';
import axios from 'axios';

// const TypeLink = styled(NavLink)`
//   &.active ${TypeButton} {
//     color: #ffffff;
//     background-color: #95846e;
//   }
// `;

// 이미지 미리보기
export const Image = styled.img`
  width: 300px;
  height: 100px;
  vertical-align: middle;
  margin-left: 50px;
`;

// 세부타입 선택
const WriteFormSelect = styled(Select)`
  width: 200px;
  margin: 0;
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

const WriteFormRoom = () => {
  const [imgFile, setImgFile] = useState(''); // 이미지 상태 관리
  const imgRef = useRef(); // 이미지 태그
  const [formData, setFormData] = useState({
    // form 데이터 상태 관리
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
  const [duplicateMessage, setDuplicateMessage] = useState(''); // 중복검사 메시지 상태 관리
  const [isConfirm, setIsConfirm] = useState(false); // 중복검사 정상 실행 여부 상태관리

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // input에 입력 시 formData 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 등록 api 요청
  const handleSubmit = async (e) => {
    const confirmed = window.confirm('등록하시겠습니까?');

    if (confirmed) {
      if (isConfirm) {
        e.preventDefault();

        const form = new FormData();
        form.append('img', imgRef.current.files[0]);

        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });

        try {
          await axios.post('/rooms/room', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          window.location.href = '/admin/item/1';
        } catch (error) {
          console.error('Error:', error.message);
          if (error.response.data.message.startsWith('Validation failed')) {
            const errorMessage = error.response.data.errors[0].defaultMessage;
            alert(errorMessage);
          }
        }
      } else {
        e.preventDefault();
        alert('중복확인을 다시 시도해 주세요'); // 중복검사 실패 했을 시
      }
    }
  };

  const nameRef = useRef(); // 상품 이름 입력 input 태그

  // 중복검사 api 요청
  const handleDuplicate = async () => {
    try {
      const url = `/rooms/check?roomName=${nameRef.current.value}`;
      if (nameRef.current.value === '') {
        setDuplicateMessage('상품명은 공백일 수 없습니다.');
        setIsConfirm(false);
      } else {
        const response = await axios.get(url, { responseType: 'json' });
        const message = response.data;
        setDuplicateMessage(message);
        setIsConfirm(true);
      }
    } catch (error) {
      setDuplicateMessage(error.response.data);
      setIsConfirm(false);
      console.log(error.response);
    }
  };

  // 중복검사 메시지에 따른 태그 결정
  let responseMessege = [];
  if (duplicateMessage === '중복된 상품명입니다.' || duplicateMessage === '상품명은 공백일 수 없습니다.') {
    responseMessege = <RedP>{duplicateMessage}</RedP>;
  } else {
    responseMessege = <GreenP>{duplicateMessage}</GreenP>;
  }

  return (
    <>
      <PageTitle>객실 등록</PageTitle>
      <TableHeader>
        <div>
          <NormalBtn to="/admin/item/add/room">객실 등록</NormalBtn>
          <NormalBtn to="/admin/item/add/dining">다이닝 등록</NormalBtn>
        </div>
      </TableHeader>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Table className="horizontal">
          <tr>
            <th>썸네일</th>
            <td>
              <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
              {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image style={{ display: 'none' }} />}
            </td>
          </tr>
          <tr>
            <th>상품명</th>
            <td>
              <input type="text" name="name" value={formData.name} onChange={handleChange} ref={nameRef} required />
              <DuplicateButton type="button" onClick={handleDuplicate}>
                중복확인
              </DuplicateButton>
              {responseMessege}
            </td>
          </tr>
          <tr>
            <th>상품가격</th>
            <td>
              <input type="text" name="price" value={formData.price} onChange={handleChange} required />
            </td>
          </tr>
          <tr>
            <th>성인 추가 비용</th>
            <td>
              <input type="text" name="priceAdult" onChange={handleChange} value={formData.priceAdult} required />
            </td>
          </tr>
          <tr>
            <th>어린이 추가 비용</th>
            <td>
              <input type="text" name="priceChildren" onChange={handleChange} value={formData.priceChildren} required />
            </td>
          </tr>
          <tr>
            <th>잔여 객실 수</th>
            <td>
              <input type="text" name="spare" onChange={handleChange} value={formData.spare} required />
            </td>
          </tr>
          <tr>
            <th>최대 숙박 가능 인원 수(성인)</th>
            <td>
              <input type="text" name="spareAdult" onChange={handleChange} value={formData.spareAdult} required />
            </td>
          </tr>
          <tr>
            <th>최대 숙박 가능 인원 수(어린이)</th>
            <td>
              <input type="text" name="spareChildren" onChange={handleChange} value={formData.spareChildren} required />
            </td>
          </tr>
          <tr>
            <th>상품 타입</th>
            <td>
              <input type="text" name="type" onChange={handleChange} value="room" readOnly />
            </td>
          </tr>
          <tr>
            <th>세부 타입</th>
            <td>
              <WriteFormSelect name="typeDetail" value={formData.typeDetail} onChange={handleChange}>
                <option value="">선택</option>
                <option value="deluxe">디럭스</option>
                <option value="sweet">스위트</option>
                <option value="family">패밀리</option>
                <option value="poolVilla">풀 빌라</option>
              </WriteFormSelect>
            </td>
          </tr>
          <tr>
            <th>침대 타입</th>
            <td>
              <WriteFormSelect name="bed" value={formData.bed} onChange={handleChange}>
                <option value="">선택</option>
                <option value="single">싱글</option>
                <option value="double">더블/트윈</option>
                <option value="king">킹</option>
              </WriteFormSelect>
            </td>
          </tr>
          <tr>
            <th>숙박 인원 기준</th>
            <td>
              <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} required />
            </td>
          </tr>
        </Table>
        <SubmitBtn type="submit">등록</SubmitBtn>
      </form>
    </>
  );
};

export default WriteFormRoom;
