import Instance from "../api/axiosInstance";

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