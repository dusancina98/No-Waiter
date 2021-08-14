import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView, DatePickerAndroid, ImageBackground, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { authConstants } from "../constants/AuthConstants";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/AuthService";
import { employmentRequestStyle, loginStyles, welcomeStyles } from "../styles/styles";

function EmploymentRequestScreen({ navigation }) {
	const { authState, dispatch } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [experience, setExperience] = useState("");
	const [email, setEmail] = useState("");

	const handleSendRequest = () => {
		let requestDTO = {
			Email: email,
			Name: name,
			Surname: surname,
			PhoneNumber: phoneNumber,
			Reference: experience,
		};

		authService.createEmploymentRequest(requestDTO, dispatch);
	};

	useEffect(() => {
		dispatch({ type: authConstants.CREATE_EMPLOYMENT_REQUEST_REQUEST });
	}, []);

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={loginStyles.containerWrapper}>
					<StatusBar barStyle="dark-content" />
					<ImageBackground style={welcomeStyles.background} source={require("../assets/background.jpg")}>
						<View style={employmentRequestStyle.logoContainer}>
							<Image style={{ width: 130, height: 130 }} source={require("../assets/logo.png")} />
							<Text style={employmentRequestStyle.logoText}>Employment Request</Text>
						</View>
						<View style={employmentRequestStyle.formContainer}>
							<Text style={employmentRequestStyle.textForm}>Email</Text>
							<TextInput style={employmentRequestStyle.textInput} placeholder="Email" onChangeText={(val) => setEmail(val)}></TextInput>
							<Text style={employmentRequestStyle.textForm}>Name</Text>
							<TextInput style={employmentRequestStyle.textInput} placeholder="Name" onChangeText={(val) => setName(val)}></TextInput>
							<Text style={employmentRequestStyle.textForm}>Surname</Text>
							<TextInput style={employmentRequestStyle.textInput} placeholder="Surname" onChangeText={(val) => setSurname(val)}></TextInput>
							<Text style={employmentRequestStyle.textForm}>Phone number</Text>
							<TextInput style={employmentRequestStyle.textInput} placeholder="Phone number" onChangeText={(val) => setPhoneNumber(val)}></TextInput>
							<Text style={employmentRequestStyle.textForm}>Working experience</Text>
							<TextInput multiline={true} style={employmentRequestStyle.multilineTextInput} placeholder="Working experience" onChangeText={(val) => setExperience(val)}></TextInput>
						</View>
						{authState.employmentRequest.showError && (
							<Text style={loginStyles.errorMessage}>
								{authState.employmentRequest.errorMessage.length > 130 ? authState.employmentRequest.errorMessage.substring(0, 130) + "..." : authState.employmentRequest.errorMessage}
							</Text>
						)}
						{authState.employmentRequest.successfullySent && (
							<Text style={{ color: "green", fontSize: 18, alignSelf: "center", marginTop: 10 }}>Employment request sent seuccessfully</Text>
						)}
						<TouchableOpacity style={loginStyles.loginButton} activeOpacity={0.5} onPress={handleSendRequest}>
							<Text style={welcomeStyles.loginText}> Send request </Text>
						</TouchableOpacity>
					</ImageBackground>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAwareScrollView>
	);
}

export default EmploymentRequestScreen;
