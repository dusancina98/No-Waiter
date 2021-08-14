import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { OrderContext } from "../contexts/OrderContext";
import { qrScannerStyles } from "../styles/styles";
import { useIsFocused } from "@react-navigation/native";
import { orderConstants } from "../constants/OrderConstants";
import { orderService } from "../services/OrderService";

const ReceiveOrderQrScreen = ({ navigation }) => {
	const { orderState, dispatch } = useContext(OrderContext);

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
			orderService.receiveOrder(data, dispatch);
		} catch (error) {
			//hendlati error
			console.log(error);
		}
	};

	useEffect(() => {
		if (orderState.scanQRCode.scannedQr === true) {
			Alert.alert("Success", "Order successfully scanned!", [{ text: "OK" }]);
			console.log(orderState.scanQRCode.delivererId);
			let delivererId = orderState.scanQRCode.delivererId;
			dispatch({ type: orderConstants.RECEIVE_ORDER_REQUEST });
			navigation.navigate("Rate Deliverer", { Id: delivererId });
		}
	}, [orderState.scanQRCode.scannedQr]);

	useEffect(() => {
		if (orderState.scanQRCode.showError === true) {
			Alert.alert("Error", orderState.scanQRCode.errorMessage, [{ text: "OK" }]);
			dispatch({ type: orderConstants.RECEIVE_ORDER_REQUEST });
		}
	}, [orderState.scanQRCode.showError]);

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

export default ReceiveOrderQrScreen;
