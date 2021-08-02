import { orderConstants } from "../constants/OrderConstants";

var ordCpy = {};

export const orderReducer = (state, action) => {
	switch (action.type) {
		case orderConstants.ADD_PRODUCT_TO_ORDER:
			ordCpy = { ...state };
			ordCpy.createOrder.items.push(action.item);

			ordCpy.orderItemDetails = {
				showModal: false,
				selectedProduct: {
					Id: "",
					EntityDTO: {
						Name: "",
						Image: "",
						Ingredients: [],
						MeasureUnit: "",
						Price: 0,
						SideDishes: [],
					},
				},
			};

			return ordCpy;
		default:
			return state;
	}
};
