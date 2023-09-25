import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel, SubmitBtn } from '../../components/common/commonStyles';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Table } from './AdminMember';

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dddddd;
`;

export const tr = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
`;

export const Data = styled.div`
  flex-grow: 1;
  padding: 20px 0 23px 20px;
`;

export const Input = styled.input`
  width: 200px;
  height: 40px;
  font-size: 15px;
  border: 1px solid #dddddd;
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
  background-color: #95846e;
  color: #ffffff;
  margin: 40px auto 80px;

  &:hover {
    background-color: #8a7057;
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

  return (
    <AdminLayout subMenus="member">
      <Container>
        <PageTitle>회원 정보 상세</PageTitle>
        <Table className="horizontal">
          <colgroup>
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>회원 ID</th>
              <td>{memberId}</td>
            </tr>
            <tr>
              <th>회원 이름</th>
              <td>
                <input type="text" placeholder="회원이름" name="memberName" value={formData.memberName} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>회원 등급</th>
              <td>
                <select>
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
                {/* <input type="text" placeholder="회원등급" name="memberGrade" value={formData.memberGrade} onChange={handleChange} /> */}
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <input type="password" placeholder="비밀번호" name="password" value={formData.password} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>비밀번호 확인</th>
              <td>
                <input type="password" placeholder="비밀번호 확인" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input type="email" placeholder="이메일" name="email" value={formData.email} onChange={handleChange} />
                <span className="mailcheck">상태 : 인증완료</span>
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>
                <input type="tel" placeholder="연락처" name="contact" value={formData.contact} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                <select>
                  <option>선택안함</option>
                  <option>남성</option>
                  <option>여성</option>
                </select>
                {/* <input type="text" placeholder="선택 안함" name="gender" value={formData.gender} onChange={handleChange} /> */}
              </td>
            </tr>
            <tr>
              <th>생일</th>
              <td>
                <input type="date" placeholder="입력 안함" name="birthday" value={formData.birthday} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>가입일</th>
              <td>2023.09.09</td>
            </tr>
          </tbody>
        </Table>
        <BtnWrapper className="mt40 center">
          <SubmitBtn type="submit">수정</SubmitBtn>
        </BtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminMemberDetail;
