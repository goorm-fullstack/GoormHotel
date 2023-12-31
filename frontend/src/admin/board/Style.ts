import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { commonContainerStyle, BtnWrapper, commonTable } from '../../Style/commonStyles';

export const ModalContainer = styled.div`
  display: none;
  position: absolute;
  width: 217px;
  height: 104px;
  border: 1px solid #dddddd;
  background-color: #fff;
  text-align: left;
  padding-top: 27px;
  padding-left: 21px;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
`;

export const CommentText = styled.p`
  cursor: pointer;

  &:hover + ${ModalContainer} {
    display: block;
  }
`;

export const ModalContent = styled.div`
  max-height: 300px;
`;

export const LinkStyle = styled(Link)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: #444444;
    text-underline-offset: 10px;
  }
`;

export const SearchHeader = styled.div`
  display: flex;
  padding: 20px 0;
  margin-top: 40px;
  justify-content: center;
  column-gap: 10px;

  select {
    width: 120px;
  }
`;

export const Container = styled(commonContainerStyle)``;

export const IsReply = styled.span`
  // 답글 아이콘
  display: inline-block;
  background: ${(props) => props.theme.colors.gold};
  color: white;
  font-size: ${(props) => props.theme.font.sizexxxs};
  padding: 0 7px;
  border-radius: 8px;
  height: 14px;
  line-height: 14px;
  margin-right: 10px;
  vertical-align: middle;
`;

export const BoardGallery = styled.ul`
  // 갤러리형 게시판 리스트 스타일
  display: flex;
  flex-wrap: wrap;
  gap: 40px 20px;

  li {
    width: 380px;
    line-height: 1.4;

    &.empty {
      text-align: center;
      width: 100%;
      padding: 150px 0;
    }
  }

  li .thumbnail {
    background: ${(props) => props.theme.colors.graybg};
    height: 240px;
    margin-bottom: 16px;

    img {
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }

  li .writer {
    margin: 6px 0 2px;
  }
  li .writer,
  li .date {
    font-size: ${(props) => props.theme.font.sizexs};
    color: ${(props) => props.theme.colors.graylight};
  }
`;

export const WriteBtnWrapper = styled(BtnWrapper)`
  // 리스트 페이지 작성하기 버튼 wrapper
  margin-top: -70px;
  margin-bottom: 20px;
`;

export const Table = styled(commonTable)``;

export const TableRead = styled.table`
  // 게시판 상세 스타일
  border-bottom: 1px solid ${(props) => props.theme.colors.charcoal};
  width: 100%;

  th {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    font-weight: 500;
    background: ${(props) => props.theme.colors.graybg};
    color: ${(props) => props.theme.colors.charcoal};
    vertical-align: top;
  }
  th,
  td {
    padding: 40px;
  }
  td {
    border-top: 1px solid ${(props) => props.theme.colors.graylightborder};
    color: ${(props) => props.theme.colors.graydark};
  }
  .contents textarea {
    width: 100%;
    min-height: 300px;
    resize: none;
    border: 0;
  }
  tr:first-child th,
  tr:first-child td {
    border-top-color: ${(props) => props.theme.colors.charcoal};
  }
  input {
    height: 36px;
  }
  input[type='file'] {
    padding: 0;
    border: 0;
  }
  input.title {
    width: 80%;
  }
  td.titlew p {
    font-size: ${(props) => props.theme.font.sizes};
  }
  td.titlew p span {
    margin-right: 8px;
    color: ${(props) => props.theme.colors.graylight};
  }
  td.titlew .title {
    font-size: ${(props) => props.theme.font.sizesl};
    color: ${(props) => props.theme.colors.charcoal};
    margin-bottom: 14px;
  }
  .fileb {
    text-decoration: underline;
  }
  .reviewImg {
    width: 200px;
    height: 200px;
  }
  td.titlew {
    background: ${(props) => props.theme.colors.graybg};
  }

  // 댓글 작성
  .commentwrite {
    .tawrap {
      margin-top: 10px;
      display: flex;
      column-gap: 10px;

      textarea {
        width: 100%;
        height: 100px;
      }

      button[type='submit'] {
        background: ${(props) => props.theme.colors.navy};
        color: white;
        width: 120px;
        border-radius: 5px;

        &:hover {
          background: ${(props) => props.theme.colors.navyhover};
        }
      }
    }
  }

  // 댓글 목록
  .commentslist {
    td {
      padding: 0;
    }
    ul {
      padding-top: 40px;
      padding-bottom: 40px;
    }
    li {
      padding-left: 40px;
      padding-right: 40px;
      margin-top: 30px;
      padding-top: 30px;
      border-top: 1px solid ${(props) => props.theme.colors.graylightborder};

      &:first-child {
        margin-top: 0;
        padding-top: 0;
        border-top: 0;
      }

      .cwinfo {
        strong {
          color: ${(props) => props.theme.colors.charcoal};
          font-weight: 500;
        }
        .date {
          margin-left: 8px;
          font-size: ${(props) => props.theme.font.sizexs};
          color: ${(props) => props.theme.colors.graylight};
        }
        button {
          margin-left: 6px;
          background-color: white;
          font-size: ${(props) => props.theme.font.sizexs};

          &.modify {
            margin-left: 8px;
          }
          &.delete {
          }
        }
      }

      p {
        margin-top: 12px;
        line-height: 1.4;

        &.empty {
          // 댓글 없음
          text-align: center;
          margin-top: 0;
        }
      }

      & .modify-input {
        margin-right: 20px;
      }
    }
  }
`;
