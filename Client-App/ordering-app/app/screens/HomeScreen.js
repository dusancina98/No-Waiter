import React, { useContext, useState, useEffect } from "react";
import { FlatList, StatusBar, View, Text, Image, SafeAreaView, TouchableHighlight, TouchableOpacity, Alert } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import { objectsPageStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";
import { objectConstants } from "../constants/ObjectConstants";

function HomeScreen({ navigation }) {
	const { objectState, dispatch } = useContext(ObjectContext);
	const [isFetching, setIsFetching] = useState(false);

	const handleEnterObject = (objectId) =>{
		navigation.navigate("Object", objectId);
	}

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
		<SafeAreaView style={{ flex: 1}}>
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
					<TouchableOpacity underlayColor='rgba(73,182,77,0.9)' onPress={() => handleEnterObject(item.Id)}>
      					<View style={objectsPageStyles.container}>
        					<Image style={objectsPageStyles.photo} source={{ uri: `${API_URL}${item.EntityDTO.ImagePath.substring(1, item.EntityDTO.ImagePath.length)}` }}/>
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
