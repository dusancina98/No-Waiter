import React, { useContext, useEffect, useState } from "react";
import { FlatList, StatusBar, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { OrderContext } from "../contexts/OrderContext";
import { orderService } from "../services/OrderService";
import moment from "moment";
import { orderListStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";

function OrdersScreen({ navigation }) {
	const [isFetching, setIsFetching] = useState(false);
	const { orderState, dispatch } = useContext(OrderContext);

	useEffect(() => {
		orderService.getAllConfirmedOrders(dispatch);
	}, []);

	useEffect(() => {
		console.log("Usao", isFetching);
		if (isFetching === true) {
			orderService.getAllConfirmedOrders(dispatch);
			setIsFetching(false);
		}
	}, [isFetching]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="dark-content" />
			<FlatList
				refreshing={isFetching}
				onRefresh={() => setIsFetching(true)}
				keyExtractor={(item) => item.OrderId}
				data={orderState.pendingOrders}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => navigation.navigate("Order Confirm", item)}>
						<View style={orderListStyles.containerWrapper}>
							<View style={orderListStyles.objectInfoContainer}>
								<Text style={{ fontWeight: "bold", fontSize: 22 }}>{item.DeliveryAddress}</Text>
							</View>
							<View style={orderListStyles.orderDetailsContainer}>
								<View style={orderListStyles.objectImageContainer}>
									<Image resizeMode="contain" style={orderListStyles.objectImage} source={{ uri: `${API_URL}${item.ObjectImage.substring(1, item.ObjectImage.length)}` }} />
								</View>
								<View style={orderListStyles.orderInfo}>
									<Text>
										<Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.ObjectName}</Text>
										<Text style={{ fontSize: 16, marginLeft: 10 }}>{"(" + item.ObjectAddress + ")"}</Text>
									</Text>

									<Text style={{ fontSize: 16, fontWeight: "bold" }}>{moment.utc(item.EstimatedTime).local().startOf("second").fromNow()}</Text>
									<Text>
										{Number(item.Price).toFixed(2)} <Text style={{ color: "green", fontWeight: "bold" }}>RSD</Text>
									</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
}

export default OrdersScreen;
