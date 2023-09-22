import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '../common/AdminLayout';
import { Container } from './AdminGiftCard';
import { Title, SubmitButton } from './AdminGiftCard';
import { Form, BoldTd, Input, TableTr, Table, TableTd } from './AdminDetailGiftCard';
import { Image } from '../../components/WriteFormRoom';
import { Select } from './AdminItemList';
import styled from 'styled-components';
import { useParams } from 'react-router';
import axios from 'axios';

// 세부타입 선택
const WriteFormSelect = styled(Select)`
  width: 200px;
  margin: 0;
`;

// form
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

// 중복확인 버튼
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

// 중복확인 시 경고 문구
const RedP = styled.p`
  color: #ec5353;
  display: inline-block;
  margin-left: 30px;
`;

// 중복확인 시 성공 문구
const GreenP = styled.p`
  color: #008000;
  display: inline-block;
  margin-left: 30px;
`;

const subMenus = [
  { name: '판매 상품 관리', link: '/admin/item/list/1' },
  { name: '상품권 관리', link: '/admin/item/giftCard' },
];

const AdminDetailDining = () => {
  const [imgFile, setImgFile] = useState(''); // 이미지 상태관리
  const imgRef = useRef(); // 이미지 태그
  const { type, name } = useParams(); // url 파라미터
  const [responseData, setResponseData] = useState({}); // get 요청으로 받아온 데이터 상태관리
  const [duplicateMessage, setDuplicateMessage] = useState(''); // 중복검사 메시지 상태관리
  const [isConfirm, setIsConfirm] = useState(true); // 중복검사 정상 실행 여부 상태관리
  const [responseObject, setResponseObject] = useState({}); // form 데이터 상태관리

  // 해당 상품의 데이터 get 요청
  useEffect(() => {
    axios.get(`/dinings/${type}/${encodeURIComponent(name)}`).then((response) => {
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

  // input 입력 시 form 데이터 업데이트
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
          await axios.put(`/dinings/${type}/${encodeURIComponent(name)}`, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          window.location.href = '/admin/item/list/1';
        } catch (error) {
          console.error('Error:', error.message);
        }
      } else {
        alert('중복확인을 다시 시도해주세요.');
      }
    }
  };

  const [imageUrls, setImageUrls] = useState([]); // 현재 데이터의 이미지 정보 상태관리

  // 이미지 정보 받기 api 요청
  useEffect(() => {
    console.log(responseData);
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
        console.log('생성 성공');
        setResponseObject(JSON.parse(JSON.stringify(responseData))); // 현재 데이터 깊은 복사
      } catch (error) {
        console.error('이미지 URL을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    if (Object.keys(responseData).length > 0) {
      fetchImageUrl();
    }
    console.log('get data to responseObject = ', responseObject);
  }, [responseData]);

  const nameRef = useRef(); // 상품 이름 입력 input 태그

  // 중복검사 api 요청
  const handleDuplicate = async () => {
    try {
      const url = `/dinings/check?diningName=${nameRef.current.value}`;
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

  // 중복검사 메시지에 따라 메시지 태그 결정
  let responseMessege;
  if (duplicateMessage === '중복된 상품명입니다.' || duplicateMessage === '상품명은 공백일 수 없습니다.') {
    responseMessege = <RedP>{duplicateMessage}</RedP>;
  } else {
    responseMessege = <GreenP>{duplicateMessage}</GreenP>;
  }

  return (
    <AdminLayout title="상품관리" subMenus={subMenus}>
      <Container>
        <Title>다이닝 상세</Title>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          {responseData && (
            <WriteFormTable>
              <WriteFormTr>
                <WriteFormBoldTd>썸네일</WriteFormBoldTd>
                <WriteFormTd>
                  <ImageInput type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} />
                  {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image src={imageUrls[0]} alt="프로필 이미지" />}
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
                <WriteFormBoldTd>기준 인원</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" name="spareChildren" defaultValue={responseData.capacity} onChange={handleChange} required />
                </WriteFormTd>
              </WriteFormTr>
              <WriteFormTr>
                <WriteFormBoldTd>상품 타입</WriteFormBoldTd>
                <WriteFormTd>
                  <Input type="text" value="dining" readOnly />
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
                  <Input type="text" name="useTime" defaultValue={responseData.useTime} onChange={handleChange} required />
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

export default AdminDetailDining;
