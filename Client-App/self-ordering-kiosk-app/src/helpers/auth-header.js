import { config } from "../config/config";

export function authHeader() {
	let token = config.ACCESS_TOKEN

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
