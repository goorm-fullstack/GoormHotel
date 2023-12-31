import styled from 'styled-components';
import { commonContainerStyle, BtnWrapper, commonTable } from '../../Style/commonStyles';

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

export const Container = styled(commonContainerStyle)`
  .conbtm .preview {
    margin-left: 30px;
  }
`;

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
  p.titlew span {
    margin-right: 8px;
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

  // 게시글 상세: 첨부파일
  tr.attachment {
    td {
      padding-bottom: 0;
    }
    & + tr > td {
      border-top-color: #fff;
    }
    button {
      display: flex;
      align-items: center;
      background: transparent;
      font-size: ${(props) => props.theme.font.sizes};
      color: ${(props) => props.theme.colors.graylight};

      svg {
        height: 16px;
      }
    }
  }

  .boardContent {
    strong {
      font-weight: bold;
    }
    i {
      font-style: italic;
    }
    a {
      color: blue;
      text-decoration: underline;
    }
  }

  .contents {
    word-spacing: 5px;
    letter-spacing: 1px;
    & * {
      margin-bottom: 7px;
    }
    h2 {
      display: block;
      font-size: 1.5em;
      margin-top: 0.83em;
      margin-bottom: 0.83em;
      margin-left: 0;
      margin-right: 0;
      font-weight: bold;
    }
    h3 {
      display: block;
      font-size: 1.17em;
      margin-top: 1em;
      margin-bottom: 1em;
      margin-left: 0;
      margin-right: 0;
      font-weight: bold;
    }
    h4 {
      display: block;
      font-size: 1em;
      margin-top: 1.33em;
      margin-bottom: 1.33em;
      margin-left: 0;
      margin-right: 0;
      font-weight: bold;
    }
    strong {
      font-weight: bold;
    }
    i {
      font-style: italic;
    }
    a {
      color: blue;
      text-decoration: underline;
    }
    blockquote {
      display: inline-block;
      padding-top: 7px;
      padding-left: 20px;
      padding-right: 20px;
      border-left: 10px solid ${(props) => props.theme.colors.graydark};
    }
    .table {
      td {
        padding: 3px;
        border: 1px solid ${(props) => props.theme.colors.graydark};
      }
    }
    ol {
      padding-left: 20px;
      list-style-type: decimal;
      li {
        list-style-type: decimal;
      }
    }
    ol ol {
      margin-top: 7px;
      list-style-type: lower-latin;
      li {
        list-style-type: lower-latin;
      }
    }
    ol ol ol {
      list-style-type: lower-roman;
      li {
        list-style-type: lower-roman;
      }
    }
    ol ol ol ol {
      list-style-type: upper-latin;
      li {
        list-style-type: upper-latin;
      }
    }
    ol ol ol ol ol {
      list-style-type: upper-roman;
      li {
        list-style-type: upper-roman;
      }
    }
    ul {
      padding-left: 20px;
      list-style-type: disc;
      li {
        list-style-type: disc;
      }
    }
    ul ul {
      list-style-type: circle;
      margin-top: 7px;
      li {
        list-style-type: circle;
      }
    }
    ul ul ul {
      list-style-type: square;
      li {
        list-style-type: square;
      }
    }
    ul ul ul ul {
      list-style-type: disc;
      li {
        list-style-type: disc;
      }
    }
    ul ul ul ul ul {
      list-style-type: circle;
      li {
        list-style-type: circle;
      }
    }
    ul ul ul ul ul ul {
      list-style-type: square;
      li {
        list-style-type: square;
      }
    }
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
  td.titlew {
    background: ${(props) => props.theme.colors.graybg};
  }

  // 댓글 작성
  .commentwrite {
    input {
      margin-right: 10px;
    }

    .tawrap {
      margin-top: 10px;
      display: flex;
      column-gap: 10px;

      textarea {
        width: 89%;
        height: 100px;
      }

      button {
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
