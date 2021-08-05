import React from "react";
import { ImageBackground, StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

function WelcomeScreen(props) {
	return (
		<ImageBackground style={styles.background} source={require("../assets/waiter.jpg")}>
			<View style={styles.logoContainer}>
				<Text style={styles.logoText}>No Waiter</Text>
			</View>
			<TouchableOpacity style={styles.loginButton} activeOpacity={0.5}>
				<Text style={styles.loginText}> Login </Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.registerButton} activeOpacity={0.5}>
				<Text style={styles.registerText}> Register </Text>
			</TouchableOpacity>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
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
		fontFamily: "sans-serif-light",
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
		fontFamily: "sans-serif-medium",
		fontWeight: "400",
		textAlign: "center",
	},
	loginText: {
		color: "black",
		fontSize: 20,
		fontFamily: "sans-serif-medium",
		fontWeight: "400",
		textAlign: "center",
	},
});

export default WelcomeScreen;
