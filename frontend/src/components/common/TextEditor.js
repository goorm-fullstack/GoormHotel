import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { styled } from 'styled-components';
import UploadAdapter from '../../utils/adaptor/UploadAdaptor';

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
  constructor(props) {
    super(props);
    this.state = {
      editorData: '', // 에디터 데이터를 이 상태에 저장
    };
  }

  handleEditorChange = (event, editor) => {
    const data = editor.getData();
    this.setState({ editorData: data });
    console.log(data);
    this.props.setMessage(data);
  };

  render() {
    // Custom Upload Adapter Plugin function
    function MyCustomUploadAdapterPlugin(editor) {
	    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
		    // Create new object and pass server url
		    return new UploadAdapter(loader);
	    };
    }
    return (
      <EditorWrapper>
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{
            extraPlugins : [MyCustomUploadAdapterPlugin]
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.setValue(data);
            console.log(data);
          }}
          onBlur={(event, editor) => {
          }}
          onFocus={(event, editor) => {
          }}
        />
      </EditorWrapper>
    );
  }
}

export default TextEditor;
