import React, { useContext, useEffect } from "react";
import { FlatList, ScrollView, View, Text, Image, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { checkoutStyle, productItemStyles, shoppingCartPreviewStyle } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";
import { OrderContext } from "../contexts/OrderContext";
import { DefaultTheme } from "@react-navigation/native";
import NumericInput from "react-native-numeric-input";
import Icons from "../constants/Icons";
import { orderConstants } from "../constants/OrderConstants";
import { orderService } from "../services/OrderService";
import { ObjectContext } from "../contexts/ObjectContext";
import { useToast } from "react-native-toast-notifications";

const CheckoutScreen = ({ navigation }) => {
	const { orderState, dispatch } = useContext(OrderContext);
	const { objectState } = useContext(ObjectContext);
	const toast = useToast();

	const setProductCount = (id, count) => {
		dispatch({ type: orderConstants.SET_PRODUCT_COUNT_TO_ORDER, id, count });
	};

	const deleteFromShoppingCart = (id) => {
		dispatch({ type: orderConstants.REMOVE_PRODUCT_FROM_ORDER, id });
	};

	const getOrderSum = () => {
		let sum = 0;
		orderState.createOrder.items.forEach((item) => {
			sum += item.count * item.price;
		});
		return sum;
	};

	const handleSubmitOrder = () => {
		//TODO: HANDLE TABLE

		let order = {
			Items: [],
			OrderType: orderState.qrCodeData.scanned?"ORDER_INSIDE":"DELIVERY",
			Address: orderState.createOrder.selectedAddress.EntityDTO.Name,
			EstimatedTime: 5,
			TableId: orderState.qrCodeData.tableId,
			ObjectId: objectState.objectDetails.object.Id,
		};
		console.log("TEST")
		console.log(orderState.qrCodeData.tableId)

		orderState.createOrder.items.forEach((item) => {
			if (item.sideDishes.length === 0) {
				order.Items.push({ Id: item.productId, Count: item.count, Note: item.note, SideDishes: [] });
			} else {
				let sideDishes = [];
				item.sideDishes.forEach((sideDish) => {
					sideDishes.push(sideDish);
				});
				order.Items.push({ Id: item.productId, Count: item.count, Note: item.note, SideDishes: sideDishes });
			}
		});

		console.log(order);
		orderService.createOrder(order, dispatch);
	};

	useEffect(() => {
		if (orderState.createOrder.showSuccessMessage === true) {
			toast.show("Successfuly created order", {
				type:"success",
			});
			//TODO: mozda staviti da redirektuje na pending orders
			navigation.goBack();
			dispatch({ type: orderConstants.HIDE_CREATE_ORDER_MESSAGES });
		}
	}, [orderState.createOrder.showSuccessMessage]);

	useEffect(() => {
		if (orderState.createOrder.showError === true) {
			toast.show(orderState.createOrder.errorMessage, {
				type:"danger",
			});
			dispatch({ type: orderConstants.HIDE_CREATE_ORDER_MESSAGES });
		}
	}, [orderState.createOrder.showError]);

	const renderProduct = ({ item }) => (
		<TouchableOpacity onPress={() => handlePressProduct(item)} style={productItemStyles.itemContainer}>
			<View style={productItemStyles.itemSubContainer}>
				<View style={productItemStyles.content}>
					<Text style={productItemStyles.itemName}>{item.name}</Text>
					<View>
						<Text style={productItemStyles.itemIngredient} numberOfLines={2}>
							{item.note}
						</Text>
					</View>
					<View style={productItemStyles.priceContainer}>
						<Text style={productItemStyles.price}>{Number(item.price).toFixed(2)} RSD</Text>
					</View>
				</View>
				<Image source={{ uri: `${API_URL}${item.imagePath.substring(1, item.imagePath.length)}` }} style={productItemStyles.image} />
			</View>
			<View />
			<View style={{ borderTopWidth: 1, borderTopColor: "lightgray", paddingVertical: 5, paddingHorizontal: 5, flexDirection: "row", alignItems: "center" }}>
				<NumericInput
					value={item.count}
					minValue={1}
					maxValue={10}
					rounded={true}
					editable={false}
					totalWidth={150}
					totalHeight={40}
					onChange={(value) => setProductCount(item.id, value)}
					leftButtonBackgroundColor="#b99849"
					rightButtonBackgroundColor="#b99849"
				/>
				<TouchableOpacity style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => deleteFromShoppingCart(item.id)}>
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
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "space-between", backgroundColor: "white" }}>
			<ScrollView style={{ backgroundColor: DefaultTheme.colors.background }}>
				<FlatList
					style={{ marginBottom: 10 }}
					vertical
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					data={orderState.createOrder.items}
					renderItem={renderProduct}
					ListHeaderComponent={<View></View>}
					ListFooterComponent={<View></View>}
				/>
			</ScrollView>
			{orderState.qrCodeData.scanned === true ? <View></View>:
			<View style={{ height: 60, backgroundColor: DefaultTheme.colors.background }}>
				<View style={checkoutStyle.container}>
					<TouchableOpacity onPress={() => navigation.navigate("Delivery Address")} style={{ flex: 1 }}>
						{orderState.createOrder.selectedAddress.Id === "" ? (
							<Text style={{ color: "gray", fontSize: 18, textAlign: "center" }}> Select address </Text>
						) : (
							<Text style={{ color: "gray", fontSize: 16, textAlign: "center" }}>Address: {orderState.createOrder.selectedAddress.EntityDTO.Name}</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
			}

			<View style={shoppingCartPreviewStyle.container}>
				<Text style={shoppingCartPreviewStyle.itemsPrice}>Total: {Number(getOrderSum()).toFixed(2)} RSD</Text>
				<TouchableOpacity style={shoppingCartPreviewStyle.checkoutButton} activeOpacity={0.5} onPress={handleSubmitOrder}>
					<Text style={shoppingCartPreviewStyle.checkoutButtonText}> Submit </Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default CheckoutScreen;
