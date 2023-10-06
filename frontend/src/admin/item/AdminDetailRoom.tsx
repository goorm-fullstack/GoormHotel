import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, SubmitBtn } from '../../Style/commonStyles';
import { Image } from '../../components/AddItemForm/Style';
import { RoomData, Select } from './AdminItemList';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Container, Table } from '../member/AdminMember';
import { RoomForm } from '../../components/AddItemForm/WriteFormRoom';

// 세부 타입 select
const WriteFormSelect = styled(Select)`
  width: 200px;
  margin: 0;
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
  const [imgFile, setImgFile] = useState<string>(''); // 이미지 상태관리
  const imgRef = useRef<HTMLInputElement>(null); // 이미지 태그
  const { type, name } = useParams<{type: string, name: string}>(); // url 파라미터
  const [responseData, setResponseData] = useState<RoomData>(); // get 요청으로 받은 데이터 상태관리
  const [duplicateMessage, setDuplicateMessage] = useState<string>(''); // 중복검사 메시지 상태관리
  const [isConfirm, setIsConfirm] = useState<boolean>(true); // 중복검사 정상 실행 여부 상태관리
  const [responseObject, setResponseObject] = useState<RoomForm>({}); // form 데이터 상태관리
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 현재 데이터의 이미지 상태 관리
  const nameRef = useRef<HTMLInputElement>(null); // 상품명 입력하는 input 태그


  // 현재 데이터 get 요청
  useEffect(() => {
    const nameParam: string = name ? name : '';
    axios.get(`/rooms/${type}/${encodeURIComponent(nameParam)}`).then((response) => {
      setResponseData(response.data);
      console.log('get 성공');
    });
  }, [name, type]);

  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_B"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  // 이미지 업로드 input의 onChange(이미지 미리보기)
  const saveImgFile = () => {
    const file = imgRef.current && imgRef.current.files ? imgRef.current.files[0] : '';
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      setImgFile(reader.result as string);
    };
    if(imgRef.current){
      imgRef.current.src = imgFile;
    }
  };

  // input 값 입력시 form 데이터 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResponseObject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 수정 api 요청
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmed: boolean = window.confirm('수정하시겠습니까?');
    if (confirmed) {
      if (isConfirm) {
        const form = new FormData();
        form.append('img', imgRef.current && imgRef.current.files ? imgRef.current.files[0] : '');

        Object.keys(responseObject).forEach((key) => {
          form.append(key, responseObject[key]);
          console.log(responseObject[key]);
        });

        try {
          const nameParam: string = name ? name : '';
          await axios.put(`/rooms/${type}/${encodeURIComponent(nameParam)}`, form, {
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
        alert('중복확인을 다시 시도해주세요.');
      }
    }
  };

  // 이미지 데이터 api 요청
  useEffect(() => {
    // 단일 항목에 대한 이미지 URL을 가져옵니다
    const item = responseData;
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`/image/${item?.name}`, {
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

  // 중복검사 api 요청
  const handleDuplicate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url: string = `/rooms/check?roomName=${nameRef.current?.value}`;
      if (nameRef.current?.value === '') {
        setDuplicateMessage('상품명은 공백일 수 없습니다.');
        setIsConfirm(false);
      } else if (nameRef.current?.value === responseData?.name) {
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
      if(axios.isAxiosError(error)){
        setDuplicateMessage(error.response?.data);
        console.log(error.response?.data);
        setIsConfirm(false);
      }
    }
  };

  let responseMessege;
  if (duplicateMessage === '중복된 상품명입니다.' || duplicateMessage === '상품명은 공백일 수 없습니다.') {
    responseMessege = <RedP>{duplicateMessage}</RedP>;
  } else {
    responseMessege = <GreenP>{duplicateMessage}</GreenP>;
  }

  if(authItem && authItem.includes("AUTH_B")) {
  return (
    <AdminLayout subMenus="item">
      <Container>
        <PageTitle>객실 상세</PageTitle>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {responseData && (
            <Table>
              <tr>
                <th>썸네일</th>
                <td>
                  <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} />
                  {imgFile ? <Image src={imgFile} alt="프로필 이미지" /> : <Image src={imageUrls[0] || ''} alt="프로필 이미지"></Image>}
                </td>
              </tr>
              <tr>
                <th>상품명</th>
                <td>
                  <input type="text" name="name" defaultValue={responseData.name} onChange={handleChange} ref={nameRef} required />
                  <DuplicateButton type="button" onClick={handleDuplicate}>
                    중복확인
                  </DuplicateButton>
                  {responseMessege}
                </td>
              </tr>
              <tr>
                <th>상품가격</th>
                <td>
                  <input type="text" name="price" defaultValue={responseData.price} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th>성인 추가 비용</th>
                <td>
                  <input type="text" name="priceAdult" defaultValue={responseData.priceAdult} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th>어린이 추가 비용</th>
                <td>
                  <input type="text" name="priceChildren" defaultValue={responseData.priceChildren} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th>잔여 객실 수</th>
                <td>
                  <input type="text" name="spare" defaultValue={responseData.spare} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th>최대 숙박 가능 인원 수(성인)</th>
                <td>
                  <input type="text" name="spareAdult" defaultValue={responseData.spareAdult} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th>최대 숙박 가능 인원 수(어린이)</th>
                <td>
                  <input type="text" name="spareChildren" defaultValue={responseData.spareChildren} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th>상품 타입</th>
                <td>
                  <input type="text" name="type" defaultValue={responseData.type} readOnly />
                </td>
              </tr>
              <tr>
                <th>세부 타입</th>
                <td>
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
                </td>
              </tr>
              <tr>
                <th>침대 타입</th>
                <td>
                  <WriteFormSelect name="bed" key={responseData.bed} defaultValue={responseData.bed} onChange={handleChange} required>
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
                  <input type="text" name="capacity" defaultValue={responseData.capacity} onChange={handleChange} required />
                </td>
              </tr>
            </Table>
          )}
          <SubmitBtn type="submit">수정</SubmitBtn>
        </form>
      </Container>
    </AdminLayout>
  );
  } else {
    return null;
  }
};

export default AdminDetailRoom;
