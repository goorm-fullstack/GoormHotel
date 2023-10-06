import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../Style/commonStyles';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import { useLocation, useParams } from 'react-router-dom';
import { Container, Table } from '../member/Style';
import Instance from '../../utils/api/axiosInstance';
import queryString from 'query-string';

const AdminMail = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [receiverValue, setReceiverValue] = useState<string>('');
  const [subscribe, setSubScribe] = useState([]);
  const [members, setMembers] = useState<any[]>([]);
  const [subject, setSubject] = useState('');
  const [carbonCopy, setCarbonCopy] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState('');
  const [message, setMessage] = useState('');
  const mailto = queryParams.mailto;

  console.log(mailto);
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_C"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  console.log(mailto)

  useEffect(() => {
    if (mailto !== null && typeof mailto !== 'undefined') {
      if (!Array.isArray(mailto)) {
        setReceiverValue(mailto); // 여기서는 배열의 첫 번째 값을 사용하거나 원하는 로직을 추가할 수 있습니다.
      }
      console.log(mailto);
    }
  }, []);

  //이미지 업로드 input의 onChange
  const saveFile = () => {
    if (fileRef.current !== null && fileRef.current.files !== null) {
      const file = fileRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader !== undefined && reader != null) {
          setFile(reader.result as string);
        }
      };
    }
  };

  // 전체 구독자 버튼 클릭
  const handleClickSubScribe = (checked: boolean) => {
    if (checked) {
      Instance.get('/subscribe').then((response) => {
        setSubScribe(response.data);
        console.log(response.data);
      });
    } else {
      setSubScribe([]);
    }
  };

  // 전체 회원 버튼 클릭
  const handleClickMember = (checked: boolean) => {
    if (checked) {
      Instance.get('/member').then((response) => {
        setMembers(response.data);
        console.log(response.data);
      });
    } else {
      setMembers([]);
    }
  };

  // Input에 들어온 데이터를 ","를 기준으로 자르자
  const splitComma = (): string[] => {
    let data = receiverValue.split(',');

    if (members.length !== 0 || members !== undefined) {
      data.concat(members); //이어 붙이자
    }

    if (subscribe.length !== 0 || subscribe !== undefined) {
      data.concat(subscribe);
    }

    data = Array.from(new Set(data)); //중복을 제거
    //setReceiverList(data);//최종 결과
    console.log(data);
    return data;
  };

  // Form Date를 API에 전송
  const handleSubmit = () => {
    const form = new FormData();
    const receiverData = splitComma();
    console.log(receiverData);
    if (fileRef.current !== null && fileRef.current.files !== null) {
      form.append('multipartFile', fileRef.current.files[0]);
    }
    form.append('carbonCopy', carbonCopy);
    form.append('to', receiverData.join(','));
    form.append('message', message);
    form.append('subject', subject);

    Instance.post('/api/mail/multiple', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {});
    window.location.href = `/admin/mail`;
  };

  }

  if(authItem && authItem.includes("AUTH_C")) {
  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>메일 작성</PageTitle>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Table className="horizontal">
            <colgroup>
              <col width="240px" />
              <col width="auto" />
            </colgroup>
            <tbody>
              <tr>
                <th>받는사람</th>
                <td>
                  <MultiCheck className="fit">
                    <input type="text" className="long" onChange={(e) => setReceiverValue(e.target.value)} value={receiverValue} required />
                    <CheckLabel>
                      <InputCheckbox type="checkbox" onChange={(e) => handleClickMember(e.target.checked)} /> 전체 회원
                    </CheckLabel>
                    <CheckLabel>
                      <InputCheckbox
                        type="checkbox"
                        onChange={(e) => {
                          handleClickSubScribe(e.target.checked);
                        }}
                      />{' '}
                      전체 구독자
                    </CheckLabel>
                  </MultiCheck>
                </td>
              </tr>
              <tr>
                <th>참조</th>
                <td>
                  <input type="text" className="long" name="carbonCopy" value={carbonCopy} onChange={(e) => setCarbonCopy(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>제목</th>
                <td>
                  <input type="text" className="subject long" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </td>
              </tr>
              <tr>
                <th>파일첨부</th>
                <td>
                  <input type="file" name="multipleFile" onChange={saveFile} ref={fileRef} />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="writeWrapper">
                  <TextEditor setValue={setMessage} />
                </td>
              </tr>
            </tbody>
          </Table>
          <BtnWrapper className="mt40 center">
            <SubmitBtn type="submit">보내기</SubmitBtn>
          </BtnWrapper>
        </form>
      </Container>
    </AdminLayout>
  );
  } else {
    return null;
  }
};

export default AdminMail;
