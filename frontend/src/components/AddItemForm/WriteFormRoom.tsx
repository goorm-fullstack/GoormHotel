import React, { useRef, useState } from 'react';
import * as S from './Style';
import { NavLink } from 'react-router-dom';
import { Table, TableHeader } from '../../admin/member/AdminMember';
import { PageTitle, NormalBtn, SubmitBtn, BtnWrapper, LinkBtn } from '../../Style/commonStyles';
import axios from 'axios';

export type RoomForm = {
  [key: string]: string;
}

const WriteFormRoom = () => {
  const [imgFile, setImgFile] = useState<string>(''); // 이미지 상태 관리
  const imgRef = useRef<HTMLInputElement>(null); // 이미지 태그
  const [formData, setFormData] = useState<RoomForm>({
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
  const [duplicateMessage, setDuplicateMessage] = useState<string>(''); // 중복검사 메시지 상태 관리
  const [isConfirm, setIsConfirm] = useState<boolean>(false); // 중복검사 정상 실행 여부 상태관리

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current && imgRef.current.files ? imgRef.current.files[0] : null;
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      setImgFile(reader.result as string);
    };
  };

  // input에 입력 시 formData 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 등록 api 요청
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const confirmed: boolean = window.confirm('등록하시겠습니까?');

    if (confirmed) {
      if (isConfirm) {
        e.preventDefault();

        const form = new FormData();
        form.append('img', imgRef.current && imgRef.current.files ? imgRef.current.files[0] : '');

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
          if (axios.isAxiosError(error)) {
            console.error('Error:', error.message);
            if (error.response?.data.message.startsWith('Validation failed')) {
              const errorMessage = error.response.data.errors[0].defaultMessage;
              alert(errorMessage);
            }
          } else {
            console.error('An unknown error occurred.');
          }
        }
      } else {
        e.preventDefault();
        alert('중복확인을 다시 시도해 주세요'); // 중복검사 실패 했을 시
      }
    }
  };

  const nameRef = useRef<HTMLInputElement>(null); // 상품 이름 입력 input 태그

  // 중복검사 api 요청
  const handleDuplicate = async () => {
    try {
      const url: string = `/rooms/check?roomName=${nameRef.current?.value}`;
      if (nameRef.current?.value === '') {
        setDuplicateMessage('상품명은 공백일 수 없습니다.');
        setIsConfirm(false);
      } else {
        const response = await axios.get(url, { responseType: 'json' });
        const message = response.data;
        setDuplicateMessage(message);
        setIsConfirm(true);
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        setDuplicateMessage(error.response?.data);
        console.log(error.response?.data);
        setIsConfirm(false);
      }
    }
  };

  // 중복검사 메시지에 따른 태그 결정
  let responseMessege;
  if (duplicateMessage === '중복된 상품명입니다.' || duplicateMessage === '상품명은 공백일 수 없습니다.') {
    responseMessege = <S.RedP>{duplicateMessage}</S.RedP>;
  } else {
    responseMessege = <S.GreenP>{duplicateMessage}</S.GreenP>;
  }

  return (
    <>
      <PageTitle>객실 등록</PageTitle>
      <TableHeader>
      <BtnWrapper className="flexgap right">
          <LinkBtn to="/admin/item/add/room" className="header">
            객실 등록
          </LinkBtn>
          <LinkBtn to="/admin/item/add/dining" className="header">
            다이닝 등록
          </LinkBtn>
        </BtnWrapper>
      </TableHeader>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Table className="horizontal">
          <tr>
            <th>썸네일</th>
            <td>
              <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
              {imgFile ? <S.Image src={imgFile} alt="프로필 이미지" /> : <S.Image style={{ display: 'none' }} />}
            </td>
          </tr>
          <tr>
            <th>상품명</th>
            <td>
              <input type="text" name="name" value={formData.name} onChange={handleChange} ref={nameRef} required />
              <S.DuplicateButton type="button" onClick={handleDuplicate}>
                중복확인
              </S.DuplicateButton>
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
              <S.WriteFormSelect name="typeDetail" value={formData.typeDetail} onChange={handleChange}>
                <option value="">선택</option>
                <option value="deluxe">디럭스</option>
                <option value="sweet">스위트</option>
                <option value="family">패밀리</option>
                <option value="poolVilla">풀 빌라</option>
              </S.WriteFormSelect>
            </td>
          </tr>
          <tr>
            <th>침대 타입</th>
            <td>
              <S.WriteFormSelect name="bed" value={formData.bed} onChange={handleChange}>
                <option value="">선택</option>
                <option value="single">싱글</option>
                <option value="double">더블/트윈</option>
                <option value="king">킹</option>
              </S.WriteFormSelect>
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
