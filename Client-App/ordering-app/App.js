import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { hasAnyRole } from "./app/helpers/auth-header";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AppLoading from "expo-app-loading";
import LoginScreen from "./app/screens/LoginScreen";
import UserActivateScreen from "./app/screens/UserActivateScreen";
import AuthContextProvider from "./app/contexts/AuthContext";

const Stack = createStackNavigator();

const getFonts = () =>
	Font.loadAsync({
		"roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
		"roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
	});

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	const [token, setToken] = useState(false);

	useEffect(() => {
		setToken(hasAnyRole());
	}, []);

	if (fontsLoaded) {
		return (
			<AuthContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
						initialRouteName={"Welcome"}
					>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Activate User" component={UserActivateScreen} />
						<Stack.Screen name="Welcome" component={WelcomeScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</AuthContextProvider>
		);
	} else {
		return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => console.log(err)} />;
	}
}
