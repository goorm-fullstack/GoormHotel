import styled from 'styled-components';
import { Select } from '../../admin/item/AdminItemList';

// 이미지 미리보기
export const Image = styled.img`
  width: 300px;
  height: 100px;
  vertical-align: middle;
  margin-left: 50px;
`;

// 세부타입 선택
export const WriteFormSelect = styled(Select)`
  width: 200px;
  margin: 0;
`;

// 중복검사버튼
export const DuplicateButton = styled.button`
  vertical-align: middle;
  margin-left: 50px;
  width: 100px;
  height: 40px;
  color: #95846e;
  background-color: #ffffff;
  border: 1px solid rgb(186, 160, 133);
  text-decoration:none;
  &:hover {
    color: #ffffff;
    background-color: #95846e;
  }
`;

// 중복검사 경고 문구
export const RedP = styled.p`
  color: #ec5353;
  display: inline-block;
  margin-left: 30px;
`;

// 중복검사 성공 문구
export const GreenP = styled.p`
  color: #008000;
  display: inline-block;
  margin-left: 30px;
`;
