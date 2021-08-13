import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { OrderContext } from "../contexts/OrderContext";
import { shoppingCartPreviewStyle } from "../styles/styles";

const ShoppingCartPreview = ({ navigation }) => {
	const { orderState } = useContext(OrderContext);

	const getOrderSum = () => {
		let sum = 0;
		orderState.createOrder.items.forEach((item) => {
			sum += item.count * item.price;
		});
		return sum;
	};

	const getItemsCount = () => {
		let sum = 0;
		orderState.createOrder.items.forEach((item) => {
			sum += item.count;
		});
		return sum;
	};

	return (
		<View style={shoppingCartPreviewStyle.container}>
			<Text style={shoppingCartPreviewStyle.itemsCount}>Total items: {getItemsCount()}</Text>
			<Text style={shoppingCartPreviewStyle.itemsPrice}>{Number(getOrderSum()).toFixed(2)} RSD</Text>
			<TouchableOpacity style={shoppingCartPreviewStyle.checkoutButton} activeOpacity={0.5} onPress={() => navigation.navigate("Checkout")}>
				<Text style={shoppingCartPreviewStyle.checkoutButtonText}> Checkout </Text>
			</TouchableOpacity>
		</View>
	);
};

export default ShoppingCartPreview;
