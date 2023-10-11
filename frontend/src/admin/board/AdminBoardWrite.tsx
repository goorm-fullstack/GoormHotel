import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../common/AdminLayout";
import {
  PageTitle,
  InputCheckbox,
  BtnWrapper,
  CheckLabel,
  MultiCheck,
  SubmitBtn,
} from "../../Style/commonStyles";
import { Container, Table } from "../member/Style";
import TextEditor from "../../components/common/TextEditor/TextEditor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminBoardWrite = () => {
  const setValue = () => {};
  const [formData, setFormData] = useState<FormData>({
    title: "",
    boardContent: "",
    boardTitle: "",
    category: "",
    boardWriter: "",
  });
  type FormData = {
    [key: string]: string;
  };
  const [categoryError, setCategoryError] = useState<string>("");
  const [boardTitleError, setBoardTitleError] = useState<string>("");
  const [imgFile, setImgFile] = useState<string>("");
  const [isComment, setIsComment] = useState(false);
  const [boardContent, setBoardContent] = useState("");
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    const file =
        imgRef.current && imgRef.current.files ? imgRef.current.files[0] : "";
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImgFile(reader.result as string);
      };
    } else {
      console.error("The selected file is not a Blob.");
    }
  };

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "boardTitle") {
      setBoardTitleError("");
    }

    if (name === "category") {
      setCategoryError("");
    }
  };

  const handleCommentCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsComment(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.boardTitle) {
      setBoardTitleError("게시판을 선택하세요");
      return;
    }

    if (!formData.category) {
      setCategoryError("카테고리를 선택하세요");
      return;
    }

    const form = new FormData();
    form.append(
        "multipartFile",
        imgRef.current && imgRef.current.files ? imgRef.current.files[0] : ""
    );
    form.append(
        "file",
        fileRef.current && fileRef.current.files ? fileRef.current.files[0] : ""
    );
    formData.boardContent = boardContent;
    form.append("isComment", isComment.toString());
    console.log(formData.category);

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      await axios.post("/boards/writeform", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert('게시글이 작성되었습니다.');
      window.location.href = `/admin/board/1`;
    } catch (e: any) {
      console.error("에러: ", e.message);
      if (e.response.data.message.startsWith("Validation failed")) {
        const errorMessage = e.response.data.errors[0].defaultMessage;
        alert(errorMessage);
      }
    }
  };

  const categoryOption = () => {
    switch (formData.boardTitle) {
      case "공지사항":
        return (
            <>
              <option value="">선택</option>
              <option value="공지">공지</option>
              <option value="이벤트">이벤트</option>
            </>
        );
      case "문의하기":
        return (
            <>
              <option value="">선택</option>
              <option value="문의1">문의1</option>
              <option value="문의2">문의2</option>
            </>
        );
      case "이용후기":
        return (
            <>
              <option value="">선택</option>
              <option value="룸">룸</option>
              <option value="다이닝">다이닝</option>
            </>
        );
      default:
        return <option value="">선택</option>;
    }
  };

  const navigate = useNavigate();
  const authItem = localStorage.getItem("auth");

  useEffect(() => {
    if (!(authItem && authItem.includes("AUTH_C"))) {
      alert("사용할 수 없는 페이지이거나 권한이 없습니다.");
      navigate("/admin");
    }
  }, []);

  // 유저 정보 불러오기 지우지 마세요!!
  // useEffect(() => {
  //   const handleUserInfo = async () => {
  //     try{
  //       await axios.get('/')
  //       .then((response) => {
  //         setUserId(response.data.userId);
  //       })
  //       .catch((error) => {
  //         console.error(error.message);
  //       })
  //     }
  //   }
  //   handleUserInfo();
  // }, [])

  if(authItem && authItem.includes("AUTH_C")) {
  return (
    <AdminLayout subMenus="board">
      <Container>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Table className="horizontal">
            <tbody>
              <tr>
                <th>제목</th>
                <td>
                  <MultiCheck className="fit">
                    <input
                      type="text"
                      className="long"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                    {
                        formData.boardTitle ==="문의하기" &&
                          <CheckLabel>
                            <InputCheckbox type="checkbox" checked={isComment} onChange={handleCommentCheckboxChange}/>{" "}
                            답글
                          </CheckLabel>
                      }
                  </MultiCheck>
                </td>
              </tr>
              <tr>
                <th>게시판</th>
                <td>
                  <select
                    name="boardTitle"
                    value={formData.boardTitle}
                    onChange={handleChange}
                  >
                    <option value="">선택</option>
                    <option value="공지사항">공지사항</option>
                    <option value="문의하기">문의하기</option>
                    <option value="이용후기">이용후기</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>카테고리</th>
                <td>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categoryOption()};
                  </select>
                </td>
              </tr>
              <tr>
                <th>파일첨부</th>
                <td>
                <input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} />
                  {imgFile !== '' ? <img src={imgFile} alt="후기 이미지" /> : <img style={{ display: 'none' }} />}
                </td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>
                  <input type="text" name="boardWriter" value={formData.boardWriter} onChange={handleChange}/>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="writeWrapper">
                  <TextEditor setValue={setBoardContent} />
                </td>
              </tr>
            </tbody>
          </Table>
          <BtnWrapper className="center mt40">
            <SubmitBtn type="submit">작성하기</SubmitBtn>
          </BtnWrapper>
        </form>
      </Container>
    </AdminLayout>
  );
  } else {
    return null;
  }
};

export default AdminBoardWrite;
