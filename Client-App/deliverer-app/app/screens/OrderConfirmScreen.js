import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { API_URL } from "../constants/ApiUrl";
import { orderConfirmStyles } from "../styles/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OrderContext } from "../contexts/OrderContext";
import { orderService } from "../services/OrderService";
import { orderConstants } from "../constants/OrderConstants";
import { useToast } from "react-native-toast-notifications";

function OrderConfirmScreen({ navigation, route }) {
	const { orderState, dispatch } = useContext(OrderContext);
	const [estimatedTime, setEstimatedTime] = useState("5");
	const toast = useToast();

	const handleConfirm = () => {
		let orderDTO = {
			OrderId: route.params.OrderId,
			EstimatedTime: parseInt(estimatedTime),
		};

		orderService.confirmOrder(orderDTO, dispatch);
	};

	useEffect(() => {
		if (orderState.orderAccept.accepted === true) {
			toast.show("Order accepted successfully", {
				type: "success",
			});
			navigation.goBack();
			dispatch({ type: orderConstants.ACCEPT_ORDER_REQUEST });
		}
	}, [orderState.orderAccept.accepted]);

	useEffect(() => {
		dispatch({ type: orderConstants.ACCEPT_ORDER_REQUEST });
	}, []);

	return (
		<KeyboardAwareScrollView>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={orderConfirmStyles.containerWrapper}>
						<Text style={{ fontWeight: "bold", fontSize: 25 }}>{route.params.ObjectName}</Text>
						<Image resizeMode="contain" style={orderConfirmStyles.objectImage} source={{ uri: `${API_URL}${route.params.ObjectImage.substring(1, route.params.ObjectImage.length)}` }} />
						<Text style={{ fontSize: 18, marginTop: 10 }}>
							<Text style={{ fontWeight: "bold" }}>From: </Text>
							<Text style={{ marginLeft: 10 }}>{route.params.ObjectAddress}</Text>
						</Text>

						<Text style={{ fontSize: 18 }}>
							<Text style={{ fontWeight: "bold" }}>To: </Text>
							<Text style={{ marginLeft: 10 }}>{route.params.DeliveryAddress}</Text>
						</Text>
						<Text style={{ fontSize: 18 }}>
							<Text style={{ fontWeight: "bold" }}>Order ready: </Text>
							{moment.utc(route.params.EstimatedTime).local().startOf("second").fromNow()}
						</Text>
						<Text style={{ fontSize: 18 }}>RSD {Number(route.params.Price).toFixed(2)}</Text>

						<Text style={orderConfirmStyles.textForm}>Estimated delivery time (in minutes)</Text>
						<TextInput
							keyboardType="numeric"
							style={orderConfirmStyles.textInput}
							value={estimatedTime}
							placeholder="Estimated delivery time"
							onChangeText={(val) => setEstimatedTime(val)}
						></TextInput>
						<TouchableOpacity style={orderConfirmStyles.buttonConfirm} activeOpacity={0.5} onPress={handleConfirm}>
							<Text style={orderConfirmStyles.buttonText}> Confirm </Text>
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
}

export default OrderConfirmScreen;
