import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn, ContentsTitleXSmall, SubmitBtn } from '../../Style/commonStyles';
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/ko';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Table, TableHeader } from '../member/Style';
import { InputWrapper, Section } from '../member/Style';
import Paging from '../../components/common/Paging/Paging';
import Instance from '../../utils/api/axiosInstance';

interface Giftcard {
  id: number;
  title: string;
  uuid: string;
  money: number;
  issueDate: string;
  expire: number;
  isZeroMoney: string;
}

const AdminGiftCard = () => {
  const { page } = useParams();
  const [dataLength, setDataLength] = useState(0);
  const [giftcardList, setGiftCardList] = useState<Giftcard[]>([]);
  const [money, setMoney] = useState('');
  const [title, setTitle] = useState('');
  const [expire, setExpire] = useState('');
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [count, setCount] = useState<number>(1);
  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');

  useEffect(() => {
    if (!(authItem && authItem.includes('AUTH_B'))) {
      alert('사용할 수 없는 페이지이거나 권한이 없습니다.');
      navigate('/admin');
    }
  }, []);

  // 체크박스 전체 선택 or 해체 기능
  const inputRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    Instance.get('/api/giftcard/list?page=' + page).then((response) => {
      setDataLength(response.data.length);
      setGiftCardList(response.data);
    });

    Instance.get('/api/giftcard/count').then((response) => {
      setCount(response.data);
    });
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      const allMemberIds = giftcardList.map((item) => item.id);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prevItems: any) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item: number) => item !== id);
      } else {
        return [...prevItems, id];
      }
    });
  };

  const calcExpireDate = (day: string, expire: number) => {
    const issueDate = new Date(day);
    const expireDate = new Date(issueDate.setDate(issueDate.getDate() + expire));

    const year = expireDate.getFullYear();
    const month = String(expireDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(expireDate.getDate()).padStart(2, '0');

    const formattedExpireDate = `${year}.${month}.${day1}`;
    return formattedExpireDate;
  };

  // 상품권을 사용가능 형식으로 변경
  const handleAvaliableClicked = () => {
    let stateChangeData = {
      data: checkedItems,
    };
    Instance.post('/api/giftcard/usable', stateChangeData).then(() => {
      window.location.reload();
    });
  };

  // 상품권을 사용가능 형식으로 변경
  const handleUnAvaliableClicked = () => {
    let stateChangeData = {
      data: checkedItems,
    };
    Instance.post('/api/giftcard/unusable', stateChangeData).then(() => {
      window.location.reload();
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('money', money);
    formData.append('expire', expire);
    Instance.post('/api/giftcard/issue', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {});
  };

  if (authItem && authItem.includes('AUTH_B')) {
    return (
      <AdminLayout subMenus="item">
        <Container>
          <PageTitle>상품권 관리</PageTitle>
          <Section>
            <ContentsTitleXSmall>상품권 발행</ContentsTitleXSmall>
            <InputWrapper className="giftcard">
              <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="상품권 이름" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input
                  type="number"
                  name="money"
                  placeholder="상품권 금액(원)"
                  min="1000"
                  value={money}
                  onChange={(e) => setMoney(e.target.value)}
                  required
                />
                <input
                  type="number"
                  name="expire"
                  placeholder="유효기간(일)"
                  min="1"
                  value={expire}
                  onChange={(e) => setExpire(e.target.value)}
                  required
                />
                <SubmitBtn type="submit">상품권 발행하기</SubmitBtn>
              </form>
            </InputWrapper>
          </Section>
          <Section>
            <ContentsTitleXSmall>상품권 목록</ContentsTitleXSmall>
            <TableHeader>
              <p className="total number-of-list">
                전체 <strong>{dataLength}</strong> 건
              </p>
              <BtnWrapper className="flexgap right">
                <NormalBtn className="header" type="button" onClick={handleAvaliableClicked}>
                  상품권 사용 가능
                </NormalBtn>
                <NormalBtn className="header red" type="button" onClick={handleUnAvaliableClicked}>
                  상품권 사용 중지
                </NormalBtn>
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
                    <InputCheckbox type="checkbox" id="all-select-label" onChange={handleSelectAll} />
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
                {giftcardList.length === 0 ? (
                  <>
                    <tr>
                      <td colSpan={8} className="center empty">
                        등록된 상품권이 없습니다.
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {giftcardList.map((item, idx) => {
                      const id = 'checkbox' + idx;
                      return (
                        <tr>
                          <td className="center">
                            <InputCheckbox
                              type="checkbox"
                              id={id}
                              checked={checkedItems.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                          </td>
                          <td className="center">{idx + 1}</td>
                          <td className="center">
                            <p className="textover">{item.title}</p>
                          </td>
                          <td className="center">
                            <p>
                              <Link to={`/admin/giftcard/detail/${item.uuid}`} className="u">
                                {item.uuid}
                              </Link>
                            </p>
                          </td>
                          <td className="center">{item.money}</td>
                          <td className="center">{item.issueDate}</td>
                          <td className="center">{calcExpireDate(item.issueDate, item.expire)}</td>
                          <td className="center">{item.isZeroMoney}</td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </Table>
            <Paging totalPage={count} />
          </Section>
        </Container>
      </AdminLayout>
    );
  } else {
    return null;
  }
};

export default AdminGiftCard;
