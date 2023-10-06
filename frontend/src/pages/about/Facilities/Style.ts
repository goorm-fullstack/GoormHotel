import styled from 'styled-components';
import { commonContainerStyle } from '../../../Style/commonStyles';

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

export const Type = styled.p`
  color: #baa085;
  font-size: 0.875rem;
  margin-top: 24px;
`;

export const ServiceName = styled.p`
  font-size: 1.375rem;
  font-weight: 500;
  margin: 10px 0 16px;
`;

export const ServiceDesc = styled.p`
  color: #666;
  line-height: 1.5;
  word-break: keep-all;
  font-size: 0.9375rem;
`;

export const WrapHalf = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 60px 30px;
`;

export const Halfli = styled.li`
  width: 575px;
`;
