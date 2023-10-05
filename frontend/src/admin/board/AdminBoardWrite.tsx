import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../Style/commonStyles';
import { Container, Table } from '../member/AdminMember';
import TextEditor from '../../components/common/TextEditor/TextEditor';

const AdminBoardWrite = () => {
  // 수정해야하는 부분 있으면 알아서 변경해서 사용해주세요
  const setValue = () => {};
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
};

export default AdminBoardWrite;
