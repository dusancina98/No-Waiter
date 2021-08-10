import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, TouchableWithoutFeedback, View, Text, TextInput, StatusBar, TouchableOpacity, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userConstants } from "../constants/UserConstants";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { loginStyles, profileEditStyles, welcomeStyles } from "../styles/styles";

const AddNewAddressScreen = ({ navigation }) => {
	const { userState, dispatch } = useContext(UserContext);

	const [address, setAddress] = useState("");

	const handleSendRequest = () => {
		let requestDTO = {
			Name: address,
		};

		userService.addUserAddress(requestDTO, dispatch);
	};

	useEffect(() => {
		if (userState.addAddress.success === true) {
			Alert.alert("Success", "Address successfully added", [{ text: "OK" }]);
			navigation.goBack();
			dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
			setAddress("");
		}
	}, [userState.addAddress.success]);

	return (
		<KeyboardAwareScrollView>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={loginStyles.containerWrapper}>
						<StatusBar barStyle="dark-content" />
						<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
							<View style={{ alignSelf: "flex-start", marginLeft: 20, marginRight: 20, marginTop: 30, width: "100%" }}>
								<Text style={profileEditStyles.textForm}>Address name</Text>
								<TextInput style={profileEditStyles.textInput} placeholder="Address name" onChangeText={(val) => setAddress(val)}></TextInput>
							</View>
							{userState.addAddress.showError && (
								<Text style={loginStyles.errorMessage}>
									{userState.addAddress.errorMessage.length > 130 ? userState.addAddress.errorMessage.substring(0, 130) + "..." : userState.addAddress.errorMessage}
								</Text>
							)}

							<TouchableOpacity style={loginStyles.loginButton} activeOpacity={0.5} onPress={handleSendRequest}>
								<Text style={welcomeStyles.loginText}> Add new address </Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
};

export default AddNewAddressScreen;
