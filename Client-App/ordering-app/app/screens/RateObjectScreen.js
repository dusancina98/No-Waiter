import React, { useContext, useEffect } from "react";
import { Alert, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { feedbackConstants } from "../constants/FeedbackConstants";
import Icons from "../constants/Icons";
import { FeedbackContext } from "../contexts/FeedbackContext";
import { feedbackService } from "../services/FeedbackService";
import { giveFeedbackStyle } from "../styles/styles";
import { useToast } from "react-native-toast-notifications";

const RateObjectScreen = ({ navigation, route }) => {
	const { feedbackState, dispatch } = useContext(FeedbackContext);
	const toast = useToast();

	const handleFeedback = (grade) => {
		console.log(route.params);
		let feedbackDTO = {
			Grade: grade,
			EntityId: route.params.Id,
			FeedbackType: "OBJECT",
		};

		feedbackService.rateObject(feedbackDTO, dispatch);
	};

	useEffect(() => {
		if (feedbackState.rateObject.success === true) {
			toast.show("Feedback successfully sent", {
				type: "success",
			});
			dispatch({ type: feedbackConstants.RATE_OBJECT_REQUEST });
			navigation.reset({ index: 0, routes: [{ name: "Home" }] });
		}
	}, [feedbackState.rateObject.success]);

	useEffect(() => {
		if (feedbackState.rateObject.showError === true) {
			toast.show(feedbackState.rateObject.errorMessage, {
				type: "danger",
			});
			dispatch({ type: feedbackConstants.RATE_OBJECT_REQUEST });
		}
	}, [feedbackState.rateObject.showError]);

	return (
		<SafeAreaView style={giveFeedbackStyle.containerWrapper}>
			<StatusBar barStyle="dark-content" />

			<View style={giveFeedbackStyle.headingContainer}>
				<View style={giveFeedbackStyle.logoContainer}>
					<Image style={{ width: 170, height: 170 }} source={require("../assets/logo.png")} />
				</View>
				<Text style={giveFeedbackStyle.heading}>Select grade</Text>
			</View>
			<View style={giveFeedbackStyle.gradesContainer}>
				{[1, 2, 3, 4, 5].map((el) => {
					return (
						<TouchableOpacity key={el} onPress={() => handleFeedback(el)}>
							<Image
								source={Icons.star}
								resizeMode="contain"
								style={{
									width: 45,
									height: 45,
									marginRight: 15,
								}}
							/>
						</TouchableOpacity>
					);
				})}
			</View>
		</SafeAreaView>
	);
};

export default RateObjectScreen;
