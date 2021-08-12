import React, { useContext, useState, useEffect } from "react";
import { StatusBar, View, Text, SafeAreaView } from "react-native";
import { ObjectContext } from "../contexts/ObjectContext";

function ObjectDetailsScreen({ route }) {
	const { objectState, dispatch } = useContext(ObjectContext);


	return (
		<SafeAreaView style={{ flex: 1}}>
			<StatusBar barStyle="dark-content" />
            <Text>{route.params}</Text>
		</SafeAreaView>
	);
}

export default ObjectDetailsScreen;
