import React, {useRef, useState} from 'react';
import { styled } from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { commonContainerStyle } from '../../components/common/commonStyles';
import axios from "axios";

export const Container = styled.div`
  ${commonContainerStyle}
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: rgb(17, 17, 17);
  margin-bottom: 100px;
`;

const AboutHeader = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 99;
  padding: 0 40px;
  top: 120px;
  min-width: 1260px;
`;

const AboutHeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  width: 235px;
`;

const LinkWrapper = styled.div`
  & > a:not(:last-child) {
    margin-right: 40px;
  }
`;

const Image = styled.img`
  width: 300px;
  vertical-align: middle;
  margin-left: 50px;
`;


const AboutLink = styled(NavLink)`
  font-size: 15px;
  color: #666;

  &:hover {
    color: #baa085;
  }

  &.active {
    color: #baa085;
  }
`;

const TableWrite = styled.table`
  border-bottom: 1px solid #21201e;
  width: 100%;

  th {
    border-top: 1px solid #eee;
    font-weight: 500;
    background: #f7f7f7;
    color: #21201e;
    vertical-align: top;
  }
  th,
  td {
    padding: 20px 12px;
  }
  td {
    border-top: 1px solid #eee;
    color: #666;
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
    border-top-color: #21201e;
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

const ButtonWrap = styled.div`
  margin: 40px 0 0;
  text-align: center;

  button[type='submit'] {
    background: #baa085;
    color: white;
    display: inline-block;
    width: 160px;
    height: 45px;
    margin: 0 5px;
    vertical-align: middle;
  }
  button[type='submit']:hover {
    background: #8a7057;
  }
  a {
    border: 1px solid #baa085;
    color: #baa085;
    display: inline-block;
    width: 160px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    vertical-align: middle;
    margin: 0 5px;
  }
  a:hover {
    background: #baa085;
    color: white;
  }
`;

const BoardWrite = () => {
  const board = useParams().board;
  const [imgFile, setImgFile] = useState(''); // 이미지 상태 관리
  const imgRef = useRef(); // 이미지 태그
  const [formData, setFormData] = useState(
      {
        title: '',
        boardTitle: '',
        category: '',
        boardWriter: '',
        boardContent: ''
      }
  )

  //이미지 업로드 input의 onChange(이미지 미리보기)
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // input 값 입력 시 formData의 값 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('img', imgRef.current.files[0]);

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try{
      await axios.post('/boards/writeform', form, {
        headers:{
          'Content-Type': 'Multipart/form-data',
        },
      });
      window.location.href = `/board/${board}`;
    }
    catch(error){
      console.error('Error', error.message);
    }
  }

  return (
      <>
        <AboutHeader>
          <AboutHeaderTitle>고객지원</AboutHeaderTitle>
          <LinkWrapper>
            <AboutLink to="/board/notice" activeClassName="active">
              공지사항
            </AboutLink>
            <AboutLink to="/board/qna" activeClassName="active">
              문의하기
            </AboutLink>
            <AboutLink to="/board/review" activeClassName="active">
              이용후기
            </AboutLink>
          </LinkWrapper>
        </AboutHeader>
        <Container>
          {(() => {
            switch (board) {
              case 'notice':
                return <Title>공지사항</Title>;
              case 'qna':
                return <Title>문의하기</Title>;
              case 'review':
                return <Title>이용후기</Title>;
              default:
                return <Title>고객지원</Title>;
            }
          })()}
          <div>
            <TableWrite>
              {(() => {
                switch (board) {
                  case 'notice':
                    return (
                        <select name="category" value={formData.category} onChange={handleChange} readOnly>
                          <option value="공지">공지</option>
                          <option value="이벤트">이벤트</option>
                        </select>
                    );
                  case 'qna':
                    return (
                        <select name="category" value={formData.category} onChange={handleChange} readOnly>
                          <option value="문의1">문의1</option>
                          <option value="문의2">문의2</option>
                        </select>
                    );
                  case 'review':
                    return (
                        <select name="category" value={formData.category} onChange={handleChange} readOnly>
                          <option value="후기1">후기1</option>
                          <option value="후기2">후기2</option>
                        </select>
                    );
                  default:
                    return <Title>고객지원</Title>;
                }
              })()}
              <tr>
                <th width="160px">제목</th>
                <td>
                  <input type="text" className="title" name="title" value={formData.title} onChange={handleChange} required/>
                </td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>
                  <input type="text" name="boardWriter" value={formData.boardWriter} onChange={handleChange} required/>
                </td>
              </tr>
              <tr className="contents">
                <td colSpan="2">
                  <textarea name="boardContent" value={formData.boardContent} onChange={handleChange} required>에디터 연결? 일단은 textarea입니다.</textarea>
                </td>
              </tr>
              <tr>
                <th>첨부파일</th>
                <td>
                  <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} required/>
                  {imgFile ? <Image src={imgFile} alt={"사진첨부"}/> : <Image style={{display: 'none'}}></Image>}
                </td>
              </tr>
              {/*<tr>*/}
              {/*  <th>비밀번호</th>*/}
              {/*  <td>*/}
              {/*    <input type="password" />*/}
              {/*  </td>*/}
              {/*</tr>*/}
            </TableWrite>
            <ButtonWrap>
              <button type="submit">등록하기</button>
              <a href={`/board/` + board}>취소</a>
            </ButtonWrap>
          </div>
        </Container>
      </>
  );
};

export default BoardWrite;