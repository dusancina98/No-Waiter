import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icons from "../constants/Icons";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { authService } from "../services/AuthService";
import { userInfoStyle } from "../styles/styles";

function UserInfoScreen({ navigation }) {
	const { authState, dispatch } = useContext(AuthContext);
	const { userState } = useContext(UserContext);

	const [name, setName] = useState("");
	const [surname, setSurame] = useState("");

	const handleLogout = () => {
		authService.logout(dispatch);
	};

	AsyncStorage.getItem("name", (err, val) => {
		setName(val);
	});

	AsyncStorage.getItem("surname", (err, val) => {
		setSurame(val);
	});

	useEffect(() => {
		if (authState.userLogout.successLogout) {
			navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
		}
	}, [authState.userLogout.successLogout]);

	useEffect(() => {
		if (userState.profileEdit.editSuccess === true) {
			AsyncStorage.getItem("name", (err, val) => {
				setName(val);
			});

			AsyncStorage.getItem("surname", (err, val) => {
				setSurame(val);
			});
		}
	}, [userState.profileEdit.editSuccess]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={userInfoStyle.containerWrapper}>
				<TouchableWithoutFeedback onPress={() => navigation.navigate("Edit Profile")}>
					<View style={userInfoStyle.userDetailsContainer}>
						<View style={userInfoStyle.userImageContainer}>
							<Image
								source={Icons.user}
								resizeMode="contain"
								style={{
									width: 35,
									height: 35,
									tintColor: "black",
								}}
							/>
						</View>
						<View style={userInfoStyle.userInfo}>
							<Text style={{ fontSize: 20 }}>{name + " " + surname}</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
				<View>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("My Addresses")}>
						<Text style={userInfoStyle.buttonText}> My addresses </Text>
					</TouchableOpacity>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("Favourite Places")}>
						<Text style={userInfoStyle.buttonText}> Favourite places </Text>
					</TouchableOpacity>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("Order History")}>
						<Text style={userInfoStyle.buttonText}> Order history </Text>
					</TouchableOpacity>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("Pending Orders")}>
						<Text style={userInfoStyle.buttonText}> Pending orders </Text>
					</TouchableOpacity>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("Receive Order")}>
						<Text style={userInfoStyle.buttonText}> Receive order </Text>
					</TouchableOpacity>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={handleLogout}>
						<Text style={userInfoStyle.buttonText}> Logout </Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default UserInfoScreen;
