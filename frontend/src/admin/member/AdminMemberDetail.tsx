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
}

const AdminMemberDetail = () => {
  const { memberId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    password: '',
    confirmPassword: '',
    mailAuth: '',
    email: '',
    phoneNumber: '',
    gender: '',
    birth: '',
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
            name: otherData.name,
            grade: otherData.grade,
            password: '',
            confirmPassword: '',
            email: otherData.email,
            phoneNumber: otherData.phoneNumber,
            mailAuth: otherData.mailAuth,
            gender: otherData.gender || '선택 안함',
            birth: otherData.birth ? new Date(otherData.birth).toISOString().split('T')[0] : '',
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

  // 회원정보 수정 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData, memberId
    };

    try {
      const response = await Instance.put<Member>(`/api/admin-change-member/${memberId}`, payload);

      if (response.status === 200) {
        alert('회원정보 수정이 완료되었습니다');
        navigate(`/admin/member/detail`);
        // navigate(`/admin/member/detail/${memberId}`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원이 없습니다');
      } else {
        alert('에러 발생');
      }
    }
  };

  // 회원 삭제
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Instance.delete(`/api/softdelete/${memberId}`);
      if (response.status === 200) {
        alert('회원이 삭제되었습니다.');
        navigate('/admin/member/detail');
      }
    } catch (error: any) {
      alert('회원 삭제 실패');
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

  console.log(formData);

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
                  <input type="text" placeholder="회원이름" name="name" value={formData.name} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <th>회원 등급</th>
                <td>
                  <select value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})}>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
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
                  <span className="mailAuth"> 상태 : {formData.mailAuth ? '인증완료' : '인증되지 않음'} </span>
                </td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>
                  <input type="tel" placeholder="연락처" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <th>성별</th>
                <td>
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
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
                  <input type="date" placeholder="입력 안함" name="birth" value={formData.birth} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <th>가입일</th>
                <td>{member.signupDate ? new Date(member.signupDate).toLocaleDateString() : 'loading...'}</td>
              </tr>
            </tbody>
          </Table>
          <BtnWrapper className="mt40 center double">
            <SubmitBtn type="submit" onClick={handleSubmit}>수정</SubmitBtn>
            <LinkBtn to="/admin/member/1">취소</LinkBtn>
            <SubmitBtn type="submit" onClick={handleDelete}>회원 삭제</SubmitBtn>
          </BtnWrapper>
        </Container>
      </AdminLayout>
    );
  } else {
    return null;
  }
};

export default AdminMemberDetail;
