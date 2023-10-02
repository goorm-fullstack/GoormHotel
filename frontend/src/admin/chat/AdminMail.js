import React, { useContext, useEffect, useRef, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../Style/commonStyles';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import { useParams } from 'react-router-dom';
import { Container, Table } from '../member/AdminMember';
import Instance from '../../utils/api/axiosInstance';
import UploadAdapter from '../../utils/adaptor/UploadAdaptor';

const AdminMail = () => {
  const {receiver} = useParams();
  const [receiverValue, setReceiverValue] = useState('');
  const [receiverList, setReceiverList] = useState([]);
  const [subscribe, setSubScribe] = useState([]);
  const [members, setMembers] = useState([]);
  const [subject, setSubject] = useState('');
  const [carbonCopy, setCarbonCopy] = useState('');
  const fileRef = useRef();
  const [file, setFile] = useState();
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    if(receiver !== undefined) {
      setReceiverValue(receiver)
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
    
  }

  // 전체 멤버 조회
  const getAllMembers = () => {
    Instance.get("/member/list").then((response) => {
      setMembers(response.data);
    })
  }

  const handleClickSubScribe = (checked) => {
    if(checked) {
      Instance.get("/subscribe").then((response) =>{
        setSubScribe(response.data);
        console.log(response.data);
      })
    } else {
      setSubScribe('');
    }
  }

  // Input에 들어온 데이터를 ","를 기준으로 자르자
  const splitComma = () => {
    let data = receiverValue.split(",");

    if(members.length !== 0 || members !== undefined) {
      data.concat(members);//이어 붙이자
    }

    if(subscribe.length !== 0 || subscribe !== undefined) {
      data.concat(subscribe);
    }

    data = Array.from(new Set(data));//중복을 제거
    //setReceiverList(data);//최종 결과
    console.log(data);
    return data;
  }


  // Form Date를 API에 전송
  const handleSubmit= () => {
    const form = new FormData();
    const receiverData = splitComma();
    console.log(receiverData);
    form.append('multipartFile', fileRef.current.files[0]);
    form.append('carbonCopy', carbonCopy);
    form.append('to', receiverData);
    form.append('message', message);
    form.append('subject', subject)

    Instance.post('/api/mail/multiple', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      
    })
    window.location.href = `/admin/mail`;
  }
  
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
                    <input type="text" className="long" onChange={(e) => setReceiverValue(e.target.value)} value={receiverValue} required/>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" /> 전체 회원
                    </CheckLabel>
                    <CheckLabel>
                      <InputCheckbox type="checkbox" onChange={e => {handleClickSubScribe(e.target.checked)}}/> 전체 구독자
                    </CheckLabel>
                  </MultiCheck>
                </td>
              </tr>
              <tr>
                <th>참조</th>
                <td>
                  <input type="text" className="long" name="carbonCopy" value = {carbonCopy} onChange={(e)=> setCarbonCopy(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>제목</th>
                <td>
                  <input type="text" className="subject long" name="subject" value = {subject} onChange={(e)=> setSubject(e.target.value)} required/>
                </td>
              </tr>
              <tr>
                <th>파일첨부</th>
                <td>
                  <input type="file" name="multipleFile" onChange={saveFile} ref={fileRef} />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="writeWrapper">
                  <TextEditor extra setValue = {setMessage} name="message" required/>
                </td>
              </tr>
            </tbody>
          </Table>
          <BtnWrapper className="mt40 center">
            <SubmitBtn type='submit'>보내기</SubmitBtn>
          </BtnWrapper>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default AdminMail;