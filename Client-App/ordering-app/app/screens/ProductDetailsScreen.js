import React, { useState } from "react";
import { StatusBar, ScrollView, View, Button, Text, SafeAreaView, TextInput, FlatList } from "react-native";
import { productDetailsStyles } from "../styles/styles";
import NumericInput from 'react-native-numeric-input'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import uuid from 'react-native-uuid';

function ProductDetailsScreen({ route }) {
	const [ quantity, setQuantity ] = useState(1)
	const [selectedSideDish, setSelectedSideDish] = useState([])
	const [note, setNote] = useState("");

	const onMultiChange = () =>{
		return (item) => setSelectedSideDish(xorBy(selectedSideDish, [item], 'id'))
	}

	const handlePressAddToOrder = () =>{

		let orderItemDTO ={
			id: uuid.v4(),
			productId: route.params.Id,
			imagePath: route.params.EntityDTO.Image,
			name: route.params.EntityDTO.Name,
			price: route.params.EntityDTO.Price,
			sideDishes: filterSelectedSideDish(selectedSideDish),
			count: quantity,
			note: note,

		}
		console.log(orderItemDTO)
	}

	const filterSelectedSideDish = () =>{
		let newSelectedSideDishes = []

		for(let sideDish in selectedSideDish){
			newSelectedSideDishes.push(selectedSideDish[sideDish].id)
		}

		return newSelectedSideDishes;
	}


	const renderIngredient = () =>{
		let retString = "";

		for(let index in route.params.EntityDTO.Ingredients){
			retString = retString + route.params.EntityDTO.Ingredients[index].EntityDTO.Name

			if(index+1 != route.params.EntityDTO.Ingredients.length){
				retString= retString + ", "
			}
		}
		
		return <Text style={productDetailsStyles.descriptionContent}>{retString}</Text>
	}

	return (
		<SafeAreaView style={{ flex: 1}}>
			<StatusBar barStyle="dark-content" />
			<ScrollView style={productDetailsStyles.container} nestedScrollEnabled={true} >
				<View style={productDetailsStyles.container}>
					<Text style={productDetailsStyles.productName}>{route.params.EntityDTO.Name}</Text>
					<View style={productDetailsStyles.descriptionContainer}>
						<Text style={productDetailsStyles.descriptionTitle}>
							Description: 
						</Text>
						<Text style={productDetailsStyles.descriptionContent} numberOfLines={4}>
							{route.params.EntityDTO.Description}
						</Text>
					</View>
					<View style={productDetailsStyles.ingredientContainer}>
						<Text style={productDetailsStyles.ingredientTitle}>
							Ingredient: 
						</Text>
						<Text style={productDetailsStyles.ingredientContent}>
							{route.params.EntityDTO.Ingredients.length == 0 ? 
							<Text>Not listed ingredients</Text>
							:
							renderIngredient()
							}
						</Text>
					</View>
					<View style={productDetailsStyles.quantityButtonContainer}>
						<Text style={productDetailsStyles.enterQuantityText}>Enter quantity</Text>
						<NumericInput 
							value={quantity}
							minValue={1}
							maxValue={10}
							rounded={true}
							editable={false}
							totalWidth={180} 
							totalHeight={50}
							onChange={value => setQuantity(value)} 
							leftButtonBackgroundColor='#b99849'
							rightButtonBackgroundColor='#b99849' 
							/>
					</View>
					
						<View style={productDetailsStyles.selectSideDishesContainer}>
							<SelectBox
								label="Select side dishes"
								options={route.params.EntityDTO.SideDishes}
								selectedValues={selectedSideDish}
								onMultiSelect={onMultiChange()}
								onTapClose={onMultiChange()}
								isMulti
								hideInputFilter={true}
								listOptionProps={{  nestedScrollEnabled: true }}
								labelStyle={{
									fontSize: 16,
									color: '#5F5F5F',

								}}
								multiOptionContainerStyle={{
									backgroundColor:'#b99849' 
								}}
								multiOptionsLabelStyle={{
									fontSize: 14,
								}}
							/>
						</View>
					<View style={productDetailsStyles.noteContainer}>
						<Text style={productDetailsStyles.textNote}>Enter note:</Text>
						<TextInput 
							multiline 
							maxLength={100}
							style={productDetailsStyles.noteInput} 
							placeholder="Enter note for waiters" 
							onChangeText={(val) => setNote(val)}/>
					</View>

					<View style={productDetailsStyles.buttonContainer}>
						<Button title="Add to order" color="#b99849" onPress={()=>handlePressAddToOrder()}/>
					</View>
				</View>
			</ScrollView>
            
            
            
		</SafeAreaView>
	);
}

export default ProductDetailsScreen;
