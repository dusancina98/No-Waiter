import React, { useContext, useEffect } from "react";
import { ImageBackground, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/AuthService";
import { employmentRequestStyle, loginStyles, userInfoStyle } from "../styles/styles";

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
		<SafeAreaView style={{ flex: 1 }}>
			<View style={userInfoStyle.containerWrapper}>
				<View style={employmentRequestStyle.logoContainer}>
					<Text style={{ color: "gray", fontSize: 35, fontFamily: "roboto-light", fontWeight: "200", alignSelf: "center" }}>Activate account</Text>
				</View>
				{!authState.userActivate.showSuccessMessage && (
					<View style={{ alignItems: "center" }}>
						<Text style={{ textAlign: "center", fontSize: 15 }}>
							Vas nalog nije aktiviran. Ukoliko zelite da aktiviranje naloga pritisnite na dugme ispod nakon cega ce Vam na email:{" "}
							<Text style={{ fontWeight: "bold" }}>{authState.userActivate.userEmail} </Text>stici aktivacioni link.
						</Text>
					</View>
				)}
				<View>
					{authState.userActivate.showError && <Text style={loginStyles.errorMessage}>{authState.userActivate.errorMessage}</Text>}
					{authState.userActivate.showSuccessMessage && <Text style={{ color: "green", fontSize: 18, alignSelf: "center", marginTop: 10 }}> Activation mail was sent successfully.</Text>}

					{!authState.userActivate.showSuccessMessage && (
						<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={handleSendActivation}>
							<Text style={userInfoStyle.buttonText}> Send activation mail</Text>
						</TouchableOpacity>
					)}
					{authState.userActivate.showSuccessMessage && (
						<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("Login")}>
							<Text style={userInfoStyle.buttonText}> Back to login</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}

export default UserActivateScreen;
