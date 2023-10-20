import styled from 'styled-components';

export const EditorWrapper = styled.div`
  .ck.ck-toolbar {
    border-right: 0;
    border-left: 0;
    border-top: 0;
  }

  .ck.ck-editor__editable_inline {
    border-left: 0;
    border-right: 0;
    height: 400px;
    border-bottom: 0;
  }

  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    border-top-color: ${(props) => props.theme.colors.grayborder};
  }

  // ck에디터 툴바 편집
  div.ck {
    span.ck-file-dialog-button {
      display: none;
    }
  }
  div.ck.ck-sticky-panel__content > div > div > div:nth-child(13) {
    display: none;
  }

  .ck-content {
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
    figure.table {
      margin: 0;
      text-align: center;
      th {
        border-bottom-color: #bfbfbf;
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
      list-style-type: square;
      li {
        list-style-type: square;
      }
    }
  }
`;
