import React, { useContext, useEffect } from "react";
import { Alert, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { feedbackConstants } from "../constants/FeedbackConstants";
import Icons from "../constants/Icons";
import { FeedbackContext } from "../contexts/FeedbackContext";
import { feedbackService } from "../services/FeedbackService";
import { giveFeedbackStyle } from "../styles/styles";
import { useToast } from "react-native-toast-notifications";

const RateDelivererScreen = ({ navigation, route }) => {
	const { feedbackState, dispatch } = useContext(FeedbackContext);
	const toast = useToast();

	const handleFeedback = (grade) => {
		console.log(route.params);
		let feedbackDTO = {
			Grade: grade,
			EntityId: route.params.Id,
			FeedbackType: "DELIVERER",
		};

		feedbackService.rateDeliverer(feedbackDTO, dispatch);
	};

	useEffect(() => {
		if (feedbackState.rateDeliverer.success === true) {
			toast.show("Feedback successfully sent", {
				type: "success",
			});
			dispatch({ type: feedbackConstants.RATE_DELIVERER_REQUEST });
			navigation.reset({ index: 0, routes: [{ name: "Home" }] });
		}
	}, [feedbackState.rateDeliverer.success]);

	useEffect(() => {
		if (feedbackState.rateDeliverer.showError === true) {
			toast.show(feedbackState.rateDeliverer.errorMessage, {
				type: "danger",
			});
			dispatch({ type: feedbackConstants.RATE_DELIVERER_REQUEST });
		}
	}, [feedbackState.rateDeliverer.showError]);

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
			<View style={{ flex: 1, marginBottom: 180 }}>
				<TouchableOpacity style={giveFeedbackStyle.button} activeOpacity={0.5} onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })}>
					<Text style={giveFeedbackStyle.buttonText}> Skip </Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RateDelivererScreen;
