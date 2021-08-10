import React, { useContext, useState, useEffect } from "react";
import { FlatList, StatusBar, View, Text, Image, SafeAreaView, TouchableHighlight } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import { objectsPageStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";

function HomeScreen({ navigation }) {
	const { objectState, dispatch } = useContext(ObjectContext);
	const [isFetching, setIsFetching] = useState(false);

	const handleEnterObject = (objectId) =>{
		
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
		<SafeAreaView style={{ flex: 1 }}>
			<FlatList
				vertical
				showsVerticalScrollIndicator={false}
				numColumns={2}
				refreshing={isFetching}
				onRefresh={() => setIsFetching(true)}
				keyExtractor={(item) => item.Id}
				data={objectState.objects}
				renderItem={({ item }) => (
					<TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => handleEnterObject(item.Id)}>
      					<View style={objectsPageStyles.container}>
        					<Image style={objectsPageStyles.photo} source={{ uri: `${API_URL}${item.EntityDTO.ImagePath.substring(1, item.EntityDTO.ImagePath.length)}` }}/>
        					<Text style={objectsPageStyles.title}>Brkina kolibica i tri praseta</Text>
        					<Text style={objectsPageStyles.category}>Bulevar despota Stefana 7a, stan 15</Text>
      					</View>
    				</TouchableHighlight>
				)}
			/>
		</SafeAreaView>
	);
}

export default HomeScreen;
