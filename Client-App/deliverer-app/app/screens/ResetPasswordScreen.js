import React, { useContext, useState } from "react";
import { ImageBackground, View, Text, TouchableOpacity, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/AuthService";
import { loginStyles, welcomeStyles } from "../styles/styles";

function ResetPasswordScreen({ navigation }) {
	const { authState, dispatch } = useContext(AuthContext);

	const [email, setEmail] = useState("");

	const handleResetPassword = () => {
		let resetPasswordLinkRequest = {
			email,
		};

		authService.resetPasswordLinkRequest(resetPasswordLinkRequest, dispatch);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={loginStyles.containerWrapper}>
				<StatusBar barStyle="light-content" />
				<ImageBackground style={welcomeStyles.background} source={require("../assets/background.jpg")}>
					<View style={welcomeStyles.logoContainer}>
						<Image style={{ width: 170, height: 170 }} source={require("../assets/logo.png")} />
						<Text style={welcomeStyles.logoText}>Reset password</Text>
					</View>
					<View style={loginStyles.loginForm}>
						<Text style={loginStyles.textForm}>Email</Text>
						<TextInput style={loginStyles.textInput} placeholder="Email" onChangeText={(val) => setEmail(val)}></TextInput>
					</View>
					{authState.resetPassword.showError && <Text style={loginStyles.errorMessage}>{authState.resetPassword.errorMessage}</Text>}
					{authState.resetPassword.showSuccessMessage && (
						<Text style={{ color: "white", fontSize: 18, textAlign: "center", marginTop: 20, paddingHorizontal: 20 }}>
							We sent an email to <Text style={{ fontWeight: "bold" }}>{authState.resetPassword.emailAddress}</Text> with a link to get back into your account.
						</Text>
					)}

					{authState.resetPassword.showError && <Text style={loginStyles.errorMessage}>{authState.resetPassword.errorMessage}</Text>}
					{!authState.resetPassword.showSuccessMessage && (
						<TouchableOpacity style={loginStyles.loginButton} activeOpacity={0.5} onPress={handleResetPassword}>
							<Text style={welcomeStyles.loginText}> Send reset email </Text>
						</TouchableOpacity>
					)}
					{authState.resetPassword.showSuccessMessage && (
						<TouchableOpacity style={loginStyles.loginButton} activeOpacity={0.5} onPress={() => navigation.navigate("Login")}>
							<Text style={welcomeStyles.loginText}> Back to login</Text>
						</TouchableOpacity>
					)}
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default ResetPasswordScreen;
