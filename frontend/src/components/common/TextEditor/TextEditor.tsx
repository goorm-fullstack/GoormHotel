import React, { Component, FC, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as S from './Style'; // Your styled components file import
import UploadAdapter from '../../../utils/adaptor/UploadAdaptor';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: '', // 에디터 데이터를 이 상태에 저장
    };
  }
  render() {
    // Custom Upload Adapter Plugin function
    function MyCustomUploadAdapterPlugin(editor) {
	    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
		    // Create new object and pass server url
		    return new UploadAdapter(loader);
	    };
    }
    return (
      <S.EditorWrapper>
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
          }}
          onReady={(editor: any) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.setValue(data);
            console.log(data);
          }}
          onBlur={(event: any, editor: any) => {}}
          onFocus={(event: any, editor: any) => {}}
        />
      </S.EditorWrapper>
    );
  }
};

interface Props {
  setValue : (data : string) => void;
}

function EditorComponent({ setValue }: Props): ReactElement {
  const toastRef = useRef<TextEditor | null>(null);
  const [editorData, setEditorData] = useState('');

  handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setState({ editorData: data });
    console.log(data);
    setMessage(data);
  };

  return (
    <div>
      {isLoading ? (
        <CKEditor
          type=""
          editor={Editor}
          config={editorConfiguration}
          onChange={(event: any, text: any) => {
            const data = text.getData();
            console.log(data);
            handleEditorText(data);
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default TextEditor;
