import React, { useEffect, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, BtnWrapper, SubmitBtn, LinkBtn } from '../../Style/commonStyles';
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/ko';
import Instance from '../../utils/api/axiosInstance';
import {useNavigate, useParams} from 'react-router-dom';
import { Container } from '../../components/Slide/Style';
import { Table } from '../member/Style';

interface Member {
  name: string;
}

interface GiftCard {
  id: number;
  uuid: string;
  title: string;
  money: number;
  isZeroMoney: string;
  issueDate: string;
  expire: number;
  member: Member;
}

const AdminDetailGiftCard = () => {
  const [giftcard, setGiftCard] = useState<GiftCard>();
  const {id} = useParams();
  const [updateClick, setUpdateClick] = useState(true);
  const [title, setTitle] = useState<string>('');//상품권 명
  const [expire, setExpire] = useState<string>('0');//유효기간
  const [used, setIsUsed] = useState<string>('');
  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_B"))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  useEffect(() => {
    Instance.get('/api/giftcard/' + id).then((response) => {
      console.log(response.data);
      setGiftCard(response.data.message);
      setTitle(response.data.message.title);
      setExpire(response.data.message.expire);
      setIsUsed(response.data.message.isZeroMoney);
    })
  }, []);

  const calcExpireDate = (day: string, expire: number) => {
    const issueDate = new Date(day);
    const expireDate = new Date(issueDate.setDate(issueDate.getDate() + expire));

    const year = expireDate.getFullYear();
    const month = String(expireDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(expireDate.getDate()).padStart(2, '0');

    const formattedExpireDate = `${year}.${month}.${day1}`;
    return formattedExpireDate;
  };

  const handleUsedChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // 입력된 값을 대문자로 변환
    if (value === 'Y' || value === 'N') {
      setIsUsed(value);
    } else {
      setIsUsed('');
    }
  }

  const handleDataUpdate = () => {
    console.log(expire + ' ' + title + ' ' + used);
    if(giftcard) {
      giftcard.expire = parseInt(expire);
      giftcard.title = title;
      giftcard.isZeroMoney = used;
      console.log(giftcard);
      Instance.post("/api/giftcard/update", giftcard).then((response) => {
        if(response.status === 200) {
          window.location.reload();
        }
      })
    }
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
                          <input type="text" value={title} readOnly={updateClick} required />
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
                          {updateClick === true ? (
                            calcExpireDate(giftcard.issueDate, giftcard.expire)
                          ) : (
                            <input type='number' value={expire} onChange={(e) => {setExpire(e.target.value)}}/>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>사용여부</th>
                        <td>{/* 최대 길이는 한자리 */}
                          <input type="text" maxLength={1} value={used} readOnly={updateClick} onChange={handleUsedChange} required />
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <div>
                        잘못된 접근입니다.
                      </div>
                    </>
                  )}
                </tbody>
          </Table>
          <BtnWrapper className="mt40 center double">
            {updateClick === true ? (
              <SubmitBtn onClick={(e) => {e.preventDefault();setUpdateClick(!updateClick);}}>
                수정
              </SubmitBtn>
            ) : (
              <SubmitBtn onClick={handleDataUpdate}>
                완료
              </SubmitBtn>
            )}
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
