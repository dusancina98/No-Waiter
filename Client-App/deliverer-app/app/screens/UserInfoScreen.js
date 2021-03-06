import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import Icons from "../constants/Icons";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/AuthService";
import { userInfoStyle } from "../styles/styles";

function UserInfoScreen({ navigation }) {
	const { authState, dispatch } = useContext(AuthContext);

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

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={userInfoStyle.containerWrapper}>
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
				<View>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("Picked Up Orders")}>
						<Text style={userInfoStyle.buttonText}> Delivering orders </Text>
					</TouchableOpacity>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("Accepted Orders")}>
						<Text style={userInfoStyle.buttonText}> Accepted orders </Text>
					</TouchableOpacity>
					<TouchableOpacity style={userInfoStyle.button} activeOpacity={0.5} onPress={() => navigation.navigate("Dismiss Order")}>
						<Text style={userInfoStyle.buttonText}> Dismiss order </Text>
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
