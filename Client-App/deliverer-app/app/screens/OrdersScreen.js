import React, { useContext, useEffect } from "react";
import { FlatList, StatusBar, View, Text, SafeAreaView, Image } from "react-native";
import { OrderContext } from "../contexts/OrderContext";
import { orderService } from "../services/OrderService";
import moment from "moment";
import { orderListStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";

function OrdersScreen(props) {
	const { orderState, dispatch } = useContext(OrderContext);

	useEffect(() => {
		orderService.getAllConfirmedOrders(dispatch);
	}, []);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="dark-content" />
			<FlatList
				keyExtractor={(item) => item.OrderId}
				data={orderState.pendingOrders}
				renderItem={({ item }) => (
					<View style={orderListStyles.containerWrapper}>
						<View style={orderListStyles.objectImageContainer}>
							<Image resizeMode="contain" style={orderListStyles.objectImage} source={{ uri: `${API_URL}${item.ObjectImage.substring(1, item.ObjectImage.length)}` }} />
						</View>
						<View style={orderListStyles.orderInfo}>
							<Text>{item.ObjectName}</Text>
							<Text>RSD {Number(item.Price).toFixed(2)}</Text>
							<Text>{item.ObjectAddress}</Text>
							<Text>{moment.utc(item.ExpiredTime).utc().endOf("minutes").fromNow()}</Text>
						</View>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}

export default OrdersScreen;
