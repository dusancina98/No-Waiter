import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, StatusBar, View, Text, Image, SafeAreaView, TouchableHighlight, TouchableOpacity, Alert } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import { objectScreenStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";
import MaterialTabs from 'react-native-material-tabs';

function ObjectScreen({ route }) {
	const { objectState, dispatch } = useContext(ObjectContext);
	const [isFetching, setIsFetching] = useState(false);
    const [category, setCategory] = useState(['All', 'Hrana', 'Pice', 'Glavna jela', 'Dezert', 'Sladoledi'])
    const [selectedTab, setSelectedTab] = useState(0);


	useEffect(() => {
		objectService.getObjectDetails(route.params ,dispatch);
	}, []);

    const handleSelect = () =>{
        Alert.alert('test')
    }

	return (
		<SafeAreaView style={{ flex: 1 ,justifyContent: 'space-between'  }}>
			<StatusBar barStyle="dark-content" />
			<ScrollView style={objectScreenStyles.container}>
                <View style={objectScreenStyles.imageContainer}>
                    <Image style={objectScreenStyles.image} source={{ uri: `${API_URL}${"./object-api/api/objects/object-images/11193162-52d3-11eb-ae93-0242ac130111.jpg".substring(1, "./object-api/api/objects/object-images/11193162-52d3-11eb-ae93-0242ac130111.jpg".length)}` }} />
                </View>
                <View style={objectScreenStyles.infoObjectContainer}>
                    <Text style={objectScreenStyles.infoObjectName}>Loft</Text>
                </View>
                
                
            </ScrollView>
            <MaterialTabs
                items={category}
                selectedIndex={selectedTab}
                onChange={setSelectedTab}
                barColor="#b99849"
                indicatorColor="#fffe94"
                activeTextColor="white"
                scrollable={true}
                uppercase={true}
            />
		</SafeAreaView>
	);
}


export default ObjectScreen;
