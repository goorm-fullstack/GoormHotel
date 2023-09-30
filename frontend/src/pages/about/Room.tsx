import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { commonContainerStyle, PageTitle } from '../../Style/commonStyles';
import SubHeader from '../../components/layout/SubHeader/SubHeader';

export const Container = styled(commonContainerStyle)``;

export const Item = styled.ul`
  li {
    width: 100%;
    height: 400px;
    margin-bottom: 58px;
    display: flex;
    border: 1px solid ${(props) => props.theme.colors.grayborder};
  }
`;

export const ImgWrapper = styled.div`
  width: 680px;
  height: 398px;
  background-size: cover;
`;

export const Info = styled.div`
  width: 500px;
  padding: 60px;
`;

export const Name = styled.h3`
  font-size: ${(props) => props.theme.font.sizexl};
  color: ${(props) => props.theme.colors.charcoal};
  margin-bottom: 30px;
`;

export const Description = styled.p`
  font-size: ${(props) => props.theme.font.sizes};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.6;
  word-break: keep-all;
`;

export const Detail = styled.table`
  width: 100%;
  line-height: 1.8;
  margin: 25px 0;
  font-size: ${(props) => props.theme.font.sizexs};

  th {
    font-weight: 500;
    width: 40%;
    color: ${(props) => props.theme.colors.charcoal};
  }
  td {
    color: ${(props) => props.theme.colors.graylight};
  }
`;

export const Location = styled.p`
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.goldhover};
`;

// 객실 데이터
interface RoomData{
  name:string;
  price:number;
  priceAdult:number;
  priceChildren:number;
  type:string;
  typeDetail:string;
  bed:string;
  spare:number;
  spareAdult:number;
  spareChildren:number;
  capacity:number;
}

const Room = () => {
  const [items, setItems] = useState<Array<RoomData>>([]);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);

  // 객실 리스트 조회
  const handleItems = async () => {
    try {
      const response = await axios.get('/rooms/all');
      const data = response.data;
      setItems(data);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    handleItems();
  },[]);

  // 객실 리스트의 이미지 가져오기
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        items.map(async (item:RoomData) => {
          const response = await axios.get(`/image/${item.name}`, {
            responseType: "arraybuffer",
          });
          console.log(response);
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          console.log("blob = ", blob);
          return URL.createObjectURL(blob);
        })
      );
      setImageUrls(urls);
      console.log(urls);
    };

    fetchImageUrls();
  }, [items]);

  console.log(items);

  return (
    <>
      <SubHeader kind="facilities" />
      <Container>
        <PageTitle>객실</PageTitle>
        <Item>
          {items.length === 0 &&
            <li>
              <Info>
                <div>등록된 상품이 없습니다.</div>
              </Info>
            </li>
          }
          {items &&
          items.map((item:RoomData, index:number) => {
            return(
          <li key={index}>
            <ImgWrapper style={{ backgroundImage: `url(${imageUrls[index]})` }}></ImgWrapper>
            <Info>
              <Name>{item.name}</Name>
              <Description>
                우아한 인테리어와 현대적 세련미가 조화롭게 어우러진 디럭스 룸은 초고층 객실에서 바라보는 서울 도심의 파노라믹뷰와 최상의 휴식을
                제공합니다.
              </Description>
              <Detail>
                <tr>
                  <th>침대타입</th>
                  <td>더블/트윈</td>
                </tr>
                <tr>
                  <th>투숙인원</th>
                  <td>{item.capacity}명</td>
                </tr>
              </Detail>
            </Info>
          </li>)
          })}
        </Item>
      </Container>
    </>
  );
};

export default Room;
