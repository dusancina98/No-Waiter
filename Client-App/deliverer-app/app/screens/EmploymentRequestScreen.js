import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { authConstants } from "../constants/AuthConstants";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/AuthService";
import { employmentRequestStyle, loginStyles, welcomeStyles } from "../styles/styles";
import { useToast } from "react-native-toast-notifications";

function EmploymentRequestScreen({ navigation }) {
	const { authState, dispatch } = useContext(AuthContext);
	const toast = useToast();

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
		if (authState.employmentRequest.successfullySent === true) {
			toast.show("Employment request sent seuccessfully", {
				type: "success",
			});
			dispatch({ type: authConstants.CREATE_EMPLOYMENT_REQUEST_REQUEST });
			navigation.goBack();
		}
	}, [authState.employmentRequest.successfullySent]);

	useEffect(() => {
		if (authState.employmentRequest.showError === true) {
			toast.show(authState.employmentRequest.errorMessage, {
				type: "danger",
			});
			dispatch({ type: authConstants.CREATE_EMPLOYMENT_REQUEST_REQUEST });
		}
	}, [authState.employmentRequest.showError]);

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
