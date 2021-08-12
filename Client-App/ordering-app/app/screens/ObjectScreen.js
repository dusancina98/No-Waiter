import React, { useContext, useState, useEffect } from "react";
import { FlatList, LogBox, ScrollView, Button, StatusBar, View, Text, Image, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import { objectScreenStyles, productItemStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";
import MaterialTabs from "react-native-material-tabs";
import icons from "../constants/Icons";
import { objectConstants } from "../constants/ObjectConstants";

function ObjectScreen({ route }) {
	const { objectState, dispatch } = useContext(ObjectContext);
	const [selectedTab, setSelectedTab] = useState(0);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		objectService.getObjectDetails(route.params, dispatch);
		objectService.getObjectCategories(route.params, dispatch);
		objectService.getObjectProducts(route.params, dispatch);
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, []);

	useEffect(() => {
		dispatch({ type: objectConstants.FIND_PRODUCTS_BY_CATEGORY, selectedTab });
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, [selectedTab]);

	useEffect(() => {
		if (isFetching === true) {
			objectService.getObjectDetails(route.params, dispatch);
		objectService.getObjectCategories(route.params, dispatch);
		objectService.getObjectProducts(route.params, dispatch);
			setIsFetching(false);
		}
	}, [isFetching]);


	const handleClickOnFavourite = () => {
		if (objectState.objectDetails.object.EntityDTO.Favorite === false) {
			objectService.addObjectToFavourites(objectState.objectDetails.object.Id, dispatch);
		} else {
			objectService.removeObjectFromFavourites(objectState.objectDetails.object.Id, dispatch);
		}
	};

	const handleMoreInformationPress = () => {
		Alert.alert("Simple Button pressed");
	};

	const renderTabs= () =>(
		<MaterialTabs
			items={objectState.objectDetails.categories}
			selectedIndex={selectedTab}
			onChange={setSelectedTab}
			barColor="#b99849"
			indicatorColor="#fffe94"
			activeTextColor="white"
			scrollable={true}
			uppercase={true}
		/>
	)

	const renderProduct = ({ item }) => (
			<TouchableOpacity style={productItemStyles.itemContainer}>
				<View style={productItemStyles.itemSubContainer}>
					<View style={productItemStyles.content}>
						<Text style={productItemStyles.itemName}>{item.EntityDTO.Name}</Text>
						<View>
							<Text style={productItemStyles.itemIngredient} numberOfLines={2}>
								{item.EntityDTO.Description}
							</Text>
						</View>
						<View style={productItemStyles.priceContainer}>
							<Text style={productItemStyles.price}>{item.EntityDTO.Price}</Text>
						</View>
					</View>
					<Image source={{ uri: `${API_URL}${item.EntityDTO.Image.substring(1, item.EntityDTO.Image.length)}` }} style={productItemStyles.image} />
				</View>
				<View />
			</TouchableOpacity>
	);
	
	const renderHeader = () => (
		<View>
			<View style={objectScreenStyles.imageContainer}>
					<Image
						style={objectScreenStyles.image}
						source={{ uri: `${API_URL}${objectState.objectDetails.object.EntityDTO.ImagePath.substring(1, objectState.objectDetails.object.EntityDTO.ImagePath.length)}` }}
					/>
				</View>
				<View style={objectScreenStyles.infoObjectContainer}>
					<Text style={objectScreenStyles.infoObjectName}>{objectState.objectDetails.object.EntityDTO.Name}</Text>
					<View style={objectScreenStyles.infoObjectFavoriteIcon}>
						<TouchableOpacity onPress={() => handleClickOnFavourite()}>
							<Image
								source={icons.like}
								resizeMode="contain"
								style={{
									width: 35,
									height: 35,
									tintColor: objectState.objectDetails.object.EntityDTO.Favorite ? "#FF0000" : "#D3D3D3",
								}}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={objectScreenStyles.customerFeedbackInfoContainer}>
					<Image tintColor="#b99849" style={objectScreenStyles.logoImage} source={icons.star} />
					<Text style={{ marginLeft: 5, alignSelf: "center" }}>
						{objectState.objectDetails.object.EntityDTO.Rating > 0 ? Number(objectState.objectDetails.object.EntityDTO.Rating).toFixed(1) : "No reviews"}
					</Text>
				</View>
				<View style={objectScreenStyles.customerWorkTimeInfoContainer}>
					<Image style={objectScreenStyles.logoImage} source={icons.watch} />
					<Text style={{ marginLeft: 5 }}>{objectState.objectDetails.object.EntityDTO.Opened ? "OPENED" : "CLOSED"}</Text>
				</View>
				<View style={objectScreenStyles.moreInformationButtonContainer}>
					<Button title="More information" color="#b99849" onPress={() => handleMoreInformationPress()} />
				</View>
				<View
					style={{
						borderBottomColor: "lightgray",
						borderBottomWidth: 1,
					}}
				/>

				<Text style={objectScreenStyles.infoObjectName}>{objectState.objectDetails.selectedCategory}</Text>
		</View>
	);

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
			<ScrollView>
				{renderHeader()}
				<FlatList
					vertical
					showsVerticalScrollIndicator={false}
					refreshing={isFetching}
					onRefresh={() => setIsFetching(true)}
					keyExtractor={(item) => item.Id}
					data={objectState.objectDetails.showedProducts}
					renderItem={renderProduct}
					ListHeaderComponent={<View></View>}
            		ListFooterComponent={<View></View>}
				/>

			</ScrollView>
			{renderTabs()}
		</SafeAreaView>
		
	);
}

export default ObjectScreen;
