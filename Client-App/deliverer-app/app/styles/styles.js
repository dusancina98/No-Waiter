import { StyleSheet } from "react-native";

export const welcomeStyles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		position: "absolute",
		top: 80,
	},
	logoText: {
		color: "white",
		fontSize: 35,
		fontFamily: "roboto-light",
		fontWeight: "200",
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
		marginTop: 10,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "white",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "black",
	},
	registerText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
	loginText: {
		color: "black",
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
		borderColor: "black",
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
