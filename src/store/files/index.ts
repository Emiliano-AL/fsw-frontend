import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
import { API } from '../../services'
import { AxiosError } from 'axios'

export const useFileStore = defineStore("fileStore", () => {

	async function dispatchUploadFile(file: File) {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const data = await API.files.uploadFile(formData);
			const { content, statusCode } = data.data;
			if (statusCode === 200) {
				return {
					success: true,
					content: content
				}
			}
		} catch (error) {
			const _error = error as AxiosError<string>;
			return {
				success: false,
				status: _error.response?.status,
				content: null,
			};
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}

	return {
		dispatchUploadFile
	}
});