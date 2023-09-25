import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, CheckLabel, ContentsTitleXSmall, SubmitBtn } from '../../components/common/commonStyles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import { Container, ContentHeader, Table, TableHeader, TableCheckbox } from '../member/AdminMember';
import { InputWrapper, Section } from '../member/AdminManager';
import Paging from '../../components/common/Paging';
import DateBtn from '../../components/common/DateButton';

// // 사용가능, 사용불가능
// export const FilterButton = styled.button``;

// // 테이블 상단
// export const TopMenuOfTable = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   margin-bottom: 40px;
//   height: 40px;
//   & p {
//     font-size: 15px;
//     font-weight: 500;
//     vertical-align: text-bottom;
//     color: rgb(68, 68, 68);
//   }
//   & button {
//     width: 120px;
//     border: 1px solid rgb(221, 221, 221);
//     background-color: rgb(255, 255, 255);
//     height: 40px;
//     margin-left: 10px;
//     font-size: 15px;
//     color: rgb(102, 102, 102);
//     line-height: 1.2;
//   }
//   & ${FilterButton} {
//     width: 120px;
//     background-color: rgb(255, 255, 255);
//     height: 40px;
//     margin-left: 10px;
//     font-size: 15px;
//     line-height: 1.2;
//     border: 1px solid #d30a0a;
//     color: #d30a0a;
//   }
// `;

const checkboxList = [
  {
    name: '[추석맞이] 100,000원 상품권',
    number: 'AJDFLKAJLKDFJLAKJF',
    price: '100,000',
    startDate: '2023.09.07',
    endDate: '2023.09.07',
    isUsed: 'N',
  },
  {
    name: '[추석맞이] 100,000원 상품권',
    number: 'AJDFLKAJLKDFJLAKJF',
    price: '100,000',
    startDate: '2023.09.07',
    endDate: '2023.09.07',
    isUsed: 'N',
  },
];

const AdminGiftCard = () => {
  const [avaliableClick, setAvaliableClick] = useState(false);
  const [unAvaliableClick, setUnAvaliableClick] = useState(false);
  const length = checkboxList.length;

  // 체크박스 전체 선택 or 해체 기능
  const inputRef = useRef([]);

  const handleAllChecked = (e) => {
    inputRef.current.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  // 사용가능, 불가능 버튼 클릭 이벤트
  const handleAvaliableClicked = () => {
    setAvaliableClick(!avaliableClick);
  };

  const handleUnAvaliableClicked = () => {
    setUnAvaliableClick(!unAvaliableClick);
  };

  return (
    <AdminLayout subMenus="item">
      <Container>
        <PageTitle>상품권 관리</PageTitle>
        <Section>
          <ContentsTitleXSmall>상품권 발행</ContentsTitleXSmall>
          <InputWrapper>
            <form action="#" method="post">
              <input type="text" placeholder="상품권 이름" required />
              <input type="number" placeholder="상품권 금액(원)" min="1000" required />
              <DateBtn />
              <input type="password" placeholder="관리자 비밀번호 확인" required />
              <SubmitBtn type="submit">상품권 발행</SubmitBtn>
            </form>
          </InputWrapper>
        </Section>
        <Section>
          <ContentsTitleXSmall>상품권 목록</ContentsTitleXSmall>
          <TableHeader>
            <p className="number-of-list">전체{length}건</p>
            <BtnWrapper className="flexgap right">
              {avaliableClick ? (
                <NormalBtn className="header" type="button" onClick={handleAvaliableClicked}>
                  사용가능
                </NormalBtn>
              ) : (
                <NormalBtn className="header" type="button" onClick={handleAvaliableClicked}>
                  사용가능
                </NormalBtn>
              )}
              {unAvaliableClick ? (
                <NormalBtn className="header red" type="button" onClick={handleUnAvaliableClicked}>
                  사용불가
                </NormalBtn>
              ) : (
                <NormalBtn className="header red" type="button" onClick={handleUnAvaliableClicked}>
                  사용불가
                </NormalBtn>
              )}
            </BtnWrapper>
          </TableHeader>
          <Table>
            <thead>
              <tr>
                <th>
                  <InputCheckbox type="checkbox" id="all-select-label" onClick={handleAllChecked} />
                </th>
                <th>번호</th>
                <th>상품권명</th>
                <th>상품권번호</th>
                <th>상품권 금액</th>
                <th>발행일</th>
                <th>사용기한</th>
                <th>사용여부</th>
              </tr>
            </thead>
            <tbody>
              {checkboxList.map((item, idx) => {
                const id = 'checkbox' + idx;
                return (
                  <tr>
                    <td>
                      <InputCheckbox type="checkbox" id={id} ref={(el) => (inputRef.current[idx] = el)} />
                    </td>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <Link to={`/admin/giftcard/detail/${idx}`}>{item.number}</Link>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.isUsed}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Paging />
        </Section>
      </Container>
    </AdminLayout>
  );
};

export default AdminGiftCard;
