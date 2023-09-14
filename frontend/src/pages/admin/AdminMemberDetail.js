import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #DDDDDD;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #DDDDDD;
`;

export const Label = styled.div`
  width: 245px;
  font-weight: bold;
  background-color: #F7F7F7;
  padding: 23px 0 23px 40px;
`;

export const Data = styled.div`
  flex-grow: 1;
  padding: 20px 0 23px 20px;
`;

export const Input = styled.input`
  width: 200px;
  height: 40px;
  font-size: 15px;
  border: 1px solid #DDDDDD;
  margin-left: 20px;
  outline: none;
`;

const EmailAuth = styled.p`
  font-size: 15px;
  color: #666666;
  margin-left: 12px;
`;

export const ModifyBtnWrapper = styled.div`
  text-align: center;
`;

export const ModifyBtn = styled.button`
  width: 200px;
  height: 40px;
  background-color: #95846E;
  color: #FFFFFF;
  margin: 40px auto 80px;

  &:hover {
    background-color: #8A7057;
  }
`;

const AdminMemberDetail = () => {
  const { memberId } = useParams();
  const [formData, setFormData] = useState({
    memberName: '',
    memberGrade: '',
    password: '',
    confirmPassword: '',
    email: '',
    contact: '',
    gender: '선택 안함',
    birthday: '입력 안함',
  });
  // const [joinDate, setJoinDate] = useState(null);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/member/members/${memberId}`);
  //       const birth = response.data.birth;
  //       setJoinDate(birth);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, [memberId]);

  const subMenus = [
    { name: '전체 회원 관리', link: '/admin/member' },
    { name: '부운영자 관리', link: '/admin/managers' },
  ];
  

  return (
    <AdminLayout title="회원관리" subMenus={subMenus}>
      <Container>
        <Title>회원 정보 상세</Title>
        <InfoContainer>
          <InfoWrapper>
            <Label>회원 ID</Label>
            <Data>{memberId}</Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>회원 이름</Label>
            <Input placeholder="회원이름" name="memberName" value={formData.memberName} onChange={handleChange}/>
          </InfoWrapper>
          <InfoWrapper>
            <Label>회원 등급</Label>
            <Input placeholder="등급1"  name="memberGrade" value={formData.memberGrade} onChange={handleChange}/>
          </InfoWrapper>
          <InfoWrapper>
            <Label>비밀번호</Label>
            <Input placeholder="비밀번호"  name="password" value={formData.password} onChange={handleChange}/>
          </InfoWrapper>
          <InfoWrapper>
            <Label>비밀번호 확인</Label>
            <Input placeholder="비밀번호 확인" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </InfoWrapper>
          <InfoWrapper>
            <Label>이메일</Label>
            <Input placeholder="이메일" name="email" value={formData.email} onChange={handleChange} />
            <EmailAuth>상태: 인증완료</EmailAuth>
          </InfoWrapper>
          <InfoWrapper>
            <Label>연락처</Label>
            <Input placeholder="연락처" name="contact" value={formData.contact} onChange={handleChange} />
          </InfoWrapper>
          <InfoWrapper>
            <Label>성별</Label>
            <Input placeholder="선택 안함" name="gender" value={formData.gender} onChange={handleChange} />
          </InfoWrapper>
          <InfoWrapper>
            <Label>생일</Label>
            <Input placeholder="입력 안함" name="birthday" value={formData.birthday} onChange={handleChange} />
          </InfoWrapper>
          <InfoWrapper>
            <Label>가입일</Label>
            <Data>2023.09.09</Data>
          </InfoWrapper>
        </InfoContainer>
        <ModifyBtnWrapper>
          <ModifyBtn>수정</ModifyBtn>
        </ModifyBtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminMemberDetail;