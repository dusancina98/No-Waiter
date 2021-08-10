import AsyncStorage from "@react-native-async-storage/async-storage";

export async function authHeader() {
	validateAccessToken();
	let token = await AsyncStorage.getItem("accessToken");
	console.log(token);
	if (token) {
		return { Authorization: "Bearer " + token };
	} else {
		return {};
	}
}

export function setAuthInLocalStorage(data) {
	console.log(data);
	try {
		AsyncStorage.multiSet([
			["accessToken", data.accessToken],
			["expireTime", data.expiresIn.toString()],
			["roles", JSON.stringify(data.roles)],
			["name", data.name],
			["surname", data.surname],
		]);
	} catch (error) {
		console.log("LALA", error);
	}
}

export async function hasAnyRole() {
	validateAccessToken();
	let rolesAsync, roles;
	try {
		rolesAsync = await AsyncStorage.getItem("roles");
		roles = JSON.parse(rolesAsync);
	} catch (error) {
		return false;
	}

	if (roles) {
		return true;
	} else {
		return false;
	}
}

export async function validateAccessToken() {
	try {
		let expireTime = await AsyncStorage.getItem("expireTime");

		if (expireTime <= new Date().getTime()) {
			deleteLocalStorage();
		}
	} catch (error) {
		console.log(error);
	}
}

export async function deleteLocalStorage() {
	try {
		await AsyncStorage.clear();
	} catch (error) {
		console.log(error);
	}
}
