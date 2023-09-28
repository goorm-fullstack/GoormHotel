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
`;
