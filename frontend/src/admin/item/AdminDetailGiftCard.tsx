import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, BtnWrapper, SubmitBtn, LinkBtn } from '../../Style/commonStyles';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';
import { Container, Table } from '../member/AdminMember';
import DateBtn from '../../components/common/DateButton/DateButton';

const giftCard = [
  {
    name: '[추석맞이] 100,000원 상품권',
    number: 'AJDFLKAJLKDFJLAKJF',
    price: '100,000',
    startDate: '2023.09.07',
    endDate: '2023.09.07',
    isUsed: 'N',
  },
];

const AdminDetailGiftCard = () => {
  const [selectDate, setSelectDate] = useState('');

  useEffect(() => {
    let placeholder = '';
    giftCard.map((item) => {
      return (placeholder = item.endDate);
    });

    setSelectDate(placeholder);
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
            {giftCard.map((item) => {
              return (
                <tbody>
                  <tr>
                    <th>상품권명</th>
                    <td>
                      <input type="text" value={item.name} required />
                    </td>
                  </tr>
                  <tr>
                    <th>상품권번호</th>
                    <td>
                      <input type="text" value={item.number} required />
                    </td>
                  </tr>
                  <tr>
                    <th>상품권 금액</th>
                    <td>
                      <input type="text" value={item.price} required />
                    </td>
                  </tr>
                  <tr>
                    <th>발행일</th>
                    <td>{item.startDate}</td>
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
                      <input type="text" value={item.isUsed} required />
                    </td>
                  </tr>
                </tbody>
              );
            })}
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
