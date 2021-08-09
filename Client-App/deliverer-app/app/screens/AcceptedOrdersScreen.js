import React, { useContext, useEffect, useState } from "react";
import { FlatList, StatusBar, View, Text, SafeAreaView, Image, TouchableOpacity, Alert } from "react-native";
import { OrderContext } from "../contexts/OrderContext";
import { orderService } from "../services/OrderService";
import moment from "moment";
import { orderListStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";
import { orderConstants } from "../constants/OrderConstants";

function AcceptedOrdersScreen({ navigation }) {
	const [isFetching, setIsFetching] = useState(false);
	const { orderState, dispatch } = useContext(OrderContext);

	const handleCancelOrder = (orderId) => {
		orderService.cancelOrder(orderId, dispatch);
	};

	const handleAskIfCancel = (orderId) => {
		Alert.alert("Confirm", "Are you sure you want to cancel delivering order?", [
			{
				text: "Yes",
				onPress: () => handleCancelOrder(orderId),
			},
			{ text: "No", style: "cancel" },
		]);
	};

	useEffect(() => {
		if (orderState.orderCancel.success === true) {
			Alert.alert("Success", "Order successfully canceled!", [{ text: "OK" }]);
			dispatch({ type: orderConstants.CANCEL_ORDER_REQUEST });
		}
	}, [orderState.orderCancel.success]);

	useEffect(() => {
		if (orderState.orderCancel.showError === true) {
			Alert.alert("Error", orderState.orderCancel.errorMessage, [{ text: "OK" }]);
			dispatch({ type: orderConstants.CANCEL_ORDER_REQUEST });
		}
	}, [orderState.orderCancel.showError]);

	useEffect(() => {
		orderService.getAllAcceptedOrders(dispatch);
	}, []);

	useEffect(() => {
		if (isFetching === true) {
			orderService.getAllAcceptedOrders(dispatch);
			setIsFetching(false);
		}
	}, [isFetching]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="dark-content" />
			<Text style={{ fontSize: 12, color: "gray", marginLeft: 10, marginTop: 10 }}>Tap to cancel order</Text>
			<FlatList
				refreshing={isFetching}
				onRefresh={() => setIsFetching(true)}
				keyExtractor={(item) => item.OrderId}
				data={orderState.acceptedOrders}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => handleAskIfCancel(item.OrderId)}>
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
										<Text style={{ fontWeight: "bold" }}>{item.ObjectName}</Text>
										<Text style={{ fontSize: 14, marginLeft: 10 }}>{"(" + item.ObjectAddress + ")"}</Text>
									</Text>

									<Text>{item.DeliveryAddress}</Text>
									<Text>{moment.utc(item.ExpiredTime).utc().endOf("minutes").fromNow()}</Text>
									<Text>RSD {Number(item.Price).toFixed(2)}</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
}

export default AcceptedOrdersScreen;
