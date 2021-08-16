import { StyleSheet } from "react-native";

export const welcomeStyles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		alignItems: "center",
		position: "absolute",
		top: 80,
	},
	logoText: {
		color: "white",
		fontSize: 45,
		fontFamily: "roboto-light",
		fontWeight: "bold",
	},
	registerButton: {
		width: "90%",
		marginTop: 10,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	loginButton: {
		width: "90%",
		marginTop: 100,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "transparent",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
	},
	registerText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
	loginText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});

export const loginStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	loginForm: {
		alignSelf: "flex-start",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 100,
		width: "100%",
	},
	textForm: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
	},
	textInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
	loginButton: {
		width: "50%",
		marginTop: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		textAlign: "center",
	},
});

export const orderListStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
		marginLeft: 20,
		marginRight: 20,
		height: 120,
		borderRadius: 10,
		paddingHorizontal: 10,
		backgroundColor: "white",
		marginTop: 10,
	},
	objectInfoContainer: {
		flex: 2,
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
	},
	orderDetailsContainer: {
		flex: 5,
		flexDirection: "row",
	},
	objectImageContainer: {
		flex: 1,
		alignSelf: "center",
	},
	objectImage: {
		width: "100%",
		height: "100%",
	},
	orderInfo: {
		marginLeft: 15,
		alignSelf: "center",
		fontSize: 20,
		flex: 2,
	},
});

export const orderConfirmStyles = StyleSheet.create({
	containerWrapper: {
		marginLeft: 20,
		marginRight: 20,
		height: 220,
		paddingHorizontal: 10,
		marginTop: 20,
	},
	objectImage: {
		width: "100%",
		height: "100%",
		marginTop: 10,
	},
	textForm: {
		fontSize: 18,
		marginTop: 25,
		fontFamily: "roboto-regular",
		fontWeight: "400",
	},
	textInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
	buttonConfirm: {
		width: "50%",
		marginTop: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		alignSelf: "center",
		borderColor: "#b99849",
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});

export const employmentRequestStyle = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	logoContainer: {
		alignItems: "center",
	},
	formContainer: {
		alignSelf: "flex-start",
		marginLeft: 20,
		marginRight: 20,
		width: "100%",
	},
	logoText: {
		color: "white",
		fontSize: 35,
		fontFamily: "roboto-light",
		fontWeight: "200",
	},
	textForm: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
	},
	textInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
	multilineTextInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 100,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
});

export const userInfoStyle = StyleSheet.create({
	containerWrapper: {
		flex: 1,
		paddingHorizontal: 10,
		marginTop: 20,
	},
	userDetailsContainer: {
		height: 70,
		borderRadius: 10,
		backgroundColor: "lightgray",
		flexDirection: "row",
		alignSelf: "center",
		paddingHorizontal: 20,
	},
	userImageContainer: {
		flex: 1,
		alignSelf: "center",
	},
	userInfo: {
		marginLeft: 15,
		alignSelf: "center",
		fontSize: 25,
		flex: 4,
	},
	button: {
		width: "100%",
		marginTop: 20,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "white",
		borderRadius: 10,
		borderWidth: 1,
		alignSelf: "center",
		borderColor: "black",
	},
	buttonText: {
		color: "black",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});

export const qrScannerStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	button: {
		width: "50%",
		marginTop: 420,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "transparent",
		borderRadius: 10,
		borderWidth: 1,
		alignSelf: "center",
		borderColor: "white",
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});
