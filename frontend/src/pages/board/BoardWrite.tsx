import React, { useEffect, useRef, useState } from 'react';
import * as S from './Style';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PageTitle, BtnWrapper, SubmitBtn, NormalBtn } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import axios from 'axios';
import { ItemThumbnail } from '../../admin/item/Style';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import Instance from '../../utils/api/axiosInstance';

type FormData = {
  [key: string]: string;
};

type ReportData = {
  [key: string]: string;
};

const BoardWrite = () => {
  const board = useParams().board;
  const location = useLocation();
  const id = location.search;
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<string>('');
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [boardContent, setBoardContent] = useState('')
  const inputRef = useRef<HTMLInputElement>(null);;
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
  const [reportData, setReportData] = useState<ReportData>({
    reportReason: '',
    reportWriter: '',
  })
  const [categoryError, setCategoryError] = useState<string>('');
  const [reportTitle, setReportTitle] = useState<any>('');
  const [user, setUser] = useState('');

  useEffect(() => {
    if(board === 'report'){
      const handleInfo = async() => {
        if(id.includes('boardId')){
          await Instance
          .get(`/boards/${id.replace('?boardId=', '')}`)
          .then((response) => {
            setReportTitle(response.data.title);
          })
          .catch((error) => {
            console.error('Error:', error.message);
          });
        }else{
          const replyId = id.replace('?replyId=', '');
          await Instance
          .get(`/reply/replyId/${replyId}`)
          .then((response) => {
            const content = response.data.replyContent;
            setReportTitle(content);
          })
          .catch((error) => {
            console.error('Error:', error.message);
          });
        }
      }
      handleInfo();
    }

    const user = localStorage.getItem('memberId') ? localStorage.getItem('memberId') : '';
    
    setUser(user as string);
  }, [])

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

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(board !== 'report'){
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

      formData.boardWriter = inputRef && inputRef.current ? inputRef.current.value : '';
  
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });
  
      const isConfirm = window.confirm('작성하시겠습니까?');
      if(isConfirm){
        try {
          await Instance.post('/boards/writeform', form, {
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
    }else{
      const form = new FormData();
      const itemId = id.includes('boardId') ? id.replace('?boardId=', '') : id.replace('?replyId=', '');

      if(id.includes('boardId')){
        form.append('boardId', itemId);
      }else{
        form.append('replyId', itemId);
      }

      Object.keys(reportData).forEach((key) => {
        form.append(key, reportData[key]);
      });
  
      const isConfirm = window.confirm('신고하시겠습니까?');
      if(isConfirm){
        try {
          await Instance.post('/report/writeform', form, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          alert('신고 완료되었습니다.');
          navigate(-2);
        } catch (e: any) {
          console.error('에러: ', e.message);
          if (e.response.data.message.startsWith('Validation failed')) {
            const errorMessage = e.response.data.errors[0].defaultMessage;
            alert(errorMessage);
          }
        }
      }
    }
  };

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
            case 'report':
              return <PageTitle>신고하기</PageTitle>;
            default:
              return <PageTitle>고객지원</PageTitle>;
          }
        })()}
        <div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <S.Table className="horizontal">
              <tbody>
                {board !== 'report' ?
                (<tr>
                  <th style={{ width: '240px' }}>제목</th>
                  <td>
                    <input type="text" className="title long" name="title" value={formData.title} onChange={handleChange} required />
                  </td>
                </tr>) :
                (
                <tr>
                  <th style={{ width: '240px' }}>신고대상 글</th>
                  <td>
                    <input type="text" className="title long" name="title" value={reportTitle ? reportTitle : ''} readOnly required />
                  </td>
                </tr>
                )
                }
                {board !== 'report' ?
                (<tr>
                  <th style={{ width: '240px' }}>카테고리</th>
                  <td>
                    {(() => {
                      switch (board) {
                        case 'qna':
                          return (
                            <select name="category" value={formData.category} onChange={handleChange} required>
                              <option value="">선택</option>
                              <option value="문의1">문의1</option>
                              <option value="문의2">문의2</option>
                            </select>
                          );
                        case 'review':
                          return (
                            <select name="category" value={formData.category} onChange={handleChange} required>
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
                </tr>) : 
                (<tr>
                <th style={{ width: '240px' }}>신고 사유</th>
                <td>
                  <select name="reportReason" value={reportData.reportReason} onChange={handleReportChange} required>
                    <option value="">선택</option>
                    <option value="부적절한 콘텐츠">부적절한 콘텐츠</option>
                    <option value="스팸 또는 광고성 내용">스팸 또는 광고성 내용</option>
                    <option value="욕설 및 모욕적인 언어 사용">욕설 및 모욕적인 언어 사용</option>
                    <option value="사생활 침해">사생활 침해</option>
                    <option value="음란물">음란물</option>
                  </select>
                  {categoryError && <div style={{ color: 'red' }}>{categoryError}</div>}
                </td>
              </tr>)
              }
                <tr>
                  <th>작성자</th>
                  <td>
                    {user === '' ? 
                    <input type="text" name="boardWriter" value={formData.boardWriter} onChange={handleChange} required /> :
                    <input type="text" name="boardWriter" value={user} ref={inputRef} readOnly />
                    }
                  </td>
                </tr>
                {board !== 'report' ?
                (<>
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
                </>) :
                (<>
                  <tr className="contents" style={{display: 'none'}}>
                    <td colSpan={2} className="writeWrapper">
                      <TextEditor setValue={setBoardContent} />
                    </td>
                  </tr>
                  <tr className="conbtm" style={{display: 'none'}}>
                    
                  </tr>
                </>)
                }
              </tbody>
            </S.Table>
            <BtnWrapper className="center double mt40">
              {board !== 'report' ?
              <SubmitBtn type="submit">작성하기</SubmitBtn> :
              <SubmitBtn type="submit">신고하기</SubmitBtn>
              }
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
