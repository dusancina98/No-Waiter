import React, { useContext, useState, useEffect } from "react";
import { Dimensions, ScrollView, Button, StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import { objectScreenStyles, productItemStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";
import MaterialTabs from 'react-native-material-tabs';
import icons from "../constants/Icons";

function ObjectScreen({ route }) {
	const { objectState, dispatch } = useContext(ObjectContext);
	const [isFetching, setIsFetching] = useState(false);
    const [category, setCategory] = useState(['All', 'Hrana', 'Pice', 'Glavna jela', 'Dezert', 'Sladoledi'])
    const [selectedTab, setSelectedTab] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);


	useEffect(() => {
		objectService.getObjectDetails(route.params ,dispatch);
	}, []);

    const handleSelect = () =>{
        Alert.alert('test')
    }

    const handleClickOnFavourite = () =>{
        setIsFavorite(!isFavorite);
    }

    const handleMoreInformationPress = () =>{
        Alert.alert('Simple Button pressed')
    }

    renderRowThree = () => (
        <TouchableOpacity
          style={productItemStyles.itemContainer}
        >
          <View style={productItemStyles.itemSubContainer}>
            <View style={productItemStyles.content}>
              <Text style={productItemStyles.itemName}>Burek</Text>
              <View>
                <Text style={productItemStyles.itemIngredient} numberOfLines={1}>Meso, Ingredient, I ovde nesto dugackofsadfsafasdfafdsafasd</Text>
                <Text style={productItemStyles.itemDescription} numberOfLines={1}>
                  Deskripcija neka sta bi bilo kad bi bila duza
                </Text>
              </View>
              <View style={productItemStyles.priceContainer}>
                
                <Text style={productItemStyles.price}>125 din</Text>
              </View>
            </View>
            <Image source={{ uri: `${API_URL}${"./object-api/api/objects/object-images/11193162-52d3-11eb-ae93-0242ac130111.jpg".substring(1, "./object-api/api/objects/object-images/11193162-52d3-11eb-ae93-0242ac130111.jpg".length)}` }} style={productItemStyles.image} />
          </View>
          <View  />
        </TouchableOpacity>
      );

	return (
		<SafeAreaView style={{ flex: 1 ,justifyContent: 'space-between'  }}>
			<StatusBar barStyle="dark-content" />
			<ScrollView>
                <View style={objectScreenStyles.imageContainer}>
                    <Image style={objectScreenStyles.image} source={{ uri: `${API_URL}${"./object-api/api/objects/object-images/11193162-52d3-11eb-ae93-0242ac130111.jpg".substring(1, "./object-api/api/objects/object-images/11193162-52d3-11eb-ae93-0242ac130111.jpg".length)}` }} />
                </View>
                <View style={objectScreenStyles.infoObjectContainer}>
                    <Text style={objectScreenStyles.infoObjectName}>Loft</Text>
                    <View style={objectScreenStyles.infoObjectFavoriteIcon}>
                        <TouchableOpacity onPress={() => handleClickOnFavourite()}>
                            <Image
                            source={icons.like}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: isFavorite ? '#FF0000' : '#D3D3D3',
                            }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={objectScreenStyles.customerFeedbackInfoContainer}>
                    <Image
                        tintColor=  "#b99849"
                        style={objectScreenStyles.logoImage}
                        source={icons.star}
                    />                    
                    <Text style={{marginLeft:5}}>9.53</Text>
                </View>
                <View style={objectScreenStyles.customerWorkTimeInfoContainer}>
                    <Image
                        style={objectScreenStyles.logoImage}
                        source={icons.watch}
                    />                    
                    <Text style={{marginLeft:5}}>Otvoreno</Text>
                </View>
                <View style={objectScreenStyles.moreInformationButtonContainer}>
                    <Button 
                        title="More information"
                        color="#b99849"
                        onPress={() => handleMoreInformationPress()}
                    />
                </View>
                <View
                    style={{
                        borderBottomColor: 'lightgray',
                        borderBottomWidth: 1,
                    }}
                    />

                <Text style={objectScreenStyles.infoObjectName}>All products</Text>

                {renderRowThree()}
                {renderRowThree()}
                {renderRowThree()}
                {renderRowThree()}

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
