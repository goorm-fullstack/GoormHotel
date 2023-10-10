import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import * as S from './Style';
import axios from 'axios';
import {
  PageTitle,
  ContentsTitleXSmall,
  CheckLabel,
  InputCheckbox,
  NormalBtn,
  BtnWrapper,
  SubmitLinkBtn,
  CircleCloseBtn,
} from '../../Style/commonStyles';
import Paging from '../../components/common/Paging/Paging';
import { numberWithCommas } from '../../utils/function/comma';
import { DiningData, RoomData } from '../../admin/item/AdminItemList';

const productCategories = [
  { korean: '전체', english: '' },
  { korean: '디럭스', english: 'deluxe' },
  { korean: '스위트', english: 'sweet' },
  { korean: '패밀리', english: 'family' },
  { korean: '풀 빌라', english: 'poolVilla' },
];

const diningCategories = [
  { korean: '전체', english: '' },
  { korean: '레스토랑', english: 'restaurant' },
  { korean: '룸서비스', english: 'roomService' },
  { korean: '바&라운지', english: 'barRounge' },
  { korean: '베이커리', english: 'bakery' },
];

const productTypes = [
  {
    name: '전체',
    id: 'all',
  },
  {
    name: '객실',
    id: 'room',
  },
  {
    name: '다이닝',
    id: 'dining',
  },
];

type ProductType1 = {
  imageUrl: string;
  name: string;
  price: number;
  priceAdult: number;
  priceChildren: number;
  spare: number;
  spareAdult: number;
  spareChildren: number;
  type: string;
  typeDetail: string;
  bed: string;
  capacity: number;
  description: string;
};

type ProductType2 = {
  imageUrl: string;
  name: string;
  price: number;
  priceAdult: number;
  priceChildren: number;
  spare: number;
  spareAdult: number;
  spareChildren: number;
  type: string;
  typeDetail: string;
  useTime: string;
  capacity: number;
  description: string;
};

type SelectProduct = ProductType1 | ProductType2;

const ReservationItem = () => {
  const [selectedProduct, setSelectedProduct] = useState<SelectProduct | null>();
  const location = useLocation();
  console.log(location.search.replace('?type=', ''));
  const reservationData = location.state ? location.state.reservationData : null;
  const [selectedType, setSelectedType] = useState<string[]>(['all', 'room', 'dining']);
  console.log(selectedType);
  const [selectedCategory, setSelectedCategory] = useState<string>(productCategories[0].english);
  const [products, setProducts] = useState<(RoomData | DiningData)[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const { page } = useParams<{ page: string }>();

  // 서버에 저장된 이미지 요청
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        products.map(async (item) => {
          const response = await axios.get(`/image/${item.name}`, {
            responseType: 'arraybuffer',
          });
          const blob = new Blob([response.data], {
            type: response.headers['content-type'],
          });
          return URL.createObjectURL(blob);
        })
      );
      setImageUrls(urls);
    };

    if (products.length > 0) {
      fetchImageUrls();
    }
  }, [products]);

  useEffect(() => {
    const currentPage: number = parseInt(page ? page : '1', 10);
    if (selectedType.includes('all')) {
      if(selectedCategory !== ''){
        axios
        .get(`/category?page=${currentPage}`, {
          params: {
            typeDetail: selectedCategory,
          },
        })
        .then((response) => {
          const totalPages = parseInt(response.headers['totalpages'], 10);
          const totalData = parseInt(response.headers['totaldata'], 10);
          setProducts(response.data);
          setTotalData(totalData);
          setTotalPage(totalPages);
        })
        .catch((error) => {
          console.error(error);
        });
      }else{
        axios
        .get(`/category?page=${currentPage}`)
        .then((response) => {
          const totalPages = parseInt(response.headers['totalpages'], 10);
          const totalData = parseInt(response.headers['totaldata'], 10);
          setProducts(response.data);
          setTotalData(totalData);
          setTotalPage(totalPages);
        })
        .catch((error) => {
          console.error(error);
        });
      }
    } else {
      if (selectedCategory !== '') {
        axios
          .get(`/category?page=${currentPage}`, {
            params: {
              type: selectedType[0],
              typeDetail: selectedCategory,
            },
          })
          .then((response) => {
            const totalPages = parseInt(response.headers['totalpages'], 10);
            const totalData = parseInt(response.headers['totaldata'], 10);
            setProducts(response.data);
            setTotalData(totalData);
            setTotalPage(totalPages);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .get(`/category?page=${currentPage}`, {
            params: {
              type: selectedType[0],
            },
          })
          .then((response) => {
            const totalPages = parseInt(response.headers['totalpages'], 10);
            const totalData = parseInt(response.headers['totaldata'], 10);
            setProducts(response.data);
            setTotalData(totalData);
            setTotalPage(totalPages);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [selectedType, selectedCategory]);

  useEffect(() => {
    if (location.search) {
      const type = location.search.replace('?type=', '');
      setSelectedType([`${type}`]);
    }
  }, []);

  const handleReservationClick = (productInfo: RoomData | DiningData, imageUrl: string) => {
    setSelectedProduct({ ...productInfo, imageUrl });
  };

  const handleDeleteClick = () => {
    setSelectedProduct(null);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    console.log(value);

    if (value === 'all') {
      if (selectedType.includes('all')) {
        setSelectedType([]);
      } else {
        setSelectedType(['all', 'room', 'dining']);
      }
    } else {
      setSelectedType((prevSelected) => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter((type) => type !== value && type !== 'all');
        } else {
          const updatedSelected = [...prevSelected, value];
          if (updatedSelected.includes('room') && updatedSelected.includes('dining')) {
            return ['all', 'room', 'dining'];
          } else {
            return updatedSelected.filter((type) => type !== 'all');
          }
        }
      });
    }
  };

  const nameOfTypeDetail = (product: RoomData | DiningData) => {
    const foundCategory = [...diningCategories, ...productCategories].find((category) => product.typeDetail.includes(category.english));
    return foundCategory ? foundCategory.korean : 'none';
  };

  return (
    <div>
      <S.Container>
        <PageTitle>스페셜오퍼</PageTitle>
        <S.Wrapper>
          <S.Left>
            <ContentsTitleXSmall>예약 상품 선택</ContentsTitleXSmall>
            <S.SelectWrapper>
              <div className="typewrapper">
                {productTypes.map((type, index) => (
                  <CheckLabel key={index} htmlFor={type.id}>
                    <InputCheckbox
                      type="checkbox"
                      id={type.id}
                      key={index}
                      onChange={handleTypeChange}
                      value={type.id}
                      checked={selectedType.includes(type.id)}
                    />
                    {type.name}
                  </CheckLabel>
                ))}
              </div>
              <div className="categorywrap">
                <p>
                  전체 <strong>{totalData}</strong> 개
                </p>
                <select id="productType" value={selectedCategory} onChange={handleCategoryChange}>
                  {selectedType.length === 1 && selectedType[0] === 'room'
                    ? productCategories.map((category, index) => (
                        <option key={index} value={category.english}>
                          {category.korean}
                        </option>
                      ))
                    : selectedType.length === 1 && selectedType[0] === 'dining'
                    ? diningCategories.map((category, index) => (
                        <option key={index} value={category.english}>
                          {category.korean}
                        </option>
                      ))
                    : ( <option value={productCategories[0].english}>
                          {productCategories[0].korean}
                        </option>
                      )
                  }
                </select>
              </div>
            </S.SelectWrapper>
            <S.RoomItemWrapper>
              {products.length === 0 && <div className="empty">등록된 상품이 없습니다.</div>}
              {products.length > 0 &&
                products.map((product, index) => (
                  <S.RoomItem key={index}>
                    <div
                      className="imgwrap"
                      style={{
                        backgroundImage: `url(${imageUrls[index] || ''})`,
                      }}
                    />
                    <S.RoomItemInfo>
                      <h4>{product.name}</h4>
                      <p>
                        {product.type === 'room' ? '객실' : '다이닝'}
                        <span>{nameOfTypeDetail(product)}</span>
                        <span>{product.capacity}인 기준</span>
                      </p>
                      <h5>{product.description}</h5>
                      <p className="price">
                        <strong>{numberWithCommas(product.price)}</strong> 원 ~
                      </p>
                      <h5>추가 인원 비용</h5>
                      <table>
                        <tbody>
                          <tr>
                            <th>성인(1인)</th>
                            <td>{numberWithCommas(product.priceAdult)} 원</td>
                          </tr>
                          <tr>
                            <th>어린이(1인)</th>
                            <td>{numberWithCommas(product.priceChildren)} 원</td>
                          </tr>
                        </tbody>
                      </table>
                      <BtnWrapper className="full mt30">
                        <NormalBtn onClick={() => handleReservationClick(product, imageUrls[index])}>상품 담기(예약)</NormalBtn>
                      </BtnWrapper>
                    </S.RoomItemInfo>
                  </S.RoomItem>
                ))}
            </S.RoomItemWrapper>
            <Paging totalPage={totalPage} />
          </S.Left>
          <S.Right>
            <ContentsTitleXSmall>상품 개요</ContentsTitleXSmall>
            <S.SelectItem>
              {(() => {
                if (selectedProduct) {
                  return (
                    <S.SelectedItem>
                      <div
                        className="imgwrap"
                        style={{
                          backgroundImage: `url(${selectedProduct.imageUrl})`,
                        }}
                      />
                      <h4>
                        {selectedProduct.name}
                        <CircleCloseBtn onClick={handleDeleteClick}></CircleCloseBtn>
                      </h4>
                      <p>{selectedProduct.type === 'room' ? '객실' : '다이닝'}</p>
                      <p>{nameOfTypeDetail(selectedProduct)}</p>
                      <p>성인 {selectedProduct.capacity}인 기준</p>
                      <table>
                        <tbody>
                          <tr>
                            <th>기본가</th>
                            <td>{numberWithCommas(selectedProduct.price)} 원</td>
                          </tr>
                        </tbody>
                      </table>
                      <h5>추가 인원 비용</h5>
                      <table>
                        <tbody>
                          <tr>
                            <th>성인</th>
                            <td>{numberWithCommas(selectedProduct.priceAdult)} 원</td>
                            {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 

                            예약 정보 입력 페이지에서 기준 인원 초과하여 인원 추가하는 경우 
                            추가된 인원 수에 맞춰 위 계산법 적용됩니다. 이하 동일 */}
                          </tr>
                          <tr>
                            <th>어린이</th>
                            <td>{numberWithCommas(selectedProduct.priceChildren)} 원</td>
                            {/* 기본값 0원: 성인 추가 비용 * 성인 인원 추가 수 */}
                          </tr>
                        </tbody>
                      </table>
                    </S.SelectedItem>
                  );
                } else {
                  return (
                    <S.NoItem>
                      <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="none" height="256" width="256" />
                        <path
                          d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
                          fill="none"
                          stroke="#ddd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="16"
                        />
                        <circle cx="80" cy="204" fill="none" r="20" stroke="#ddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                        <circle cx="184" cy="204" fill="none" r="20" stroke="#ddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                        <path
                          d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
                          fill="none"
                          stroke="#ddd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="16"
                        />
                      </svg>
                      <br />
                      담긴 상품이 없습니다.
                    </S.NoItem>
                  );
                }
              })()}
            </S.SelectItem>
            <BtnWrapper className="full mt20">
              <SubmitLinkBtn
                className="shadow"
                to="/offers/step2"
                state={{
                  reservationData: reservationData,
                  selectedProduct: selectedProduct,
                }}>
                예약 정보 입력하기
              </SubmitLinkBtn>
            </BtnWrapper>
          </S.Right>
        </S.Wrapper>
      </S.Container>
    </div>
  );
};

export default ReservationItem;
