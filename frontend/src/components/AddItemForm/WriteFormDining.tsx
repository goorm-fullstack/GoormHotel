import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../admin/member/Style';
import { PageTitle, SubmitBtn, BtnWrapper, NormalBtn, SelectImage, RedP, GreenP } from '../../Style/commonStyles';
import axios from 'axios';

export type DiningForm = {
  [key: string]: string;
};

const WriteFormDining = () => {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<string>(''); // 이미지 상태 관리
  const imgRef = useRef<HTMLInputElement>(null); // 이미지 태그
  const [formData, setFormData] = useState<DiningForm>({
    // form 데이터 상태 관리
    name: '',
    price: '',
    priceAdult: '',
    priceChildren: '',
    type: 'dining',
    typeDetail: 'restaurant',
    spare: '',
    spareAdult: '',
    spareChildren: '',
    capacity: '',
    description: '',
  });
  const [duplicateMessage, setDuplicateMessage] = useState<string>(''); // 중복검사 메시지 상태 관리
  const [isConfirm, setIsConfirm] = useState<boolean>(false); // 중복검사 정상 실행 여부 상태 관리

  // input 값 입력 시 formData의 값 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // api 상품 등록 요청
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const confirmed: boolean = window.confirm('등록하시겠습니까?');

    // 등록 여부 확인과 중복검사 실행 여부 확인
    if (confirmed) {
      if (isConfirm) {
        e.preventDefault();

        const form = new FormData();
        if (imgRef.current && imgRef.current.files) {
          form.append('img', imgRef.current.files[0]);
        }

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
        alert('중복확인을 다시 시도해 주세요'); // 중복확인에 실패했었다면
      }
    }
  };

  // 이미지 업로드 input의 onChange(이미지 미리보기)
  const saveImgFile = () => {
    let file: File | null = null;
    if (imgRef.current && imgRef.current.files) {
      file = imgRef.current.files[0];
    }
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      setImgFile(reader.result as string);
    };
  };

  const nameRef = useRef<HTMLInputElement>(null); // 상품 이름 입력하는 input 태그

  // 중복 확인 api 요청
  const handleDuplicate = async () => {
    try {
      const url = `/dinings/check?diningName=${nameRef.current?.value}`;
      if (nameRef.current?.value === '') {
        setDuplicateMessage('상품명은 공백일 수 없습니다.');
        setIsConfirm(false);
      } else {
        const response = await axios.get(url);
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

  // 중복 확인 메시지에 따라 태그 결정
  let responseMessege;
  if (duplicateMessage === '중복된 상품명입니다.' || duplicateMessage === '상품명은 공백일 수 없습니다.') {
    responseMessege = <RedP>{duplicateMessage}</RedP>;
  } else {
    responseMessege = <GreenP>{duplicateMessage}</GreenP>;
  }

  // 객실, 다이닝 전환
  let history = useNavigate();
  function handleChangeSelect(value: string) {
    history(`${value}`);
  }

  return (
    <>
      <PageTitle>상품 등록</PageTitle>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/** 상품 타입 */}
        <input type="hidden" value="dining" name="type" onChange={handleChange} readOnly />
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
                  <option value="/admin/item/add/dining" selected>
                    다이닝
                  </option>
                </select>
              </td>
              <td rowSpan={5}>
                <SelectImage>
                  <label>
                    <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
                    <div className="imgwrapper">{imgFile ? <img src={imgFile} alt="프로필 이미지" /> : <img style={{ display: 'none' }} />}</div>
                  </label>
                </SelectImage>
              </td>
            </tr>
            <tr>
              <th>다이닝 타입</th>
              <td>
                <select name="typeDetail" value={formData.typeDetail} onChange={handleChange} defaultValue={formData.typeDetail}>
                  <option value="restaurant">레스토랑</option>
                  <option value="roomService">룸서비스</option>
                  <option value="barRounge">바&라운지</option>
                  <option value="bakery">베이커리</option>
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
              <th>상품 소개글</th>
              <td>
                <input type="text" name="description" className="long" value={formData.description} onChange={handleChange} required />
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
              <td>
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
              <th>서비스 기준 인원</th>
              <td colSpan={2}>
                <input type="text" name="capacity" onChange={handleChange} value={formData.capacity} required />
              </td>
            </tr>
            <tr>
              <th>성인 최대 서비스 가능 인원</th>
              <td colSpan={2}>
                <input type="text" name="spareAdult" onChange={handleChange} value={formData.spareAdult} required />
              </td>
            </tr>
            <tr>
              <th>어린이 최대 서비스 가능 인원</th>
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

export default WriteFormDining;
