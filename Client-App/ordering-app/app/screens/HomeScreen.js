import React, { useContext, useState, useEffect } from "react";
import { FlatList, StatusBar, View, Text, Image, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import { objectsPageStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";
import { OrderContext } from "../contexts/OrderContext";
import { orderConstants } from "../constants/OrderConstants";

function HomeScreen({ navigation }) {
	const { objectState, dispatch } = useContext(ObjectContext);
	const ordCtx = useContext(OrderContext);

	const [isFetching, setIsFetching] = useState(false);

	const handleEnterObject = (objectId) => {
		navigation.navigate("Object", objectId);
		ordCtx.dispatch({ type: orderConstants.RESET_QR_CODE_DATA });
	};

	useEffect(() => {
		objectService.findAllObjects(dispatch);
	}, []);

	useEffect(() => {
		if (isFetching === true) {
			objectService.findAllObjects(dispatch);
			setIsFetching(false);
		}
	}, [isFetching]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="dark-content" />
			<FlatList
				vertical
				showsVerticalScrollIndicator={false}
				numColumns={2}
				refreshing={isFetching}
				onRefresh={() => setIsFetching(true)}
				keyExtractor={(item) => item.Id}
				data={objectState.objects}
				renderItem={({ item }) => (
					<TouchableOpacity underlayColor="rgba(73,182,77,0.9)" onPress={() => handleEnterObject(item.Id)}>
						<View style={objectsPageStyles.container}>
							<ImageBackground style={objectsPageStyles.photo} source={{ uri: `${API_URL}${item.EntityDTO.ImagePath.substring(1, item.EntityDTO.ImagePath.length)}` }}>
								{item.EntityDTO.Opened === true ? 
								<Text></Text>
								:
								<Text style={objectsPageStyles.textOverPhoto}>CLOSED</Text>
								}
							</ImageBackground>
							<Text style={objectsPageStyles.title}>{item.EntityDTO.Name}</Text>
							<Text style={objectsPageStyles.category}>{item.EntityDTO.Address}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
}

export default HomeScreen;
