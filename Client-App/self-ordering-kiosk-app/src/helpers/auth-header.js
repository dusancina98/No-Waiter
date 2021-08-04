export function authHeader() {
	let token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImV4YW1wbGUxQGV4YW1wbGUuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjI4MDg3NTE4LCJleHAiOjE2MjgwOTExMTgsImF1dGhvcml0aWVzIjpbIlJPTEVfV0FJVEVSIl0sInVzZXJJZCI6IjIyNzkzMTYyLTUyZDMtMTFlYi1hZTkzLTAyNDJhYzEzMDIyMiJ9.6PO_rBcY3WVPF7VEdHHLAB27pJyHxauGjegbwkzxOb_Dktwuk84BueM0EDNUiuCNp7gy8Dof8zdLW-v8zzZfWA"

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
