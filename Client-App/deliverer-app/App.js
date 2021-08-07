import React, { useEffect, useState } from "react";
import Tabs from "./app/navigation/Tabs";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import LoginScreen from "./app/screens/LoginScreen";
import AuthContextProvider from "./app/contexts/AuthContext";
import OrderContextProvider from "./app/contexts/OrderContext";
import { hasAnyRole } from "./app/helpers/auth-header";
import OrderConfirmScreen from "./app/screens/OrderConfirmScreen";
import EmploymentRequestScreen from "./app/screens/EmploymentRequestScreen";

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
				<OrderContextProvider>
					<NavigationContainer>
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
							}}
							initialRouteName={token === true ? "Home" : "Welcome"}
						>
							<Stack.Screen name="Home" component={Tabs} />
							<Stack.Screen name="Welcome" component={WelcomeScreen} />
							<Stack.Screen name="Login" component={LoginScreen} />
							<Stack.Screen name="Employment request" component={EmploymentRequestScreen} />
							<Stack.Screen name="Order Confirm" component={OrderConfirmScreen} options={{ headerShown: true }} />
						</Stack.Navigator>
					</NavigationContainer>
				</OrderContextProvider>
			</AuthContextProvider>
		);
	} else {
		return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => console.log(err)} />;
	}
}
