import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { OrderContext } from "../contexts/OrderContext";
import { qrScannerStyles } from "../styles/styles";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { orderConstants } from "../constants/OrderConstants";

const ScanQrScreen = ({ navigation }) => {
	const { dispatch } = useContext(OrderContext);
	const userCtx = useContext(UserContext);

	const isFocused = useIsFocused();

	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		try {
			const valuesArray = JSON.parse(data);
			console.log(valuesArray);
			navigation.navigate("Object", valuesArray.ObjectId);

			dispatch({ type: orderConstants.SET_QR_CODE_SCANNED_DATA, valuesArray });
		} catch (error) {
			//hendlati error
			console.log(error);
		}
	};

	useEffect(() => {
		if (userCtx.userState.scanQRCode.scannedQr === true) {
			Alert.alert("Success", "Order successfully scanned!", [{ text: "OK" }]);
			//dispatch({ type: orderConstants.PICKUP_ORDER_REQUEST });
		}
	}, [userCtx.userState.scanQRCode.scannedQr]);

	useEffect(() => {
		if (userCtx.userState.scanQRCode.showError === true) {
			Alert.alert("Error", "Error message", [{ text: "OK" }]);
			//dispatch({ type: orderConstants.PICKUP_ORDER_REQUEST });
		}
	}, [userCtx.userState.scanQRCode.showError]);

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={qrScannerStyles.containerWrapper}>
			{isFocused && <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />}
			{scanned && (
				<TouchableOpacity style={qrScannerStyles.button} activeOpacity={0.5} onPress={() => setScanned(false)}>
					<Text style={qrScannerStyles.buttonText}> Tap to Scan Again </Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default ScanQrScreen;
