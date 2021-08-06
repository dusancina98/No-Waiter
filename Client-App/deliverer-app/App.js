import React, { useState } from "react";
import Tabs from "./app/navigation/Tabs";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import LoginScreen from "./app/screens/LoginScreen";
import AuthContextProvider from "./app/contexts/AuthContext";
import { hasAnyRole } from "./app/helpers/auth-header";

const Stack = createStackNavigator();

const getFonts = () =>
	Font.loadAsync({
		"roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
		"roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
	});

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	if (fontsLoaded) {
		return (
			<AuthContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
						initialRouteName={hasAnyRole() ? "Home" : "Welcome"}
					>
						<Stack.Screen name="Home" component={Tabs} />
						<Stack.Screen name="Welcome" component={WelcomeScreen} />
						<Stack.Screen name="Login" component={LoginScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</AuthContextProvider>
		);
	} else {
		return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => console.log(err)} />;
	}
}
