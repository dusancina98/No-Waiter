import React, { useContext, useState, useEffect } from "react";
import { FlatList, LogBox, ScrollView, View, Text, Image, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { OrderContext } from "../contexts/OrderContext";
import { DefaultTheme } from "@react-navigation/native";
import { orderService } from "../services/OrderService";
import { orderHistoryDetailsStyles, orderHistoryStyles } from "../styles/styles";
import icons from "../constants/Icons";
import Moment from 'moment';

function PendingOrdersScreen({navigation}) {
	const { orderState, dispatch } = useContext(OrderContext);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		orderService.getPendingOrders(dispatch);
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
	}, []);

	useEffect(() => {
		if (isFetching === true) {
			orderService.getPendingOrders(dispatch);
			LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
			setIsFetching(false);
		}
	}, [isFetching]);


	const handleRejectOrder = (orderId) =>{
		Alert.alert(
			"Confirm reject",
			"Are you sure to reject order?",
			[
			  {
				text: "Yes",
				onPress: () => orderService.rejectOrder(orderId,dispatch)
			  },
			  {
				text: "No",
			  },
			]
		)
	}

	const renderOrder = ({ item }) => (
		<View style={orderHistoryStyles.itemContainer}>
			<View style={orderHistoryStyles.itemSubContainer}>
				<View style={orderHistoryStyles.content}>
					<View>
						<Image
							source={item.OrderType==="DELIVERY" ? icons.delivery : icons.restaurantTable}
							resizeMode="contain"
							style={orderHistoryStyles.image}
						/>
						<View style = {{flexDirection:'row'}}>
							<Image
								source={icons.circle}
								resizeMode="contain"
								style={item.OrderStatus==="UNCONFIRMED"? orderHistoryStyles.cicrleIconStyleUnconfirmed: {...item.OrderStatus==="CONFIRMED" ? orderHistoryStyles.cicrleIconStyleConfirmed : {...item.OrderStatus==="READY" ? orderHistoryStyles.cicrleIconStyleReady: orderHistoryStyles.cicrleIconStyleDelivering} } }
							/>
							<Text style={{marginLeft:5, marginBottom:3}}>{item.OrderStatus}</Text>
						</View>
					</View>
					<View style={orderHistoryStyles.infoStyle}>
						<View style={{flexDirection:'row', justifyContent:'space-between'}}>
							<Text style={orderHistoryStyles.objectName}>{item.ObjectName}</Text>
	
						</View>
						<Text style={orderHistoryStyles.date}>
						{Moment(item.CreatedDate).format('DD MMM yyyy HH:mm')}
						</Text>
						{item.OrderType==="DELIVERY" ? <Text style={orderHistoryStyles.address}>{item.Address}</Text> : <View></View>}
						
						
						<Text style={orderHistoryStyles.price}>
							{item.Price} RSD
						</Text>
					</View>
					
				</View>
				{item.OrderStatus != 'DELIVERING' ? 
				<TouchableOpacity onPress={() => handleRejectOrder(item.Id)}>
					<Image
						source={icons.remove}
						resizeMode="contain"
						style={orderHistoryStyles.rejectIcon}
					/>
				</TouchableOpacity>
				:
				<View>
				</View>

			}
			</View>
		</View>
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<ScrollView style={{ backgroundColor: DefaultTheme.colors.background }}>
				{orderState.pendingOrders.orders.length ===0 ? 
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
					data={orderState.pendingOrders.orders}
					renderItem={renderOrder}
				/>
				}
			</ScrollView>
		</SafeAreaView>
	);
}

export default PendingOrdersScreen;
