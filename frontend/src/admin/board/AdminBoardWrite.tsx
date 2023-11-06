import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn, NormalBtn } from '../../Style/commonStyles';
import { Container, Table } from '../member/Style';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import { useLocation, useNavigate } from 'react-router-dom';
import Instance from '../../utils/api/axiosInstance';
import boardWrite from '../../pages/board/BoardWrite';
import AdminCheck from '../adminCheck';

const AdminBoardWrite = () => {
  const adminAuth = localStorage.getItem('auth');
  const adminAdminId = localStorage.getItem('adminId') || '';
  const adminRole = localStorage.getItem('role');
  const adminNickname = localStorage.getItem('adminNickname');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentBoardId = queryParams.get('parentBoardId');
  const [parentBoard, setParentBoard] = useState<any | null>(null);

  useEffect(() => {
    if (parentBoardId) {
      Instance.get(`boards/${parentBoardId}`)
        .then((response) => {
          setParentBoard(response.data);

          if (response.data) {
            setFormData({
              ...formData,
              category: response.data.category,
              boardTitle: response.data.boardTitle,
              parentBoardId: response.data.boardId,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [parentBoardId]);

  let isCommentFormData = {
    title: '',
    boardContent: '',
    boardTitle: '',
    category: '',
    boardWriter: adminAdminId,
  };

  if (parentBoard) {
    isCommentFormData = {
      title: '',
      category: parentBoard.category,
      boardContent: '',
      boardTitle: parentBoard.boardTitle,
      boardWriter: adminAdminId,
    };
  }

  const [formData, setFormData] = useState<FormData>(isCommentFormData);

  type FormData = {
    [key: string]: string;
  };

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

    try {
      await Instance.post('/boards/writeform', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (parentBoardId) {
        await Instance.put(`/boards/updateIsComment/${parentBoardId}`);
      }

      alert('게시글이 작성되었습니다.');
      window.location.href = `/admin/board/1`;
    } catch (e: any) {
      console.error('에러: ', e.message);
      if (e.response.data.message.startsWith('Validation failed')) {
        const errorMessage = e.response.data.errors[0].defaultMessage;
        alert(errorMessage);
      }
    }
  };

  const writerOption = () => {
    if (adminRole === 'MANAGER') {
      return (
        <tr>
          <th>작성자</th>
          <td>
            <input type="text" name="boardWriter" value={formData.boardWriter} onChange={handleChange} style={{ display: 'none' }} />
            <p>{adminNickname} 매니저</p>
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

  const categoryOption = () => {
    switch (formData.boardTitle) {
      case '공지사항':
        return (
          <>
            <option value="">선택</option>
            <option value="공지">공지</option>
            <option value="이벤트">이벤트</option>
          </>
        );
      case '문의하기':
        return (
          <>
            <option value="">선택</option>
            <option value="문의1">문의1</option>
            <option value="문의2">문의2</option>
          </>
        );
      case '이용후기':
        return (
          <>
            <option value="">선택</option>
            <option value="룸">룸</option>
            <option value="다이닝">다이닝</option>
          </>
        );
      default:
        return <option value="">선택</option>;
    }
  };

  const navigate = useNavigate();

  const isCommentCategory = () => {
    if (!parentBoard) {
      return (
        <>
          <tr>
            <th>게시판</th>
            <td>
              <select name="boardTitle" value={formData.boardTitle} onChange={handleChange}>
                <option value="">선택</option>
                <option value="공지사항">공지사항</option>
                <option value="문의하기">문의하기</option>
                <option value="이용후기">이용후기</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td>
              <select name="category" value={formData.category} onChange={handleChange}>
                {categoryOption()};
              </select>
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

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>게시글 작성</PageTitle>
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
              <tr>
                <th>파일첨부</th>
                <td>
                  <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} />
                  {imgFile !== '' ? <img src={imgFile} alt="후기 이미지" /> : <img style={{ display: 'none' }} />}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="writeWrapper">
                  <TextEditor setValue={setBoardContent} />
                </td>
              </tr>
            </tbody>
          </Table>
          <BtnWrapper className="center mt40">
            <SubmitBtn type="submit">작성하기</SubmitBtn>
            <NormalBtn onClick={() => navigate(-1)}>목록</NormalBtn>
          </BtnWrapper>
        </form>
      </Container>
      <AdminCheck kind="AUTH_C" />
    </AdminLayout>
  );
};

export default AdminBoardWrite;
