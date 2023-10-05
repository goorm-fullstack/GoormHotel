import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, SubmitBtn, SelectImage, RedP, GreenP, NormalBtn, BtnWrapper } from '../../Style/commonStyles';
import { RoomData } from './AdminItemList';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Table } from '../member/AdminMember';
import { RoomForm } from '../../components/AddItemForm/WriteFormRoom';

const AdminDetailRoom = () => {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<string>(''); // 이미지 상태관리
  const imgRef = useRef<HTMLInputElement>(null); // 이미지 태그
  const { type, name } = useParams<{ type: string; name: string }>(); // url 파라미터
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

  // 이미지 업로드 input의 onChange(이미지 미리보기)
  const saveImgFile = () => {
    const file = imgRef.current && imgRef.current.files ? imgRef.current.files[0] : '';
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      setImgFile(reader.result as string);
    };
    if (imgRef.current) {
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
      if (axios.isAxiosError(error)) {
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

  return (
    <AdminLayout subMenus="item">
      <Container>
        <PageTitle>상품 상세</PageTitle>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {responseData && (
            <Table className="horizontal">
              <input type="hidden" name="type" defaultValue={responseData.type} readOnly />
              <colgroup>
                <col width="240px" />
                <col width="auto" />
                <col width="280px" />
              </colgroup>
              <tbody>
                <tr>
                  <th>상품 분류</th>
                  <td className="text">객실</td>
                  <td rowSpan={5}>
                    <SelectImage>
                      <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} />
                      <div className="imgwrapper">
                        {imgFile ? <img src={imgFile} alt="프로필 이미지" /> : <img src={imageUrls[0] || ''} alt="프로필 이미지" />}
                      </div>
                    </SelectImage>
                  </td>
                </tr>
                <tr>
                  <th>객실 타입</th>
                  <td>
                    <select name="typeDetail" key={responseData.typeDetail} defaultValue={responseData.typeDetail} onChange={handleChange} required>
                      <option value="deluxe">디럭스</option>
                      <option value="sweet">스위트</option>
                      <option value="family">패밀리</option>
                      <option value="poolVilla">풀 빌라</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>침대 타입</th>
                  <td>
                    <select name="bed" key={responseData.bed} defaultValue={responseData.bed} onChange={handleChange} required>
                      <option value="single">싱글</option>
                      <option value="double">더블/트윈</option>
                      <option value="king">킹</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>상품명</th>
                  <td>
                    <input type="text" name="name" className="long" defaultValue={responseData.name} onChange={handleChange} ref={nameRef} required />
                    <NormalBtn type="button" className="withinput" onClick={handleDuplicate}>
                      중복확인
                    </NormalBtn>
                    {responseMessege}
                  </td>
                </tr>
                <tr>
                  <th>상품가</th>
                  <td>
                    <input type="text" name="price" defaultValue={responseData.price} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <th>성인 추가 비용</th>
                  <td colSpan={2}>
                    <input type="text" name="priceAdult" defaultValue={responseData.priceAdult} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <th>어린이 추가 비용</th>
                  <td colSpan={2}>
                    <input type="text" name="priceChildren" defaultValue={responseData.priceChildren} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <th>숙박 인원 기준</th>
                  <td colSpan={2}>
                    <input type="text" name="capacity" defaultValue={responseData.capacity} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <th>성인 최대 숙박 가능 인원</th>
                  <td colSpan={2}>
                    <input type="text" name="spareAdult" defaultValue={responseData.spareAdult} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <th>어린이 최대 숙박 가능 인원</th>
                  <td colSpan={2}>
                    <input type="text" name="spareChildren" defaultValue={responseData.spareChildren} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <th>판매 수량</th>
                  <td colSpan={2}>
                    <input type="text" name="spare" defaultValue={responseData.spare} onChange={handleChange} required />
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
          <BtnWrapper className="double mt40 center">
            <SubmitBtn type="submit">상품 수정</SubmitBtn>
            <NormalBtn type="button" onClick={() => navigate(-1)}>
              취소
            </NormalBtn>
          </BtnWrapper>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default AdminDetailRoom;
