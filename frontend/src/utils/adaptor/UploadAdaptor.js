import Instance from "../api/axiosInstance";

// 이걸 어떻게 타입스크립트로 변환할까요?
// 감이 오시는 분은 도전~
export default class UploadAdapter {
	constructor(loader , url) {
		this.loader = loader;
		this.upload();
	}

	// Starts the upload process.
	upload() {
		// ...
		return this.loader.file.then(file => new Promise((resolve, reject) => {
      const fd = new FormData();
      fd.append("file", file)
			Instance.post("/ckeditor/upload/img", fd)
				.then(response => {
          console.log(response)
					resolve({ default: response.data });
				})
				.catch(error => {
					reject("Server Error");
					console.log("Server Error : ", error);
				});
		}));
	}
}