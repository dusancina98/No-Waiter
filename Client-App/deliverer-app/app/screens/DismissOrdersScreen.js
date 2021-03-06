import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { OrderContext } from "../contexts/OrderContext";
import { qrScannerStyles } from "../styles/styles";
import { useIsFocused } from "@react-navigation/native";
import { orderConstants } from "../constants/OrderConstants";
import { orderService } from "../services/OrderService";
import { useToast } from "react-native-toast-notifications";

const DismissOrdersScreen = ({ navigation }) => {
	const { orderState, dispatch } = useContext(OrderContext);
	const isFocused = useIsFocused();
	const toast = useToast();

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
		orderService.dismissOrder(data, dispatch);
	};

	useEffect(() => {
		if (orderState.orderDismiss.scannedQr === true) {
			toast.show("Order successfully dismissed", {
				type: "success",
			});
			dispatch({ type: orderConstants.DISMISS_ORDER_REQUEST });
			navigation.goBack();
		}
	}, [orderState.orderDismiss.scannedQr]);

	useEffect(() => {
		if (orderState.orderDismiss.showError === true) {
			toast.show(orderState.orderDismiss.errorMessage, {
				type: "danger",
			});
			dispatch({ type: orderConstants.DISMISS_ORDER_REQUEST });
		}
	}, [orderState.orderDismiss.showError]);

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

export default DismissOrdersScreen;
