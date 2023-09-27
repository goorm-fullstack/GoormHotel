import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { styled } from 'styled-components';

const EditorWrapper = styled.div`
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

class TextEditor extends Component {
  render() {
    return (
      <EditorWrapper>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </EditorWrapper>
    );
  }
}

export default TextEditor;
