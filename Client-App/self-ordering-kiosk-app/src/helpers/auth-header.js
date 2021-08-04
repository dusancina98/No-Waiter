export function authHeader() {
	let token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImV4YW1wbGUxQGV4YW1wbGUuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjI4MDgzNzYxLCJleHAiOjE2MjgwODczNjEsImF1dGhvcml0aWVzIjpbIlJPTEVfV0FJVEVSIl0sInVzZXJJZCI6IjIyNzkzMTYyLTUyZDMtMTFlYi1hZTkzLTAyNDJhYzEzMDIyMiJ9.NwyzBUH8hGErPxKtc-XF9o48XVNSnMncECaXgU_-Rh1QujssiHP1y5F8q_JmCo4B-VTsMAXF_0OJPAWUaNS_2w"

	if (token) {
		return { Authorization: "Bearer " + token };
	} else {
		return {};
	}
}

export function setAuthInLocalStorage(data) {
	localStorage.setItem("accessToken", data.accessToken);
	localStorage.setItem("expireTime", data.expiresIn);
	localStorage.setItem("roles", data.roles);
}


export function deleteLocalStorage() {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("roles");
	localStorage.removeItem("expireTime");
}
