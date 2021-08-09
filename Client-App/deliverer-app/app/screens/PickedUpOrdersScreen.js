import React, { useContext, useEffect, useState } from "react";
import { FlatList, StatusBar, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { OrderContext } from "../contexts/OrderContext";
import { orderService } from "../services/OrderService";
import moment from "moment";
import { orderListStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";

const PickedUpOrdersScreen = () => {
	const [isFetching, setIsFetching] = useState(false);
	const { orderState, dispatch } = useContext(OrderContext);

	useEffect(() => {
		orderService.getAllPickedUpOrders(dispatch);
	}, []);

	useEffect(() => {
		if (isFetching === true) {
			orderService.getAllPickedUpOrders(dispatch);
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
				data={orderState.pickedUpOrders}
				renderItem={({ item }) => (
					<TouchableOpacity>
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
};

export default PickedUpOrdersScreen;
