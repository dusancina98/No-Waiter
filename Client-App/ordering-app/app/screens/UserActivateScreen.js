import React, { useContext, useEffect } from "react";
import { ImageBackground, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/AuthService";
import { activateAccountStyles, employmentRequestStyle, loginStyles, userInfoStyle, welcomeStyles } from "../styles/styles";

function UserActivateScreen({ navigation }) {
	const { authState, dispatch } = useContext(AuthContext);

	const handleSendActivation = () => {
		let requestIdDTO = {
			id: authState.userActivate.userId,
		};

		authService.resendActivationLinkRequest(requestIdDTO, dispatch);
	};

	useEffect(() => {
		authService.checkIfUserIdExist(authState.userActivate.userId, dispatch);
	}, []);

	return (
		<View style={loginStyles.containerWrapper}>
			<StatusBar barStyle="light-content" />
			<ImageBackground style={welcomeStyles.background} source={require("../assets/background.jpg")}>
				<View style={welcomeStyles.logoContainer}>
					<Text style={welcomeStyles.logoText}>Activate account</Text>
				</View>
				{!authState.userActivate.showSuccessMessage && (
					<View style={{ alignItems: "center" }}>
						<Text style={{ textAlign: "center", fontSize: 20, color: "white", paddingHorizontal: 20 }}>
							Vas nalog nije aktiviran. Ukoliko zelite da aktiviranje naloga pritisnite na dugme ispod nakon cega ce Vam na email:{" "}
							<Text style={{ fontWeight: "bold" }}>{authState.userActivate.userEmail} </Text>stici aktivacioni link.
						</Text>
					</View>
				)}
				<View>
					{authState.userActivate.showError && <Text style={loginStyles.errorMessage}>{authState.userActivate.errorMessage}</Text>}
					{authState.userActivate.showSuccessMessage && <Text style={{ color: "white", fontSize: 18, alignSelf: "center", marginTop: 10 }}> Activation mail was sent successfully.</Text>}

					{!authState.userActivate.showSuccessMessage && (
						<TouchableOpacity style={activateAccountStyles.button} activeOpacity={0.5} onPress={handleSendActivation}>
							<Text style={activateAccountStyles.buttonText}> Send activation mail</Text>
						</TouchableOpacity>
					)}
					{authState.userActivate.showSuccessMessage && (
						<TouchableOpacity style={activateAccountStyles.button} activeOpacity={0.5} onPress={() => navigation.navigate("Login")}>
							<Text style={activateAccountStyles.buttonText}> Back to login</Text>
						</TouchableOpacity>
					)}
				</View>
			</ImageBackground>
		</View>
	);
}

export default UserActivateScreen;
