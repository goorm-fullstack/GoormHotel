import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../components/common/commonStyles';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Table } from '../member/AdminMember';
import TextEditor from '../../components/common/TextEditor';

const AdminBoardWrite = () => {
  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>게시글 작성</PageTitle>
        <Table className="horizontal">
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
            <th>분류</th>
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
            <td colSpan="2" className="writeWrapper">
              <TextEditor />
            </td>
          </tr>
        </Table>
        <BtnWrapper className="center mt40">
          <SubmitBtn>작성하기</SubmitBtn>
        </BtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminBoardWrite;
