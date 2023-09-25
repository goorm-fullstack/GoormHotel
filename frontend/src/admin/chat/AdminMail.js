import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel } from '../../components/common/commonStyles';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  ContentHeader,
  Total,
  BlackListBtn,
  Delete,
  Add,
  Table,
  TableCheckboxWrapper,
  TableHeader,
  TableCell,
  TableCheckbox,
  Num,
} from '../member/AdminMember';

const ModifyBtnWrapper = styled.div`
  text-align: center;
`;

const ModifyBtn = styled.button`
  width: 200px;
  height: 45px;
  color: white;
  margin: 40px auto 0;
  background: #baa085;

  &:hover {
    background: #95846e;
  }
`;

const AllMember = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='lightgray' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  vertical-align: sub;
  margin: 0 2px 0 20px;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #baa085;
  }
`;

const AdminMail = () => {
  const { memberId } = useParams();

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>메일 작성</PageTitle>
        <Table className="horizontal">
          <tr>
            <th>
              받는사람{' '}
              <label>
                <AllMember type="checkbox" /> 모든 회원
              </label>{' '}
            </th>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <th>참조</th>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <th>제목</th>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <th>파일첨부</th>
            <td>
              <input type="file" />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="center">
              내용 작성
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="writeWrapper">
              <textarea></textarea>
            </td>
          </tr>
        </Table>
        <ModifyBtnWrapper>
          <ModifyBtn>전송</ModifyBtn>
        </ModifyBtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminMail;
