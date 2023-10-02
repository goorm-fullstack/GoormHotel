import React, { useState, useEffect } from 'react';
import { commonContainerStyle, PageTitle } from '../../Style/commonStyles';
import { Item, Info, Name, Description, Detail, Location, ImgWrapper } from './Room';
import { styled } from 'styled-components';
import axios from 'axios';
import SubHeader from '../../components/layout/SubHeader/SubHeader';

export const Container = styled(commonContainerStyle)``;

// 다이닝 데이터
export interface DiningData{
  name:string;
  price:number;
  priceAdult:number;
  priceChildren:number;
  spare:number;
  spareAdult:number;
  spareChildren:number;
  capacity:number;
  type:string;
  typeDetail:string;
  useTime:string;
}

const Dining = () => {
  const [items, setItems] = useState<Array<DiningData>>([]);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);

  // 다이닝 데이터 조회
  const handleItems = async () => {
    try {
      const response = await axios.get('/dinings/all');
      const data = response.data;
      setItems(data);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    handleItems();
  }, []);

  // 다이닝 리스트의 이미지 가져오기
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        items.map(async (item:DiningData) => {
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

  return (
    <>
      <SubHeader kind="facilities" />
      <Container>
        <PageTitle>다이닝</PageTitle>
        <Item>
          {items.length === 0 &&
          <li>
            <Info>
              <div>등록된 상품이 없습니다.</div>
            </Info>
          </li>
        }
        {items &&
        items.map((item:DiningData, index:number) => {
          return(
          <li key={index}>
            <ImgWrapper style={{ backgroundImage: `url(${imageUrls[index]})` }}></ImgWrapper>
            <Info>
              <Name>{item.name}</Name>
              <Description>
                팔도 제철 식재료를 활용한 건강한 한식을 시작으로 친환경 인증 채소를 활용한 샐러드, 다양한 디저트를 제공하는 레스토랑입니다.
              </Description>
              <Detail>
                <tr>
                  <th>운영시간</th>
                  <td>{item.useTime}</td>
                </tr>
                <tr>
                  <th>좌석수</th>
                  <td>{item.capacity}석</td>
                </tr>
              </Detail>
            </Info>
          </li>
          )
        })}
        </Item>
      </Container>
    </>
  );
};

export default Dining;
