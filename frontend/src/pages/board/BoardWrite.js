import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom'; // useHistory 추가
import { commonContainerStyle, PageTitle, BtnWrapper, LinkBtn, SubmitBtn } from '../../components/common/commonStyles';
import SubHeader from '../../components/layout/SubHeader';
import axios from 'axios';
import { Image } from '../../components/WriteFormRoom';
import TextEditor from '../../components/common/TextEditor';

export const Container = styled(commonContainerStyle)``;

const TableWrite = styled.table`
  border-bottom: 1px solid ${(props) => props.theme.colors.charcoal};
  width: 100%;

  th {
    font-weight: 500;
    background: ${(props) => props.theme.colors.graybg};
    color: ${(props) => props.theme.colors.charcoal};
    vertical-align: top;
  }
  th,
  td {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    padding: 20px 12px;
  }
  td {
    color: ${(props) => props.theme.colors.graydark};
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .contents td {
    padding: 0;
  }
  .contents textarea {
    width: 100%;
    min-height: 300px;
    resize: none;
    border: 0;
  }
  tr:first-child th,
  tr:first-child td {
    border-top-color: ${(props) => props.theme.colors.charcoal};
  }
  input {
    height: 36px;
  }
  input[type='file'] {
    padding: 0;
    border: 0;
  }
  input.title {
    width: 80%;
  }
`;

const BoardWrite = () => {
  const board = useParams().board;
  const navigate = useNavigate();
  console.log(board);
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const [formData, setFormData] = useState({
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
    category: '',
  });

  //이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  //input 입력 시
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //게시글 작성 api
  const handleSubmit = async (e) => {
    const confirmed = window.confirm('작성하시겠습니까?');

    if (confirmed) {
      e.preventDefault();

      const form = new FormData();
      form.append('multipartFile', imgRef.current.files[0]);

      Object.keys(formData).forEach((key) => {
        // Object.keys 수정
        form.append(key, formData[key]);
      });

      try {
        await axios.post('/boards/writeform', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        window.location.href = `/board/${board}`;
      } catch (e) {
        console.error('Error: ', e.message);
        if (e.response.data.message.startsWith('Validation failed')) {
          const errorMessage = e.response.data.errors[0].defaultMessage;
          alert(errorMessage);
        }
      }
    }
  };

  return (
    <>
      <SubHeader kind="board" />
      <Container>
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
            {(() => {
              switch (board) {
                case 'notice':
                  return (
                    <select name="category" value={formData.category} onChange={handleChange}>
                      <option value="">선택</option>
                      <option value="공지">공지</option>
                      <option value="이벤트">이벤트</option>
                    </select>
                  );
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
                      <option value="다이닝">다이닝</option>
                      <option value="룸">룸</option>
                    </select>
                  );
                default:
                  return <PageTitle>고객지원</PageTitle>;
              }
            })()}

            <TableWrite>
              <tr>
                <th width="160px">제목</th>
                <td>
                  <input type="text" className="title" name="title" value={formData.title} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>
                  <input type="text" name="boardWriter" value={formData.boardWriter} onChange={handleChange} required />
                </td>
              </tr>
              <tr className="contents">
                <td colSpan="2" className="writeWrapper">
                  <TextEditor name="boardContent" value={formData.boardContent} onChange={handleChange} required />
                </td>
              </tr>
              {/*<tr className="contents">*/}
              {/*  <td colSpan="2">*/}
              {/*    <textarea name="boardContent" value={formData.boardContent} onChange={handleChange} required>에디터 연결? 일단은 textarea입니다.</textarea>*/}
              {/*  </td>*/}
              {/*</tr>*/}
              <tr>
                <th>첨부파일</th>
                <td>
                  <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
                  {imgFile ? <Image src={imgFile} alt="후기 이미지" /> : <Image style={{ display: 'none' }} />}
                </td>
              </tr>
              {/*<tr>*/}
              {/*  <th>비밀번호</th>*/}
              {/*  <td>*/}
              {/*    <input type="password" name=/>*/}
              {/*  </td>*/}
              {/*</tr>*/}
            </TableWrite>
            <BtnWrapper className="center double mt40">
              <SubmitBtn type="submit">등록하기</SubmitBtn>
              <LinkBtn onClick={() => navigate(-1)}>취소</LinkBtn>
            </BtnWrapper>
          </form>
        </div>
      </Container>
    </>
  );
};

export default BoardWrite;
