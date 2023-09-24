import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { commonAdminContents, PageTitle } from '../../components/common/commonStyles';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  Title,
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

const InfoContainer = styled.table`
  width: 100%;

  th,
  td {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 15px;
  }
`;

const InfoWrapper = styled.tr``;

const Label = styled.th`
  width: 240px;
  font-weight: 500;
  background-color: #f7f7f7;
  padding: 21.5px 40px;
  text-align: left;
  color: #111;

  &.center {
    text-align: center;
  }

  label {
    font-size: 0.875rem;
    color: #666;
  }
`;

const Data = styled.td`
  padding: 10px 20px;
  color: #444;

  &.writeWrapper {
    padding: 0;
  }

  input {
    width: 100%;
    height: 35px;
  }

  textarea {
    border: 0;
    width: 100%;
    resize: none;
    height: 400px;
    border-radius: 3px;
    padding: 10px;
  }

  input[type='file'] {
    border: 0;
    padding: 0;
  }
`;

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

  const subMenus = [
    { name: '채팅 관리', link: '/admin/chat' },
    { name: '메일 작성', link: '/admin/mail' },
  ];

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>메일 작성</PageTitle>
        <InfoContainer>
          <InfoWrapper>
            <Label>
              받는사람{' '}
              <label>
                <AllMember type="checkbox" /> 모든 회원
              </label>{' '}
            </Label>
            <Data>
              <input type="text" />
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>참조</Label>
            <Data>
              <input type="text" />
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>제목</Label>
            <Data>
              <input type="text" />
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>파일첨부</Label>
            <Data>
              <input type="file" />
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label colSpan="2" className="center">
              내용 작성
            </Label>
          </InfoWrapper>
          <InfoWrapper>
            <Data colSpan="2" className="writeWrapper">
              <textarea></textarea>
            </Data>
          </InfoWrapper>
        </InfoContainer>
        <ModifyBtnWrapper>
          <ModifyBtn>전송</ModifyBtn>
        </ModifyBtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminMail;
