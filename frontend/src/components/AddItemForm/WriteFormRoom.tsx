import React, { useEffect, useRef, useState } from 'react';
import * as S from './Style';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader } from '../../admin/member/AdminMember';
import { PageTitle, SubmitBtn, BtnWrapper, LinkBtn, NormalLinkBtn, NormalBtn } from '../../Style/commonStyles';
import axios from 'axios';

export type RoomForm = {
  [key: string]: string;
};

const WriteFormRoom = () => {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<string>(''); // 이미지 상태 관리
  const imgRef = useRef<HTMLInputElement>(null); // 이미지 태그
  const [formData, setFormData] = useState<RoomForm>({
    // form 데이터 상태 관리
    name: '',
    price: '',
    priceAdult: '',
    priceChildren: '',
    type: 'room',
    typeDetail: 'deluxe',
    bed: 'single',
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
      if (axios.isAxiosError(error)) {
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

  // 객실, 다이닝 전환
  let history = useNavigate();
  function handleChangeSelect(value: string) {
    history(`${value}`);
  }

  const typeDetailData = [
    { kr: '디럭스', en: 'deluxe' },
    { kr: '스위트', en: 'sweet' },
    { kr: '패밀리', en: 'family' },
    { kr: '풀빌라', en: 'poolVilla' },
  ];

  const bedData = [
    { kr: '싱글', en: 'single' },
    { kr: '더블/트윈', en: 'double' },
    { kr: '킹', en: 'king' },
  ];

  return (
    <>
      <PageTitle>객실 등록</PageTitle>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/** 상품 타입 */}
        <input type="hidden" name="type" onChange={handleChange} value="room" readOnly />
        <Table className="horizontal">
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="280px" />
          </colgroup>
          <tbody>
            <tr>
              <th>상품 분류</th>
              <td>
                <select onChange={(e) => handleChangeSelect(e.target.value)}>
                  <option value="/admin/item/add/room">객실</option>
                  <option value="/admin/item/add/dining">다이닝</option>
                </select>
              </td>
              <td rowSpan={5}>
                <S.SelectImage>
                  <label>
                    <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
                    <div className="imgwrapper">{imgFile ? <img src={imgFile} alt="프로필 이미지" /> : <img style={{ display: 'none' }} />}</div>
                  </label>
                </S.SelectImage>
              </td>
            </tr>
            <tr>
              <th>객실 타입</th>
              <td>
                <select name="typeDetail" value={formData.typeDetail} onChange={handleChange} defaultValue={typeDetailData[1].en}>
                  {typeDetailData.map((type) => (
                    <option key={type.en} value={type.en}>
                      {type.kr}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>침대 타입</th>
              <td>
                <select name="bed" value={formData.bed} onChange={handleChange} defaultValue={bedData[0].en}>
                  {bedData.map((bed) => (
                    <option key={bed.en} value={bed.en}>
                      {bed.kr}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>상품명</th>
              <td>
                <input type="text" name="name" className="long" value={formData.name} onChange={handleChange} ref={nameRef} required />
                <NormalBtn type="button" className="withinput" onClick={handleDuplicate}>
                  중복확인
                </NormalBtn>
                {responseMessege}
              </td>
            </tr>
            <tr>
              <th>상품가</th>
              <td>
                <input type="text" name="price" value={formData.price} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <th>성인 추가 비용</th>
              <td colSpan={2}>
                <input type="text" name="priceAdult" onChange={handleChange} value={formData.priceAdult} required />
              </td>
            </tr>
            <tr>
              <th>어린이 추가 비용</th>
              <td colSpan={2}>
                <input type="text" name="priceChildren" onChange={handleChange} value={formData.priceChildren} required />
              </td>
            </tr>
            <tr>
              <th>숙박 인원 기준</th>
              <td colSpan={2}>
                <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <th>성인 최대 숙박 가능 인원</th>
              <td colSpan={2}>
                <input type="text" name="spareAdult" onChange={handleChange} value={formData.spareAdult} required />
              </td>
            </tr>
            <tr>
              <th>어린이 최대 숙박 가능 인원</th>
              <td colSpan={2}>
                <input type="text" name="spareChildren" onChange={handleChange} value={formData.spareChildren} required />
              </td>
            </tr>
            <tr>
              <th>판매 수량</th>
              <td colSpan={2}>
                <input type="text" name="spare" onChange={handleChange} value={formData.spare} required />
              </td>
            </tr>
          </tbody>
        </Table>
        <BtnWrapper className="double mt40 center">
          <SubmitBtn type="submit">상품등록</SubmitBtn>
          <NormalBtn type="button" onClick={() => navigate(-1)}>
            취소
          </NormalBtn>
        </BtnWrapper>
      </form>
    </>
  );
};

export default WriteFormRoom;
