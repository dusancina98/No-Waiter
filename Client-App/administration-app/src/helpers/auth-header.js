export function authHeader() {
	validateAccessToken();
	let token = JSON.parse(localStorage.getItem("accessToken"));

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

export function hasRoles(desiredRoles) {
	validateAccessToken();
	
	let roles = localStorage.getItem("roles"); //JSON.parse(localStorage.getItem("roles"));
	let retVal = false;
	if (roles) {		
		console.log(desiredRoles,roles)

		alert(desiredRoles)
		alert(roles)
		console.log(desiredRoles,roles)

		if (desiredRoles === "*" || desiredRoles === roles) {
			retVal = true;
		}
	}

	return retVal;
}

export function hasPermissions(desiredPermissions) {
	validateAccessToken();
	let roles = JSON.parse(localStorage.getItem("roles"));
	let retVal = false;
	alert('test')
	if (roles) {
		roles.forEach((role) => {
			role.permissions.forEach((permission) => {
				desiredPermissions.forEach((desiredPermission) => {
					if (desiredPermission === "*" || desiredPermission === permission.name) {
						retVal = true;
					}
				});
			});
		});
	} else if (desiredPermissions.length === 0) {
		retVal = true;
	}

	return retVal;
}

function validateAccessToken() {
	if (localStorage.getItem("expireTime") <= new Date().getTime()) {
		deleteLocalStorage();
	}
}

export function deleteLocalStorage() {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("roles");
	localStorage.removeItem("expireTime");
}
