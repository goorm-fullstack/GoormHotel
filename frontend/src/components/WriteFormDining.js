import React, { useRef, useState } from 'react';
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
import { commonAdminContents, PageTitle, commonTable, InputCheckbox, BtnWrapper, NormalBtn, SubmitBtn } from './common/commonStyles';
import axios from 'axios';

// const NormalBtn = styled(NavLink)`
//   &.active ${TypeButton} {
//     color: #ffffff;
//     background-color: #95846e;
//   }
// `;

// 이미지 미리보기
const Image = styled.img`
  width: 300px;
  vertical-align: middle;
  margin-left: 50px;
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
      <PageTitle>다이닝 등록</PageTitle>
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
              {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image style={{ display: 'none' }}></Image>}
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
            <th>잔여 다이닝 수</th>
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
            <th>기준 인원</th>
            <td>
              <input type="text" name="capacity" onChange={handleChange} value={formData.capacity} required />
            </td>
          </tr>
          <tr>
            <th>상품 타입</th>
            <td>
              <input type="text" value="dining" name="type" onChange={handleChange} readOnly />
            </td>
          </tr>
          <tr>
            <th>세부 타입</th>
            <td>
              <select name="typeDetail" value={formData.typeDetail} onChange={handleChange}>
                <option value="">선택</option>
                <option value="restaurant">레스토랑</option>
                <option value="roomService">룸서비스</option>
                <option value="barRounge">바&라운지</option>
                <option value="bakery">베이커리</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>이용 가능 시간</th>
            <td>
              <input type="text" name="useTime" value={formData.useTime} onChange={handleChange} required />
            </td>
          </tr>
        </Table>
        <SubmitBtn type="submit">등록</SubmitBtn>
      </form>
    </>
  );
};

export default WriteFormDining;
