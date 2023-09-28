import React, { useContext, useEffect, useRef, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../components/common/commonStyles';
import TextEditor from '../../components/common/TextEditor';
import { useParams } from 'react-router-dom';
import { Container, Table } from '../member/AdminMember';
import Instance from '../../utils/api/axiosInstance';

const AdminMail = () => {
  const {receiver} = useParams();
  const [receiverValue, setReceiverValue] = useState('');
  const [receiverList, setReceiverList] = useState([]);
  const [subscribe, setSubScribe] = useState([]);
  const [members, setMembers] = useState([]);
  const [editorData, setEditorData] = useState('');
  const fileRef = useRef();
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    if(receiver !== undefined) {
      console.log(receiver)
      setReceiverValue(receiver)
      console.log("call")
    }
  }, []);

  //이미지 업로드 input의 onChange
  const saveFile = () => {
    const file = fileRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  // 전체 구독자 조회
  const getAllSubscribe = () => {
    Instance.get("/subscribe").then((response) =>{
      setSubScribe(response.data);
    })
  }

  // 전체 멤버 조회
  const getAllMembers = () => {
    Instance.get("/member/list").then((response) => {
      setMembers(response.data);
    })
  }

  // TextEditor 컴포넌트에서 에디터 데이터를 전달받는 콜백 함수
  const handleEditorDataChange = (data) => {
    setEditorData(data);
  };

  // Input에 들어온 데이터를 ","를 기준으로 자르자
  const splitComma = () => {
    let data = receiverValue.split(",");
    data.map((str) => {
      data.append(str);
    })

    if(members.length !== 0 || members !== undefined) {
      data.concat(members);//이어 붙이자
    }

    if(subscribe.length !== 0 || subscribe !== undefined) {
      data.concat(subscribe);
    }

    data = Array.from(new Set(data));//중복을 제거
    setReceiverList(data);//최종 결과
  }


  // Form Date를 API에 전송
  const handleBtnClick = () => {
    const form = new FormData();
    splitComma();// 일단 메일 주소를 분리한다.
    form.append('multipartFile', fileRef.current.files[0]);
    form.append('to', receiverList)

    Instance.post('/api/mail/multiple', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      window.location.reload();
    })
  }
  
  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>메일 작성</PageTitle>
        <form action='/api/mail/multiple'>
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
                  <input type="text" className="long" onChange={(e) => setReceiverValue(e.target.value)} value={receiverValue}/>
                  <CheckLabel>
                    <InputCheckbox type="checkbox" /> 전체 회원
                  </CheckLabel>
                  <CheckLabel>
                    <InputCheckbox type="checkbox" /> 전체 구독자
                  </CheckLabel>
                </MultiCheck>
              </td>
            </tr>
            <tr>
              <th>참조</th>
              <td>
                <input type="text" className="long" />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" className="long" value = {formData.subject} />
              </td>
            </tr>
            <tr>
              <th>파일첨부</th>
              <td>
                <input type="file" onChange={saveFile}/>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="writeWrapper" ref={fileRef}>
                <TextEditor value = {formData.message} required/>
              </td>
            </tr>
          </tbody>
        </Table>
        </form>
        <BtnWrapper className="mt40 center">
          <SubmitBtn onClick={handleBtnClick}>보내기</SubmitBtn>
        </BtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminMail;