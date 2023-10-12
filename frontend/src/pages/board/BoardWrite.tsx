import React, { useRef, useState } from 'react';
import * as S from './Style';
import { useParams, useNavigate } from 'react-router-dom';
import { PageTitle, BtnWrapper, SubmitBtn } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import axios from 'axios';
import { ItemThumbnail } from '../../admin/item/Style';
import TextEditor from '../../components/common/TextEditor/TextEditor';

type FormData = {
  [key: string]: string;
};

const BoardWrite = () => {
  const board = useParams().board;
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<string>('');
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [boardContent, setBoardContent] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    boardContent: '',
    boardTitle: (() => {
      switch (board) {
        case 'notice':
          return '공지사항';
        case 'qna':
          return '문의하기';
        case 'review':
          return '이용후기';
        default:
          return '고객지원';
      }
    })(),
    boardWriter: '',
    boardPassword: '',
    category: '',
  });

  const [categoryError, setCategoryError] = useState<string>('');

  const saveImgFile = () => {
    const file = imgRef.current && imgRef.current.files ? imgRef.current.files[0] : '';
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImgFile(reader.result as string);
      };
    } else {
      console.error('The selected file is not a Blob.');
    }
  };

  //input 입력 시
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'category') {
      setCategoryError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.category) {
      setCategoryError('카테고리를 선택하세요'); // 오류 메시지 설정
      return;
    }

    const isComment = 'false';

    const form = new FormData();
    form.append('multipartFile', imgRef.current && imgRef.current.files ? imgRef.current.files[0] : '');
    form.append('file', fileRef.current && fileRef.current.files ? fileRef.current.files[0] : '');
    form.append('isComment', isComment);
    formData.boardContent = boardContent;
    console.log(formData.category);

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    const isConfirm = window.confirm('작성하시겠습니까?');
    if(isConfirm){
      try {
        await axios.post('/boards/writeform', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('작성 완료되었습니다.');
        window.location.href = `/board/${board}/1`;
      } catch (e: any) {
        console.error('에러: ', e.message);
        if (e.response.data.message.startsWith('Validation failed')) {
          const errorMessage = e.response.data.errors[0].defaultMessage;
          alert(errorMessage);
        }
      }
    }
  };

  // 유저 정보 불러오기 지우지 마세요!!
  // useEffect(() => {
  //   const handleUserInfo = async () => {
  //     try{
  //       await axios.get('/')
  //       .then((response) => {
  //         setUserId(response.data.userId);
  //       })
  //       .catch((error) => {
  //         console.error(error.message);
  //       })
  //     }
  //   }
  //   handleUserInfo();
  // }, [])

  return (
    <>
      <SubHeader kind="board" />
      <S.Container>
        {(() => {
          switch (board) {
            case 'notice':
              return <PageTitle>공지사항</PageTitle>;
            case 'qna':
              return <PageTitle>문의하기</PageTitle>;
            case 'review':
              return <PageTitle>이용후기</PageTitle>;
            default:
              return <PageTitle>고객지원</PageTitle>;
          }
        })()}
        <div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <S.Table className="horizontal">
              <tr>
                <th style={{ width: '240px' }}>제목</th>
                <td>
                  <input type="text" className="title long" name="title" value={formData.title} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th style={{ width: '240px' }}>카테고리</th>
                <td>
                  {(() => {
                    switch (board) {
                      case 'qna':
                        return (
                          <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="">선택</option>
                            <option value="문의1">문의1</option>
                            <option value="문의2">문의2</option>
                          </select>
                        );
                      case 'review':
                        return (
                          <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="">선택</option>
                            <option value="객실">객실</option>
                            <option value="다이닝">다이닝</option>
                          </select>
                        );
                      default:
                        return;
                    }
                  })()}
                  {categoryError && <div style={{ color: 'red' }}>{categoryError}</div>}
                </td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>
                  <input type="text" name="boardWriter" value={formData.boardWriter} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <input type="text" name="boardPassword" value={formData.boardPassword} onChange={handleChange} required/>
              </tr>
              <tr className="contents">
                <td colSpan={2} className="writeWrapper">
                  <TextEditor setValue={setBoardContent} />
                </td>
              </tr>
              <tr className="conbtm">
                {board === 'review' ? (
                  <>
                    <th>썸네일 이미지</th>
                    <td>
                      <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required/>
                      {imgFile !== '' ? <ItemThumbnail src={imgFile} alt="후기 이미지" /> : <ItemThumbnail style={{ display: 'none' }} />}
                    </td>
                  </>
                ) : (
                  <>
                    <th>첨부파일</th>
                    <td>
                      <input type="file" accept="*" ref={fileRef} />
                    </td>
                  </>
                )}
              </tr>
            </S.Table>
            <BtnWrapper className="center double mt40">
              <SubmitBtn type="submit">작성하기</SubmitBtn>
              <SubmitBtn type="button" onClick={() => navigate(-1)}>
                취소
              </SubmitBtn>
            </BtnWrapper>
          </form>
        </div>
      </S.Container>
    </>
  );
};

export default BoardWrite;
