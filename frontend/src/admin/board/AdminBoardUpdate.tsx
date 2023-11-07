import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn, NormalBtn } from '../../Style/commonStyles';
import { Container, Table } from '../member/Style';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import boardWrite from '../../pages/board/BoardWrite';
import AdminCheck from '../adminCheck';
import PrevButton from '../PrevButton';
import {ItemThumbnail} from "../item/Style";

const AdminBoardUpdate = () => {
  const adminAuth = localStorage.getItem('auth');
  const adminAdminId = localStorage.getItem('adminId') || '';
  const adminRole = localStorage.getItem('role');
  const adminNickname = localStorage.getItem('adminNickname');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentBoardId = queryParams.get('parentBoardId');
  const [parentBoard, setParentBoard] = useState<any | null>(null);

  const board = useParams().board;
  const boardId = useParams().boardId;
  const [boardData, setBoardData] = useState<any>(null);
  const [file, setFile] = useState('');
  const [previousImg, setPreviousImg] = useState('');



  useEffect(() => {
    if (boardId) {
      Instance.get(`/boards/${boardId}`)
          .then((response) => {
            if (response.headers['filename']) {
              const fileName = response.headers['filename'];
              const decodedFileName = decodeURI(fileName).replaceAll('+', ' ');
              setFile(decodedFileName);
            }
            setBoardData(response.data);
            setBoardContent(response.data.boardContent);
          })
          .catch((error) => {
            console.error('Error: ', error.message);
          });
    }
  }, [boardId]);

  useEffect(() => {
    if (boardData && boardData.boardImage !== null)
      Instance.get(`/boards/image/${boardId}`, { responseType: 'arraybuffer' }).then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        setPreviousImg(imageUrl);
      });
  }, [boardData]);

  type FormData = {
    [key: string]: string;
  };

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
    boardWriter: adminAdminId ? adminAdminId : '',
    boardPassword: '',
    category: '',
  });

  const [categoryError, setCategoryError] = useState<string>('');
  const [boardTitleError, setBoardTitleError] = useState<string>('');
  const [imgFile, setImgFile] = useState<string>('');
  const [isComment, setIsComment] = useState(true);
  const [boardContent, setBoardContent] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const changeFile = () => {
    const file = fileRef.current && fileRef.current.files ? fileRef.current.files[0] : '';

    if (file instanceof File && file.size > 83886080) {
      if (fileRef.current) fileRef.current.value = '';
      alert('업로드할 파일은 10MB이하여야 합니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'boardTitle') {
      setBoardTitleError('');
    }

    if (name === 'category') {
      setCategoryError('');
    }
  };

  const handleCommentCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsComment(e.target.checked);
    const { isComment, ...restFormData } = formData;
    setFormData(restFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.boardTitle) {
      setBoardTitleError('게시판을 선택하세요');
      return;
    }

    if (!formData.category) {
      setCategoryError('카테고리를 선택하세요');
      return;
    }

    const form = new FormData();
    form.append('multipartFile', imgRef.current && imgRef.current.files ? imgRef.current.files[0] : '');
    form.append('file', fileRef.current && fileRef.current.files ? fileRef.current.files[0] : '');
    formData.boardContent = boardContent;
    form.append('isComment', isComment ? 'false' : 'true');

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    // await Instance.put(`/boards/${}`, form, {
    //
    // })

    await Instance.put(`/boards/${boardId}`, form, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      },
    });
    navigate(-1);
  };

  const testFunc = () => {

    return boardContent;

  }

  const writerOption = () => {
    if (adminRole === 'MANAGER') {
      return (
        <tr>
          <th>작성자</th>
          <td>
            <input type="text" name="boardWriter" value={formData.boardWriter} onChange={handleChange} style={{ display: 'none' }} />
            {adminNickname ? <p>{decodeURIComponent(adminNickname)} 매니저</p> : <p>매니저</p>}
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <th>작성자</th>
        <td>
          <p>관리자</p>
          <input type="text" name="boardWriter" value={formData.boardWriter} onChange={handleChange} style={{ display: 'none' }} />
        </td>
      </tr>
    );
  };

  useEffect(() => {
    if (boardData && boardData.title) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: boardData.title,
        category: boardData.category,
      }));
    }
  }, [boardData]);

  const categoryOption = () => {
    switch (board) {
      case 'notice':
        return (
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">선택</option>
              <option value="공지">공지</option>
              <option value="이벤트">이벤트</option>
            </select>
        )
      case 'qna':
        return (
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">선택</option>
              <option value="칭찬">칭찬</option>
              <option value="문의">문의</option>
              <option value="제안">제안</option>
              <option value="기타">기타</option>
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
  };

  const navigate = useNavigate();

  const isCommentCategory = () => {
    if (!parentBoard) {
      return (
        <>
          <tr>
            <th>카테고리</th>
            <td>
              {categoryOption()}
            </td>
          </tr>
        </>
      );
    }
    return (
      <>
        <tr>
          <th>게시판</th>
          <td>
            <p>{parentBoard.boardTitle}</p>
          </td>
        </tr>
        <tr>
          <th>카테고리</th>
          <td>
            <p>{parentBoard.category}</p>
          </td>
        </tr>
      </>
    );
  };

  const selectPageTitle = () => {
    switch (board) {
      case 'notice':
        return <PageTitle>공지사항 상세</PageTitle>;
      case 'qna':
        return <PageTitle>문의하기 상세</PageTitle>;
      case 'review':
        return <PageTitle>리뷰하기 상세</PageTitle>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout subMenus="board">
      <Container>
        {selectPageTitle()}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Table className="horizontal">
            <tbody>
              {isCommentCategory()}
              <tr>
                <th>제목</th>
                <td>
                  <MultiCheck className="fit">
                    <input type="text" className="long" name="title" value={formData.title} onChange={handleChange} required />
                    {parentBoard && (
                      <CheckLabel>
                        <InputCheckbox type="checkbox" checked={isComment} onChange={handleCommentCheckboxChange} disabled />
                        {' 답글 '}
                      </CheckLabel>
                    )}
                  </MultiCheck>
                </td>
              </tr>
              {writerOption()}
              {board === 'review' ? (
                <tr>
                  <th>대표 이미지</th>
                  <td>
                    <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} />
                    {previousImg !== '' ? (
                        <ItemThumbnail className="preview" src={previousImg} alt="후기 이미지" />
                    ) : (
                        <ItemThumbnail style={{ display: 'none' }} />
                    )}
                  </td>
                </tr>
              ) : (
                <tr>
                  <th>파일첨부</th>
                  <td>
                    <input type="file" accept="*" ref={fileRef} onChange={changeFile} />
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="writeWrapper">
                  <TextEditor setValue={setBoardContent} setDefaultValue={testFunc} />
                </td>
              </tr>
            </tbody>
          </Table>
          <BtnWrapper className="center mt40 double">
            <SubmitBtn type="submit">수정하기</SubmitBtn>
            <PrevButton />
          </BtnWrapper>
        </form>
      </Container>
      <AdminCheck kind="AUTH_C" />
    </AdminLayout>
  );
};

export default AdminBoardUpdate;
