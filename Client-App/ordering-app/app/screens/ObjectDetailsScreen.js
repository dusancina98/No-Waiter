import React, { useContext } from "react";
import { StatusBar, View, Text, SafeAreaView } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectDetailsStyles } from "../styles/styles";

function ObjectDetailsScreen({ route }) {
	const { objectState } = useContext(ObjectContext);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="dark-content" />
			<View style={objectDetailsStyles.container}>
				<Text style={objectDetailsStyles.infoObjectName}>{objectState.objectDetails.object.EntityDTO.Name}</Text>
				<Text style={objectDetailsStyles.addessTitle}>Address</Text>
				<Text style={objectDetailsStyles.address}>{objectState.objectDetails.object.EntityDTO.Address}</Text>
				<Text style={objectDetailsStyles.workTimeTitle}>Worktime</Text>
				<View style={objectDetailsStyles.workDayContainer}>
					<Text style={objectDetailsStyles.workDay}>Monday</Text>
					<Text style={objectDetailsStyles.workDay}>
						{objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.Working
							? objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.TimeFrom +
							  " - " +
							  objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.TimeTo
							: "NOT WORKING"}
					</Text>
				</View>
				<View style={objectDetailsStyles.workDayContainer}>
					<Text style={objectDetailsStyles.workDay}>Tuesday</Text>
					<Text style={objectDetailsStyles.workDay}>
						{objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.Working
							? objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.TimeFrom +
							  " - " +
							  objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.TimeTo
							: "NOT WORKING"}
					</Text>
				</View>
				<View style={objectDetailsStyles.workDayContainer}>
					<Text style={objectDetailsStyles.workDay}>Wednesday</Text>
					<Text style={objectDetailsStyles.workDay}>
						{objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.Working
							? objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.TimeFrom +
							  " - " +
							  objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.TimeTo
							: "NOT WORKING"}
					</Text>
				</View>
				<View style={objectDetailsStyles.workDayContainer}>
					<Text style={objectDetailsStyles.workDay}>Thursday</Text>
					<Text style={objectDetailsStyles.workDay}>
						{objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.Working
							? objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.TimeFrom +
							  " - " +
							  objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.TimeTo
							: "NOT WORKING"}
					</Text>
				</View>
				<View style={objectDetailsStyles.workDayContainer}>
					<Text style={objectDetailsStyles.workDay}>Friday</Text>
					<Text style={objectDetailsStyles.workDay}>
						{objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.Working
							? objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.TimeFrom +
							  " - " +
							  objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.TimeTo
							: "NOT WORKING"}
					</Text>
				</View>
				<View style={objectDetailsStyles.workDayContainer}>
					<Text style={objectDetailsStyles.workDay}>Saturday</Text>
					<Text style={objectDetailsStyles.workDay}>
						{objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.Working
							? objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.TimeFrom +
							  " - " +
							  objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.TimeTo
							: "NOT WORKING"}
					</Text>
				</View>
				<View style={objectDetailsStyles.workDayContainer}>
					<Text style={objectDetailsStyles.workDay}>Sunday</Text>
					<Text style={objectDetailsStyles.workDay}>
						{objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.Working
							? objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.TimeFrom +
							  " - " +
							  objectState.objectDetails.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.TimeTo
							: "NOT WORKING"}
					</Text>
				</View>
				<Text style={objectDetailsStyles.contactTitle}>Contact</Text>
				<View style={objectDetailsStyles.contactContainer}>
					<Text style={objectDetailsStyles.workDay}>Email</Text>
					<Text style={objectDetailsStyles.workDay}>{objectState.objectDetails.object.EntityDTO.Email}</Text>
				</View>
				<View style={objectDetailsStyles.contactContainer}>
					<Text style={objectDetailsStyles.contact}>Phone number</Text>
					<Text style={objectDetailsStyles.contact}>{objectState.objectDetails.object.EntityDTO.PhoneNumber}</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default ObjectDetailsScreen;
