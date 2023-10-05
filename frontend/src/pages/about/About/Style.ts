import styled from 'styled-components';
import { commonContainerStyle } from '../../../Style/commonStyles';

export const ImgWrapper = styled.div`
  width: 680px;
  height: 400px;
  background-size: cover;
`;

export const Section = styled.div`
  display: flex;
  gap: 0 100px;
  margin-bottom: 200px;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    dislay: block;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 80px;
    left: 50%;
    transform: translate(-100%, 0);
    background: ${(props) => props.theme.colors.graybg};
  }

  &.right::before {
    transform: translate(0, 0);
  }
`;

export const ContentsDesc = styled.p`
  width: 400px;
  color: ${(props) => props.theme.colors.graylight};
  line-height: 1.5;
  margin-bottom: 40px;
  word-break: keep-all;
`;

export const MerbershipImg = styled.img`
  margin-bottom: 40px;
`;

export const Container = styled(commonContainerStyle)``;

export const ContainerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;
