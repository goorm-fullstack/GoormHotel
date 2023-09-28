import React from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../Style/commonStyles';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import { useParams } from 'react-router-dom';
import { Container, Table } from '../member/AdminMember';

const AdminMail = () => {
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
                  <input type="text" className="long" />{' '}
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
          <SubmitBtn>보내기</SubmitBtn>
        </BtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminMail;
