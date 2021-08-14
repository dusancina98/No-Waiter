import React, { useContext, useState, useEffect } from "react";
import { FlatList, LogBox, ScrollView, View, Text, Image, SafeAreaView, TouchableOpacity, Alert, Icon } from "react-native";
import { OrderContext } from "../contexts/OrderContext";
import { DefaultTheme } from "@react-navigation/native";
import { orderService } from "../services/OrderService";
import { pendingOrdersStyles } from "../styles/styles";
import icons from "../constants/Icons";
import Moment from 'moment';
import { useToast } from "react-native-toast-notifications";
import { orderConstants } from "../constants/OrderConstants";

function PendingOrdersScreen({navigation}) {
	const { orderState, dispatch } = useContext(OrderContext);
	const [isFetching, setIsFetching] = useState(false);
	const toast = useToast();

	useEffect(() => {
		orderService.getPendingOrders(dispatch);
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
	}, []);

	useEffect(() => {
		if (orderState.rejectOrder.showSuccess === true) {
			toast.show("Successfuly rejected order", {
				type:"success",
			});
			dispatch({type: orderConstants.REJECT_ORDER_REQUEST })
		}
	}, [orderState.rejectOrder.showSuccess]);

	useEffect(() => {
		if (orderState.rejectOrder.showError === true) {
			toast.show("Currently not possible to reject order", {
				type:"danger",
			});
			dispatch({type: orderConstants.REJECT_ORDER_REQUEST })
		}
	}, [orderState.rejectOrder.showError]);

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
		<View style={pendingOrdersStyles.itemContainer}>
			<View style={pendingOrdersStyles.itemSubContainer}>
				<View style={pendingOrdersStyles.content}>
					<View>
						<Image
							source={item.OrderType==="DELIVERY" ? icons.delivery : icons.restaurantTable}
							resizeMode="contain"
							style={pendingOrdersStyles.image}
						/>
						<View style = {{flexDirection:'row'}}>
							<Image
								source={icons.circle}
								resizeMode="contain"
								style={item.OrderStatus==="UNCONFIRMED"? pendingOrdersStyles.cicrleIconStyleUnconfirmed: {...item.OrderStatus==="CONFIRMED" ? pendingOrdersStyles.cicrleIconStyleConfirmed : {...item.OrderStatus==="READY" ? pendingOrdersStyles.cicrleIconStyleReady: pendingOrdersStyles.cicrleIconStyleDelivering} } }
							/>
							<Text style={{marginLeft:5, marginBottom:3}}>{item.OrderStatus}</Text>
						</View>
					</View>
					<View style={pendingOrdersStyles.infoStyle}>
						<View style={{flexDirection:'row', justifyContent:'space-between'}}>
							<Text style={pendingOrdersStyles.objectName}>{item.ObjectName}</Text>
	
						</View>
						<Text style={pendingOrdersStyles.date}>
						{Moment(item.CreatedDate).format('DD MMM yyyy HH:mm')}
						</Text>
						{item.OrderType==="DELIVERY" ? <Text style={pendingOrdersStyles.address}>{item.Address}</Text> : <View></View>}
						
						
						<Text style={pendingOrdersStyles.price}>
							{item.Price} RSD
						</Text>
					</View>
					
				</View>
				{item.OrderStatus != 'DELIVERING' ? 
				<TouchableOpacity onPress={() => handleRejectOrder(item.Id)}>
					<Image
						source={icons.remove}
						resizeMode="contain"
						style={pendingOrdersStyles.rejectIcon}
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
			{orderState.pagesError.pendingOrdersError === false ? 
				<ScrollView style={{ backgroundColor: DefaultTheme.colors.background }}>
					{orderState.pendingOrders.orders.length ===0 ? 
					<View style={pendingOrdersStyles.emptyHistoryContainer}>
						<Text style={pendingOrdersStyles.emptyHistoryText}>You dont have any order</Text>
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
				</ScrollView>:
				<View style={pendingOrdersStyles.errorContainer}>
					<Text style={pendingOrdersStyles.errorMessage}>
						We have some problem. Please try again!
					</Text>
					<Text style={pendingOrdersStyles.reloadPageMessage}>
						Reload page
					</Text>
					<TouchableOpacity onPress={() => setIsFetching(true)}>
						<Image
							source={icons.refreshPage}
							resizeMode="contain"
							style={pendingOrdersStyles.refreshPageImage}
						/>
					</TouchableOpacity>
				</View>
			}
		</SafeAreaView>
	);
}

export default PendingOrdersScreen;
