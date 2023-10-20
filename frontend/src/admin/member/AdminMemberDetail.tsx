import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, BtnWrapper, SubmitBtn, LinkBtn } from '../../Style/commonStyles';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Table } from './Style';
import Instance from '../../utils/api/axiosInstance';

interface Member {
  name: string;
  email: string;
  memberId: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birth: number[];
  gender: string;
  grade: string;
  mailAuth: boolean;
  signupDate: any;
  role: string;
}

const AdminMemberDetail = () => {
  const { memberId } = useParams();
  const [formData, setFormData] = useState({
    memberName: '',
    memberGrade: '',
    password: '',
    confirmPassword: '',
    mailAuth: '',
    email: '',
    contact: '',
    gender: '선택 안함',
    birthday: '입력 안함',
    role: '',
  });
  const [member, setMember] = useState<Partial<Member>>({});
  // const [joinDate, setJoinDate] = useState(null);

  // 회원정보상세 로딩
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await Instance.get(`/api/admin/member/${memberId}`);
        if (response.status === 200) {
          const { password, ...otherData } = response.data;
          setMember(otherData);
          console.log(otherData);
          setFormData({
            memberName: otherData.name,
            memberGrade: otherData.grade,
            password: '',
            confirmPassword: '',
            email: otherData.email,
            contact: otherData.phoneNumber,
            mailAuth: otherData.mailAuth,
            gender: otherData.gender || '선택 안함',
            birthday: otherData.birth ? new Date(otherData.birth).toISOString().split('T')[0] : '',
            role: otherData.role
          });
        }
      } catch (error: any) {
        alert('데이터를 불러오는 데 실패했습니다.');
        console.log("Error details:", error);
      }
    };

    fetchMembers();
  }, [memberId]);

  const payload = {
    ...formData
  };

  // 회원정보 수정 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await Instance.put<Member>(`/member/api/change-member/${memberId}`, payload);


      if (response.status === 200) {
        alert('회원정보 수정이 완료되었습니다');
        navigate(`/admin/member/detail/${memberId}`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원이 없습니다');
      } else {
        alert('에러 발생');
      }
    }
  };

  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');

  useEffect(() => {
    if (!(authItem && authItem.includes('AUTH_A'))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (authItem && authItem.includes('AUTH_A')) {
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
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <input type="email" placeholder="이메일" name="email" value={formData.email} onChange={handleChange} />
                  <span className="mailcheck">상태 : {member.mailAuth ? '인증완료' : '인증안됨'}</span>
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
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="선택안함">선택안함</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
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
                <td>{`${member.signupDate?.[0] ?? 'N/A'}.${member.signupDate?.[1] ?? 'N/A'}.${member.signupDate?.[2] ?? 'N/A'}`}</td>
              </tr>
            </tbody>
          </Table>
          <BtnWrapper className="mt40 center double">
            <SubmitBtn type="submit" onClick={handleSubmit}>수정</SubmitBtn>
            <LinkBtn to="/admin/member/1">취소</LinkBtn>
          </BtnWrapper>
        </Container>
      </AdminLayout>
    );
  } else {
    return null;
  }
};

export default AdminMemberDetail;
