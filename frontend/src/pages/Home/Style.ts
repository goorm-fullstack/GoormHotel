import styled from 'styled-components';
import { commonWrapperStyle } from '../../Style/commonStyles';
import { Link } from 'react-router-dom';

export const SlideWrapper = styled.article`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const IndexOffers = styled.article`
  margin-top: 200px;
`;

export const Wrapper = styled(commonWrapperStyle)`
  margin-bottom: 150px;
`;

export const IndexTitle = styled.h2`
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.big};
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.goldhover};

  span {
    color: ${(props) => props.theme.colors.charcoal};
  }
  &.facilities {
    text-align: left;
    font-size: ${(props) => props.theme.font.bigx};
  }
`;

export const IndexDesc = styled.p`
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.6;
  text-align: center;
  margin-bottom: 60px;
  letter-spacing: -0.02em;

  &.facilities {
    text-align: left;
    word-break: keep-all;
  }
`;

export const ItemDesc = styled.p`
  font-size: ${(props) => props.theme.font.sizes};
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

export const ItemList = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 60px;
`;

export const RoomItem = styled.li`
  width: 380px;
  img {
    width: 200px;
    height: 200px;
  }
`;

export const ItemTitle = styled.h3`
  font-size: ${(props) => props.theme.font.sizem};
  margin: 20px 0 12px;
  color: ${(props) => props.theme.colors.charcoal};
  font-weight: 500;
`;

export const DiningItem = styled(RoomItem)`
  width: 280px;
`;

export const IndexFacilities = styled.article`
  height: 500px;
  width: 100%;
  min-width: ${(props) => props.theme.wrapper.minwidth};
  margin-top: 130px;
  background-color: ${(props) => props.theme.colors.graybg};
`;

export const FacilitiesContainer = styled.div`
  height: 500px;
  display: flex;
  position: relative;
`;

export const ImageSlider = styled.div`
  width: 50%;
  height: 500px;
  position: relative;
`;

export const FacilitiesInfo = styled.div`
  width: 50%;
  max-width: calc(1180px / 2);
  position: absolute;
  top: 50%;
  left: 50%;
  padding-left: 100px;
  transform: translate(0, -50%);
`;

export const IndexLocation = styled.div`
  margin-top: 130px;
`;

export const MapAddress = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  z-index: 10;
  font-size: ${(props) => props.theme.font.sizexs};
  padding: 20px 24px;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.blacklight};

  & > p {
    margin-bottom: 10px;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: ${(props) => props.theme.colors.goldhover};
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const PrevButton = styled.button`
  width: 65px;
  height: 65px;
  background-color: ${(props) => props.theme.colors.charcoal};
  color: #fff;

  &:hover {
    background-color: ${(props) => props.theme.colors.blacklight};
  }

  img {
    filter: brightness(0) invert(1);
    width: 24px;
    height: 24px;
  }
`;

export const NextButton = styled(PrevButton)`
  background-color: white;
  transform: scaleX(-1);

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    filter: brightness(0);
  }
`;

export const MapWrapper = styled.div`
  position: relative;
  margin-bottom: 60px;
`;

export const ReserveContainer = styled.div`
  background-color: white;
  width: 1180px;
  height: 150px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  padding: 0 80px;
  display: flex;
  z-index: 1;
  position: absolute;
  bottom: 0;
  transform: translate(-50%, 50%);
  left: 50%;
  border-radius: 12px;

  .searchbtnwrap {
    display: flex;
    align-items: center;
  }
`;

export const ReservationButton = styled(Link)`
  width: 150px;
  height: 65px;
  line-height: 65px;
  background-color: ${(props) => props.theme.colors.navy};
  color: white;
  text-align: center;
  display: inline-block;

  &:hover {
    background-color: ${(props) => props.theme.colors.navyhover};
  }
`;

export const NoItem = styled.div`
  text-align: center;
  margin: 0 auto;
`;
