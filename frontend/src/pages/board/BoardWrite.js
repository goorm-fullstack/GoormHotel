import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom'; // useHistory 추가
import { commonContainerStyle, PageTitle, BtnWrapper, LinkBtn, SubmitBtn, commonTable } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';
import axios from 'axios';
import TextEditor from '../../components/common/TextEditor/TextEditor';

const Container = styled(commonContainerStyle)``;
const Table = styled(commonTable)``;

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
        window.location.href = `/board/${board}/1`;
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
            <Table className="horizontal">
              <tr>
                <th width="240px">제목</th>
                <td>
                  <input type="text" className="title long" name="title" value={formData.title} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <th width="240px">카테고리</th>
                <td>
                  {(() => {
                    switch (board) {
                      // case 'notice': {/** 사용자 페이지에서 공지사항 작성 안함 */}
                      //   return (
                      //     <select name="category" value={formData.category} onChange={handleChange}>
                      //       <option value="">선택</option>
                      //       <option value="공지">공지</option>
                      //       <option value="이벤트">이벤트</option>
                      //     </select>
                      //   );
                      case 'qna':
                        return (
                          <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="문의1">문의1</option>
                            <option value="문의2">문의2</option>
                          </select>
                        );
                      case 'review':
                        return (
                          <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="객실">객실</option>
                            <option value="다이닝">다이닝</option>
                          </select>
                        );
                      default:
                        return;
                    }
                  })()}
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
              <tr className="conbtm">
                <th>첨부파일</th>
                <td>
                  <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required />
                  {/* {imgFile ? <img src={imgFile} alt="후기 이미지" /> : <img style={{ display: 'none' }} />} */}
                </td>
              </tr>
              {/*<tr>*/}
              {/*  <th>비밀번호</th>*/}
              {/*  <td>*/}
              {/*    <input type="password" name=/>*/}
              {/*  </td>*/}
              {/*</tr>*/}
            </Table>
            <BtnWrapper className="center double mt40">
              <SubmitBtn type="submit">작성하기</SubmitBtn>
              <LinkBtn onClick={() => navigate(-1)}>취소</LinkBtn>
            </BtnWrapper>
          </form>
        </div>
      </Container>
    </>
  );
};

export default BoardWrite;
