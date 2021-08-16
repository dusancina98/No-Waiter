import React, { useContext, useEffect } from "react";
import { FlatList, StatusBar, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { userAddressesStyle } from "../styles/styles";
import { userService } from "../services/UserService";
import Icons from "../constants/Icons";
import { DefaultTheme } from "@react-navigation/native";
import { OrderContext } from "../contexts/OrderContext";
import { orderConstants } from "../constants/OrderConstants";

const SelectDeliveryAddressScreen = ({ navigation }) => {
	const { userState, dispatch } = useContext(UserContext);
	const orderCtx = useContext(OrderContext);

	const selectDeliveryAddress = (item) => {
		orderCtx.dispatch({ type: orderConstants.SET_DELIVERY_ADDRESS_TO_ORDER, address: item });
		navigation.goBack();
	};

	useEffect(() => {
		userService.getUserAddresses(dispatch);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar barStyle="dark-content" />
			<View style={{ flex: 1, backgroundColor: DefaultTheme.colors.background }}>
				<FlatList
					style={{ marginTop: 5 }}
					keyExtractor={(item) => item.Id}
					data={userState.userAddresses}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => selectDeliveryAddress(item)}>
							<View style={orderCtx.orderState.createOrder.selectedAddress.Id === item.Id ? userAddressesStyle.containerWrapperGray : userAddressesStyle.containerWrapper}>
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
									{orderCtx.orderState.createOrder.selectedAddress.Id === item.Id && (
										<View style={{ flex: 1, justifyContent: "flex-end" }}>
											<Image
												source={Icons.check}
												resizeMode="contain"
												style={{
													alignSelf: "flex-end",
													width: 35,
													height: 35,
													marginRight: 5,
													tintColor: "#b99849",
												}}
											/>
										</View>
									)}
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

export default SelectDeliveryAddressScreen;
