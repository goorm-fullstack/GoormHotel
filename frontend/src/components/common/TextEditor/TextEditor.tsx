import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorWrapper } from './Style';
import UploadAdapter from '../../../utils/adaptor/UploadAdaptor';

// 사용할 Props를 미리 정의해줍니다.
interface Props {
  setValue: (data: string) => void;
}

// 텍스트 에디터의 Component의 제네릭 타입으로 사용할 Props를 지정합니다.
class TextEditor extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorData: '', // 에디터 데이터를 이 상태에 저장
    };
  }
  render() {
    // Custom Upload Adapter Plugin function
    // 현재는 메일용 이미지 어댑터가 사용중입니다. 필요에 맞게 이 부분이 바뀌도록 변경하거나, 현재 어댑터를 사용하세요
    function MyCustomUploadAdapterPlugin(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
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
            extraPlugins: [MyCustomUploadAdapterPlugin],
          }}
          onReady={(editor: any) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.setValue(data);
          }}
          onBlur={(event: any, editor: any) => {}}
          onFocus={(event: any, editor: any) => {}}
        />
      </EditorWrapper>
    );
  }
}

export default TextEditor;
