import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import * as Font from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { hasAnyRole } from "./app/helpers/auth-header";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AppLoading from "expo-app-loading";
import LoginScreen from "./app/screens/LoginScreen";
import UserActivateScreen from "./app/screens/UserActivateScreen";
import AuthContextProvider from "./app/contexts/AuthContext";
import RegistrationScreen from "./app/screens/RegistrationScreen";
import UserContextProvider from "./app/contexts/UserContext";
import ResetPasswordScreen from "./app/screens/ResetPasswordScreen";
import Tabs from "./app/navigation/Tabs";
import ObjectContextProvider from "./app/contexts/ObjectContext";
import ObjectScreen from "./app/screens/ObjectScreen";
import EditUserInfoScreen from "./app/screens/EditUserInfoScreen";
import UserAddressesScreen from "./app/screens/UserAddressesScreen";
import AddNewAddressScreen from "./app/screens/AddNewAddressScreen";
import FavouriteObjectsScreen from "./app/screens/FavouriteObjectsScreen";
import ObjectDetailsScreen from "./app/screens/ObjectDetailsScreen";
import ProductContextProvider from "./app/contexts/ProductContext";
import ProductDetailsScreen from "./app/screens/ProductDetailsScreen";
import OrderContextProvider from "./app/contexts/OrderContext";
import CheckoutScreen from "./app/screens/CheckoutScreen";
import SelectDeliveryAddressScreen from "./app/screens/SelectDeliveryAddressScreen";
import OrderHistoryScreen from "./app/screens/OrderHistoryScreen";
import OrderHistoryDetailsScreen from "./app/screens/OrderHistoryDetailsScreen";
import PendingOrdersScreen from "./app/screens/PendingOrdersScreen";
import RateDelivererScreen from "./app/screens/RateDelivererScreen";
import ReceiveOrderQrScreen from "./app/screens/ReceiveOrderQrScanScreen";
import FeedbackContextProvider from "./app/contexts/FeedbackContext";
import RateObjectScreen from "./app/screens/RateObjectScreen";
import { ToastProvider } from "react-native-toast-notifications";
import Icons from "./app/constants/Icons";

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
			<ToastProvider
				placement="bottom"
				duration={3000}
				animationType="zoom-in"
				animationDuration={250}
				successColor="green"
				dangerColor="red"
				warningColor="orange"
				normalColor="gray"
				successIcon={<Image source={Icons.check} resizeMode="contain" style={{ width: 30, height: 30, tintColor: "white" }} />}
			>
				<FeedbackContextProvider>
					<UserContextProvider>
						<AuthContextProvider>
							<ObjectContextProvider>
								<OrderContextProvider>
									<ProductContextProvider>
										<NavigationContainer>
											<Stack.Navigator
												screenOptions={{
													headerShown: false,
												}}
												initialRouteName={token === true ? "Home" : "Welcome"}
											>
												<Stack.Screen name="Home" component={Tabs} />
												<Stack.Screen name="Login" component={LoginScreen} />
												<Stack.Screen name="Registration" component={RegistrationScreen} />
												<Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
												<Stack.Screen name="Activate User" component={UserActivateScreen} />
												<Stack.Screen name="My Addresses" component={UserAddressesScreen} options={{ headerShown: true, headerBackTitle: false }} />
												<Stack.Screen name="Add New Address" component={AddNewAddressScreen} options={{ headerShown: true, headerBackTitle: false }} />
												<Stack.Screen name="Welcome" component={WelcomeScreen} />
												<Stack.Screen name="Edit Profile" component={EditUserInfoScreen} />
												<Stack.Screen name="Favourite Places" component={FavouriteObjectsScreen} options={{ headerShown: true, headerBackTitle: false }} />
												<Stack.Screen name="Object" component={ObjectScreen} options={{ headerShown: true }} />
												<Stack.Screen name="Delivery Address" component={SelectDeliveryAddressScreen} options={{ headerShown: true, headerBackTitle: false }} />
												<Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: true, headerBackTitle: false }} />
												<Stack.Screen name="Object Details" component={ObjectDetailsScreen} options={{ headerShown: true }} />
												<Stack.Screen name="Product Details" component={ProductDetailsScreen} options={{ headerShown: true }} />
												<Stack.Screen name="Order History" component={OrderHistoryScreen} options={{ headerShown: true }} />
												<Stack.Screen name="Order History Details" component={OrderHistoryDetailsScreen} options={{ headerShown: true }} />
												<Stack.Screen name="Pending Orders" component={PendingOrdersScreen} options={{ headerShown: true }} />
												<Stack.Screen name="Rate Deliverer" component={RateDelivererScreen} options={{ headerShown: true, headerBackTitle: false }} />
												<Stack.Screen name="Rate Object" component={RateObjectScreen} options={{ headerShown: true, headerBackTitle: false }} />
												<Stack.Screen name="Receive Order" component={ReceiveOrderQrScreen} />
											</Stack.Navigator>
										</NavigationContainer>
									</ProductContextProvider>
								</OrderContextProvider>
							</ObjectContextProvider>
						</AuthContextProvider>
					</UserContextProvider>
				</FeedbackContextProvider>
			</ToastProvider>
		);
	} else {
		return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => console.log(err)} />;
	}
}
