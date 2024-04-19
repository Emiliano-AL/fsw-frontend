import http from "../api";
import { APIResponse } from "../types";

async function uploadFile(file: File) {
	// const formData = new FormData();
	// formData.append("file", file);
	return await http.post<APIResponse<string>>("Files", file);
}

async function getFile(id: number) {
	return await http.get<APIResponse<string>>(`Files/${id}`);
}

export default {
	uploadFile,
	getFile,
};