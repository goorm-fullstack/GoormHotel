import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, BtnWrapper, SubmitBtn, LinkBtn } from '../../Style/commonStyles';
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/ko';
import { Container, Table } from '../member/AdminMember';
import DateBtn from '../../components/common/DateButton/DateButton';
import Instance from '../../utils/api/axiosInstance';
import { useParams } from 'react-router-dom';

const AdminDetailGiftCard = () => {
  const [giftcard, setGiftCard] = useState({
    id : "",
    title : "",
    uuid : "",
    money : 0,
    member : {},
    isZeroMoney : 'Y',
    issueDate : "",
    expire : 0,
  });
  const {id} = useParams();

  useEffect(() => {
    Instance.get("/api/giftcard/"+id).then((response) =>{
      setGiftCard(response.data);
    })
  }, []);

  return (
    <AdminLayout subMenus="item">
      <Container>
        <PageTitle>상품권 상세</PageTitle>
        <form action="#" method="post">
          <Table className="horizontal">
            <colgroup>
              <col width="240px" />
              <col width="auto" />
            </colgroup>
            <tbody>
                  <tr>
                    <th>상품권명</th>
                    <td>
                      <input type="text" value={giftcard.title} required />
                    </td>
                  </tr>
                  <tr>
                    <th>상품권번호</th>
                    <td>
                      <input type="text" value={giftcard.uuid} required />
                    </td>
                  </tr>
                  <tr>
                    <th>상품권 금액</th>
                    <td>
                      <input type="text" value={giftcard.money} required />
                    </td>
                  </tr>
                  <tr>
                    <th>발행일</th>
                    <td>{giftcard.issueDate}</td>
                  </tr>
                  <tr>
                    <th>사용기한</th>
                    <td>
                      <DateBtn />
                    </td>
                  </tr>
                  <tr>
                    <th>사용여부</th>
                    <td>
                      <input type="text" value={giftcard.isZeroMoney} required />
                    </td>
                  </tr>
                </tbody>
          </Table>
          <BtnWrapper className="mt40 center double">
            <SubmitBtn type="submit">수정</SubmitBtn>
            <LinkBtn to="/admin/giftcard/1">취소</LinkBtn>
          </BtnWrapper>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default AdminDetailGiftCard;
