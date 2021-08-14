import React from "react";
import { StatusBar, View, Text, SafeAreaView, Image, ScrollView, FlatList } from "react-native";
import { orderHistoryDetailsStyles } from "../styles/styles";
import icons from "../constants/Icons";
import Moment from 'moment';
import { API_URL } from "../constants/ApiUrl";

function OrderHistoryDetailsScreen({ route }) {

    const renderProduct = ({ item }) => (
		<View style={orderHistoryDetailsStyles.itemContainer}>
			<View style={orderHistoryDetailsStyles.itemSubContainer}>
				<View style={orderHistoryDetailsStyles.content}>
					<Text style={orderHistoryDetailsStyles.itemName}>{item.Name}</Text>
                    <Text style={orderHistoryDetailsStyles.itemInformationText}>Count: {item.Count}</Text>
                    <Text style={orderHistoryDetailsStyles.itemInformationText} numberOfLines={2}>Side dishes: {item.SideDishes}</Text>
                    <View style={orderHistoryDetailsStyles.priceContainer}>
						<Text style={orderHistoryDetailsStyles.price}>{Number(item.Price).toFixed(2)} RSD</Text>
					</View>
				</View>
				<Image source={{ uri: `${API_URL}${item.Image.substring(1, item.Image.length)}` }} style={orderHistoryDetailsStyles.imageProduct} />
			</View>
			<View />
		</View>
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
			<StatusBar barStyle="dark-content" />
            <View style={orderHistoryDetailsStyles.container}>
                <View style={orderHistoryDetailsStyles.restaurantContainer}>
                    <Text style={orderHistoryDetailsStyles.restaurantTitle}>{route.params.ObjectName}</Text>
                    <Image
						source={route.params.OrderType==="DELIVERY" ? icons.delivery : icons.restaurantTable}
						resizeMode="contain"
						style={orderHistoryDetailsStyles.image}
						/>
                </View>

                <View style={orderHistoryDetailsStyles.orderInformationContainer}>
                    <Text style={orderHistoryDetailsStyles.orderInformationText}>Date: </Text>
                    <Text style={orderHistoryDetailsStyles.orderInformationText}>{Moment(route.params.CreatedDate).format('DD MMM yyyy hh:mm')}</Text>
                </View>

                {route.params.OrderType==="DELIVERY" ? 
                    <View style={orderHistoryDetailsStyles.orderInformationContainer}>
                        <Text style={orderHistoryDetailsStyles.orderInformationText}>Address: </Text>
                        <Text style={orderHistoryDetailsStyles.orderInformationText}>{route.params.Address}</Text>
                    </View>
                    : 
                    <View></View>}

                <View style={orderHistoryDetailsStyles.orderItemsContainer}>
                    <Text style={orderHistoryDetailsStyles.orderItemName}>Order items </Text>
                    <ScrollView>
                        <FlatList
                            style={{ marginBottom: 10 }}
                            vertical
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={route.params.OrderItems}
                            renderItem={renderProduct}
                            ListHeaderComponent={<View></View>}
                            ListFooterComponent={<View></View>}
                        />
                    </ScrollView>
                    <View style={orderHistoryDetailsStyles.totalPriceContainer}>
                        <Text style={orderHistoryDetailsStyles.totalPriceText}>Total price: </Text>
						<Text style={orderHistoryDetailsStyles.totalPrice}>{Number(route.params.Price).toFixed(2)} RSD</Text>
					</View>
                </View>

            </View>
            
            
		</SafeAreaView>
	);
}

export default OrderHistoryDetailsScreen;
