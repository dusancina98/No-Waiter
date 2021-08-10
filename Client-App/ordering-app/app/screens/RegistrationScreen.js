import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard, Image, ImageBackground, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userConstants } from "../constants/UserConstants";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { loginStyles, registrationStyles, welcomeStyles } from "../styles/styles";

const RegistrationScreen = ({ navigation }) => {
	const { userState, dispatch } = useContext(UserContext);

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");

	const handleRegister = () => {
		let requestDTO = {
			Email: email,
			Name: name,
			Surname: surname,
			PhoneNumber: phoneNumber,
			Address: address,
		};

		userService.registration(requestDTO, dispatch);
	};

	useEffect(() => {
		if (userState.registration.successfullySent === true) {
			Alert.alert("Success", "Successfull registration! Check your email to activate account.", [{ text: "OK" }]);
			dispatch({ type: userConstants.REGISTRATION_REQUEST });
			navigation.goBack();
		}
	}, [userState.registration.successfullySent]);

	useEffect(() => {
		dispatch({ type: userConstants.REGISTRATION_REQUEST });
	}, []);

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={registrationStyles.containerWrapper}>
					<StatusBar barStyle="light-content" />
					<ImageBackground style={welcomeStyles.background} source={require("../assets/background.jpg")}>
						<View style={registrationStyles.logoContainer}>
							<Image style={{ width: 130, height: 130 }} source={require("../assets/logo.png")} />
							<Text style={registrationStyles.logoText}>Registration</Text>
						</View>
						<View style={registrationStyles.registrationForm}>
							<Text style={registrationStyles.textForm}>Email</Text>
							<TextInput style={registrationStyles.textInput} placeholder="Email" onChangeText={(val) => setEmail(val)}></TextInput>
							<Text style={registrationStyles.textForm}>Name</Text>
							<TextInput style={registrationStyles.textInput} placeholder="Name" onChangeText={(val) => setName(val)}></TextInput>
							<Text style={registrationStyles.textForm}>Surname</Text>
							<TextInput style={registrationStyles.textInput} placeholder="Surname" onChangeText={(val) => setSurname(val)}></TextInput>
							<Text style={registrationStyles.textForm}>Phone number</Text>
							<TextInput style={registrationStyles.textInput} placeholder="Phone number" onChangeText={(val) => setPhoneNumber(val)}></TextInput>
							<Text style={registrationStyles.textForm}>Address</Text>
							<TextInput style={registrationStyles.textInput} placeholder="Address" onChangeText={(val) => setAddress(val)}></TextInput>
						</View>
						{userState.registration.showError && (
							<Text style={loginStyles.errorMessage}>
								{userState.registration.errorMessage.length > 130 ? userState.registration.errorMessage.substring(0, 130) + "..." : userState.registration.errorMessage}
							</Text>
						)}
						<TouchableOpacity style={registrationStyles.button} activeOpacity={0.5} onPress={handleRegister}>
							<Text style={welcomeStyles.loginText}> Register </Text>
						</TouchableOpacity>
					</ImageBackground>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAwareScrollView>
	);
};

export default RegistrationScreen;
