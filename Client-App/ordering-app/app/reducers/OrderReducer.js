import { orderConstants } from "../constants/OrderConstants";

let ordCpy = {};

export const orderReducer = (state, action) => {
	switch (action.type) {
		case orderConstants.ADD_PRODUCT_TO_ORDER:
			ordCpy = { ...state };
			ordCpy.createOrder.items.push(action.item);
			return ordCpy;

		case orderConstants.SET_PRODUCT_COUNT_TO_ORDER:
			ordCpy = { ...state };
			let prdIdx = ordCpy.createOrder.items.findIndex((item) => item.id === action.id);
			ordCpy.createOrder.items[prdIdx].count = action.count;
			return ordCpy;

		case orderConstants.REMOVE_PRODUCT_FROM_ORDER:
			ordCpy = { ...state };
			ordCpy.createOrder.items = ordCpy.createOrder.items.filter((item) => item.id !== action.id);
			return ordCpy;

		case orderConstants.SET_DELIVERY_ADDRESS_TO_ORDER:
			ordCpy = { ...state };
			ordCpy.createOrder.selectedAddress = action.address;
			return ordCpy;
		case orderConstants.ORDER_CREATE_REQUEST:
			return {
				...state,
				createOrder: {
					selectedAddress: {
						Id: "",
						EntityDTO: {
							Name: "",
						},
					},
					address: "",
					items: [],
					showError: false,
					errorMessage: "",
					showSuccessMessage: false,
					successMessage: "",
				},
			};
		case orderConstants.ORDER_CREATE_SUCCESS:
			return {
				...state,
				createOrder: {
					selectedAddress: {
						Id: "",
						EntityDTO: {
							Name: "",
						},
					},
					address: "",
					items: [],
					showError: false,
					errorMessage: "",
					showSuccessMessage: true,
					successMessage: action.successMessage,
				},
			};
		case orderConstants.ORDER_CREATE_FAILURE:
			ordCpy = { ...state };

			ordCpy.createOrder.showError = true;
			ordCpy.createOrder.errorMessage = action.errorMessage;
			ordCpy.createOrder.showSuccessMessage = false;
			ordCpy.createOrder.successMessage = "";

			return ordCpy;
		case orderConstants.SET_QR_CODE_SCANNED_DATA:
			ordCpy = { ...state };

			ordCpy.qrCodeData.scanned = true;
			ordCpy.qrCodeData.tableId=action.valuesArray.TableId;
			ordCpy.qrCodeData.objectId=action.valuesArray.ObjectId;
			ordCpy.qrCodeData.key=action.valuesArray.Key;

			return ordCpy;
		default:
			return state;
	}
};
