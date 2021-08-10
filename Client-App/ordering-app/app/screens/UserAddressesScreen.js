import React, { useContext, useEffect, useState } from "react";
import { FlatList, StatusBar, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { userAddressesStyle } from "../styles/styles";
import { userService } from "../services/UserService";
import Icons from "../constants/Icons";
import { DefaultTheme } from "@react-navigation/native";

const UserAddressesScreen = ({ navigation }) => {
	const { userState, dispatch } = useContext(UserContext);

	useEffect(() => {
		userService.getUserAddresses(dispatch);
	}, []);

	const handleRemoveAddress = (addressId) => {
		userService.removeUserAddress(addressId, dispatch);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar barStyle="dark-content" />
			<View style={{ flex: 1, backgroundColor: DefaultTheme.colors.background }}>
				<FlatList
					style={{ marginTop: 5 }}
					keyExtractor={(item) => item.Id}
					data={userState.userAddresses}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => navigation.navigate("Order Confirm", item)}>
							<View style={userAddressesStyle.containerWrapper}>
								<View style={userAddressesStyle.addressInfo}>
									<View style={{ flex: 5, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
										<Image
											source={Icons.house}
											resizeMode="contain"
											style={{
												width: 35,
												height: 35,
												marginRight: 15,
												tintColor: "#b99849",
											}}
										/>
										<Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.EntityDTO.Name}</Text>
									</View>
									<View style={{ flex: 1, justifyContent: "flex-end" }}>
										<TouchableOpacity onPress={() => handleRemoveAddress(item.Id)}>
											<Image
												source={Icons.remove}
												resizeMode="contain"
												style={{
													alignSelf: "flex-end",
													width: 35,
													height: 35,
													marginRight: 5,
													tintColor: "gray",
												}}
											/>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>

			<TouchableOpacity style={userAddressesStyle.footerButton} onPress={() => navigation.navigate("Add New Address")}>
				<Text style={userAddressesStyle.footerButtonText}>Add new address</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default UserAddressesScreen;
