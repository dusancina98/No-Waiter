import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, View, Text, TouchableOpacity, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/AuthService";
import { loginStyles, welcomeStyles } from "../styles/styles";

function LoginScreen({ navigation }) {
	const { authState, dispatch } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		let loginRequest = {
			username: email,
			password,
		};

		authService.login(loginRequest, dispatch);
	};

	useEffect(() => {
		if (authState.userLogin.successLogin === true) {
			navigation.reset({ index: 0, routes: [{ name: "Home" }] });
		}
	}, [authState.userLogin.successLogin]);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={loginStyles.containerWrapper}>
				<StatusBar barStyle="light-content" />
				<ImageBackground style={welcomeStyles.background} source={require("../assets/waiter.jpg")}>
					<View style={welcomeStyles.logoContainer}>
						<Text style={welcomeStyles.logoText}>Login</Text>
					</View>
					<View style={loginStyles.loginForm}>
						<Text style={loginStyles.textForm}>Email</Text>
						<TextInput style={loginStyles.textInput} placeholder="Email" onChangeText={(val) => setEmail(val)}></TextInput>
						<Text style={loginStyles.textForm}>Password</Text>
						<TextInput style={loginStyles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(val) => setPassword(val)}></TextInput>
					</View>
					{authState.userLogin.showError && <Text style={loginStyles.errorMessage}>{authState.userLogin.errorMessage}</Text>}
					<TouchableOpacity style={loginStyles.loginButton} activeOpacity={0.5} onPress={handleLogin}>
						<Text style={welcomeStyles.loginText}> Login </Text>
					</TouchableOpacity>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default LoginScreen;
