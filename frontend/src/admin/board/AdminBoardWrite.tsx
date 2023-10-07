import React, {useState, useEffect, useRef} from 'react';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, CheckLabel, MultiCheck, SubmitBtn } from '../../Style/commonStyles';
import { Container, Table } from '../member/Style';
import TextEditor from '../../components/common/TextEditor/TextEditor';
import { useLocation } from 'react-router';
import axios from 'axios';

type formData = {
  [key: string]: string;
}

const AdminBoardWrite = () => {
  
  const location = useLocation();
  const checkedItems = location.state.checkedItems;
  console.log(checkedItems);
  const [checkData, setCheckData] = useState();
  const [value, setValue] = useState('');
  const [field, setfield] = useState<JSX.Element>();
  const checkRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [boardFormData, setBoradFormData] = useState<formData>({
    title: '',
    boardContent: '',
    boardWriter: '',
    boardTitle: '',
    category: '',
  })
  const [replyFormData, setReplyFormData] = useState<formData>({
    boardId: '',
    replyContent: '',
    replyWriter: '',
  })

  useEffect(() => {
    if(checkRef.current && !checkRef.current.checked){
      setfield(<>
          <tr>
            <th>게시판</th>
            <td>
              <select name='boardTitle' value={boardFormData.boardTitle} onChange={changeValue}>
                <option>값값</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td>
              <select name='category' value={boardFormData.category} onChange={changeValue}>
                <option>값값</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>파일첨부</th>
            <td>
              <input type="file" ref={fileRef} />
            </td>
          </tr>
        </>)
    }
  }, [])

  const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(checkRef.current && !checkRef.current.checked){
      setBoradFormData({
        ...boardFormData,
        [name]: value,
      });
    }else{
      setReplyFormData({
        ...replyFormData,
        [name]: value,
      });
    }
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmed: boolean = window.confirm('등록하시겠습니까?');

    if(confirmed){
      if(checkRef.current && !checkRef.current.checked){
        const form1 = new FormData();

        if(fileRef.current && fileRef.current.files){
          form1.append('file', fileRef.current.files[0]);
        }
        form1.append('boardContent', value);

        Object.keys(boardFormData).forEach((key) => {
          form1.append(key, boardFormData[key]);
        })

        try{
          await axios.post('/boards/writeform', form1, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          window.location.href = '/admin/board/1';
        }catch(error: any){
          console.log('Error', error.message);
        }
      }else{
        const form2 = new FormData();
        
        form2.append('replyContent', value);

        checkedItems.forEach((boardId: number) => {
          form2.append('boardId', String(boardId));

          Object.keys(boardFormData).forEach((key) => {
            form2.append(key, replyFormData[key]);
          })
        })
        try{
          await axios.post('/reply/writeform', form2)
          window.location.href = '/admin/board/1';
        }catch(error: any){
          console.log('Error', error.message);
        }
      }
    }
  }

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>게시글 작성</PageTitle>
        <form onSubmit={submitForm}>
          <Table className="horizontal">
            <tbody>
              <tr>
                <th>제목</th>
                <td>
                  <MultiCheck className="fit">
                    <input name='title' onChange={changeValue} type="text" className="long" />
                    <CheckLabel>
                      {checkedItems.length > 0 ? (<InputCheckbox type="checkbox" ref={checkRef} checked/>) : (<InputCheckbox type="checkbox" ref={checkRef}/>)} 답글
                    </CheckLabel>
                  </MultiCheck>
                </td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>
                  <input type='text' name='boardWriter' onChange={changeValue} />
                </td>
              </tr>
              {field}
              <tr>
                <td colSpan={2} className="writeWrapper">
                  <TextEditor setValue={setValue} />
                </td>
              </tr>
            </tbody>
          </Table>
          <BtnWrapper className="center mt40">
            <SubmitBtn>작성하기</SubmitBtn>
          </BtnWrapper>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default AdminBoardWrite;
