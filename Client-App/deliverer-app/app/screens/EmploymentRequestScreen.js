import React, { useContext, useState } from "react";
import { ImageBackground, View, Text, TouchableOpacity, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../contexts/AuthContext";
import { employmentRequestStyle, loginStyles, welcomeStyles } from "../styles/styles";

function EmploymentRequestScreen({ navigation }) {
	const { authState, dispatch } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [experience, setExperience] = useState("");
	const [email, setEmail] = useState("");

	const handleSendRequest = () => {};

	return (
		<KeyboardAwareScrollView>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={loginStyles.containerWrapper}>
						<StatusBar barStyle="dark-content" />
						<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
							<View style={employmentRequestStyle.logoContainer}>
								<Text style={employmentRequestStyle.logoText}>Employment Request</Text>
							</View>
							<View style={loginStyles.loginForm}>
								<Text style={employmentRequestStyle.textForm}>Email</Text>
								<TextInput style={employmentRequestStyle.textInput} placeholder="Email" onChangeText={(val) => setEmail(val)}></TextInput>
								<Text style={employmentRequestStyle.textForm}>Name</Text>
								<TextInput style={employmentRequestStyle.textInput} placeholder="Name" onChangeText={(val) => setName(val)}></TextInput>
								<Text style={employmentRequestStyle.textForm}>Surname</Text>
								<TextInput style={employmentRequestStyle.textInput} placeholder="Surname" onChangeText={(val) => setSurname(val)}></TextInput>
								<Text style={employmentRequestStyle.textForm}>Phone number</Text>
								<TextInput style={employmentRequestStyle.textInput} placeholder="Phone number" onChangeText={(val) => setPhoneNumber(val)}></TextInput>
								<Text style={employmentRequestStyle.textForm}>Working experience</Text>
								<TextInput style={employmentRequestStyle.multilineTextInput} placeholder="Working experience" onChangeText={(val) => setExperience(val)}></TextInput>
							</View>
							{/* {authState.userLogin.showError && <Text style={loginStyles.errorMessage}>{authState.userLogin.errorMessage}</Text>} */}
							<TouchableOpacity style={loginStyles.loginButton} activeOpacity={0.5} onPress={handleSendRequest}>
								<Text style={welcomeStyles.loginText}> Send request </Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
}

export default EmploymentRequestScreen;
