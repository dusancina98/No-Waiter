import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

function HomeScreen({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="dark-content" />
		</SafeAreaView>
	);
}

export default HomeScreen;
