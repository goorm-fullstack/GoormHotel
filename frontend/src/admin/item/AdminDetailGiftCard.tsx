import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, BtnWrapper, SubmitBtn, LinkBtn } from '../../Style/commonStyles';
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/ko';
import { Container, Table } from '../member/AdminMember';
import DateBtn from '../../components/common/DateButton/DateButton';
import Instance from '../../utils/api/axiosInstance';
import {useNavigate, useParams} from 'react-router-dom';

interface Member {
  name : string;
}

interface GiftCard {
  id : number;
  uuid : string;
  title : string;
  money : number;
  isZeroMoney : string;
  issueDate  : string;
  expire : number;
  member : Member;
}

const AdminDetailGiftCard = () => {
  const [giftcard, setGiftCard] = useState<GiftCard>();
  const {id} = useParams();
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_B"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  useEffect(() => {
    Instance.get("/api/giftcard/"+id).then((response) =>{
      console.log(response.data);
      setGiftCard(response.data.message);
    })
  }, []);

  const calcExpireDate = (day : string, expire : number) => {
    const issueDate = new Date(day);
    const expireDate = new Date(issueDate.setDate(issueDate.getDate() + expire));

    const year = expireDate.getFullYear();
    const month = String(expireDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(expireDate.getDate()).padStart(2, '0');
    
    const formattedExpireDate = `${year}.${month}.${day1}`;
    return formattedExpireDate;
  }

  if(authItem && authItem.includes("AUTH_B")) {
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
                  {giftcard !== undefined ? (
                    <>
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
                          {calcExpireDate(giftcard.issueDate, giftcard.expire)}
                        </td>
                      </tr>
                      <tr>
                        <th>사용여부</th>
                        <td>
                          <input type="text" value={giftcard.isZeroMoney} required />
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}
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
  } else {
    return null;
  }
};

export default AdminDetailGiftCard;
