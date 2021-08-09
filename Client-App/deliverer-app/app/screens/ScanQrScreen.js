import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { OrderContext } from "../contexts/OrderContext";
import { qrScannerStyles } from "../styles/styles";
import { useIsFocused } from "@react-navigation/native";
import { orderConstants } from "../constants/OrderConstants";
import { orderService } from "../services/OrderService";

const ScanQrScreen = (props) => {
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
		orderService.pickupOrder(data, dispatch);
	};

	useEffect(() => {
		if (orderState.orderDelivering.scannedQr === true) {
			alert(`Order successfully scanned!`);
			dispatch({ type: orderConstants.PICKUP_ORDER_REQUEST });
		}
	}, [orderState.orderDelivering.scannedQr]);

	useEffect(() => {
		if (orderState.orderDelivering.showError === true) {
			alert(orderState.orderDelivering.errorMessage);
			dispatch({ type: orderConstants.PICKUP_ORDER_REQUEST });
		}
	}, [orderState.orderDelivering.showError]);

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
