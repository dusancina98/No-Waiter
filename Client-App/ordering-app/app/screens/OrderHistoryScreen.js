import React, { useContext, useState, useEffect } from "react";
import { FlatList, LogBox, ScrollView, View, Text, Image, SafeAreaView,TouchableOpacity } from "react-native";
import { OrderContext } from "../contexts/OrderContext";
import { DefaultTheme } from "@react-navigation/native";
import { orderService } from "../services/OrderService";
import { orderHistoryStyles } from "../styles/styles";
import icons from "../constants/Icons";
import Moment from 'moment';

function OrderHistoryScreen({navigation}) {
	const { orderState, dispatch } = useContext(OrderContext);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		orderService.getOrderHistory(dispatch);
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
	}, []);

	useEffect(() => {
		if (isFetching === true) {
			orderService.getOrderHistory(dispatch);
			LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
			setIsFetching(false);
		}
	}, [isFetching]);

	const handlePressOnOrder = (item) =>{
		navigation.navigate("Order History Details", item);
	}

	const renderOrder = ({ item }) => (
		<TouchableOpacity onPress={() => handlePressOnOrder(item)} style={orderHistoryStyles.itemContainer}>
			<View style={orderHistoryStyles.itemSubContainer}>
				<View style={orderHistoryStyles.content}>
					<Image
						source={item.OrderType==="DELIVERY" ? icons.delivery : icons.restaurantTable}
						resizeMode="contain"
						style={orderHistoryStyles.image}
						/>
					<View style={orderHistoryStyles.infoStyle}>
						<Text style={orderHistoryStyles.objectName}>{item.ObjectName}</Text>
						{item.OrderType==="DELIVERY" ? <Text style={orderHistoryStyles.address}>{item.Address}</Text> : <View></View>}
						<Text style={orderHistoryStyles.price}>
							{item.Price} RSD
						</Text>
						<Text style={orderHistoryStyles.date}>

						{Moment(item.CreatedDate).format('DD MMM yyyy hh:mm')}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<ScrollView style={{ backgroundColor: DefaultTheme.colors.background }}>
				{orderState.orderHistory.orders.length ===0 ? 
				<View style={orderHistoryStyles.emptyHistoryContainer}>
					<Text style={orderHistoryStyles.emptyHistoryText}>You dont have any order</Text>
				</View>
				:<FlatList
					style={{ marginBottom: 10 }}
					vertical
					showsVerticalScrollIndicator={false}
					refreshing={isFetching}
					onRefresh={() => setIsFetching(true)}
					keyExtractor={(item) => item.Id}
					data={orderState.orderHistory.orders}
					renderItem={renderOrder}
				/>
				}
			</ScrollView>
		</SafeAreaView>
	);
}

export default OrderHistoryScreen;
