import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, TouchableWithoutFeedback, View, Text, TextInput, StatusBar, TouchableOpacity, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { loginStyles, profileEditStyles, welcomeStyles } from "../styles/styles";
import { useToast } from "react-native-toast-notifications";

const EditUserInfoScreen = ({ navigation }) => {
	const { userState, dispatch } = useContext(UserContext);
	const toast = useToast();

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");

	const handleSendRequest = () => {
		let requestDTO = {
			Name: name,
			Surname: surname,
			PhoneNumber: phoneNumber,
		};

		userService.editProfile(requestDTO, dispatch);
	};

	useEffect(() => {
		if (userState.profileEdit.editSuccess === true) {
			toast.show("Profile information updated successfully", {
				type: "success",
			});
			navigation.goBack();
		}
	}, [userState.profileEdit.editSuccess]);

	useEffect(() => {
		setEmail(userState.profileEdit.user.Email);
		setSurname(userState.profileEdit.user.Surname);
		setName(userState.profileEdit.user.Name);
		setPhoneNumber(userState.profileEdit.user.PhoneNumber);
	}, [userState.profileEdit.user]);

	useEffect(() => {
		userService.getUserProfile(dispatch);
	}, []);

	return (
		<KeyboardAwareScrollView>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={loginStyles.containerWrapper}>
						<StatusBar barStyle="dark-content" />
						<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
							<View style={profileEditStyles.logoContainer}>
								<Text style={profileEditStyles.logoText}>Edit Profile</Text>
							</View>
							<View style={{ marginBottom: 20 }}></View>
							<View style={loginStyles.loginForm}>
								<Text style={profileEditStyles.textForm}>Email</Text>
								<TextInput style={profileEditStyles.textInputUneditable} editable={false} value={email} placeholder="Email" onChangeText={(val) => setEmail(val)}></TextInput>
								<Text style={profileEditStyles.textForm}>Name</Text>
								<TextInput style={profileEditStyles.textInput} placeholder="Name" value={name} onChangeText={(val) => setName(val)}></TextInput>
								<Text style={profileEditStyles.textForm}>Surname</Text>
								<TextInput style={profileEditStyles.textInput} placeholder="Surname" value={surname} onChangeText={(val) => setSurname(val)}></TextInput>
								<Text style={profileEditStyles.textForm}>Phone number</Text>
								<TextInput style={profileEditStyles.textInput} placeholder="Phone number" value={phoneNumber} onChangeText={(val) => setPhoneNumber(val)}></TextInput>
							</View>
							{userState.profileEdit.showError && (
								<Text style={loginStyles.errorMessage}>
									{userState.profileEdit.errorMessage.length > 130 ? userState.profileEdit.errorMessage.substring(0, 130) + "..." : userState.profileEdit.errorMessage}
								</Text>
							)}

							<TouchableOpacity style={loginStyles.loginButton} activeOpacity={0.5} onPress={handleSendRequest}>
								<Text style={welcomeStyles.loginText}> Edit </Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
};

export default EditUserInfoScreen;
