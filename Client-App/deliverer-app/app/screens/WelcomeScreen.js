import React from "react";
import { ImageBackground, View, Text, TouchableOpacity, StatusBar } from "react-native";
import { welcomeStyles } from "../styles/styles";

function WelcomeScreen({ navigation }) {
	return (
		<React.Fragment>
			<StatusBar barStyle="light-content" />
			<ImageBackground style={welcomeStyles.background} source={require("../assets/waiter.jpg")}>
				<View style={welcomeStyles.logoContainer}>
					<Text style={welcomeStyles.logoText}>No Waiter</Text>
				</View>
				<TouchableOpacity style={welcomeStyles.loginButton} activeOpacity={0.5} onPress={() => navigation.navigate("Login")}>
					<Text style={welcomeStyles.loginText}> Login </Text>
				</TouchableOpacity>
				<TouchableOpacity style={welcomeStyles.registerButton} activeOpacity={0.5} onPress={() => navigation.navigate("Employment request")}>
					<Text style={welcomeStyles.registerText}> Register </Text>
				</TouchableOpacity>
			</ImageBackground>
		</React.Fragment>
	);
}

export default WelcomeScreen;
