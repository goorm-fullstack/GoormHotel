import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../Style/commonStyles';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import { useParams } from 'react-router-dom';
import { Container, Table } from '../member/AdminMember';
import Instance from '../../utils/api/axiosInstance';

const AdminMail = () => {
  const {receiver} = useParams();
  const [receiverValue, setReceiverValue] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [subscribe, setSubScribe] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    if(receiver !== undefined) {
      console.log(receiver)
      setReceiverValue(receiver)
      console.log("call")
      setIsReadOnly(true)
    }
  }, []);


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

  const handleBtnClick = () => {
    let data = {
      to : subscribe + members,
      message : "",
      subject : ""
    };
    Instance.post("/api/mail/multiple", data).then(()=>{
      console.log("전송 완료");
    })
  }
  
  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>메일 작성</PageTitle>
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
                  <input type="text" className="long" onChange={(e) => setReceiverValue(e.target.value)} value={receiverValue} readOnly={isReadOnly}/>
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
                <input type="text" className="long" />
              </td>
            </tr>
            <tr>
              <th>파일첨부</th>
              <td>
                <input type="file" />
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="writeWrapper">
                <TextEditor />
              </td>
            </tr>
          </tbody>
        </Table>
        <BtnWrapper className="mt40 center">
          <SubmitBtn onClick={handleBtnClick}>보내기</SubmitBtn>
        </BtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminMail;