import React, { useContext, useState, useEffect } from "react";
import { FlatList, Dimensions, ScrollView, Button, StatusBar, View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import { objectScreenStyles, productItemStyles } from "../styles/styles";
import { API_URL } from "../constants/ApiUrl";
import MaterialTabs from 'react-native-material-tabs';
import icons from "../constants/Icons";
import { objectConstants } from "../constants/ObjectConstants";

function ObjectScreen({ route }) {
	const { objectState, dispatch } = useContext(ObjectContext);
    const [selectedTab, setSelectedTab] = useState(0);


	useEffect(() => {
		objectService.getObjectDetails(route.params ,dispatch);
        objectService.getObjectCategories(route.params ,dispatch);
        objectService.getObjectProducts(route.params ,dispatch);
	}, []);

    useEffect(() => {
        dispatch({type: objectConstants.FIND_PRODUCTS_BY_CATEGORY, selectedTab})
	}, [selectedTab]);
    
    const handleSelect = () =>{
        Alert.alert('test')
    }

    const handleClickOnFavourite = () =>{
        console.log('test')
    }

    const handleMoreInformationPress = () =>{
        Alert.alert('Simple Button pressed')
    }

    const onChangeItem = () => {
        Alert.alert('Simple Button pressed')

    }

 

    const renderProduct = ({item}) => (
        console.log(item),
        <TouchableOpacity
          style={productItemStyles.itemContainer}
        >
          <View style={productItemStyles.itemSubContainer}>
            <View style={productItemStyles.content}>
              <Text style={productItemStyles.itemName}>{item.EntityDTO.Name}</Text>
              <View>
                <Text style={productItemStyles.itemIngredient} numberOfLines={2}>{item.EntityDTO.Description}</Text>
              </View>
              <View style={productItemStyles.priceContainer}>
                
                <Text style={productItemStyles.price}>{item.EntityDTO.Price}</Text>
              </View>
            </View>
            <Image source={{ uri: `${API_URL}${item.EntityDTO.Image.substring(1, item.EntityDTO.Image.length)}` }} style={productItemStyles.image} />
          </View>
          <View  />
        </TouchableOpacity>
      );


	return (
		<SafeAreaView style={{ flex: 1 ,justifyContent: 'space-between'  }}>
			<StatusBar barStyle="dark-content" />
            <ScrollView>

                <View style={objectScreenStyles.imageContainer}>
                    <Image style={objectScreenStyles.image} source={{ uri: `${API_URL}${objectState.objectDetails.object.EntityDTO.ImagePath.substring(1, objectState.objectDetails.object.EntityDTO.ImagePath.length)}` }} />
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
                                tintColor: objectState.objectDetails.object.EntityDTO.Favorite ? '#FF0000' : '#D3D3D3',
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
                    <Text style={{marginLeft:5}}>{objectState.objectDetails.object.EntityDTO.Rating}</Text>
                </View>
                <View style={objectScreenStyles.customerWorkTimeInfoContainer}>
                    <Image
                        style={objectScreenStyles.logoImage}
                        source={icons.watch}
                    />                    
                    <Text style={{marginLeft:5}}>{objectState.objectDetails.object.EntityDTO.Opened ? "OPENED": "CLOSED"}</Text>
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

                <Text style={objectScreenStyles.infoObjectName}>{objectState.objectDetails.selectedCategory}</Text>

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

                <FlatList
                	refreshing={false}
                    vertical
                    showsVerticalScrollIndicator={false}
                    onRefresh={() => setIsFetching(true)}
                    keyExtractor={(item) => item.Id}
                    data={objectState.objectDetails.showedProducts}
				    renderItem={({ item }) => (<TouchableOpacity
                        style={productItemStyles.itemContainer}
                      >
                        <View style={productItemStyles.itemSubContainer}>
                          <View style={productItemStyles.content}>
                            <Text style={productItemStyles.itemName}>{item.EntityDTO.Name}</Text>
                            <View>
                              <Text style={productItemStyles.itemIngredient} numberOfLines={2}>{item.EntityDTO.Description}</Text>
                            </View>
                            <View style={productItemStyles.priceContainer}>
                              
                              <Text style={productItemStyles.price}>{item.EntityDTO.Price}</Text>
                            </View>
                          </View>
                          <Image source={{ uri: `${API_URL}${item.EntityDTO.Image.substring(1, item.EntityDTO.Image.length)}` }} style={productItemStyles.image} />
                        </View>
                        <View  />
                      </TouchableOpacity>)}
			    />
                


            
            </ScrollView>
		</SafeAreaView>
	);
}



export default ObjectScreen;