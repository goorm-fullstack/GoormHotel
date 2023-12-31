import Instance from "../api/axiosInstance";

// 이걸 어떻게 타입스크립트로 변환할까요?
// 감이 오시는 분은 도전~
export default class UploadAdapter {
	private loader: any;

	constructor(loader: any) {
		this.loader = loader;
		this.upload();
	}

	// Starts the upload process.
	upload() {
		// ...
		return this.loader.file.then((file: File) => new Promise((resolve, reject) => {
			const fd = new FormData();
			fd.append("file", file)
			Instance.post("/ckeditor/upload/img", fd)
				.then(response => {
					resolve({ default: response.data });
				})
				.catch(error => {
					reject("Server Error");
					console.error("Server Error : ", error);
				});
		}));
	}
}