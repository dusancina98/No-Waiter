import React from "react";
import { ImageBackground, View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { welcomeStyles } from "../styles/styles";

function WelcomeScreen({ navigation }) {
	return (
		<React.Fragment>
			<StatusBar barStyle="light-content" />
			<ImageBackground style={welcomeStyles.background} resizeMode="cover" source={require("../assets/background.jpg")}>
				<View style={welcomeStyles.logoContainer}>
					<Image style={{ width: 170, height: 170 }} source={require("../assets/logo.png")} />
					<Text style={welcomeStyles.logoText}>No Waiter</Text>
				</View>
				<TouchableOpacity style={welcomeStyles.loginButton} activeOpacity={0.5} onPress={() => navigation.navigate("Login")}>
					<Text style={welcomeStyles.loginText}> Login </Text>
				</TouchableOpacity>
				<TouchableOpacity style={welcomeStyles.registerButton} activeOpacity={0.5} onPress={() => navigation.navigate("Registration")}>
					<Text style={welcomeStyles.registerText}> Register </Text>
				</TouchableOpacity>
			</ImageBackground>
		</React.Fragment>
	);
}

export default WelcomeScreen;
