import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
`;

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
`;

const Data = styled.td`
  padding: 10px 20px;
  color: #444;

  &.chatWrapper {
    padding: 0;
    background: #f7f7f7;
  }
  .chatLog {
    max-height: 380px;
    overflow-y: scroll;
    padding: 40px 0;
    line-height: 1.7;
    background: white;
    border-bottom: 1px solid #ddd;
  }

  .chatLog li {
    max-width: 734px;
    margin: 0 auto;
  }

  .chatLog storng {
    font-weight: 500;
    color: #111;
  }

  .chatLog span {
    color: #444;
  }

  .chatLog storng.manager {
    color: #baa085;
  }

  .writeWrapper {
    display: flex;
    max-width: 750px;
    margin: 0 auto;
    padding: 20px 0;
    gap: 0 10px;
  }

  textarea {
    border: 1px solid #ddd;
    width: 100%;
    max-width: 640px;
    resize: none;
    height: 80px;
    border-radius: 3px;
    padding: 10px;
  }

  button[type='submit'] {
    width: 100px;
    border-radius: 3px;
    background: #baa085;
    color: white;
  }

  button[type='submit']:hover {
    background: #95846e;
  }

  .chatClose {
    border: 1px solid #ddd;
    background: white;
    color: #666;
    padding: 6px 16px;
    margin-left: 8px;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .chatClose:hover {
    background: #f7f7f7;
  }
`;

const ModifyBtnWrapper = styled.div`
  text-align: center;
`;

const ModifyBtn = styled.button`
  width: 200px;
  height: 45px;
  border: 1px solid #baa085;
  color: #baa085;
  margin: 40px auto 0;
  background: white;

  &:hover {
    background: #baa085;
    color: white;
  }
`;

const AdminChatDetail = () => {
  const { memberId } = useParams();

  const subMenus = [
    { name: '채팅 관리', link: '/admin/chat' },
    { name: '메일 작성', link: '/admin/mail' },
  ];

  return (
    <AdminLayout title="채팅/메일 관리" subMenus={subMenus}>
      <Container>
        <Title>채팅 관리</Title>
        <InfoContainer>
          <InfoWrapper>
            <Label>회원명(회원 ID)</Label>
            <Data>홍구름({memberId})</Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>최근 발송일</Label>
            <Data>2023.09.03</Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>상태</Label>
            <Data>
              미확인{/** 종료 버튼 클릭 시 답변 알림 메일 발송 */}
              <button type="button" className="chatClose">
                종료
              </button>
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label colSpan="2" className="center">
              채팅 기록
            </Label>
          </InfoWrapper>
          <InfoWrapper>
            <Data colSpan="2" className="chatWrapper">
              <ul className="chatLog">
                <li>
                  <storng className="member">회원명(회원 ID) : </storng>
                  <span>채팅 내용입니다.</span>
                </li>
                <li>
                  <storng className="manager">관리자(관리자 ID) : </storng>
                  <span>채팅 내용입니다.</span>
                </li>
                <li>
                  <storng className="member">회원명(회원 ID) : </storng>
                  <span>채팅 내용입니다.</span>
                </li>
                <li>
                  <storng className="manager">관리자(관리자 ID) : </storng>
                  <span>채팅 내용입니다.</span>
                </li>
              </ul>
              <div className="writeWrapper">
                <textarea></textarea>
                <button type="submit">전송</button>
              </div>
            </Data>
          </InfoWrapper>
        </InfoContainer>
        <ModifyBtnWrapper>
          <ModifyBtn>목록</ModifyBtn>
        </ModifyBtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminChatDetail;
