import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '../common/AdminLayout';
import { commonAdminContents, PageTitle } from '../../components/common/commonStyles';
import { SubmitButton } from './AdminGiftCard';
import { Form, BoldTd, Input, TableTr, TableTd } from './AdminDetailGiftCard';
import { Image } from '../../components/WriteFormRoom';
import { Select } from './AdminItemList';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
} from '../member/AdminMember';

// 세부 타입 select
const WriteFormSelect = styled(Select)`
  width: 200px;
  margin: 0;
`;

// 테이블 스타일
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

// 이미지
const ImageInput = styled(Input)`
  margin-top: 60px;
  height: 100px;
  border: none;
`;

// 등록 버튼
const WriteFormButton = styled(SubmitButton)`
  margin-bottom: 60px;
`;

// 중복검사 버튼
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

const AdminDetailRoom = () => {
  const [imgFile, setImgFile] = useState(''); // 이미지 상태관리
  const imgRef = useRef(); // 이미지 태그
  const { type, name } = useParams(); // url 파라미터
  const [responseData, setResponseData] = useState({}); // get 요청으로 받은 데이터 상태관리
  const [duplicateMessage, setDuplicateMessage] = useState(''); // 중복검사 메시지 상태관리
  const [isConfirm, setIsConfirm] = useState(true); // 중복검사 정상 실행 여부 상태관리
  const [responseObject, setResponseObject] = useState({}); // form 데이터 상태관리

  // 현재 데이터 get 요청
  useEffect(() => {
    axios.get(`/rooms/${type}/${encodeURIComponent(name)}`).then((response) => {
      setResponseData(response.data);
      console.log('get 성공');
    });
  }, [name, type]);

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

  // input 값 입력시 form 데이터 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponseObject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 수정 api 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('수정하시겠습니까?');
    if (confirmed) {
      if (isConfirm) {
        const form = new FormData();
        console.log(imgRef.current.files);
        if (imgRef.current && imgRef.current.files.length !== 0) {
          form.append('img', imgRef.current.files[0]);
        }

        Object.keys(responseObject).forEach((key) => {
          form.append(key, responseObject[key]);
          console.log(responseObject[key]);
        });

        try {
          await axios.put(`/rooms/${type}/${encodeURIComponent(name)}`, form, {
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
        alert('중복확인을 다시 시도해주세요.');
      }
    }
  };

  const [imageUrls, setImageUrls] = useState([]); // 현재 데이터의 이미지 상태 관리

  // 이미지 데이터 api 요청
  useEffect(() => {
    // 단일 항목에 대한 이미지 URL을 가져옵니다
    const item = responseData;
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`/image/${item.name}`, {
          responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrls([imageUrl]); // 이미지 URL을 상태에 설정
        console.log(responseData);
        setResponseObject(JSON.parse(JSON.stringify(responseData))); // 현재 데이터 form 데이터에 깊은 복사
      } catch (error) {
        console.error('이미지 URL을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchImageUrl();
    console.log('get data to responseObject = ', responseObject);
  }, [responseData]);

  const nameRef = useRef(); // 상품명 입력하는 input 태그

  // 중복검사 api 요청
  const handleDuplicate = async (e) => {
    e.preventDefault();
    try {
      const url = `/rooms/check?roomName=${nameRef.current.value}`;
      if (nameRef.current.value === '') {
        setDuplicateMessage('상품명은 공백일 수 없습니다.');
        setIsConfirm(false);
      } else if (nameRef.current.value === responseData.name) {
        setDuplicateMessage('사용 가능한 상품명입니다.');
        setIsConfirm(true);
      } else {
        const response = await axios.get(url);
        const message = response.data;
        setDuplicateMessage(message);
        setIsConfirm(true);
      }
      console.log('responseObject = ', responseObject);
    } catch (error) {
      setDuplicateMessage(error.response.data);
      setIsConfirm(false);
    }
  };

  let responseMessege;
  if (duplicateMessage === '중복된 상품명입니다.' || duplicateMessage === '상품명은 공백일 수 없습니다.') {
    responseMessege = <RedP>{duplicateMessage}</RedP>;
  } else {
    responseMessege = <GreenP>{duplicateMessage}</GreenP>;
  }

  return (
    <AdminLayout subMenus="item">
      <Container>
        <PageTitle>객실 상세</PageTitle>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          {responseData && (
            <WriteFormTable>
              <WriteFormTr>
                <WriteFormBoldTd>썸네일</WriteFormBoldTd>
                <WriteFormTd>
                  <ImageInput type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} />
                  {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image src={imageUrls[0] || ''} alt="프로필 이미지"></Image>}
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>상품명</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="name" defaultValue={responseData.name} onChange={handleChange} ref={nameRef} required />
                  <DuplicateButton type="button" onClick={handleDuplicate}>
                    중복확인
                  </DuplicateButton>
                  {responseMessege}
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>상품가격</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="price" defaultValue={responseData.price} onChange={handleChange} required />
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>성인 추가 비용</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="priceAdult" defaultValue={responseData.priceAdult} onChange={handleChange} required />
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>어린이 추가 비용</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="priceChildren" defaultValue={responseData.priceChildren} onChange={handleChange} required />
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>잔여 객실 수</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="spare" defaultValue={responseData.spare} onChange={handleChange} required />
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>최대 숙박 가능 인원 수(성인)</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="spareAdult" defaultValue={responseData.spareAdult} onChange={handleChange} required />
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>최대 숙박 가능 인원 수(어린이)</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="spareChildren" defaultValue={responseData.spareChildren} onChange={handleChange} required />
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>상품 타입</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="type" defaultValue={responseData.type} readOnly />
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>세부 타입</WriteFormBoldTd>
                <WriteFormTd>
                  <WriteFormSelect
                    name="typeDetail"
                    key={responseData.typeDetail}
                    defaultValue={responseData.typeDetail}
                    onChange={handleChange}
                    required>
                    <option value="">선택</option>
                    <option value="deluxe">디럭스</option>
                    <option value="sweet">스위트</option>
                    <option value="family">패밀리</option>
                    <option value="poolVilla">풀 빌라</option>
                  </WriteFormSelect>
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>침대 타입</WriteFormBoldTd>
                <WriteFormTd>
                  <WriteFormSelect name="bed" key={responseData.bed} defaultValue={responseData.bed} onChange={handleChange} required>
                    <option value="">선택</option>
                    <option value="single">싱글</option>
                    <option value="double">더블/트윈</option>
                    <option value="king">킹</option>
                  </WriteFormSelect>
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>숙박 인원 기준</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="capacity" defaultValue={responseData.capacity} onChange={handleChange} required />
                </WriteFormTd>
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
