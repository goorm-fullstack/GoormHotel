import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, ContentsTitleXSmall, SubmitBtn } from '../../Style/commonStyles';
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import { Container, Table, TableHeader } from '../member/AdminMember';
import { InputWrapper, Section } from '../member/AdminManager';
import Paging from '../../components/common/Paging/Paging';
import DateBtn from '../../components/common/DateButton/DateButton';

const checkboxList = [
  {
    name: '[추석맞이] 100,000원 상품권',
    number: 'AJDFLKAJLKDFJLAKJF',
    price: '100,000',
    startDate: '2023.09.07',
    endDate: '2023.09.07',
    isUsed: '사용',
  },
  {
    name: '[추석맞이] 100,000원 상품권',
    number: 'AJDFLKAJLKDFJLAKJF',
    price: '100,000',
    startDate: '2023.09.07',
    endDate: '2023.09.07',
    isUsed: '미사용',
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
            <p className="total number-of-list">
              전체 <strong>{length}</strong> 건
            </p>
            <BtnWrapper className="flexgap right">
              {avaliableClick ? (
                <NormalBtn className="header" type="button" onClick={handleAvaliableClicked}>
                  상품권 사용 가능
                </NormalBtn>
              ) : (
                <NormalBtn className="header" type="button" onClick={handleAvaliableClicked}>
                  상품권 사용 가능
                </NormalBtn>
              )}
              {unAvaliableClick ? (
                <NormalBtn className="header red" type="button" onClick={handleUnAvaliableClicked}>
                  상품권 사용 중지
                </NormalBtn>
              ) : (
                <NormalBtn className="header red" type="button" onClick={handleUnAvaliableClicked}>
                  상품권 사용 중지
                </NormalBtn>
              )}
            </BtnWrapper>
          </TableHeader>
          <Table>
            <colgroup>
              <col width="80px" />
              <col width="90px" />
              <col width="200px" />
              <col width="200px" />
              <col width="180px" />
              <col width="180px" />
              <col width="180px" />
              <col width="100px" />
            </colgroup>
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
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="center empty">
                  등록된 상품권이 없습니다.
                </td>
              </tr>
              {checkboxList.map((item, idx) => {
                const id = 'checkbox' + idx;
                return (
                  <tr>
                    <td className="center">
                      <InputCheckbox type="checkbox" id={id} ref={(el) => (inputRef.current[idx] = el)} />
                    </td>
                    <td className="center">{idx + 1}</td>
                    <td className="center">
                      <p className="textover">{item.name}</p>
                    </td>
                    <td className="center">
                      <p>
                        <Link to={`/admin/giftcard/detail/${idx}`}>{item.number}</Link>
                      </p>
                    </td>
                    <td className="center">{item.price}</td>
                    <td className="center">{item.startDate}</td>
                    <td className="center">{item.endDate}</td>
                    <td className="center">{item.isUsed}</td>
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
