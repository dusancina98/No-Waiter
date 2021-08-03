export function authHeader() {
	let token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImV4YW1wbGUxQGV4YW1wbGUuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjI4MDI5NTEzLCJleHAiOjE2MjgwMzMxMTMsImF1dGhvcml0aWVzIjpbIlJPTEVfV0FJVEVSIl0sInVzZXJJZCI6IjIyNzkzMTYyLTUyZDMtMTFlYi1hZTkzLTAyNDJhYzEzMDIyMiJ9.nhz8Q8lJw5uT8OYazQlZCyV34XMHvB78U6qc1ifnt6WxiDvXQUTOfxAvS8SmKRrwtx-EfrG_-v6nNQZebrhEaA"

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
