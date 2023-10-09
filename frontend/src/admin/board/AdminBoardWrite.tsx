import React, { useEffect } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../Style/commonStyles';
import { Container, Table } from '../member/Style';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import { useNavigate } from 'react-router-dom';

const AdminBoardWrite = () => {
  // 수정해야하는 부분 있으면 알아서 변경해서 사용해주세요
  const setValue = () => {};
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_C"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  if(authItem && authItem.includes("AUTH_C")) {
  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>게시글 작성</PageTitle>
        <Table className="horizontal">
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <MultiCheck className="fit">
                  <input type="text" className="long" />
                  <CheckLabel>
                    <InputCheckbox type="checkbox" /> 답글
                  </CheckLabel>
                </MultiCheck>
              </td>
            </tr>
            <tr>
              <th>게시판</th>
              <td>
                <select>
                  <option>값값</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <select>
                  <option>값값</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>파일첨부</th>
              <td>
                <input type="file" />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="writeWrapper">
                <TextEditor setValue={setValue} />
              </td>
            </tr>
          </tbody>
        </Table>
        <BtnWrapper className="center mt40">
          <SubmitBtn>작성하기</SubmitBtn>
        </BtnWrapper>
      </Container>
    </AdminLayout>
  );
  } else {
    return null;
  }
};

export default AdminBoardWrite;
