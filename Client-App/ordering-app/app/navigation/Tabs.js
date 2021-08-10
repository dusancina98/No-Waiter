import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";
import { isIphoneX } from "react-native-iphone-x-helper";

import icons from "../constants/Icons";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
	var isSelected = accessibilityState.selected;

	if (isSelected) {
		return (
			<View style={{ flex: 1, alignItems: "center" }}>
				<View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
					<View style={{ flex: 1, backgroundColor: "#fff" }}></View>
					<Svg width={75} height={61} viewBox="0 0 75 61">
						<Path d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z" fill={"#fff"} />
					</Svg>
					<View style={{ flex: 1, backgroundColor: "#fff" }}></View>
				</View>

				<TouchableOpacity
					style={{
						top: -22.5,
						justifyContent: "center",
						alignItems: "center",
						width: 50,
						height: 50,
						borderRadius: 25,
						backgroundColor: "#fff",
					}}
					onPress={onPress}
				>
					{children}
				</TouchableOpacity>
			</View>
		);
	} else {
		return (
			<TouchableOpacity
				style={{
					flex: 1,
					height: 60,
					backgroundColor: "#fff",
				}}
				activeOpacity={1}
				onPress={onPress}
			>
				{children}
			</TouchableOpacity>
		);
	}
};

const QrButton = ({ children, onPress }) => {
	return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
				<View style={{ flex: 1, backgroundColor: "#fff" }}></View>
				<Svg width={75} height={61} viewBox="0 0 75 61">
					<Path d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z" fill={"#fff"} />
				</Svg>
				<View style={{ flex: 1, backgroundColor: "#fff" }}></View>
			</View>

			<TouchableOpacity
				style={{
					top: -25.5,
					justifyContent: "center",
					alignItems: "center",
					width: 70,
					height: 70,
					borderRadius: 35,
					backgroundColor: "#b99849",
					shadowColor: "grey",
					shadowOffset: {
						width: 0,
						height: 10,
					},
					shadowOpacity: 0.35,
					shadowRadius: 3.5,
					elevation: 5,
				}}
				onPress={onPress}
			>
				{children}
			</TouchableOpacity>
		</View>
	);
};

const CustomTabBar = (props) => {
	if (isIphoneX()) {
		return (
			<View>
				<View
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						height: 30,
						backgroundColor: "#fff",
					}}
				></View>
				<BottomTabBar {...props.props} />
			</View>
		);
	} else {
		return <BottomTabBar {...props.props} />;
	}
};

const Tabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					position: "absolute",
					left: 0,
					bottom: 0,
					right: 0,
					borderTopWidth: 0,
					backgroundColor: "transparent",
					elevation: 0,
				},
			}}
			tabBar={(props) => <CustomTabBar props={props} />}
		>
			<Tab.Screen
				name="Objects"
				component={HomeScreen}
				options={{
					headerShown: true,
					tabBarIcon: ({ focused }) => (
						<Image
							source={icons.cutlery}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								tintColor: focused ? "black" : "grey",
							}}
						/>
					),
					tabBarButton: (props) => <TabBarCustomButton {...props} />,
				}}
			/>

			<Tab.Screen
				name="Scan QR"
				component={HomeScreen}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<Image
							source={icons.qr}
							resizeMode="contain"
							style={{
								width: 35,
								height: 35,
								tintColor: "white",
							}}
						/>
					),
					tabBarButton: (props) => <QrButton {...props} />,
				}}
			/>

			<Tab.Screen
				name="User Info"
				component={HomeScreen}
				options={{
					headerShown: true,
					tabBarIcon: ({ focused }) => (
						<Image
							source={icons.user}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								tintColor: focused ? "black" : "grey",
							}}
						/>
					),
					tabBarButton: (props) => <TabBarCustomButton {...props} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
